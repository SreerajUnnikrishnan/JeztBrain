import React from 'react';
import { useAuth } from '../context/AuthContext';

// Import 12 Storytelling Sections
import SectionHero from '../components/Landing/SectionHero'; // Section 1: Hero (Dark Navy, Blue, Purple)
import SectionWhyJeztBrain from '../components/Landing/SectionWhyJeztBrain'; // Section 2: Why JeztBrain (Dark Blue, Purple)
import MissionAndVision from '../components/Landing/MissionAndVision'; // Section 3: Ecosystem (White, Light Grey, Purple)
import SectionExpertConnect from '../components/Landing/SectionExpertConnect'; // Section 4: Expert Connect (Purple, Blue)
import JeztBrainSpiderSection from '../components/Landing/JeztBrainSpiderSection'; // Section 5: JeztBrainSpider (Black, Red)
import SpiderPro from '../components/Landing/SpiderPro'; // Section 6: Spider Pro (White, Blue)
import EnterpriseServices from '../components/Landing/EnterpriseServices'; // Section 7: Cyber Services (Dark Navy)
import ResearchLab from '../components/Landing/ResearchLab'; // Section 8: Research Labs (White, Soft Blue)
import SectionIndustries from '../components/Landing/SectionIndustries'; // Section 9: Industries (Blue)
import SectionTrustAdvantages from '../components/Landing/SectionTrustAdvantages'; // Section 10: Trust & Advantages (Clean Slate, Emerald)
import SectionFinalCTA from '../components/Landing/SectionFinalCTA'; // Section 12: CTA (Midnight Navy, Emerald)
import EnterpriseFooter from '../components/Landing/EnterpriseFooter'; // Footer (Black)

export default function Landing() {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-100 overflow-x-hidden relative">

      {/* SECTION 1: HERO */}
      <SectionHero />

      {/* SECTION 2: WHY JEZTBRAIN */}
      <SectionWhyJeztBrain />

      {/* SECTION 3: THE JEZTBRAIN ECOSYSTEM */}
      <MissionAndVision />

      {/* SECTION 4: EXPERT CONNECT */}
      <SectionExpertConnect />

      {/* SECTION 5: JEZTBRAINSPIDER */}
      <JeztBrainSpiderSection />

      {/* SECTION 6: SPIDER PRO */}
      <SpiderPro />

      {/* SECTION 7: CYBERSECURITY SERVICES */}
      <EnterpriseServices />

      {/* SECTION 8: RESEARCH & INNOVATION */}
      <ResearchLab />

      {/* SECTION 9: INDUSTRIES WE PROTECT */}
      <SectionIndustries />

      {/* SECTION 10: WHY ORGANISATIONS TRUST JEZTBRAIN */}
      <SectionTrustAdvantages />

      {/* SECTION 12: CALL TO ACTION */}
      <SectionFinalCTA />

      {/* FOOTER */}
      <EnterpriseFooter />

    </div>
  );
}
