import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function EnterpriseFooter() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you. You have been subscribed to JeztBrain threat briefings.');
  };

  return (
    <footer className="relative bg-black pt-24 pb-12 text-slate-400 z-20 font-sans border-t border-slate-900 overflow-hidden">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/images/hq_building_night.jpg"
          alt="Night drone view of JeztBrain offices and building headquarters"
          className="w-full h-full object-cover object-center filter brightness-[0.25]"
        />
        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16 text-left">
          
          {/* Brand & Corporate Intro */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C4DFF]/10 border border-[#6C4DFF]/20 flex items-center justify-center text-[#6C4DFF]">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white font-space-grotesk">
                JeztBrain
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              Premium AI-powered cybersecurity platform linking organizations directly to verified experts for instant containment, response, and forensics.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
  
          {/* Link Columns */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-wider font-space-grotesk">Platform</h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Ecosystem Core</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">JeztBrainSpider</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Spider Pro Dashboard</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Developer APIs</a></li>
            </ul>
          </div>
  
          {/* Link Columns */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-wider font-space-grotesk">Services</h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Incident Response</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Threat Hunting</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Malware Analysis</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Digital Forensics</a></li>
            </ul>
          </div>
  
          {/* Link Columns */}
          <div>
            <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-wider font-space-grotesk">Intelligence</h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Research Laboratory</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Vetted Experts Registry</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">Security Advisories</a></li>
              <li><a href="#" className="hover:text-[#6C4DFF] transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-space-grotesk">Threat Briefings</h4>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              Subscribe to receive verified adversary profiling updates and zero-day threat bulletins from our research lab.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Business Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs outline-none focus:border-purple-500 transition-colors font-sans text-slate-200"
              />
              <button
                type="submit"
                className="px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center animate-pulse"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom Socials & Copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="text-[9px] font-mono tracking-[0.2em] text-slate-500 uppercase font-bold text-center sm:text-left">
            Unified Threat Hunting, Forensics & Active Response
          </div>

          <div className="text-xs text-slate-500 font-light">
            © {new Date().getFullYear()} JeztBrain. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
