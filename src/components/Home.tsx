import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Target, 
  Zap, 
  Award, 
  Camera, 
  Cpu, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Layers,
  BarChart3,
  Smartphone,
  X,
  Settings,
  Facebook,
  Instagram,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-emerald-400 font-mono text-sm uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-emerald-500 mt-4"
    />
  </div>
);

// --- STATIC CONTENT CONFIGURATION ---
// You can easily add/rename images and titles here. 
// These will show up if the database is empty.
const STATIC_FALLBACK = {
  achievements: [
    { filename: "agnleads.PNG", title: "Orders Generation For Restaurant" },
    { filename: "bzleads.PNG", title: "Leads Generation For Real Estate" },
    { filename: "ceressales.png", title: "Sales For SkinCare Brands" },
    { filename: "xpcleads.png", title: "Leads Generation For Cleaning Company" },
    { filename: "ceresgoogle.png", title: "SkinCare Brand Traffic" },
    { filename: "ncgoogle.png", title: "Application Installs" },
  ],
  content: [
    { filename: "gfm.png", title: "Security Company Instagram" },
    { filename: "gfm1.jpg", title: "Post" },
    { filename: "gfm2.jpg", title: "Post" },
    { filename: "gfm3.jpg", title: "Post" },
    { filename: "agn.png", title: "Restaurant Instagram" },
    { filename: "agn1.jpg", title: "Post" },
    { filename: "agn2.jpg", title: "Post" },
    { filename: "agn3.jpg", title: "Post" },
    { filename: "nextchat.png", title: "Application Instagram" },
    { filename: "nextchat1.jpg", title: "Post" },
    { filename: "nextchat2.jpg", title: "Post" },
    { filename: "nextchat3.jpg", title: "Post" },
    { filename: "ss.png", title: "IT Solution Company Instagram" },
    { filename: "ss1.jpg", title: "Post" },
    { filename: "ss2.jpg", title: "Post" },
    { filename: "ss3.jpg", title: "Post" },
  ]
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{ url: string, title?: string } | null>(null);
  const [dynamicImages, setDynamicImages] = useState<any[]>([]);
  const [dynamicExperiences, setDynamicExperiences] = useState<any[]>([]);
  const [dynamicSkills, setDynamicSkills] = useState<any[]>([]);
  const [dynamicSettings, setDynamicSettings] = useState<any>({});
  const [achievementIndex, setAchievementIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    /*
    fetch("/api/images")
      .then(res => res.json())
      .then(data => setDynamicImages(data));
    
    fetch("/api/experience")
      .then(res => res.json())
      .then(data => setDynamicExperiences(data));

    fetch("/api/skills")
      .then(res => res.json())
      .then(data => setDynamicSkills(data));

    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setDynamicSettings(data));
    */

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImagesForSection = (section: string) => {
    const images = dynamicImages.filter(img => img.section === section);
    if (images.length > 0) return images;
    
    // Use fallback if no dynamic images exist
    if (section === "achievements") return STATIC_FALLBACK.achievements;
    if (section === "content") return STATIC_FALLBACK.content;
    return [];
  };

  const skills = [
    "Brand Management", 
    "Marketing Management", 
    "Content Development", 
    "Marketing Strategist", 
    "Digital Growth", 
    "Marketing Planning & Execution"
  ];

  const services = [
    {
      title: "Digital Growth Strategy",
      description: "End-to-end marketing strategies focused on brand growth, demand generation, and digital performance.",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Performance Marketing",
      description: "Expertise in Meta, Google, TikTok, and LinkedIn Ads with a focus on ROI and conversion tracking.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Content Creation",
      description: "High-impact visual storytelling, video production, and creative direction aligned with brand objectives.",
      icon: <Camera className="w-6 h-6" />
    },
    {
      title: "Brand Development",
      description: "Building and scaling brand presence across digital platforms while maintaining consistent brand identity.",
      icon: <Layers className="w-6 h-6" />
    }
  ];

  const experience = [
    {
      role: "Digital Marketing Manager",
      company: "Servionsoft IT Solution",
      period: "2022 – PRESENT",
      description: "Leading end-to-end marketing strategies across six diverse companies in the UK and Pakistan. Focus on brand growth, demand generation, and cross-industry positioning."
    },
    {
      role: "Creative Team Lead",
      company: "Darwaish Marketing Pvt. Ltd.",
      period: "2021 – 2022",
      description: "Managed a multidisciplinary creative team. Led content production from concept to post-production, including videography and photography."
    }
  ];

  const tools = {
    ads: ["Meta Ads", "Google Ads", "Apple Ads", "TikTok Ads", "Snapchat Ads", "LinkedIn Ads"],
    tracking: ["GA4", "Meta Pixel", "CRM Systems", "Funnel Tracking"],
    creative: ["Adobe Photoshop", "Figma", "Canva", "Wondershare Filmora"]
  };

  const projects = [
    {
      name: "StormBuddi (USA)",
      type: "CRM UI & Marketing Funnel Design",
      description: "Improved sales pipeline visibility and marketing automation performance."
    },
    {
      name: "Albatha Real Estate (UAE)",
      type: "Website UI for Lead Generation",
      description: "High-conversion website focused on premium brand positioning."
    },
    {
      name: "ThorStrength Fitness (USA)",
      type: "Mobile App UI for User Engagement",
      description: "Optimized onboarding and subscription flow for long-term engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b-0 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src={dynamicSettings.about_image ? `/images/${dynamicSettings.about_image}` : "/images/profile.png"} 
              alt="Logo" 
              className="w-10 h-10 object-cover rounded-full border border-emerald-500/30"
              referrerPolicy="no-referrer"
            />
            <div className="text-xl font-bold tracking-tighter text-emerald-400">ABDUL WASAY</div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-white/70">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
            <a href="#achievements" className="hover:text-emerald-400 transition-colors">Achievements</a>
            <a href="#content" className="hover:text-emerald-400 transition-colors">Content</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {getImagesForSection("hero").length > 0 ? (
            <img 
              src={`/images/${getImagesForSection("hero")[0].filename}`}
              alt="Hero" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img 
              src="/images/hero.jpg" 
              alt="Futuristic Marketing Analytics" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4">
              ABDUL <span className="text-emerald-500">WASAY</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto tracking-wide">
              Marketing Specialist & Content Creator with 5+ years of driving digital growth.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <a 
              href="#contact" 
              className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 inline-flex items-center group"
            >
              LET'S CONNECT
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-emerald-500 to-transparent" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* About Me */}
        <section id="about" className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <SectionHeading subtitle="THE VISIONARY">About Me</SectionHeading>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                {dynamicSettings.about_text || "I am a results-driven marketing professional with expertise in brand strategy, digital growth, and multi-industry management."}
              </p>
              
              <div className="pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 mb-4 font-bold">Brands I've Scaled</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm font-medium text-white/50">
                  <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500" /> GuardianFM (UK)</div>
                  <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500" /> Ceres Derma (UK)</div>
                  <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500" /> NextChat (AI)</div>
                  <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-2 text-emerald-500" /> Arabian Grill</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 glass p-2">
                <img 
                  src={dynamicSettings.about_image ? `/images/${dynamicSettings.about_image}` : "/images/profile.png"} 
                  alt="Abdul Wasay" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 glass rounded-full flex items-center justify-center border border-emerald-500/30 neon-glow">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services */}
        <section id="services">
          <SectionHeading subtitle="EXPERTISE">What I Can Do</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements">
          <SectionHeading subtitle="MILESTONES">My Achievements</SectionHeading>
          <div className="relative group">
            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: `-${achievementIndex * (100 / itemsPerView)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {getImagesForSection("achievements").map((img, idx) => (
                  <div key={idx} className="min-w-[calc(100%-18px)] md:min-w-[calc(50%-18px)] lg:min-w-[calc(25%-18px)] space-y-3">
                    <div 
                      className="relative aspect-video rounded-2xl overflow-hidden glass group/img cursor-pointer"
                      onClick={() => setSelectedImage({ url: `/images/${img.filename}`, title: img.title })}
                    >
                      <img 
                        src={`/images/${img.filename}`} 
                        alt={img.title || "Achievement"} 
                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-2">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{img.title || "Achievement"}</p>
                    </div>
                  </div>
                ))}
                {getImagesForSection("achievements").length === 0 && (
                  <div className="w-full py-20 glass rounded-3xl border border-dashed border-white/5 flex flex-col items-center justify-center text-white/20">
                    <Award className="w-12 h-12 mb-4 opacity-10" />
                    <p>No achievements uploaded yet</p>
                  </div>
                )}
              </motion.div>
            </div>

            {getImagesForSection("achievements").length > itemsPerView && (
              <>
                <button 
                  onClick={() => setAchievementIndex(prev => prev === 0 ? Math.max(0, getImagesForSection("achievements").length - itemsPerView) : prev - 1)}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setAchievementIndex(prev => prev >= getImagesForSection("achievements").length - itemsPerView ? 0 : prev + 1)}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* Content Creation */}
        <section id="content">
          <SectionHeading subtitle="VISUAL STORYTELLING">Content Creation</SectionHeading>
          <div className="relative group">
            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-4"
                animate={{ x: `-${contentIndex * (100 / itemsPerView)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {getImagesForSection("content").map((img, idx) => (
                  <div key={idx} className="min-w-[calc(100%-12px)] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-12px)] space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="aspect-square rounded-2xl overflow-hidden glass cursor-pointer group/img"
                      onClick={() => setSelectedImage({ url: `/images/${img.filename}`, title: img.title })}
                    >
                      <img 
                        src={`/images/${img.filename}`} 
                        alt={img.title || `Content ${idx}`} 
                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    {img.title && (
                      <div className="px-2">
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest text-center">
                          {img.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                {getImagesForSection("content").length === 0 && (
                  <div className="w-full py-20 glass rounded-3xl border border-dashed border-white/5 flex flex-col items-center justify-center text-white/20">
                    <Camera className="w-12 h-12 mb-4 opacity-10" />
                    <p>No content creation images yet</p>
                  </div>
                )}
              </motion.div>
            </div>

            {getImagesForSection("content").length > itemsPerView && (
              <>
                <button 
                  onClick={() => setContentIndex(prev => prev === 0 ? Math.max(0, getImagesForSection("content").length - itemsPerView) : prev - 1)}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setContentIndex(prev => prev >= getImagesForSection("content").length - itemsPerView ? 0 : prev + 1)}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionHeading subtitle="CORE COMPETENCIES">Skills</SectionHeading>
          <div className="flex flex-wrap gap-4">
            {dynamicSkills.length > 0 ? (
              dynamicSkills.map((skill, idx) => (
                <motion.span
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-6 py-3 glass rounded-full text-sm font-medium hover:border-emerald-500/50 transition-colors"
                >
                  {skill.name}
                </motion.span>
              ))
            ) : (
              skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-6 py-3 glass rounded-full text-sm font-medium hover:border-emerald-500/50 transition-colors"
                >
                  {skill}
                </motion.span>
              ))
            )}
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <SectionHeading subtitle="CAREER PATH">Experience</SectionHeading>
          <div className="space-y-12">
            {dynamicExperiences.length > 0 ? (
              dynamicExperiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-emerald-500 neon-glow" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{exp.role}</h3>
                      <p className="text-emerald-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-white/40 font-mono text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white/60 leading-relaxed max-w-4xl">{exp.description}</p>
                    {exp.details && (
                      <div className="text-white/50 text-sm leading-relaxed whitespace-pre-wrap max-w-4xl">
                        {exp.details}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-emerald-500 neon-glow" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.role}</h3>
                      <p className="text-emerald-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-white/40 font-mono text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-white/60 leading-relaxed max-w-3xl">{exp.description}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Tools & Platforms */}
        <section>
          <SectionHeading subtitle="TECH STACK">Tools & Platforms</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-emerald-500" />
                Ad Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.ads.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-md text-xs text-white/70">{tool}</span>
                ))}
              </div>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-emerald-500" />
                Tracking & Data
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.tracking.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-md text-xs text-white/70">{tool}</span>
                ))}
              </div>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-lg font-bold mb-6 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-emerald-500" />
                Design & Creative
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.creative.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 rounded-md text-xs text-white/70">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionHeading subtitle="ACADEMIC BACKGROUND">Education</SectionHeading>
          <div className="glass p-8 rounded-2xl flex items-start space-x-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Bachelor in Business Administration (BBA)</h3>
              <p className="text-white/60">Iqra University (North Campus)</p>
              <div className="flex items-center mt-2 text-sm font-mono text-emerald-400">
                <span>JAN 2026</span>
                <span className="mx-2">•</span>
                <span>GPA 2.8</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <SectionHeading subtitle="GET IN TOUCH">Contact Me</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-xl text-white/60">
                Ready to take your digital presence to the next level? Let's discuss how I can grow your brand together.
              </p>
              <div className="space-y-4">
                {dynamicSettings.email && (
                  <a href={`mailto:${dynamicSettings.email}`} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{dynamicSettings.email}</span>
                  </a>
                )}
                {(dynamicSettings.phone1 || dynamicSettings.phone2) && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      {dynamicSettings.phone1 && <span className="text-lg">{dynamicSettings.phone1}</span>}
                      {dynamicSettings.phone2 && <span className="text-lg">{dynamicSettings.phone2}</span>}
                    </div>
                  </div>
                )}
                {dynamicSettings.linkedin && (
                  <a href={dynamicSettings.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="text-lg">LinkedIn Profile</span>
                  </a>
                )}
                {dynamicSettings.facebook && (
                  <a href={dynamicSettings.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Facebook Profile</span>
                  </a>
                )}
                {dynamicSettings.instagram && (
                  <a href={dynamicSettings.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Instagram Profile</span>
                  </a>
                )}
                {dynamicSettings.whatsapp && (
                  <a href={`https://wa.me/${dynamicSettings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-lg">WhatsApp Me</span>
                  </a>
                )}
              </div>
            </div>
            
            <form className="glass p-8 rounded-2xl space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message! I will get back to you soon.");
            }}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="How can I help you?" required />
              </div>
              <button type="submit" className="w-full py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-sm relative">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ChevronRight className="-rotate-90 w-5 h-5" />
        </motion.button>
        <p>© {new Date().getFullYear()} Abdul Wasay. All rights reserved.</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em]">Crafted for the future</p>
        
        {/* <div className="mt-8">
          <Link 
            to="/login" 
            className="inline-flex items-center space-x-2 text-white/20 hover:text-emerald-500 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
        </div> */}
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:text-emerald-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <div className="relative flex flex-col items-center max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                src={selectedImage.url}
                alt={selectedImage.title || "Full size"}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              {selectedImage.title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{selectedImage.title}</h3>
                  <div className="h-1 w-12 bg-emerald-500 mx-auto mt-3 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
