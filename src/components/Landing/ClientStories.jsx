import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "When we detected active compromises in our core staging databases, JeztBrain's emergency dispatcher connected us to an elite analyst in less than three minutes. They contained the threat vector and restored our servers with zero operational downtime.",
      author: "Douglas Miller",
      title: "Vice President of Infrastructure",
      org: "Vanguard Retail Systems",
      impact: "Containment in 14 minutes"
    },
    {
      quote: "Deploying Spider Pro within our cloud environment has revolutionized our perimeter auditing. We now possess real-time attribution and risk scoring metrics that enable us to intercept adversary campaigns before they reach staging.",
      author: "Samantha Thorne",
      title: "Chief Information Security Officer",
      org: "Helix Global Logistics",
      impact: "100% Threat Visibility"
    },
    {
      quote: "The direct access model is exactly what the industry has been missing. Being able to communicate immediately with certified engineers rather than wading through tiers of automated ticket queues has saved us countless recovery hours.",
      author: "Christopher Vance",
      title: "Head of Platform Reliability",
      org: "Egis Financial Holdings",
      impact: "90% Reduction in Incident Latency"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative w-full min-h-[650px] flex items-center justify-center text-slate-800 overflow-hidden py-24 md:py-32 font-sans border-b border-slate-100 bg-[#F9FAFB]">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/command_center_team.png"
          alt="JeztBrain cybersecurity meeting room and command room"
          className="w-full h-full object-cover object-center brightness-95 opacity-80"
        />
        {/* White and Gray overlay - high transparency */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/96 via-white/92 to-slate-100/30 z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        
        {/* Header Block */}
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-bold tracking-wider uppercase border border-slate-300">
            Customer Validation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-space-grotesk">
            Proven Operations.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Trusted Corporate Stories.
            </span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Read how leading enterprises leverage JeztBrain's expert handlers and AI threat tracking to secure critical workflows.
          </p>
        </div>

        {/* Testimonials Slider Area */}
        <div className="max-w-4xl mx-auto mt-12 bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-left relative min-h-[380px] flex flex-col justify-between">
          <div className="absolute top-8 right-8 text-slate-100 pointer-events-none">
            <Quote size={80} strokeWidth={1} />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 pr-6"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 stroke-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-base md:text-lg md:leading-relaxed font-light italic">
                  "{testimonials[activeIndex].quote}"
                </p>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-slate-900 font-space-grotesk tracking-tight uppercase">
                      {testimonials[activeIndex].author}
                    </h4>
                    <p className="text-xs text-slate-500 font-light mt-0.5">
                      {testimonials[activeIndex].title} — <span className="font-bold text-slate-700">{testimonials[activeIndex].org}</span>
                    </p>
                  </div>

                  <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-150 text-[10px] font-mono font-bold tracking-wider uppercase shrink-0 self-start sm:self-center">
                    Impact: {testimonials[activeIndex].impact}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    activeIndex === idx ? "bg-purple-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors bg-white shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors bg-white shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
