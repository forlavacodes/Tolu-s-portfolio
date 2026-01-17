import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Linkedin, 
  Mail, 
  Briefcase, 
  Code, 
  Camera, 
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  Send,
  User,
  MessageSquare,
  Layout,
  Zap,
  Github,
  Check,
  AlertCircle,
  Loader2,
  GraduationCap,
  FileText,
  Upload,
  Trash2,
  Lock,
  Download,
  ExternalLink,
  Globe,
  Settings,
  ShieldCheck,
  Key
} from 'lucide-react';

// --- Configuration ---
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'eDHCc5whGZYtNivpf',
  SERVICE_ID: 'service_qeas4re',
  TEMPLATE_ID: 'template_y631qrv',
};

const WHATSAPP_NUMBER = "2347071279950"; 
const WHATSAPP_MESSAGE = "Hello Toluwanimi, My name is __________, I came across your portfolio website online and I would love to work with you. Please respond to me as soon as possible. Thank you!";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// --- Types ---
type View = 'home' | 'resume';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  link: string;
  tags: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

// --- Data ---
const experiences: Experience[] = [
  {
    company: "Genpay",
    role: "Lead UI/UX & Frontend",
    period: "2024 — Present",
    link: "https://www.genpay.ng",
    tags: ["Fintech", "Design Systems", "TypeScript", "React"],
    description: [
      "Architected the visual identity and user interface from the ground up, focusing on transactional clarity and accessibility.",
      "Engineered high-performance React components reducing development overhead by 40%.",
      "Powering meaningful experiences through technology, trust, and vibrant human connection."
    ]
  },
  {
    company: "X Republik",
    role: "Product Designer & Engineer",
    period: "2023",
    link: "https://x-republik.vercel.app",
    tags: ["Events", "Showcase", "Brand Identity"],
    description: [
      "Crafted a high-fidelity digital experience capturing cultural essence through immersive visual design.",
      "Focused on information architecture and seamless navigation to guide users through talent and ethos.",
      "Storytelling-first event platform for modern brands."
    ]
  },
  {
    company: "Marvex",
    role: "Frontend Developer",
    period: "2023",
    link: "https://marvex-black.vercel.app",
    tags: ["Logistics", "Payments", "B2B", "Infrastructure"],
    description: [
      "Bridging the digital and physical divide by creating a unified standard for African commerce.",
      "Developed high-performance dashboard interfaces for complex marketplace analytics and inventory systems.",
      "Focused on cross-border logistics and payment infrastructure."
    ]
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Product Design",
    icon: <Layout size={24} />,
    color: "bg-blue-600/10 text-blue-500",
    skills: ["Figma", "Design Systems", "Framer", "Prototyping", "UX Research"]
  },
  {
    title: "Engineering",
    icon: <Code size={24} />,
    color: "bg-purple-600/10 text-purple-500",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "Node.js"]
  },
  {
    title: "Strategy",
    icon: <Zap size={24} />,
    color: "bg-amber-600/10 text-amber-500",
    skills: ["Product Roadmap", "GTM Strategy", "MVP Scoping", "Systems Thinking"]
  },
  {
    title: "Creative",
    icon: <Camera size={24} />,
    color: "bg-rose-600/10 text-rose-500",
    skills: ["Photography", "Videography", "Creative Direction", "Motion"]
  }
];

// --- Components ---

