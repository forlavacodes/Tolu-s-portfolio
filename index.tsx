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
  Download
} from 'lucide-react';

// --- Configuration ---
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'eDHCc5whGZYtNivpf',
  SERVICE_ID: 'service_qeas4re',
  TEMPLATE_ID: 'template_y631qrv',
};

const WHATSAPP_NUMBER = "2347071279950"; 
const WHATSAPP_MESSAGE = "Hello Toluwanimi, My name is __________, i came across your porfolio website online and I would love to work with you. Please respond to me as soon as possible. Thank you!";
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

interface Education {
  institution: string;
  degree: string;
  period: string;
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
      "Genpay exists to power meaningful experiences through technology, trust, and vibrant human connection.",
      "Architected the visual identity and user interface from the ground up, focusing on transactional clarity and accessibility.",
      "Engineered high-performance React components reducing development overhead by 40%."
    ]
  },
  {
    company: "X Republik",
    role: "Product Designer & Engineer",
    period: "2023",
    link: "https://x-republik.vercel.app",
    tags: ["Events", "Showcase", "Brand Identity"],
    description: [
      "Purely an event site portraying everything that is needed to be known about the event - designed as a central hub for storytelling and information.",
      "Crafted a high-fidelity digital experience that captures the cultural essence and atmosphere of the brand through immersive visual design.",
      "Focused on information architecture and seamless navigation to guide users through the event's schedule, talent, and ethos."
    ]
  },
  {
    company: "Marvex",
    role: "Frontend Developer",
    period: "2023",
    link: "https://marvex-black.vercel.app",
    tags: ["Logistics", "Payments", "B2B", "Infrastructure"],
    description: [
      "To Unify the African Handshake.",
      "We bridge the digital and physical divide by creating a unified standard for commerce, logistics, and payments across the continent's fragmented markets.",
      "Developed high-performance dashboard interfaces for complex marketplace analytics and inventory systems."
    ]
  }
];

const education: Education[] = [
  {
    institution: "Bowen University",
    degree: "BSc. Computer Science",
    period: "2023 — Present"
  },
  {
    institution: "Saint Catherine's College",
    degree: "High School Diploma",
    period: "2017 — 2023"
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Product Design",
    icon: <Layout size={24} />,
    color: "bg-blue-600/10 text-blue-500",
    skills: ["Figma", "Design Systems", "Framer", "Prototyping", "User Research"]
  },
  {
    title: "Engineering",
    icon: <Code size={24} />,
    color: "bg-purple-600/10 text-purple-500",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"]
  },
  {
    title: "Strategy",
    icon: <Zap size={24} />,
    color: "bg-yellow-600/10 text-yellow-500",
    skills: ["Product Roadmap", "GTM Strategy", "Marketplace Systems", "MVP Scoping"]
  },
  {
    title: "Creative",
    icon: <Camera size={24} />,
    color: "bg-red-600/10 text-red-500",
    skills: ["Photography", "Videography", "Creative Direction", "Motion Design"]
  }
];

// --- Components ---

