import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnterpriseFooter() {
  return (
    <footer className="relative bg-slate-950 pt-20 pb-12 text-slate-400 z-20 font-sans border-t border-slate-800 overflow-hidden">
      
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16 text-left">
          
          {/* Brand & Corporate Intro */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white font-sans">
                Jezt<span className="text-purple-400">Brain</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              AI-powered cybersecurity platform linking individuals and enterprise organizations directly to verified cybersecurity specialists for immediate incident response and proactive defense.
            </p>
          </div>

          {/* Column 1: Platforms */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">PLATFORMS</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/platform/jeztbrainspider" className="hover:text-purple-400 transition-colors">JeztBrainSpider</Link></li>
              <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Enterprise Dashboard</Link></li>
              <li><Link to="/platform/jeztbrainspider" className="hover:text-purple-400 transition-colors">AI Intelligence Core</Link></li>
              <li><Link to="/chat" className="hover:text-purple-400 transition-colors">Expert Connect Triage</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">SERVICES</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Incident Response</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Penetration Testing</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Threat Intelligence</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Vulnerability Assessment</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Experts */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">EXPERTS & LABS</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About JeztBrain</Link></li>
              <li><Link to="/experts" className="hover:text-purple-400 transition-colors">Vetted Expert Network</Link></li>
              <li><a href="#research" className="hover:text-purple-400 transition-colors">Research Labs</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-colors">Dispatch Channel</a></li>
            </ul>
          </div>

          {/* Column 4: Compliance */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">COMPLIANCE</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-slate-400">SOC 2 Type II Certified</li>
              <li className="text-slate-400">ISO/IEC 27001:2022</li>
              <li className="text-slate-400">HIPAA & GDPR Ready</li>
              <li className="text-slate-400">256-Bit Telemetry Encryption</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 JeztBrain Inc. All rights reserved. Built for Active Digital Defense.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
