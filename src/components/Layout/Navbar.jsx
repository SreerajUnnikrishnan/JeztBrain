import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield, Menu, X, ChevronDown, Terminal, Cpu, Brain, Server, ShieldCheck, Activity, Globe, FileText,
  Target, Eye, Crosshair, Zap, Search, Users, Radio, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import UserDropdown from './UserDropdown';

const megaMenuData = {
  'solutions': {
    title: 'Enterprise Cyber-Defense Solutions',
    columns: [
      {
        title: 'AI Security Operations',
        icon: Brain,
        items: [
          { name: 'AI Threat Monitoring', path: '/#solutions', desc: 'Real-time telemetry and behavioral analytics.' },
          { name: 'Managed SOC Operations', path: '/#solutions', desc: '24/7 enterprise monitoring and alert response.' },
          { name: 'Incident Response', path: '/#solutions', desc: 'Rapid containment and forensic investigation.' },
          { name: 'Zero-Day Detection', path: '/#solutions', desc: 'AI heuristic detection and exploit prevention.' },
          { name: 'Threat Intelligence', path: '/#solutions', desc: 'Global IOC feeds and correlation engine.' }
        ]
      },
      {
        title: 'Infrastructure Security',
        icon: Server,
        items: [
          { name: 'Cloud Security', path: '/#solutions', desc: 'Multi-cloud posture management and protection.' },
          { name: 'Endpoint Protection', path: '/#solutions', desc: 'Server, workstation, and device telemetry defense.' },
          { name: 'Critical Infrastructure Defense', path: '/#solutions', desc: 'Industrial and enterprise infrastructure protection.' },
          { name: 'Secure Telemetry Transport', path: '/#solutions', desc: 'Encrypted telemetry communication channels.' },
          { name: 'SIEM Integration', path: '/#solutions', desc: 'Integration with enterprise monitoring platforms.' }
        ]
      },
      {
        title: 'Offensive Security & Compliance',
        icon: ShieldCheck,
        items: [
          { name: 'Penetration Testing', path: '/#solutions', desc: 'Ethical hacking and Red Team operations.' },
          { name: 'Vulnerability Assessment', path: '/#solutions', desc: 'Infrastructure weakness identification.' },
          { name: 'Compliance & Risk Management', path: '/#solutions', desc: 'PCI-DSS, SOC2, GDPR, ISO readiness audits.' },
          { name: 'Government Security', path: '/#solutions', desc: 'Enterprise and public sector defense architecture.' },
          { name: 'Digital Forensics', path: '/#solutions', desc: 'Incident investigation and recovery analysis.' }
        ]
      }
    ]
  },
  'services': {
    title: 'Focused Cyber Operations',
    columns: [
      {
        title: 'Tactical & Offense',
        icon: Terminal,
        items: [
          { name: 'Red Team Operations', path: '/#services', desc: 'Active adversary simulation and penetration.' },
          { name: 'Malware Analysis', path: '/#services', desc: 'Reverse-engineering and heuristic decoding.' }
        ]
      },
      {
        title: 'Defensive Systems',
        icon: Shield,
        items: [
          { name: 'Blue Team Operations', path: '/#services', desc: 'Active defense engineering and hardening.' },
          { name: 'Threat Hunting', path: '/#services', desc: 'Continuous endpoint scanning for indicators.' }
        ]
      },
      {
        title: 'Advisory & Audits',
        icon: FileText,
        items: [
          { name: 'Security Consulting', path: '/#services', desc: 'Enterprise architecture design strategy.' },
          { name: 'Security Audits', path: '/#services', desc: 'Rigorous assessment of access policies.' },
          { name: 'Security Awareness Training', path: '/#services', desc: 'Corporate phishing and readiness simulation.' }
        ]
      }
    ]
  },
  'industries': {
    title: 'Protected Verticals',
    columns: [
      {
        title: 'Regulated Sectors',
        icon: Globe,
        items: [
          { name: 'Local Government', path: '/#solutions', desc: 'Sensitive municipality asset protection.' },
          { name: 'Banking & Finance', path: '/#solutions', desc: 'PCI-DSS certified secure trading networks.' },
          { name: 'Healthcare', path: '/#solutions', desc: 'HIPAA compliant patient telemetry security.' }
        ]
      },
      {
        title: 'Enterprise & Providers',
        icon: Cpu,
        items: [
          { name: 'Cloud Providers', path: '/#solutions', desc: 'Kubernetes and container runtime defense.' },
          { name: 'Manufacturing', path: '/#solutions', desc: 'Operational technology and production line security.' },
          { name: 'Enterprise Corporations', path: '/#solutions', desc: 'Scale-oriented business threat monitoring.' }
        ]
      },
      {
        title: 'Growth Sectors',
        icon: Activity,
        items: [
          { name: 'Education', path: '/#solutions', desc: 'Secure research networks and data storage.' },
          { name: 'Startups', path: '/startup-security', desc: 'Fast, secure onboarding and scalable defense.' }
        ]
      }
    ]
  }
};