const Navbar = ({ currentView, setView, isAdmin }: { currentView: View, setView: (v: View) => void, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const internalLinks = [
    { name: 'Works', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'About', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-5xl transition-all duration-500`}>
      <div className={`flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full border shadow-2xl transition-all duration-500 ${scrolled || isOpen ? 'bg-black/80 backdrop-blur-xl border-white/10' : 'bg-white/5 border-white/5'}`}>
        <button 
          onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform relative">
            AT
            {isAdmin && (
              <div 
                className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" 
                title="Admin Mode Active" 
              />
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold tracking-tight text-white text-sm md:text-base leading-none">Ajiboso T.</span>
            {isAdmin && <span className="text-[8px] font-black uppercase text-emerald-400 tracking-[0.2em] mt-0.5">Admin Active</span>}
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {internalLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="text-[13px] font-semibold px-4 py-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => { setView('resume'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-[13px] font-semibold px-4 py-2 rounded-full transition-all ${currentView === 'resume' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Resume
          </button>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-bold px-5 py-2.5 rounded-full bg-white text-black hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 glass rounded-[32px] md:hidden flex flex-col p-4 space-y-1 shadow-3xl animate-in fade-in slide-in-from-top-4 duration-300 border-white/10">
          {internalLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="text-base font-bold p-4 rounded-2xl text-left text-gray-300 active:bg-white/10"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => { setView('resume'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-base font-bold p-4 rounded-2xl text-left transition-colors ${currentView === 'resume' ? 'bg-blue-400/10 text-blue-400' : 'text-gray-300 active:bg-white/10'}`}
          >
            Resume
          </button>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center mt-2 text-base font-bold p-5 rounded-2xl bg-white text-black active:scale-95"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

const SectionHeader = ({ title, badge, subtitle, id, centered = false }: { title: string, badge?: string, subtitle?: string, id?: string, centered?: boolean }) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`} id={id}>
    {badge && <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">{badge}</span>}
    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">{title}</h2>
    {subtitle && <p className={`text-gray-400 text-base md:text-lg max-w-xl font-medium leading-relaxed ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>}
  </div>
);

const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="group relative bento-card p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex flex-col h-full overflow-hidden">
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/10 transition-colors">
           <Briefcase size={22} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center">
            {exp.company}
            <ExternalLink size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
          </h3>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">{exp.role}</p>
        </div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-3 py-1.5 border border-white/5 rounded-full whitespace-nowrap bg-white/[0.02]">
        {exp.period}
      </span>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {exp.description.map((item, i) => (
        <p key={i} className={`text-sm md:text-base leading-relaxed ${i === 0 ? 'text-gray-200 font-semibold' : 'text-gray-400'}`}>
          {item}
        </p>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
      {exp.tags.map(tag => (
        <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 text-gray-400 rounded-lg border border-white/5 group-hover:border-blue-500/20 group-hover:text-gray-200 transition-all">
          {tag}
        </span>
      ))}
    </div>

    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`View ${exp.company} project`} />
  </div>
);

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: {
            user_name: formState.name,
            user_email: formState.email,
            message: formState.message,
            reply_to: formState.email,
          },
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else throw new Error();
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="glass p-6 md:p-10 rounded-[32px] md:rounded-[48px] border-white/10 shadow-3xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tighter">Ready to start?</h3>
        <p className="text-gray-400 text-sm md:text-base mb-8 font-medium">Available for remote roles and high-impact freelance projects.</p>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div className="relative group">
            <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input required type="text" placeholder="Full Name" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[20px] md:rounded-3xl py-4 pl-12 pr-6 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>
          <div className="relative group">
            <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input required type="email" placeholder="Email Address" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[20px] md:rounded-3xl py-4 pl-12 pr-6 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>
          <div className="relative group">
            <MessageSquare size={16} className="absolute left-5 top-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <textarea required rows={4} placeholder="How can I help you?" value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-[20px] md:rounded-3xl py-4 pl-12 pr-6 text-sm md:text-base text-white focus:outline-none focus:border-blue-500/50 resize-none transition-all" />
          </div>
          <button disabled={isSubmitting || status === 'success'} type="submit" className={`group w-full h-[60px] md:h-[64px] rounded-[20px] md:rounded-[32px] font-bold transition-all flex items-center justify-center text-sm md:text-base shadow-lg ${status === 'success' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-white text-black active:scale-95'}`}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : status === 'success' ? <><Check className="mr-2" size={20} /> Sent Successfully</> : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Resume View ---

const ResumeManagementView = ({ isAdmin, setIsAdmin, onLoginRequest }: { isAdmin: boolean, setIsAdmin: (v: boolean) => void, onLoginRequest: () => void }) => {
  const [cvData, setCvData] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedCv = localStorage.getItem('ajiboso_cv');
    const savedName = localStorage.getItem('ajiboso_cv_name');
    if (savedCv) setCvData(savedCv);
    if (savedName) setCvName(savedName);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setCvData(base64String);
        setCvName(file.name);
        localStorage.setItem('ajiboso_cv', base64String);
        localStorage.setItem('ajiboso_cv_name', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const executeClear = () => {
    setCvData(null);
    setCvName(null);
    localStorage.removeItem('ajiboso_cv');
    localStorage.removeItem('ajiboso_cv_name');
    setConfirmDelete(false);
  };

  return (
    <div className="pt-32 md:pt-48 pb-32 md:pb-48 px-6 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Archive</span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              Professional <br /><span className="text-gradient">Documents</span>
            </h1>
            <p className="text-gray-400 mt-6 text-base md:text-xl max-w-xl font-medium leading-relaxed">
              Access current versions of my curriculum vitae, academic credentials, and project portfolios.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <div className="flex items-center space-x-2 animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="p-3 md:p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center space-x-2 font-bold text-xs md:text-sm shadow-xl shadow-blue-600/20"
                >
                  <Upload size={18} />
                  <span className="hidden sm:inline">Update CV</span>
                </button>

                <div className="relative flex items-center">
                  {!confirmDelete ? (
                    <button 
                      onClick={() => setConfirmDelete(true)}
                      disabled={!cvData}
                      className={`p-3 md:p-4 rounded-2xl transition-all border ${cvData ? 'bg-white/5 border-white/10 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30' : 'opacity-20 cursor-not-allowed border-transparent text-gray-500'}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1 bg-white/5 border border-white/10 p-1 rounded-2xl animate-in fade-in zoom-in duration-200">
                      <button 
                        onClick={executeClear}
                        className="p-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all flex items-center space-x-2 text-[10px] font-black uppercase"
                      >
                        <Check size={14} />
                        <span>Purge</span>
                      </button>
                      <button 
                        onClick={() => setConfirmDelete(false)}
                        className="p-2.5 text-gray-400 hover:text-white transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setIsAdmin(false)}
                  className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <Lock size={18} />
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="glass p-8 md:p-12 rounded-[40px] md:rounded-[56px] flex flex-col items-center text-center group border-white/5 hover:border-blue-500/20 transition-all">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-all duration-500 shadow-2xl">
              <FileText size={36} md:size={40} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Main Curriculum</h3>
            <p className="text-gray-500 mb-8 md:mb-12 font-medium text-sm md:text-base">Comprehensive career history & skills summary (PDF)</p>
            
            {cvData ? (
              <a 
                href={cvData} 
                download={cvName || "Ajiboso_Toluwanimi_CV.pdf"}
                className="w-full py-4 md:py-5 rounded-[20px] md:rounded-3xl bg-white text-black font-black flex items-center justify-center space-x-3 hover:bg-blue-50 transition-all active:scale-95 shadow-2xl text-sm md:text-base"
              >
                <Download size={20} />
                <span>Download CV</span>
              </a>
            ) : (
              <div className="w-full py-4 md:py-5 rounded-[20px] md:rounded-3xl bg-white/5 text-gray-600 font-bold border border-white/5 flex items-center justify-center space-x-3 text-sm md:text-base">
                <AlertCircle size={20} />
                <span>Pending Upload</span>
              </div>
            )}
            {cvName && <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 overflow-hidden text-ellipsis max-w-full">{cvName}</p>}
          </div>

          <div className="glass p-8 md:p-12 rounded-[40px] md:rounded-[56px] flex flex-col items-center text-center border-white/5 hover:border-purple-500/20 transition-all group opacity-80 hover:opacity-100">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-all duration-500">
              <Globe size={36} md:size={40} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Project Folio</h3>
            <p className="text-gray-500 mb-8 md:mb-12 font-medium text-sm md:text-base">Curated showcase of design & code (Coming Q2 2024)</p>
            <button disabled className="w-full py-4 md:py-5 rounded-[20px] md:rounded-3xl bg-white/5 text-gray-600 font-bold border border-white/5 cursor-not-allowed text-sm md:text-base">
              Preparing Release
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Home Components ---

const HomeSections = () => (
  <div className="space-y-32 md:space-y-56 pb-32">
    {/* Hero Section */}
    <section id="top" className="relative pt-32 md:pt-64 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8 flex flex-col justify-end">
            <h1 className="text-[14vw] md:text-8xl lg:text-[140px] font-bold tracking-tighter text-white leading-[0.82] mb-10 md:mb-14 animate-fade-slide-up [animation-delay:200ms]">
              Designing <br /> <span className="text-gradient">Products.</span> <br /> Shipping Code.
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium animate-fade-slide-up [animation-delay:400ms]">
              Product Designer & Frontend Engineer specializing in high-fidelity digital systems. I turn complex ideas into <span className="text-white">functional interfaces</span> that people love.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end animate-fade-slide-up [animation-delay:600ms]">
            <div className="animate-subtle-float">
              <div className="glass p-8 md:p-10 rounded-[32px] md:rounded-[48px] border-white/10 flex flex-col justify-between h-full hover:bg-white/[0.04] transition-all group shadow-2xl">
                <div className="flex justify-between items-start mb-10 md:mb-16">
                  <div className="p-4 rounded-[20px] bg-white text-black shadow-xl group-hover:scale-110 transition-transform">
                    <Zap size={26} />
                  </div>
                  <div className="flex space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Available</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Remote-First</h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">Dedicated to building scalable, user-centric solutions for early-stage startups and visionary founders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Work Section */}
    <section id="experience" className="px-6 scroll-mt-24 md:scroll-mt-48">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader 
          badge="Case Studies"
          title="Selected Work"
          subtitle="A snapshot of products I've researched, designed, and engineered from concept to launch."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </section>

    {/* Capabilities Section */}
    <section id="skills" className="px-6 scroll-mt-24 md:scroll-mt-48">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader 
          badge="Expertise"
          title="My Toolkit"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map(cat => (
            <div key={cat.title} className="glass p-8 rounded-[32px] md:rounded-[40px] border-white/10 group hover:border-white/20 transition-all">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-10 shadow-lg transition-transform group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-6 tracking-tight">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-gray-400 group-hover:text-gray-200 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About / Contact Section */}
    <section id="contact" className="px-6 scroll-mt-24 md:scroll-mt-48">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <SectionHeader 
            badge="Personal Story"
            title="The Vision"
          />
          <div className="space-y-6 md:space-y-8 text-base md:text-xl text-gray-400 leading-relaxed font-medium">
            <p>
              I believe the most impactful products live at the intersection of <span className="text-white">user psychology</span> and <span className="text-white">technical feasibility</span>. My background as a hybrid designer-engineer allows me to move fast without losing sight of the craft.
            </p>
            <p>
              Currently studying Computer Science while collaborating with high-growth teams. I'm obsessed with <span className="text-white">marketplace design</span>, interactive storytelling, and the future of human-centered software.
            </p>
            
            <div className="pt-8 md:pt-12 grid grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="text-white font-bold mb-2 md:mb-4 text-base md:text-lg">Product Thinking</h4>
                <p className="text-sm text-gray-500 font-medium">Solving real business problems with intuitive design logic and clean architecture.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 md:mb-4 text-base md:text-lg">Visual Craft</h4>
                <p className="text-sm text-gray-500 font-medium">Obsessed with the details—typography, spacing, and smooth motion that feels organic.</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-10">
               <a href="https://www.linkedin.com/in/toluwanimi-ajiboso-819834218/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-blue-600/10 text-gray-400 hover:text-blue-500 transition-all"><Linkedin size={22} /></a>
               <a href="https://github.com/forlavacodes" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all"><Github size={22} /></a>
               <a href="mailto:toluwanimiajiboso03@gmail.com" className="p-3 bg-white/5 rounded-xl hover:bg-rose-600/10 text-gray-400 hover:text-rose-500 transition-all"><Mail size={22} /></a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  </div>
);

const App = () => {
  const [view, setView] = useState<View>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [password, setPassword] = useState('');
  const lastTapRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleSecretTrigger = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) {
      setLoginVisible(true);
    }
    lastTapRef.current = now;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '577171') {
      setIsAdmin(true);
      setLoginVisible(false);
      setPassword('');
    } else {
      alert('Authentication failed.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white relative">
      <Navbar currentView={view} setView={setView} isAdmin={isAdmin} />
      
      <main className="animate-in fade-in duration-1000">
        {view === 'home' ? <HomeSections /> : <ResumeManagementView isAdmin={isAdmin} setIsAdmin={setIsAdmin} onLoginRequest={() => setLoginVisible(true)} />}
      </main>

      <footer className="py-20 md:py-32 border-t border-white/5 px-6 relative overflow-hidden">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <div className="mb-12 flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xl md:text-2xl shadow-2xl mb-6">AT</div>
            <p className="text-gray-200 text-base md:text-xl font-bold tracking-tight mb-2">Ajiboso Toluwanimi</p>
            <p className="text-gray-600 text-xs md:text-sm font-bold tracking-widest uppercase">Remote Product Designer & Engineer</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
            <a href="https://www.linkedin.com/in/toluwanimi-ajiboso-819834218/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">LinkedIn</a>
            <a href="https://github.com/forlavacodes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">GitHub</a>
            <a href="mailto:toluwanimiajiboso03@gmail.com" className="hover:text-rose-500 transition-all">Email</a>
            <div className="w-1 h-1 bg-gray-800 rounded-full hidden sm:block" />
            {!isAdmin ? (
              <button onClick={() => setLoginVisible(true)} className="flex items-center text-gray-600 hover:text-blue-400 transition-all">
                <Key size={12} className="mr-1.5 opacity-50" />
                Admin Portal
              </button>
            ) : (
              <button onClick={() => setIsAdmin(false)} className="text-rose-400 hover:text-rose-600 flex items-center">
                <Lock size={12} className="mr-1"/> 
                Secure Logout
              </button>
            )}
          </div>
          <p className="mt-16 text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em]">© 2026 — All Rights Reserved</p>
        </div>

        {/* OWNER SECRET TRIGGER - Keep as backup, but discrete */}
        <div 
          onClick={handleSecretTrigger}
          className="absolute bottom-4 right-4 p-4 opacity-[0.03] hover:opacity-10 transition-all cursor-pointer z-[200]"
          title="Terminal entry"
        >
          <Settings size={14} />
        </div>
      </footer>

      {/* Admin Login Modal */}
      {loginVisible && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-300">
          <div className="glass p-8 md:p-12 rounded-[40px] md:rounded-[56px] border-white/10 w-full max-w-md shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Owner Portal</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Restricted Access</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setLoginVisible(false); setPassword(''); }} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={20}/>
                </button>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 pl-4">Security Key</label>
                  <input 
                    autoFocus
                    type="password" 
                    placeholder="••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:outline-none focus:border-blue-500/50 text-center tracking-[1em] text-2xl font-black placeholder:tracking-normal placeholder:font-medium placeholder:text-gray-700"
                  />
                </div>
                <button type="submit" className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-blue-50 transition-all shadow-2xl active:scale-95 text-sm md:text-base">
                  Unlock Environment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Initialization ---
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("DOM context missing.");
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Critical Failure:", error);
}