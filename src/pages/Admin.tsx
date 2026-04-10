import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, LogOut } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string | null;
}

const Admin = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchCampaigns();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin-login");
      return;
    }
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: session.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      navigate("/admin-login");
    }
  };

  const fetchCampaigns = async () => {
    const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  };

  const addCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !thumbnailUrl) return;
    await supabase.from("campaigns").insert({ title, thumbnail_url: thumbnailUrl, video_url: videoUrl || null });
    setTitle("");
    setThumbnailUrl("");
    setVideoUrl("");
    fetchCampaigns();
  };

  const deleteCampaign = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    fetchCampaigns();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl font-bold">Manage Campaigns</h1>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Add campaign form */}
        <form onSubmit={addCampaign} className="bg-secondary/40 rounded-xl p-5 mb-8 space-y-3">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-1"><Plus size={16} /> Add Campaign</h2>
          <input
            type="text"
            placeholder="Campaign title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            required
          />
          <input
            type="url"
            placeholder="Thumbnail URL (image)"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            required
          />
          <input
            type="url"
            placeholder="Video URL (Instagram link)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <button type="submit" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
            Add Campaign
          </button>
        </form>

        {/* Campaign list */}
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center">No campaigns yet. Add your first one above.</p>
        ) : (
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-secondary/40 rounded-xl p-3">
                <img src={c.thumbnail_url} alt={c.title} className="w-12 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{c.title}</p>
                  {c.video_url && <p className="text-xs text-muted-foreground truncate">{c.video_url}</p>}
                </div>
                <button onClick={() => deleteCampaign(c.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
