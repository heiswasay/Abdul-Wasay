import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  Trash2, 
  LogOut, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  ArrowLeft,
  Briefcase,
  Edit2,
  Save,
  X as CloseIcon,
  Tag,
  Settings as SettingsIcon,
  Facebook,
  Instagram,
  Linkedin as LinkedinIcon,
  MessageCircle,
  Mail as MailIcon,
  Phone as PhoneIcon,
  User as UserIcon
} from "lucide-react";

export default function AdminPortal() {
  const [images, setImages] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"images" | "experience" | "skills" | "settings" | "about">("images");
  
  // Image state
  const [selectedSection, setSelectedSection] = useState("hero");
  const [title, setTitle] = useState("");
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  
  // Experience state
  const [expForm, setExpForm] = useState({
    id: null as number | null,
    role: "",
    company: "",
    period: "",
    description: "",
    details: ""
  });
  const [isEditingExp, setIsEditingExp] = useState(false);

  // Skill state
  const [newSkill, setNewSkill] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchImages();
    fetchExperiences();
    fetchSkills();
    fetchSettings();
  }, []);

  const fetchImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
  };

  const fetchExperiences = async () => {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setExperiences(data);
  };

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
  };

  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data);
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setMessage({ type: "success", text: "Settings updated successfully!" });
    } else {
      setMessage({ type: "error", text: "Failed to update settings." });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkill.trim() }),
    });

    if (res.ok) {
      setNewSkill("");
      fetchSkills();
      setMessage({ type: "success", text: "Skill added!" });
    } else {
      setMessage({ type: "error", text: "Skill already exists." });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteSkill = async (id: number) => {
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) fetchSkills();
  };

  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = expForm.id ? "PUT" : "POST";
    const url = expForm.id ? `/api/experience/${expForm.id}` : "/api/experience";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expForm),
    });

    if (res.ok) {
      setMessage({ type: "success", text: expForm.id ? "Experience updated!" : "Experience added!" });
      setExpForm({ id: null, role: "", company: "", period: "", description: "", details: "" });
      setIsEditingExp(false);
      fetchExperiences();
    } else {
      setMessage({ type: "error", text: "Operation failed." });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteExp = async (id: number) => {
    if (!confirm("Delete this experience?")) return;
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (res.ok) fetchExperiences();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("section", selectedSection);
    formData.append("title", title);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Image uploaded successfully!" });
        setTitle("");
        fetchImages();
      } else {
        setMessage({ type: "error", text: "Upload failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleUpdateTitle = async (id: number) => {
    console.log(`Sending title update for ${id}: ${newTitle}`);
    const res = await fetch(`/api/images/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    if (res.ok) {
      console.log("Title updated successfully");
      setEditingTitleId(null);
      fetchImages();
    } else {
      console.error("Failed to update title");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    console.log(`Deleting image ${id}`);
    const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
    if (res.ok) {
      console.log("Image deleted successfully");
      fetchImages();
    } else {
      console.error("Failed to delete image");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/");
  };

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "achievements", name: "Achievements" },
    { id: "content", name: "Content Creation" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/")}
              className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-emerald-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Back Portal</h1>
              <p className="text-white/50">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex glass p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab("images")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "images" ? "bg-emerald-500 text-black" : "text-white/40 hover:text-white"}`}
              >
                IMAGES
              </button>
              <button 
                onClick={() => setActiveTab("experience")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "experience" ? "bg-emerald-500 text-black" : "text-white/40 hover:text-white"}`}
              >
                EXPERIENCE
              </button>
              <button 
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "skills" ? "bg-emerald-500 text-black" : "text-white/40 hover:text-white"}`}
              >
                SKILLS
              </button>
              <button 
                onClick={() => setActiveTab("about")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "about" ? "bg-emerald-500 text-black" : "text-white/40 hover:text-white"}`}
              >
                ABOUT ME
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "settings" ? "bg-emerald-500 text-black" : "text-white/40 hover:text-white"}`}
              >
                SETTINGS
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 glass rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-sm font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </header>

        {activeTab === "images" ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Upload Section */}
            <div className="lg:col-span-1 space-y-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-emerald-500" />
                  Upload New Image
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Select Section</label>
                    <div className="grid grid-cols-1 gap-2">
                      {sections.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSection(s.id)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between ${
                            selectedSection === s.id 
                              ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                              : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {s.name}
                          {selectedSection === s.id && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedSection !== "hero" && (
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Image Title</label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" 
                        placeholder="Enter a title for this image..." 
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <input 
                      type="file" 
                      onChange={handleUpload}
                      disabled={uploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                      accept="image/*"
                    />
                    <div className={`w-full py-12 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                      uploading ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5"
                    }`}>
                      {uploading ? (
                        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4" />
                      ) : (
                        <Plus className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                      )}
                      <p className="text-sm font-bold">{uploading ? "UPLOADING..." : "CLICK TO UPLOAD"}</p>
                      <p className="text-xs text-white/30 mt-2">JPG, PNG or GIF</p>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-6 p-4 rounded-xl flex items-center space-x-3 text-sm ${
                        message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{message.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="lg:col-span-2 space-y-12">
              {sections.map(section => (
                <div key={section.id} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight flex items-center">
                      <ImageIcon className="w-6 h-6 mr-3 text-emerald-500" />
                      {section.name}
                    </h3>
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
                      {images.filter(img => img.section === section.id).length} IMAGES
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {images.filter(img => img.section === section.id).map(img => (
                      <motion.div 
                        key={img.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group rounded-2xl overflow-hidden glass border border-white/10 flex flex-col"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img 
                            src={`/images/${img.filename}`} 
                            alt="Gallery" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => handleDelete(img.id)}
                              className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-xl"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        {section.id !== "hero" && (
                          <div className="p-3 bg-white/5">
                            {editingTitleId === img.id ? (
                              <div className="flex flex-col gap-2">
                                <input 
                                  type="text"
                                  value={newTitle}
                                  onChange={(e) => setNewTitle(e.target.value)}
                                  className="w-full bg-black/50 border border-emerald-500/50 rounded px-2 py-1 text-xs focus:outline-none"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => handleUpdateTitle(img.id)}
                                    className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400"
                                  >
                                    SAVE
                                  </button>
                                  <button 
                                    onClick={() => setEditingTitleId(null)}
                                    className="text-[10px] font-bold text-white/30 hover:text-white/50"
                                  >
                                    CANCEL
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className="cursor-pointer group/title"
                                onClick={() => {
                                  setEditingTitleId(img.id);
                                  setNewTitle(img.title || "");
                                }}
                              >
                                <p className="text-xs text-white/70 truncate">
                                  {img.title || "No title set"}
                                </p>
                                <p className="text-[10px] text-emerald-500/0 group-hover/title:text-emerald-500/50 transition-all">
                                  Click to edit
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {images.filter(img => img.section === section.id).length === 0 && (
                      <div className="col-span-full py-12 glass rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center text-white/20">
                        <ImageIcon className="w-12 h-12 mb-4 opacity-10" />
                        <p className="text-sm">No images in this section</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "experience" ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Experience Form */}
            <div className="lg:col-span-1 space-y-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-emerald-500" />
                  {expForm.id ? "Edit Experience" : "Add Experience"}
                </h2>
                
                <form onSubmit={handleExpSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Role</label>
                    <input 
                      type="text" 
                      value={expForm.role}
                      onChange={(e) => setExpForm({...expForm, role: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                      placeholder="DIGITAL MARKETING MANAGER" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Company</label>
                    <input 
                      type="text" 
                      value={expForm.company}
                      onChange={(e) => setExpForm({...expForm, company: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                      placeholder="Servionsoft IT Solution" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Period</label>
                    <input 
                      type="text" 
                      value={expForm.period}
                      onChange={(e) => setExpForm({...expForm, period: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                      placeholder="2022 – PRESENT" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Description</label>
                    <textarea 
                      rows={3}
                      value={expForm.description}
                      onChange={(e) => setExpForm({...expForm, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                      placeholder="Brief overview of your role..." 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Details (Bullet Points)</label>
                    <textarea 
                      rows={6}
                      value={expForm.details}
                      onChange={(e) => setExpForm({...expForm, details: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm font-mono" 
                      placeholder="Key Responsibilities & Achievements:&#10;• Point 1&#10;• Point 2" 
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center text-sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {expForm.id ? "UPDATE" : "SAVE"}
                    </button>
                    {expForm.id && (
                      <button 
                        type="button"
                        onClick={() => setExpForm({ id: null, role: "", company: "", period: "", description: "", details: "" })}
                        className="px-4 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-6 p-4 rounded-xl flex items-center space-x-3 text-sm ${
                        message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{message.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Experience List */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Current Experience</h3>
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="glass p-6 rounded-2xl border border-white/10 flex justify-between items-start group">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-bold text-emerald-400">{exp.role}</h4>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{exp.period}</span>
                      </div>
                      <p className="text-sm font-medium text-white/70">{exp.company}</p>
                      <p className="text-xs text-white/40 line-clamp-2 max-w-xl">{exp.description}</p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setExpForm(exp)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteExp(exp.id)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && (
                  <div className="py-12 glass rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center text-white/20">
                    <Briefcase className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-sm">No experience entries yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === "skills" ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Skills Form */}
            <div className="lg:col-span-1 space-y-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-emerald-500" />
                  Add New Skill
                </h2>
                
                <form onSubmit={handleAddSkill} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Skill Name</label>
                    <input 
                      type="text" 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                      placeholder="e.g. Brand Management" 
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    ADD SKILL
                  </button>
                </form>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-6 p-4 rounded-xl flex items-center space-x-3 text-sm ${
                        message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{message.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Skills List */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Current Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                  <div 
                    key={skill.id} 
                    className="glass px-6 py-3 rounded-full border border-white/10 flex items-center space-x-3 group hover:border-emerald-500/50 transition-all"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {skills.length === 0 && (
                  <div className="w-full py-12 glass rounded-2xl border border-dashed border-white/5 flex flex-col items-center justify-center text-white/20">
                    <Tag className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-sm">No skills added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === "about" ? (
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <UserIcon className="w-6 h-6 mr-3 text-emerald-500" />
                About Me Section
              </h2>
              
              <form onSubmit={handleSettingsSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">About Me Paragraph</label>
                    <textarea 
                      rows={8}
                      value={settings.about_text || ""}
                      onChange={(e) => setSettings({...settings, about_text: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm leading-relaxed" 
                      placeholder="Tell your story..." 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Profile Image</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.filter(img => img.section === "hero" || img.section === "about").map(img => (
                        <div 
                          key={img.id}
                          onClick={() => setSettings({...settings, about_image: img.filename})}
                          className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                            settings.about_image === img.filename ? "border-emerald-500 scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        >
                          <img 
                            src={`/images/${img.filename}`} 
                            alt="Option" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {settings.about_image === img.filename && (
                            <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-white/30 italic">Upload images in the "Images" tab under "Hero" or "About" section to select them here.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    UPDATE ABOUT ME
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl flex items-center space-x-3 text-sm ${
                      message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <SettingsIcon className="w-6 h-6 mr-3 text-emerald-500" />
                Website Settings
              </h2>
              
              <form onSubmit={handleSettingsSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 flex items-center">
                      <MailIcon className="w-4 h-4 mr-2" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Primary Email</label>
                        <input 
                          type="email" 
                          value={settings.email || ""}
                          onChange={(e) => setSettings({...settings, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="your@email.com" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Phone Number 1</label>
                        <input 
                          type="text" 
                          value={settings.phone1 || ""}
                          onChange={(e) => setSettings({...settings, phone1: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="03411236082" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Phone Number 2</label>
                        <input 
                          type="text" 
                          value={settings.phone2 || ""}
                          onChange={(e) => setSettings({...settings, phone2: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="03102454778" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Social Media Links
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 flex items-center">
                          <LinkedinIcon className="w-3 h-3 mr-1" /> LinkedIn URL
                        </label>
                        <input 
                          type="text" 
                          value={settings.linkedin || ""}
                          onChange={(e) => setSettings({...settings, linkedin: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="https://linkedin.com/in/..." 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 flex items-center">
                          <Facebook className="w-3 h-3 mr-1" /> Facebook URL
                        </label>
                        <input 
                          type="text" 
                          value={settings.facebook || ""}
                          onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="https://facebook.com/..." 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 flex items-center">
                          <Instagram className="w-3 h-3 mr-1" /> Instagram URL
                        </label>
                        <input 
                          type="text" 
                          value={settings.instagram || ""}
                          onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="https://instagram.com/..." 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp Number
                        </label>
                        <input 
                          type="text" 
                          value={settings.whatsapp || ""}
                          onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-sm" 
                          placeholder="e.g. 923102454778" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    SAVE ALL SETTINGS
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl flex items-center space-x-3 text-sm ${
                      message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
