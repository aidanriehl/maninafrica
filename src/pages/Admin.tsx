import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, LogOut, Star, Save, Upload, Pencil, X } from "lucide-react";

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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Spotlight state - now supports multiple
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [spotTitle, setSpotTitle] = useState("");
  const [spotVideoFile, setSpotVideoFile] = useState<File | null>(null);
  const [spotMoreLink, setSpotMoreLink] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spotSaving, setSpotSaving] = useState(false);
  const [editingSpotlight, setEditingSpotlight] = useState<Spotlight | null>(null);

  useEffect(() => {
    checkAuth();
    fetchCampaigns();
    fetchSpotlights();
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

  const fetchSpotlights = async () => {
    const { data } = await supabase.from("spotlight").select("*").order("created_at", { ascending: false });
    setSpotlights(data || []);
  };

  const uploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const saveSpotlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotTitle) return;
    setSpotSaving(true);

    let videoUrl = editingSpotlight?.video_url || null;

    if (spotVideoFile) {
      const uploadedUrl = await uploadFile(spotVideoFile, "videos", "spotlight");
      if (uploadedUrl) videoUrl = uploadedUrl;
    }

    const payload = {
      title: spotTitle,
      video_url: videoUrl,
      more_link: spotMoreLink || null,
      description: spotDescription || null,
    };

    if (editingSpotlight) {
      await supabase.from("spotlight").update(payload).eq("id", editingSpotlight.id);
    } else {
      await supabase.from("spotlight").insert(payload);
    }

    clearSpotlightForm();
    setSpotSaving(false);
    fetchSpotlights();
  };

  const startEditSpotlight = (s: Spotlight) => {
    setEditingSpotlight(s);
    setSpotTitle(s.title);
    setSpotDescription(s.description || "");
    setSpotMoreLink(s.more_link || "");
    setSpotVideoFile(null);
  };

  const clearSpotlightForm = () => {
    setEditingSpotlight(null);
    setSpotTitle("");
    setSpotVideoFile(null);
    setSpotMoreLink("");
    setSpotDescription("");
  };

  const deleteSpotlight = async (id: string) => {
    await supabase.from("spotlight").delete().eq("id", id);
    if (editingSpotlight?.id === id) {
      clearSpotlightForm();
    }
    fetchSpotlights();
  };

  const addCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !thumbnailFile) return;
    setUploading(true);

    const thumbnailUrl = await uploadFile(thumbnailFile, "images", "thumbnails");
    if (!thumbnailUrl) {
      setUploading(false);
      return;
    }

    let videoUrl = null;
    if (videoFile) {
      videoUrl = await uploadFile(videoFile, "videos", "campaigns");
    }

    await supabase.from("campaigns").insert({
      title,
      thumbnail_url: thumbnailUrl,
      video_url: videoUrl
    });

    setTitle("");
    setThumbnailFile(null);
    setVideoFile(null);
    setUploading(false);
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

        {/* Add/Edit Spotlight form */}
        <form onSubmit={saveSpotlight} className="bg-primary/10 rounded-xl p-5 mb-8 space-y-3 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-sm flex items-center gap-2">
              <Star size={16} className="text-primary" /> {editingSpotlight ? "Edit Spotlight Campaign" : "Add Spotlight Campaign"}
            </h2>
            {editingSpotlight && (
              <button type="button" onClick={clearSpotlightForm} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <X size={14} /> Cancel
              </button>
            )}
          </div>
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
          <div className="space-y-1">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
              <Upload size={16} />
              <span>{spotVideoFile ? spotVideoFile.name : "Upload video"}</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setSpotVideoFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            {editingSpotlight?.video_url && !spotVideoFile && (
              <p className="text-xs text-muted-foreground px-1">Current video uploaded</p>
            )}
          </div>
          <input
            type="url"
            placeholder="More link URL (optional)"
            value={spotMoreLink}
            onChange={(e) => setSpotMoreLink(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <button type="submit" disabled={spotSaving} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
            {editingSpotlight ? (
              <><Save size={14} /> {spotSaving ? "Saving..." : "Update Spotlight"}</>
            ) : (
              <><Plus size={14} /> {spotSaving ? "Adding..." : "Add Spotlight"}</>
            )}
          </button>
        </form>

        {/* Spotlight list */}
        <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Star size={14} className="text-primary" /> Spotlight Campaigns ({spotlights.length})
        </h2>
        {spotlights.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center mb-8">No spotlight campaigns yet. Add your first one above.</p>
        ) : (
          <div className="space-y-3 mb-8">
            {spotlights.map((s) => (
              <div key={s.id} className={`flex items-center gap-3 bg-primary/10 rounded-xl p-3 border ${editingSpotlight?.id === s.id ? 'border-primary' : 'border-primary/20'}`}>
                <div className="w-12 h-16 rounded-lg bg-black flex items-center justify-center text-white text-xs">
                  {s.video_url ? "📹" : "—"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{s.title}</p>
                  {s.description && <p className="text-xs text-muted-foreground truncate">{s.description}</p>}
                </div>
                <button onClick={() => startEditSpotlight(s)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => deleteSpotlight(s.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

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
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
            <Upload size={16} />
            <span>{thumbnailFile ? thumbnailFile.name : "Upload thumbnail image *"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              className="hidden"
              required
            />
          </label>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
            <Upload size={16} />
            <span>{videoFile ? videoFile.name : "Upload video (optional)"}</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          <button type="submit" disabled={uploading} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
            {uploading ? "Uploading..." : "Add Campaign"}
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
                  {c.video_url && <p className="text-xs text-muted-foreground">Video uploaded</p>}
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
