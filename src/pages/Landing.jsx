import React from 'react';
import { useAuth } from '../context/AuthContext';

// Import 15 Premium Homepage Sections
import EnterpriseHero from '../components/EnterpriseHero'; // Section 1
import WhyJeztBrainGeneral from '../components/Landing/WhyJeztBrainGeneral'; // Section 2
import MissionAndVision from '../components/Landing/MissionAndVision'; // Section 3
import EnterpriseServices from '../components/Landing/EnterpriseServices'; // Section 4
import JeztBrainSpiderSection from '../components/Landing/JeztBrainSpiderSection'; // Section 7
import SpiderPro from '../components/Landing/SpiderPro'; // Section 8
import WhyJeztBrain from '../components/Landing/WhyJeztBrain'; // Section 9
import ResearchLab from '../components/Landing/ResearchLab'; // Section 10
import FaqSection from '../components/Landing/FaqSection'; // Section 13
import ContactSection from '../components/Landing/ContactSection'; // Section 14
import EnterpriseFooter from '../components/Landing/EnterpriseFooter'; // Section 15

export default function Landing() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-[#6C4DFF]/30 selection:text-white overflow-x-hidden relative">

      {/* Subtle global cyber grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.0015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.0015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0 opacity-20" />

      {/* SECTION 1: HERO */}
      <EnterpriseHero />

      {/* SECTION 2: WHY JEZTBRAIN */}
      <WhyJeztBrainGeneral />

      {/* SECTION 3: MISSION & VISION */}
      <MissionAndVision />

      {/* SECTION 4: SERVICES */}
      <EnterpriseServices />

      {/* SECTION 7: JEZTBRAINSPIDER */}
      <JeztBrainSpiderSection />

      {/* SECTION 8: SPIDER PRO */}
      <div id="spider-pro">
        <SpiderPro />
      </div>

      {/* SECTION 9: WHY CHOOSE JEZTBRAIN */}
      <WhyJeztBrain />

      {/* SECTION 10: RESEARCH LAB */}
      <ResearchLab />

      {/* SECTION 13: FAQ */}
      <FaqSection />

      {/* SECTION 14: CONTACT */}
      <ContactSection />

      {/* SECTION 15: FOOTER */}
      <EnterpriseFooter />

    </div>
  );
}