/* ─── Platform Mega Menu Data ──────────────────────────────────────────────── */
const platformMenu = {
  hero: {
    title: 'JeztBrainSpider',
    tagline: 'The intelligent cyber-defense core. Built to hunt, disrupt, and protect.',
    path: '/platform/jeztbrainspider',
    badge: 'INTELLIGENCE CORE',
  },
  columns: [
    {
      title: 'Threat Intelligence',
      icon: Target,
      items: [
        { name: 'Global Threat Disruption', path: '/platform/jeztbrainspider', desc: 'Active disruption of malicious campaigns worldwide.' },
        { name: 'Adversary Tracking', path: '/platform/jeztbrainspider', desc: 'Real-time APT and threat actor attribution.' },
        { name: 'Malicious Infrastructure', path: '/platform/jeztbrainspider', desc: 'C2 servers, botnet, and dark-web mapping.' },
        { name: 'Zero-Day Research', path: '/platform/jeztbrainspider', desc: 'Exploit discovery before public disclosure.' },
      ]
    },
    {
      title: 'Offensive & Defense',
      icon: Crosshair,
      items: [
        { name: 'Red Team Intelligence', path: '/platform/jeztbrainspider', desc: 'Adversary simulation guided by live threat data.' },
        { name: 'Threat Hunting', path: '/platform/jeztbrainspider', desc: 'Proactive sweeps across endpoints and networks.' },
        { name: 'Attack Prevention Engine', path: '/platform/jeztbrainspider', desc: 'Autonomous countermeasure deployment.' },
        { name: 'Digital Asset Protection', path: '/platform/jeztbrainspider', desc: 'Brand, credential, and domain defense.' },
      ]
    },
    {
      title: 'Human + AI',
      icon: Users,
      items: [
        { name: 'Analyst Collaboration', path: '/platform/jeztbrainspider', desc: 'Elite analysts augmented by AI triage.' },
        { name: 'Community Defense', path: '/platform/jeztbrainspider', desc: 'Shared intelligence for collective protection.' },
        { name: 'Executive Protection', path: '/platform/jeztbrainspider', desc: 'High-value individual threat reduction.' },
        { name: 'Startup Security', path: '/startup-security', desc: 'Fast onboarding and scalable defense stack.' },
      ]
    }
  ]
};

