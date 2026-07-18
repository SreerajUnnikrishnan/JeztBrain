import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you. A security incident commander has been queued. An analyst will contact you shortly.');
    setFormData({ name: '', email: '', org: '', message: '' });
  };

  return (
    <section className="relative w-full min-h-[850px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/contact_hq.png"
          alt="JeztBrain office reception headquarters lobby"
          className="w-full h-full object-cover object-center filter brightness-95 opacity-80"
        />
        {/* Soft light overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-blue-50/20 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">

          {/* Left Column: Form & Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8 text-left flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
                Direct Dispatch Channel
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
                Initiate Secure <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-[#6C4DFF] to-purple-600">
                  Incident Containment.
                </span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed font-light font-sans">
                Contact our dispatch controllers to immediately schedule emergency assessments or deploy internal Spider Pro instances.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-[540px] bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs outline-none focus:border-blue-500 transition-all font-sans text-slate-800"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs outline-none focus:border-blue-500 transition-all font-sans text-slate-800"
                />
              </div>
              <input
                type="text"
                placeholder="Organization"
                required
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs outline-none focus:border-blue-500 transition-all font-sans text-slate-800"
              />
              <textarea
                placeholder="Describe your active indicators or deployment parameters..."
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs outline-none focus:border-blue-500 transition-all font-sans text-slate-800 resize-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md hover:scale-[1.01]"
              >
                Schedule Consultation
              </button>
            </form>
          </motion.div>

          {/* Right Column: Expert map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8"
          >
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm text-left space-y-6 flex-1 flex flex-col justify-between">

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-400">
                    <Users size={14} className="text-blue-500" />
                    <span>HANDLER AVAILABILITY</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold font-mono animate-pulse">
                    48 ONLINE NOW
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-light">Average Dispatch Time</span>
                    <span className="font-bold text-slate-900 font-mono">1m 42s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-light">Global SOC Status</span>
                    <span className="font-bold text-slate-900 font-mono uppercase text-[10px] text-blue-600">Active Duty</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-light">Crisis Response SLA</span>
                    <span className="font-bold text-slate-950 font-mono flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-green-500" />
                      15m containment
                    </span>
                  </div>
                </div>
              </div>

              {/* Map simulation: Pulsing green active coordinate nodes and orange warning alert lines */}
              <div className="relative w-full h-48 bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden flex items-center justify-center">

                {/* Simulated center coordinate node */}
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 flex items-center justify-center shadow-lg">
                  <div className="absolute w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-35" />
                </div>

                {/* Satellite coordinate dots in green */}
                <div className="absolute top-8 left-12 w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse" />
                <div className="absolute bottom-10 right-16 w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse" />
                <div className="absolute top-16 right-24 w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse" />
                <div className="absolute bottom-16 left-28 w-3 h-3 bg-green-500 rounded-full shadow-md animate-pulse" />

                {/* Warning alert lines in orange/red connecting nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" strokeWidth="1.5">
                  <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#FF7A00" strokeDasharray="3 3" className="opacity-60" />
                  <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#FF7A00" strokeDasharray="3 3" className="opacity-60" />
                  <line x1="25%" y1="25%" x2="40%" y2="80%" stroke="#EF4444" strokeDasharray="2 2" className="opacity-45" />
                </svg>

                <span className="absolute bottom-3 left-3 text-[8px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  SIMULATED ACTIVE DISPATCH PATHS
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-light leading-relaxed">
                Our global command network automatically assigns your containment request to the closest regional handler to verify compliance and coordinate local responses.
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
