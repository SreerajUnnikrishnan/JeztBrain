import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export default function SectionFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is JeztBrain?",
      a: "JeztBrain is an AI-powered cybersecurity ecosystem that directly connects individuals, businesses, and organisations with verified cybersecurity experts during active cyber incidents, threat investigations, and proactive defense deployments."
    },
    {
      q: "How do I contact a cybersecurity expert?",
      a: "You can click 'Talk to an Expert' or 'Dispatch Incident Specialist' anywhere on our platform. You will be immediately routed to a verified tier-3 incident responder in our active triage room with guaranteed containment SLA under 15 minutes."
    },
    {
      q: "What is JeztBrainSpider?",
      a: "JeztBrainSpider is our core automated AI intelligence engine. It continuously monitors network telemetry, correlates complex attack graphs, identifies anomalous behavior, and provides actionable triage insights for expert responders."
    },
    {
      q: "What is Spider Pro?",
      a: "Spider Pro is our enterprise security command centre dashboard. It delivers complete visibility into your organization's security posture, featuring live endpoint monitoring, risk scoring, threat telemetry, and automated compliance reports."
    },
    {
      q: "Can individuals use JeztBrain?",
      a: "Yes! JeztBrain serves both ordinary individuals and large global enterprises. Whether you are dealing with account compromise, phishing, or malware, or managing multi-cloud enterprise servers, JeztBrain provides tailored protection."
    },
    {
      q: "Is my information secure?",
      a: "Absolutely. JeztBrain utilizes 256-bit zero-knowledge encrypted telemetry storage. Our infrastructure is certified under SOC 2 Type II, ISO/IEC 27001:2022, HIPAA, and GDPR standards."
    }
  ];

  return (
    <section className="relative w-full min-h-[800px] flex flex-col justify-center bg-[#F8FAFC] text-slate-900 py-24 md:py-32 font-sans border-b border-slate-200">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-mono font-bold tracking-widest uppercase border border-slate-300 shadow-sm">
            <HelpCircle className="w-4 h-4 text-slate-700" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 font-semibold text-base md:text-lg max-w-2xl mx-auto font-jakarta">
            Clear answers about how JeztBrain combines AI intelligence with human cybersecurity expertise.
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="max-w-4xl mx-auto space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-white border-purple-400 shadow-md' : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900 font-space-grotesk flex items-center gap-3">
                    <span className="text-sm font-mono text-purple-700 font-bold">0{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-700' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 text-sm md:text-base leading-relaxed font-normal border-t border-slate-100">
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
