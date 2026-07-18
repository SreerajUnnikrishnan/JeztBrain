import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How does JeztBrain differ from traditional cybersecurity vendors?",
      a: "Traditional vendors sell software licenses but leave response triage to your overloaded internal teams. JeztBrain combines our advanced AI discovery engines (like JeztBrainSpider) with direct access to vetted, on-demand incident handlers who carry out active containment and systems recovery within minutes of alert propagation.",
      color: "border-purple-500/50",
      text: "text-purple-600"
    },
    {
      q: "What is the response time guarantee for critical security incidents?",
      a: "For critical events (Active Ransomware, Database Leaks, Business Email Compromise), our dispatch system targets an initial expert triage window of under five minutes, with active remediation playbooks executed within fifteen minutes of expert assignment.",
      color: "border-orange-500/50",
      text: "text-orange-600"
    },
    {
      q: "Where is Spider Pro deployed, and do you keep our data?",
      a: "Spider Pro is deployed inside your own perimeter (Cloud VPC, on-premises virtualization, or hybrid cluster nodes). It operates under strict local sovereignty rules. None of your raw telemetry metadata, credentials, or payloads are forwarded to JeztBrain servers.",
      color: "border-green-500/50",
      text: "text-green-600"
    },
    {
      q: "How are the cybersecurity experts vetted?",
      a: "Every expert in our network undergoes detailed background screening, biometric security credentialing, and maintains active certifications (GCIH, GREM, CISSP, OSCP) with verified track records in corporate SOC containment operations.",
      color: "border-blue-500/50",
      text: "text-blue-600"
    },
    {
      q: "Can we integrate JeztBrain threat intelligence into our existing SIEM?",
      a: "Yes. JeztBrain provides comprehensive API endpoints that stream threat actor attribution data, dynamic indicators of compromise (IOCs), and adversary infrastructure maps compiled by JeztBrainSpider directly into your security stack.",
      color: "border-purple-500/50",
      text: "text-purple-600"
    }
  ];

  return (
    <section className="relative w-full min-h-[750px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-white">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/capabilities_malware_analysis.png"
          alt="JeztBrain secure malware analysis laboratory"
          className="w-full h-full object-cover object-center brightness-95 opacity-80"
        />
        {/* Modern light white/gray gradient overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-slate-100/30 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">

        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-bold tracking-wider uppercase border border-slate-350">
            Platform Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Frequently Asked <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Security Questions.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Understand how our platform scales, our security posture details, and our expert dispatch protocols.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white/90 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 text-left ${isOpen ? faq.color : "border-slate-200 hover:border-slate-300"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`shrink-0 ${isOpen ? faq.text : "text-slate-400"}`} size={18} />
                    <span className={`font-bold text-sm md:text-base font-space-grotesk tracking-wide uppercase leading-tight ${isOpen ? faq.text : "text-slate-900"
                      }`}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 border-t border-slate-100 text-xs md:text-sm text-slate-500 font-light leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