const Navbar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const internalLinks = [
    { name: 'Works', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl transition-all duration-500`}>
      <div className={`flex items-center justify-between px-6 py-2.5 rounded-full border shadow-2xl transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10' : 'bg-white/5 border-white/5'}`}>
        <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
            AT
          </div>
          <span className="font-bold tracking-tight text-white hidden sm:block">Ajiboso T.</span>
        </button>

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
            onClick={() => { setView('resume'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-[13px] font-semibold px-4 py-2 rounded-full transition-all ${currentView === 'resume' ? 'text-blue-400 bg-blue-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Resume
          </button>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-[13px] font-bold px-6 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all active:scale-95"
          >
            Hire Me
          </a>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 glass rounded-[32px] md:hidden flex flex-col p-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
          {internalLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="text-sm font-bold p-4 rounded-2xl text-left text-gray-300 hover:bg-white/5 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => { setView('resume'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-sm font-bold p-4 rounded-2xl text-left transition-colors ${currentView === 'resume' ? 'bg-blue-400/10 text-blue-400' : 'text-gray-300 hover:bg-white/5'}`}
          >
            Resume (Download)
          </button>
        </div>
      )}
    </nav>
  );
};

const SectionHeader = ({ title, badge, subtitle, id }: { title: string, badge?: string, subtitle?: string, id?: string }) => (
  <div className="mb-12" id={id}>
    {badge && <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">{badge}</span>}
    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">{title}</h2>
    {subtitle && <p className="text-gray-400 text-lg max-w-xl font-medium leading-relaxed">{subtitle}</p>}
  </div>
);

const ExperienceCard = ({ exp }: { exp: Experience }) => (
  <div className="group relative bento-card p-8 rounded-[40px] flex flex-col h-full overflow-hidden">
    <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500">
           <Briefcase size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center">
            {exp.company}
            <ArrowUpRight size={18} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{exp.role}</p>
        </div>
      </div>
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 px-4 py-2 border border-white/5 rounded-full">{exp.period}</span>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {exp.description.map((item, i) => (
        <p key={i} className={`text-sm leading-relaxed ${i === 0 ? 'text-white font-semibold' : 'text-gray-400'}`}>
          {item}
        </p>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
      {exp.tags.map(tag => (
        <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/5 group-hover:border-blue-500/20 transition-all">
          {tag}
        </span>
      ))}
    </div>

    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0" aria-label={`View ${exp.company} project`} />
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
    <div className="glass p-10 rounded-[48px] border-white/10 shadow-3xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tighter">Ready to start?</h3>
        <p className="text-gray-400 text-sm mb-8 font-medium">Accepting remote roles and strategic collaborations.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input required type="text" placeholder="Full Name" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="relative group">
            <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <input required type="email" placeholder="Email Address" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="relative group">
            <MessageSquare size={16} className="absolute left-5 top-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
            <textarea required rows={4} placeholder="Project details..." value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" />
          </div>
          <button disabled={isSubmitting || status === 'success'} type="submit" className={`group w-full h-[64px] rounded-[32px] font-bold transition-all flex items-center justify-center border ${status === 'success' ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40' : 'bg-white text-black'}`}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : status === 'success' ? 'Sent' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Resume Page Component ---

const ResumeManagementView = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cvData, setCvData] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [lastTap, setLastTap] = useState(0);
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '577171') {
      setIsAdmin(true);
      setLoginVisible(false);
      setPassword('');
    } else {
      alert('Incorrect credentials.');
    }
  };

  const handleSecretTrigger = () => {
    const now = Date.now();
    if (now - lastTap < 350) {
      setLoginVisible(true);
    }
    setLastTap(now);
  };

  return (
    <div className="pt-48 pb-48 px-6 min-h-screen relative">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">Documents</span>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white">
              Curriculum <span className="text-gradient">Vitae</span>
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-xl">
              Download the latest version of my professional resume and academic portfolio. Updated as of 2024.
            </p>
          </div>
          
          {isAdmin && (
            <div className="flex items-center space-x-2 animate-in fade-in zoom-in duration-300">
               <button 
                onClick={() => fileInputRef.current?.click()} 
                className="p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center space-x-2 font-bold text-sm shadow-xl shadow-blue-600/20"
              >
                <Upload size={18} />
                <span className="hidden sm:inline">Upload CV</span>
              </button>

              <div className="relative flex items-center">
                {!confirmDelete ? (
                  <button 
                    onClick={() => setConfirmDelete(true)}
                    disabled={!cvData}
                    title={cvData ? "Delete Resume" : "No resume to delete"}
                    className={`p-4 rounded-2xl transition-all border ${cvData ? 'bg-white/5 border-white/10 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30' : 'opacity-20 cursor-not-allowed border-transparent text-gray-500'}`}
                  >
                    <Trash2 size={18} />
                  </button>
                ) : (
                  <div className="flex items-center space-x-1 bg-white/5 border border-white/10 p-1 rounded-2xl animate-in fade-in zoom-in duration-200">
                    <button 
                      onClick={executeClear}
                      className="p-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-all flex items-center space-x-2 text-xs font-bold"
                    >
                      <Check size={14} />
                      <span>Confirm</span>
                    </button>
                    <button 
                      onClick={() => setConfirmDelete(false)}
                      className="p-3 text-gray-400 hover:text-white transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsAdmin(false)}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
              >
                <Lock size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pdf,.doc,.docx" 
              />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass p-12 rounded-[56px] flex flex-col items-center text-center group border-white/5 hover:border-blue-500/20 transition-all relative overflow-hidden">
            <div className="w-24 h-24 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform duration-500">
              <FileText size={40} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Professional CV</h3>
            <p className="text-gray-500 mb-10 font-medium">Standard A4 Format (PDF)</p>
            
            {cvData ? (
              <a 
                href={cvData} 
                download={cvName || "Ajiboso_Toluwanimi_CV.pdf"}
                className="w-full py-5 rounded-3xl bg-white text-black font-black flex items-center justify-center space-x-3 hover:bg-gray-200 transition-all active:scale-95 shadow-2xl"
              >
                <Download size={20} />
                <span>Download Now</span>
              </a>
            ) : (
              <div className="w-full py-5 rounded-3xl bg-white/5 text-gray-600 font-bold border border-white/5 flex items-center justify-center space-x-3">
                <AlertCircle size={20} />
                <span>No CV uploaded yet</span>
              </div>
            )}

            {cvName && <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-700">{cvName}</p>}
          </div>

          <div className="glass p-12 rounded-[56px] flex flex-col items-center text-center border-white/5 hover:border-blue-500/20 transition-all">
            <div className="w-24 h-24 rounded-3xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 mb-8">
              <Code size={40} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Portfolio PDF</h3>
            <p className="text-gray-500 mb-10 font-medium">Visual Works Showcase (Coming Soon)</p>
            <button disabled className="w-full py-5 rounded-3xl bg-white/5 text-gray-600 font-bold border border-white/5 cursor-not-allowed">
              Available Soon
            </button>
          </div>
        </div>

        {/* Secret Admin Trigger Dot: Invisible but clickable */}
        <div 
          onClick={handleSecretTrigger}
          className="fixed bottom-4 right-4 w-4 h-4 rounded-full bg-white/0 cursor-pointer z-[150] hover:bg-white/5"
        />

        {loginVisible && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass p-10 rounded-[48px] border-white/10 w-full max-w-sm shadow-3xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Lock size={18} className="mr-2 text-blue-500" />
                  Admin Login
                </h3>
                <button onClick={() => setLoginVisible(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  autoFocus
                  type="password" 
                  placeholder="Enter secret pin" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500/50"
                />
                <button type="submit" className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all">
                  Unlock Panel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Home Components ---

const HomeSections = () => (
  <div className="space-y-40 md:space-y-64 pb-32">
    {/* Hero Section */}
    <section id="top" className="relative pt-56 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col justify-end min-h-[400px]">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.85] mb-12 animate-fade-slide-up [animation-delay:300ms]">
              Designing <br /> <span className="text-gradient">Experiences.</span> <br /> Shipping Code.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium animate-fade-slide-up [animation-delay:500ms]">
              Product Designer & Frontend Engineer specializing in high-fidelity startups. I bridge the gap between <span className="text-white">concept</span> and <span className="text-white">production</span>.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end animate-fade-slide-up [animation-delay:700ms]">
            <div className="animate-subtle-float">
              <div className="glass p-10 rounded-[48px] border-white/10 flex flex-col justify-between h-full hover:bg-white/[0.04] hover:border-white/20 transition-all group cursor-default shadow-2xl">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 rounded-[20px] bg-white text-black shadow-xl group-hover:scale-110 transition-transform">
                    <Layout size={24} />
                  </div>
                  <ArrowUpRight size={20} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Remote Excellence</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Early stage startup enthusiast. Dedicated to building scalable, user-centric digital solutions with a founder's mindset.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Works Section */}
    <section id="experience" className="px-6 scroll-mt-48">
      <div className="container mx-auto">
        <SectionHeader 
          badge="Selected Work"
          title="Case Studies & Projects"
          subtitle="A snapshot of products I've designed and engineered over the past 2 years."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </section>

    {/* Skills Section */}
    <section id="skills" className="px-6 scroll-mt-48">
      <div className="container mx-auto">
        <SectionHeader 
          badge="Capabilities"
          title="My Design & Dev Stack"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map(cat => (
            <div key={cat.title} className="glass p-8 rounded-[40px] border-white/10 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-8 tracking-tight">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[11px] font-bold text-gray-400 group-hover:text-gray-200 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Education Section */}
    <section id="education" className="px-6 scroll-mt-48">
      <div className="container mx-auto">
        <SectionHeader 
          badge="Learning"
          title="Academic Background"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <div key={idx} className="glass p-10 rounded-[40px] flex flex-col justify-between items-start gap-8 group hover:border-blue-500/20 transition-all">
              <div className="w-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <GraduationCap size={22} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-4 py-2 bg-white/5 rounded-full border border-white/5 group-hover:text-blue-400 transition-colors">
                    {edu.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{edu.institution}</h3>
                <p className="text-lg text-gray-400 font-medium">{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact & Bio Section */}
    <section id="contact" className="px-6 scroll-mt-48">
      <div className="container mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <SectionHeader 
            badge="Personal"
            title="The Builder's Journey"
          />
          <div className="space-y-8 text-lg text-gray-400 leading-relaxed font-medium">
            <p>
              I believe the best products are born at the intersection of <span className="text-white">user psychology</span> and <span className="text-white">technical feasibility</span>. My hybrid background allows me to design with an architect's eye and build with a founder's speed.
            </p>
            <p>
              I'm currently pursuing my degree in Computer Science while actively contributing to early-stage ventures. I'm obsessed with <span className="text-white">marketplace systems</span>, <span className="text-white">interactive storytelling</span>, and the <span className="text-white">future of fintech</span> in emerging markets.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-2">Strategy</h4>
                <p className="text-sm">GTM execution and product lifecycle management.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Aesthetics</h4>
                <p className="text-sm">Clean, functional UI with emotional resonance.</p>
              </div>
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

  return (
    <div className="min-h-screen">
      <Navbar currentView={view} setView={setView} />
      
      <main className="animate-in fade-in duration-1000">
        {view === 'home' ? <HomeSections /> : <ResumeManagementView />}
      </main>

      <footer className="py-24 border-t border-white/5 px-6">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 text-sm md:text-base font-bold tracking-tight mb-8">
            © 2024 - Ajiboso Toluwanimi / Remote Worldwide
          </p>
          <div className="flex items-center space-x-12 text-[11px] font-black uppercase tracking-[0.3em]">
            <a href="https://www.linkedin.com/in/toluwanimi-ajiboso-819834218/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 hover:underline transition-all">LinkedIn</a>
            <a href="https://github.com/forlavacodes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 hover:underline transition-all">GitHub</a>
            <a href="mailto:toluwanimiajiboso03@gmail.com" className="text-blue-500 hover:text-blue-400 hover:underline transition-all">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}