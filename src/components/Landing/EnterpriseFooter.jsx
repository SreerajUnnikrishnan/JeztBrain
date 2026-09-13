import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
  </svg>
);

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function EnterpriseFooter() {
  return (
    <footer className="relative bg-[#070C18] text-slate-400 font-sans border-t border-slate-800/80 pt-16 pb-12 overflow-hidden selection:bg-purple-500/20 selection:text-white">
      {/* Subtle top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-purple-500/30" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 text-left border-b border-slate-800/60">
          
          {/* Brand Section (Column 1 - Spans 2 cols on md/lg for layout balance) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-sm group-hover:border-purple-500/50 transition-colors">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white font-sans">
                Jezt<span className="text-purple-400">Brain</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              AI-powered cybersecurity platform connecting individuals and organizations with cybersecurity experts for rapid incident response, intelligent threat analysis, and proactive digital protection.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 border border-slate-700/60 hover:border-transparent flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-slate-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-blue-600 border border-slate-700/60 hover:border-transparent flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-emerald-600 border border-slate-700/60 hover:border-transparent flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column B: Platform */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/platform/jeztbrainspider" className="hover:text-white transition-colors">
                  JeztBrainSpider
                </Link>
              </li>
              <li>
                <Link to="/user-dashboard" className="hover:text-white transition-colors">
                  Enterprise Dashboard
                </Link>
              </li>
              <li>
                <Link to="/platform/jeztbrainspider" className="hover:text-white transition-colors">
                  AI Intelligence Core
                </Link>
              </li>
              <li>
                <Link to="/experts" className="hover:text-white transition-colors">
                  Expert Connect
                </Link>
              </li>
            </ul>
          </div>

          {/* Column C: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/report" className="hover:text-white transition-colors">
                  Incident Response
                </Link>
              </li>
              <li>
                <Link to="/startup-security" className="hover:text-white transition-colors">
                  Penetration Testing
                </Link>
              </li>
              <li>
                <Link to="/platform/jeztbrainspider" className="hover:text-white transition-colors">
                  Threat Intelligence
                </Link>
              </li>
              <li>
                <Link to="/startup-security" className="hover:text-white transition-colors">
                  Vulnerability Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column D: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About JeztBrain
                </Link>
              </li>
              <li>
                <Link to="/experts" className="hover:text-white transition-colors">
                  Experts & Labs
                </Link>
              </li>
              <li>
                <Link to="/about#research" className="hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column E: Connect */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/chat" className="hover:text-white transition-colors">
                  Talk to an Expert
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <XIcon className="w-3 h-3 text-slate-300" />
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>&copy; 2026 JeztBrain. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p className="text-slate-400 font-mono text-[11px]">Built for Active Digital Defense.</p>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/about#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/about#security" className="hover:text-white transition-colors">
              Security Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