export default function Navbar() {
  const { user, role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = ['services', 'solutions', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop - 200 <= scrollY) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'security' || role === 'network' || role === 'expert') return '/expert-dashboard';
    return '/dashboard';
  };

  const navLinks = [
    { name: 'HOME', path: '/', id: 'home' },
    { name: 'ABOUT', path: '/about', id: 'about' },
    { name: 'PLATFORM', path: '/platform/jeztbrainspider', id: 'platform', isPlatform: true },
    { name: 'SERVICES', path: '/#services', id: 'services', megaMenuKey: 'services' },
    { name: 'EXPERTS', path: '/experts', id: 'experts' },
    { name: 'CONTACT', path: '/#contact', id: 'contact' },
    ...(user ? [{ name: 'DASHBOARD', path: getDashboardLink(), id: 'dashboard' }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'py-3 border-b border-[#7B2FF7]/20 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(123,47,247,0.06)] bg-[#0A0F1F]/90 backdrop-blur-xl'
        : 'py-5 border-b border-transparent bg-transparent'
        }`}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="w-full pl-6 lg:pl-10 pr-6 lg:pr-10 flex items-center justify-between gap-6">

        {/* Brand Logo with Soft Cyan Glow */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00D4FF]/10 to-[#7B2FF7]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center justify-center transition-all duration-300"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.7)]">
                {/* Outer Shield */}
                <path
                  d="M16 3L6 7v8c0 7 4.5 13.5 10 15 5.5-1.5 10-8 10-15V7L16 3z"
                  stroke="#00D4FF"
                  strokeWidth="2"
                  fill="rgba(0, 212, 255, 0.08)"
                  strokeLinejoin="round"
                />
                {/* Brain Circuit Patterns on Left Side */}
                <path d="M13 9c-1.5.5-2.5 1.5-2.5 3s1 2.5 2 3" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <path d="M11 12h-2.5" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <circle cx="8" cy="12" r="1" fill="#00D4FF" />
                <circle cx="10" cy="17" r="1" fill="#00D4FF" />
                <path d="M13 16.5c-1.5.5-2 1.5-2 2.5" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <circle cx="11" cy="20" r="1.5" fill="#00D4FF" />
                {/* Brain Circuit Patterns on Right Side */}
                <path d="M19 9c1.5.5 2 1.5 2 2.5s-0.5 2-1.5 2.5" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <circle cx="21" cy="15" r="1" fill="#00D4FF" />
                {/* Stylized Glowing White Letter 'J' in the Center */}
                <path
                  d="M15 10h3v10c0 1.66-1.34 3-3 3s-3-1.34-3-3"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                />
              </svg>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight select-none flex items-center">
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Jezt</span>
                <span className="text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] font-extrabold ml-0.5">Brain</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links - Perfectly Center Aligned */}
        <div className="hidden lg:flex justify-center items-center gap-8 flex-1">
          {navLinks.map((link) => {
            const isActive = (link.path.startsWith('/#') && activeSection === link.id) ||
              (location.pathname === link.path && !link.path.startsWith('/#')) ||
              (link.isPlatform && location.pathname.startsWith('/platform'));

            const hasMega = !!link.megaMenuKey;
            const isPlatform = !!link.isPlatform;

            return (
              <div
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => {
                  if (hasMega) setHoveredMenu(link.megaMenuKey);
                  else if (isPlatform) setHoveredMenu('platform');
                  else setHoveredMenu(null);
                }}
              >
                {isPlatform ? (
                  <Link
                    to={link.path}
                    className={`font-mono font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all duration-300 py-1 ${isActive
                        ? 'text-[#7B2FF7] drop-shadow-[0_0_12px_rgba(123,47,247,0.6)]'
                        : 'text-slate-300 hover:text-[#7B2FF7]'
                      }`}
                  >
                    {link.name}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredMenu === 'platform' ? 'rotate-180 text-[#7B2FF7]' : 'text-slate-400'
                      }`} />
                  </Link>
                ) : link.path.startsWith('/#') ? (
                  <a
                    href={link.path}
                    className={`font-mono font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all duration-300 py-1 ${isActive ? 'text-[#7B2FF7] drop-shadow-[0_0_12px_rgba(123,47,247,0.6)]' : 'text-slate-300 hover:text-[#7B2FF7]'
                      }`}
                  >
                    {link.name}
                    {hasMega && (
                      <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredMenu === link.megaMenuKey ? 'rotate-180 text-[#7B2FF7]' : 'text-slate-400'}`} />
                    )}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-mono font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all duration-300 py-1 ${isActive ? 'text-[#7B2FF7] drop-shadow-[0_0_12px_rgba(123,47,247,0.6)]' : 'text-slate-300 hover:text-[#7B2FF7]'
                      }`}
                  >
                    {link.name}
                    {hasMega && (
                      <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredMenu === link.megaMenuKey ? 'rotate-180 text-[#7B2FF7]' : 'text-slate-400'}`} />
                    )}
                  </Link>
                )}

                {/* Underline indicator - Solid purple */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#7B2FF7] shadow-[0_0_8px_rgba(123,47,247,0.8)] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                  }`} />
              </div>
            );
          })}
        </div>

        {/* Auth & CTA - Right Aligned */}
        <div className="hidden md:flex justify-end items-center gap-6 shrink-0">
          {user ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-6">
              <Link
                to="/auth"
                className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-[#7B2FF7] transition-colors relative group py-2 whitespace-nowrap"
              >
                LOGIN
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7B2FF7] transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                to="/auth?signup=true"
                className="relative group inline-flex items-center justify-center bg-gradient-to-r from-[#7B2FF7] to-[#00D4FF] text-white px-6 py-2.5 rounded-lg font-black font-mono text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(123,47,247,0.3)] hover:shadow-[0_0_35px_rgba(123,47,247,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap border border-white/10 hover:border-white/20"
              >
                <div className="absolute inset-0 rounded-lg bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  GET STARTED
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative p-2 rounded-xl bg-[#7B2FF7]/10 border border-[#7B2FF7]/30 text-[#7B2FF7] hover:bg-[#7B2FF7]/20 transition-colors focus:outline-none"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Dropdown Mega Menu Panels */}
      <AnimatePresence>
        {hoveredMenu && hoveredMenu !== 'platform' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 px-6 py-4 z-40 hidden lg:block"
            onMouseEnter={() => setHoveredMenu(hoveredMenu)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="max-w-[1300px] mx-auto bg-[#0A0F1F]/98 backdrop-blur-3xl border border-[#7B2FF7]/20 rounded-2xl shadow-[0_45px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(123,47,247,0.06)] p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[#7B2FF7]/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#7B2FF7]">{megaMenuData[hoveredMenu].title}</span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {megaMenuData[hoveredMenu].columns.map((col, cidx) => (
                    <div key={cidx} className={`space-y-4 ${cidx < 2 ? 'border-r border-white/5 pr-8' : ''}`}>
                      <div className="flex items-center gap-2.5">
                        {col.icon && (
                          <div className="p-1 rounded bg-[#7B2FF7]/10 border border-[#7B2FF7]/20 text-[#7B2FF7] shadow-[0_0_10px_rgba(123,47,247,0.2)]">
                            <col.icon size={13} className="drop-shadow-[0_0_4px_rgba(123,47,247,0.5)]" />
                          </div>
                        )}
                        <h4 className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-400">{col.title}</h4>
                      </div>
                      <div className="flex flex-col gap-2">
                        {col.items.map((item, iidx) => (
                          <a
                            key={iidx}
                            href={item.path}
                            onClick={() => setHoveredMenu(null)}
                            className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#7B2FF7]/5 hover:to-transparent border border-transparent hover:border-[#7B2FF7]/10 transition-all duration-300 group flex items-start gap-3 hover:scale-[1.01]"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            <div className="space-y-0.5">
                              <div className="text-xs font-black font-sans text-slate-200 group-hover:text-[#7B2FF7] transition-colors">{item.name}</div>
                              <div className="text-[10px] text-slate-400 leading-normal font-medium">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Mega Menu */}
      <AnimatePresence>
        {hoveredMenu === 'platform' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 px-6 py-4 z-40 hidden lg:block"
            onMouseEnter={() => setHoveredMenu('platform')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div
              className="max-w-[1300px] mx-auto rounded-2xl shadow-[0_45px_90px_rgba(0,0,0,0.97)] p-8 relative overflow-hidden border"
              style={{
                background: 'linear-gradient(145deg, #0a0006, #0c0010, #080010)',
                borderColor: 'rgba(123,47,247,0.25)',
              }}
            >
              {/* Glow orbs */}
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.15), transparent 70%)' }} />
              <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.12), transparent 70%)' }} />

              <div className="relative z-10 grid grid-cols-4 gap-8">

                {/* Hero Column — JeztBrainSpider */}
                <div className="col-span-1 border-r pr-8" style={{ borderColor: 'rgba(123,47,247,0.15)' }}>
                  <div className="mb-3">
                    <span
                      className="inline-block text-[9px] font-mono font-black uppercase tracking-[0.3em] px-2 py-0.5 rounded-full border mb-3"
                      style={{ color: '#E50914', borderColor: 'rgba(229,9,20,0.3)', background: 'rgba(229,9,20,0.08)' }}
                    >
                      {platformMenu.hero.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight">
                    JeztBrain<span style={{ color: '#7B2FF7' }}>Spider</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-5">{platformMenu.hero.tagline}</p>

                  {/* Mini threat ticker */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E50914' }} />
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Live global threat activity</span>
                  </div>

                  <Link
                    to={platformMenu.hero.path}
                    onClick={() => setHoveredMenu(null)}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-black font-mono text-[10px] uppercase tracking-widest text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #E50914, #7B2FF7)',
                      boxShadow: '0 0 20px rgba(229,9,20,0.25)',
                    }}
                  >
                    Explore Spider
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Capability Columns */}
                {platformMenu.columns.map((col, cidx) => (
                  <div key={cidx} className="space-y-3">
                    <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="p-1 rounded border" style={{ background: 'rgba(123,47,247,0.12)', borderColor: 'rgba(123,47,247,0.25)' }}>
                        <col.icon size={12} style={{ color: '#7B2FF7' }} />
                      </div>
                      <h4 className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-400">{col.title}</h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      {col.items.map((item, iidx) => (
                        <Link
                          key={iidx}
                          to={item.path}
                          onClick={() => setHoveredMenu(null)}
                          className="p-2.5 rounded-lg border border-transparent transition-all duration-300 group flex items-start gap-2.5 hover:scale-[1.01]"
                          style={{ ':hover': { borderColor: 'rgba(123,47,247,0.15)', background: 'rgba(123,47,247,0.05)' } }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(123,47,247,0.15)';
                            e.currentTarget.style.background = 'rgba(123,47,247,0.05)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <div className="w-1 h-1 rounded-full mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ background: '#E50914' }} />
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">{item.name}</div>
                            <div className="text-[10px] text-slate-500 leading-normal">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

              </div>

              {/* Bottom strip */}
              <div className="relative z-10 mt-6 pt-4 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">JeztBrain Platform — Cyber Defense Intelligence</span>
                <Link
                  to="/platform/jeztbrainspider"
                  onClick={() => setHoveredMenu(null)}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] flex items-center gap-1 transition-colors"
                  style={{ color: '#7B2FF7' }}
                >
                  View full platform <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer with Accordion Mega Menus */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A0F1F]/98 backdrop-blur-2xl border-b border-[#7B2FF7]/20 overflow-y-auto max-h-[85vh] mt-3"
          >
            <div className="px-6 py-6 space-y-6 max-w-5xl mx-auto">
              {navLinks.map((link) => {
                const hasMega = !!link.megaMenuKey;
                const isExpanded = mobileExpandedMenu === link.megaMenuKey;

                return (
                  <div key={link.name} className="space-y-2">
                    {hasMega ? (
                      <button
                        onClick={() => setMobileExpandedMenu(isExpanded ? null : link.megaMenuKey)}
                        className="w-full text-left px-4 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-widest text-slate-300 hover:text-[#7B2FF7] hover:bg-[#7B2FF7]/10 flex items-center justify-between border border-transparent hover:border-[#7B2FF7]/20 transition-all"
                      >
                        {link.name}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#7B2FF7]' : 'text-slate-400'}`} />
                      </button>
                    ) : link.path.startsWith('/#') ? (
                      <a
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-widest text-slate-300 hover:text-[#7B2FF7] hover:bg-[#7B2FF7]/10 border border-transparent hover:border-[#7B2FF7]/20 transition-all"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-widest text-slate-300 hover:text-[#7B2FF7] hover:bg-[#7B2FF7]/10 border border-transparent hover:border-[#7B2FF7]/20 transition-all"
                      >
                        {link.name}
                      </Link>
                    )}

                    {/* Mobile Mega Sub-items */}
                    <AnimatePresence>
                      {hasMega && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 space-y-2 overflow-hidden border-l border-white/5 ml-4"
                        >
                          {megaMenuData[link.megaMenuKey].columns.map((col) =>
                            col.items.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.path}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileExpandedMenu(null);
                                }}
                                className="block p-2 rounded-lg hover:bg-white/5 font-sans text-xs text-slate-400 hover:text-[#7B2FF7] transition-all"
                              >
                                {item.name}
                              </a>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="h-[1px] bg-white/5 my-4" />
              {user ? (
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-[#7B2FF7] to-violet-600 text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(123,47,247,0.3)]"
                >
                  Open Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?signup=true"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#7B2FF7] via-[#9333EA] to-[#7B2FF7] text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(123,47,247,0.3)] border border-[#7B2FF7]/30"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
