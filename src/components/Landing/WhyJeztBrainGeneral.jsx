import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Activity, Users, Lock, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyJeztBrainGeneral() {
  // Key Highlights with custom icons and color schemes (Tailored for dark backdrop)
  const highlights = [
    {
      title: "Verified Cybersecurity Experts",
      icon: ShieldCheck,
      color: "text-indigo-400",
      bg: "bg-indigo-950/40",
      border: "border-indigo-800/30",
    },
    {
      title: "AI-Powered Threat Analysis",
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-950/40",
      border: "border-blue-800/30",
    },
    {
      title: "Rapid Incident Response",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-850/30",
    },
    {
      title: "Real-Time Security Guidance",
      icon: Activity,
      color: "text-rose-400",
      bg: "bg-rose-950/40",
      border: "border-rose-800/30",
    },
    {
      title: "Individual & Enterprise Support",
      icon: Users,
      color: "text-sky-400",
      bg: "bg-sky-950/40",
      border: "border-sky-800/30",
    },
    {
      title: "Privacy-First Protection",
      icon: Lock,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-800/30",
    }
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] // easeOutCubic
      }
    }
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white py-24 lg:py-32 font-sans border-b border-slate-900">

      {/* Full-width background image with overlays */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img 
          src="/images/cybersecurity_servers_hd.png" 
          alt="JeztBrain Cybersecurity AI Analysis & Servers" 
          className="w-full h-full object-cover object-center contrast-[1.08] brightness-[1.10]"
          style={{ imageRendering: 'high-quality' }}
        />
        {/* Clean left-to-right gradient: dark on left for text legibility, completely transparent on right for raw visual clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/65 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading and Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-8 text-left bg-slate-950/70 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
          >
            {/* Tag Badge */}
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-850/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Incident Containment
            </motion.div>

            {/* Headings */}
            <div className="space-y-4">
              <motion.h2
                variants={fadeUpVariants}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sora leading-tight"
              >
                When Every Second Matters, <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                  Every Decision Counts.
                </span>
              </motion.h2>

              <motion.h3
                variants={fadeUpVariants}
                className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed font-sora"
              >
                Cyberattacks happen in seconds. JeztBrain connects you with AI-powered analysis and verified cybersecurity experts for faster, smarter incident response.
              </motion.h3>
            </div>

            {/* Content Paragraph */}
            <motion.div
              variants={fadeUpVariants}
              className="text-slate-200 text-base md:text-lg leading-relaxed font-light"
            >
              <p>
                When cyber threats strike, every minute counts. JeztBrain helps individuals and businesses detect threats, understand risks, and connect directly with trusted cybersecurity professionals through one intelligent platform.
              </p>
            </motion.div>

            {/* Key Highlights Grid */}
            <div className="space-y-4 pt-2">
              <motion.h4
                variants={fadeUpVariants}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono"
              >
                Key Highlights
              </motion.h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={`highlight-${idx}`}
                      variants={highlightItemVariants}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 hover:bg-slate-900/70 border border-white/10 transition-colors duration-200"
                    >
                      <div className={`p-2 rounded-lg ${highlight.bg} ${highlight.color} shrink-0`}>
                        <Icon size={16} />
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-white leading-tight">
                        {highlight.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Statement Card */}
            <motion.div
              variants={fadeUpVariants}
              className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/80 to-purple-950/60 p-6"
            >
              {/* Subtle design element */}
              <div className="absolute right-3 bottom-1 text-indigo-900 pointer-events-none opacity-20">
                <Quote size={80} />
              </div>
              <div className="relative z-10 flex gap-4 items-center">
                <div className="p-2 bg-indigo-950 rounded-lg border border-indigo-800 shrink-0 text-indigo-400 shadow-sm hidden sm:block">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-xl md:text-2xl font-extrabold text-indigo-100 tracking-tight font-sora leading-tight">
                  Protect Faster. Respond Smarter. Recover Stronger.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUpVariants} className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200"
              >
                Get Support Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 text-slate-200 text-sm font-semibold border border-white/5 hover:bg-slate-800 active:scale-95 transition-all duration-200"
              >
                Learn More
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Column: Spacer to let the background image shine through */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>
      </div>
    </section>
  );
}
