import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, LogOut, Star, Save, Upload, Pencil, X, GripVertical, Settings, GraduationCap } from "lucide-react";

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
  const [donateLink, setDonateLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Spotlight state - now supports multiple
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [spotTitle, setSpotTitle] = useState("");
  const [spotThumbnailFile, setSpotThumbnailFile] = useState<File | null>(null);
  const [spotVideoFile, setSpotVideoFile] = useState<File | null>(null);
  const [spotDescription, setSpotDescription] = useState("");
  const [spotDonateLink, setSpotDonateLink] = useState("");
  const [spotSaving, setSpotSaving] = useState(false);
  const [draggedSpotlight, setDraggedSpotlight] = useState<string | null>(null);

  // Inline edit state for spotlight
  const [editingSpotlightId, setEditingSpotlightId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDonateLink, setEditDonateLink] = useState("");
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  // Inline edit state for campaigns
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [editCampaignTitle, setEditCampaignTitle] = useState("");
  const [editCampaignThumbnailFile, setEditCampaignThumbnailFile] = useState<File | null>(null);
  const [editCampaignVideoFile, setEditCampaignVideoFile] = useState<File | null>(null);
  const [editCampaignSaving, setEditCampaignSaving] = useState(false);

  // Site settings
  const [fundUrl, setFundUrl] = useState("");

  useEffect(() => {
    checkAuth();
    fetchCampaigns();
    fetchSpotlights();
    // Load site settings from localStorage
    const savedFundUrl = localStorage.getItem("fundDonateUrl");
    if (savedFundUrl) setFundUrl(savedFundUrl);
  }, []);

  const saveFundUrl = () => {
    localStorage.setItem("fundDonateUrl", fundUrl);
    alert("Fund URL saved!");
  };

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

  const addSpotlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotTitle) return;
    setSpotSaving(true);

    let thumbnailUrl = null;
    let videoUrl = null;

    if (spotThumbnailFile) {
      const uploadedUrl = await uploadFile(spotThumbnailFile, "images", "spotlight");
      if (uploadedUrl) thumbnailUrl = uploadedUrl;
    }

    if (spotVideoFile) {
      const uploadedUrl = await uploadFile(spotVideoFile, "videos", "spotlight");
      if (uploadedUrl) videoUrl = uploadedUrl;
    }

    await supabase.from("spotlight").insert({
      title: spotTitle,
      thumbnail_url: thumbnailUrl,
      video_url: videoUrl,
      description: spotDescription || null,
      more_link: spotDonateLink || null,
    });

    setSpotTitle("");
    setSpotThumbnailFile(null);
    setSpotVideoFile(null);
    setSpotDescription("");
    setSpotDonateLink("");
    setSpotSaving(false);
    fetchSpotlights();
  };

  const startEditSpotlight = (s: Spotlight) => {
    setEditingSpotlightId(s.id);
    setEditTitle(s.title);
    setEditDescription(s.description || "");
    setEditDonateLink(s.more_link || "");
    setEditVideoFile(null);
  };

  const cancelEdit = () => {
    setEditingSpotlightId(null);
    setEditTitle("");
    setEditDescription("");
    setEditDonateLink("");
    setEditVideoFile(null);
  };

  const saveEditSpotlight = async (e: React.FormEvent, spotlight: Spotlight) => {
    e.preventDefault();
    if (!editTitle) return;
    setEditSaving(true);

    let videoUrl = spotlight.video_url;

    if (editVideoFile) {
      const uploadedUrl = await uploadFile(editVideoFile, "videos", "spotlight");
      if (uploadedUrl) videoUrl = uploadedUrl;
    }

    await supabase.from("spotlight").update({
      title: editTitle,
      video_url: videoUrl,
      description: editDescription || null,
      more_link: editDonateLink || null,
    }).eq("id", spotlight.id);

    cancelEdit();
    setEditSaving(false);
    fetchSpotlights();
  };

  const deleteSpotlight = async (id: string) => {
    await supabase.from("spotlight").delete().eq("id", id);
    if (editingSpotlightId === id) {
      cancelEdit();
    }
    fetchSpotlights();
  };

  const graduateSpotlight = async (spotlight: Spotlight) => {
    // Move spotlight to past campaigns
    // Use video thumbnail or a placeholder for thumbnail_url
    const thumbnailUrl = spotlight.video_url
      ? spotlight.video_url
      : "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop";

    await supabase.from("campaigns").insert({
      title: spotlight.title,
      thumbnail_url: thumbnailUrl,
      video_url: spotlight.video_url,
    });

    // Delete from spotlight
    await supabase.from("spotlight").delete().eq("id", spotlight.id);

    if (editingSpotlightId === spotlight.id) {
      cancelEdit();
    }

    fetchSpotlights();
    fetchCampaigns();
  };

  const handleDragStart = (id: string) => {
    setDraggedSpotlight(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetId: string) => {
    if (!draggedSpotlight || draggedSpotlight === targetId) {
      setDraggedSpotlight(null);
      return;
    }

    const draggedIndex = spotlights.findIndex(s => s.id === draggedSpotlight);
    const targetIndex = spotlights.findIndex(s => s.id === targetId);

    const newSpotlights = [...spotlights];
    const [removed] = newSpotlights.splice(draggedIndex, 1);
    newSpotlights.splice(targetIndex, 0, removed);

    setSpotlights(newSpotlights);
    setDraggedSpotlight(null);

    // Update order in database by setting new created_at timestamps
    const now = Date.now();
    for (let i = 0; i < newSpotlights.length; i++) {
      const newDate = new Date(now - i * 1000).toISOString();
      await supabase.from("spotlight").update({ created_at: newDate }).eq("id", newSpotlights[i].id);
    }
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
      video_url: videoUrl,
      more_link: donateLink || null,
    });

    setTitle("");
    setThumbnailFile(null);
    setVideoFile(null);
    setDonateLink("");
    setUploading(false);
    fetchCampaigns();
  };

  const deleteCampaign = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    if (editingCampaignId === id) {
      cancelEditCampaign();
    }
    fetchCampaigns();
  };

  const startEditCampaign = (c: Campaign) => {
    setEditingCampaignId(c.id);
    setEditCampaignTitle(c.title);
    setEditCampaignThumbnailFile(null);
    setEditCampaignVideoFile(null);
  };

  const cancelEditCampaign = () => {
    setEditingCampaignId(null);
    setEditCampaignTitle("");
    setEditCampaignThumbnailFile(null);
    setEditCampaignVideoFile(null);
  };

  const saveEditCampaign = async (e: React.FormEvent, campaign: Campaign) => {
    e.preventDefault();
    if (!editCampaignTitle) return;
    setEditCampaignSaving(true);

    let thumbnailUrl = campaign.thumbnail_url;
    let videoUrl = campaign.video_url;

    if (editCampaignThumbnailFile) {
      const uploadedUrl = await uploadFile(editCampaignThumbnailFile, "images", "thumbnails");
      if (uploadedUrl) thumbnailUrl = uploadedUrl;
    }

    if (editCampaignVideoFile) {
      const uploadedUrl = await uploadFile(editCampaignVideoFile, "videos", "campaigns");
      if (uploadedUrl) videoUrl = uploadedUrl;
    }

    await supabase.from("campaigns").update({
      title: editCampaignTitle,
      thumbnail_url: thumbnailUrl,
      video_url: videoUrl,
    }).eq("id", campaign.id);

    cancelEditCampaign();
    setEditCampaignSaving(false);
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

        {/* Add Spotlight form */}
        <form onSubmit={addSpotlight} className="bg-[#efc738]/20 rounded-xl p-5 mb-8 space-y-3 border border-[#efc738]/40">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-2 text-amber-700">
            <Star size={16} className="text-amber-600" /> Add Spotlight Campaign
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
            placeholder="Cause category"
            value={spotDescription}
            onChange={(e) => setSpotDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <input
            type="url"
            placeholder="Donation link"
            value={spotDonateLink}
            onChange={(e) => setSpotDonateLink(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
            <Upload size={16} />
            <span>{spotThumbnailFile ? spotThumbnailFile.name : "Upload thumbnail image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSpotThumbnailFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
            <Upload size={16} />
            <span>{spotVideoFile ? spotVideoFile.name : "Upload video (optional)"}</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setSpotVideoFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          <button type="submit" disabled={spotSaving} className="px-5 py-2.5 bg-[#efc738] text-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
            <Plus size={14} /> {spotSaving ? "Adding..." : "Add Spotlight"}
          </button>
        </form>

        {/* Spotlight list */}
        <h2 className="font-bold text-sm mb-3 flex items-center gap-2 text-amber-700">
          <Star size={14} className="text-amber-600" /> Spotlight Campaigns ({spotlights.length})
        </h2>
        {spotlights.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center mb-8">No spotlight campaigns yet. Add your first one above.</p>
        ) : (
          <div className="space-y-3 mb-8">
            {spotlights.map((s) => (
              <div key={s.id}>
                <div
                  draggable={editingSpotlightId !== s.id}
                  onDragStart={() => handleDragStart(s.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(s.id)}
                  className={`flex items-center gap-3 bg-[#efc738]/20 rounded-xl p-3 border ${editingSpotlightId === s.id ? 'border-[#efc738] rounded-b-none' : 'border-[#efc738]/40'} ${draggedSpotlight === s.id ? 'opacity-50' : ''}`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                    <GripVertical size={18} />
                  </div>
                  <div className="w-12 h-16 rounded-lg bg-black flex items-center justify-center text-white text-xs">
                    {s.video_url ? "📹" : "—"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{s.title}</p>
                    {s.description && <p className="text-xs text-muted-foreground truncate">{s.description}</p>}
                  </div>
                  <button onClick={() => editingSpotlightId === s.id ? cancelEdit() : startEditSpotlight(s)} className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors" title="Edit">
                    {editingSpotlightId === s.id ? <X size={16} /> : <Pencil size={16} />}
                  </button>
                  <button onClick={() => graduateSpotlight(s)} className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors" title="Graduate to Past Campaign">
                    <GraduationCap size={16} />
                  </button>
                  <button onClick={() => deleteSpotlight(s.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Inline edit form */}
                {editingSpotlightId === s.id && (
                  <form onSubmit={(e) => saveEditSpotlight(e, s)} className="bg-[#efc738]/10 rounded-b-xl p-4 space-y-3 border border-t-0 border-[#efc738]">
                    <input
                      type="text"
                      placeholder="Campaign title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Cause category"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
                    />
                    <input
                      type="url"
                      placeholder="Donation link"
                      value={editDonateLink}
                      onChange={(e) => setEditDonateLink(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
                    />
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
                        <Upload size={16} />
                        <span>{editVideoFile ? editVideoFile.name : "Upload new video"}</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setEditVideoFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                      {s.video_url && !editVideoFile && (
                        <p className="text-xs text-muted-foreground px-1">Current video uploaded</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={editSaving} className="px-5 py-2.5 bg-[#efc738] text-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
                        <Save size={14} /> {editSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button type="button" onClick={cancelEdit} className="px-5 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add campaign form */}
        <form onSubmit={addCampaign} className="bg-primary/10 rounded-xl p-5 mb-8 space-y-3 border border-primary/20">
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
            placeholder="Donation link"
            value={donateLink}
            onChange={(e) => setDonateLink(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
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
          <p className="text-muted-foreground text-sm text-center mb-8">No campaigns yet. Add your first one above.</p>
        ) : (
          <div className="space-y-3 mb-8">
            {campaigns.map((c) => (
              <div key={c.id}>
                <div className={`flex items-center gap-3 bg-primary/10 rounded-xl p-3 border ${editingCampaignId === c.id ? 'border-primary rounded-b-none' : 'border-primary/20'}`}>
                  <img src={c.thumbnail_url} alt={c.title} className="w-12 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{c.title}</p>
                    {c.video_url && <p className="text-xs text-muted-foreground">Video uploaded</p>}
                  </div>
                  <button onClick={() => editingCampaignId === c.id ? cancelEditCampaign() : startEditCampaign(c)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                    {editingCampaignId === c.id ? <X size={16} /> : <Pencil size={16} />}
                  </button>
                  <button onClick={() => deleteCampaign(c.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Inline edit form */}
                {editingCampaignId === c.id && (
                  <form onSubmit={(e) => saveEditCampaign(e, c)} className="bg-primary/5 rounded-b-xl p-4 space-y-3 border border-t-0 border-primary">
                    <input
                      type="text"
                      placeholder="Campaign title"
                      value={editCampaignTitle}
                      onChange={(e) => setEditCampaignTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
                      required
                    />
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
                        <Upload size={16} />
                        <span>{editCampaignThumbnailFile ? editCampaignThumbnailFile.name : "Upload new thumbnail"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setEditCampaignThumbnailFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                      {!editCampaignThumbnailFile && (
                        <p className="text-xs text-muted-foreground px-1">Current thumbnail uploaded</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-sm cursor-pointer hover:bg-secondary/20">
                        <Upload size={16} />
                        <span>{editCampaignVideoFile ? editCampaignVideoFile.name : "Upload new video"}</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setEditCampaignVideoFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                      {c.video_url && !editCampaignVideoFile && (
                        <p className="text-xs text-muted-foreground px-1">Current video uploaded</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={editCampaignSaving} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
                        <Save size={14} /> {editCampaignSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button type="button" onClick={cancelEditCampaign} className="px-5 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Site Settings */}
        <div className="bg-secondary/40 rounded-xl p-5 space-y-3">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Settings size={16} /> Site Settings
          </h2>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">"Donate to Our Fund" Button URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://gofundme.com/..."
                value={fundUrl}
                onChange={(e) => setFundUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
              />
              <button
                type="button"
                onClick={saveFundUrl}
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
