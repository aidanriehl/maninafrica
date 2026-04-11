import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, LogOut, Star, Save } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string | null;
}

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  more_link: string | null;
  description: string | null;
}

const Admin = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Spotlight state
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [spotTitle, setSpotTitle] = useState("");
  const [spotVideoUrl, setSpotVideoUrl] = useState("");
  const [spotMoreLink, setSpotMoreLink] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spotSaving, setSpotSaving] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCampaigns();
    fetchSpotlight();
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

  const fetchSpotlight = async () => {
    const { data } = await supabase.from("spotlight").select("*").order("created_at", { ascending: false }).limit(1);
    if (data && data.length > 0) {
      const s = data[0];
      setSpotlight(s);
      setSpotTitle(s.title);
      setSpotVideoUrl(s.video_url || "");
      setSpotMoreLink(s.more_link || "");
      setSpotDescription(s.description || "");
    }
  };

  const saveSpotlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotTitle) return;
    setSpotSaving(true);

    const payload = {
      title: spotTitle,
      video_url: spotVideoUrl || null,
      more_link: spotMoreLink || null,
      description: spotDescription || null,
    };

    if (spotlight) {
      await supabase.from("spotlight").update(payload).eq("id", spotlight.id);
    } else {
      await supabase.from("spotlight").insert(payload);
    }
    await fetchSpotlight();
    setSpotSaving(false);
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
          <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Spotlight management */}
        <form onSubmit={saveSpotlight} className="bg-primary/10 rounded-xl p-5 mb-8 space-y-3 border border-primary/20">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Star size={16} className="text-primary" /> Campaign In The Spotlight
          </h2>
          <input
            type="text"
            placeholder="Campaign title"
            value={spotTitle}
            onChange={(e) => setSpotTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            required
          />
          <input
            type="text"
            placeholder="Description/tag (optional)"
            value={spotDescription}
            onChange={(e) => setSpotDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <input
            type="url"
            placeholder="Video URL"
            value={spotVideoUrl}
            onChange={(e) => setSpotVideoUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <input
            type="url"
            placeholder="More link URL"
            value={spotMoreLink}
            onChange={(e) => setSpotMoreLink(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <button type="submit" disabled={spotSaving} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
            <Save size={14} /> {spotSaving ? "Saving..." : spotlight ? "Update Spotlight" : "Set Spotlight"}
          </button>
        </form>

        {/* Add campaign form */}
        <form onSubmit={addCampaign} className="bg-secondary/40 rounded-xl p-5 mb-8 space-y-3">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-1"><Plus size={16} /> Add Past Campaign</h2>
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
            placeholder="Video URL (optional)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <button type="submit" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
            Add Campaign
          </button>
        </form>

        {/* Campaign list */}
        <h2 className="font-bold text-sm mb-3">Past Campaigns ({campaigns.length})</h2>
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
