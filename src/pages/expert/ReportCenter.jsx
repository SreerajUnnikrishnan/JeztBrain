import React from 'react';
import AIReportGenerator from '../../components/reports/AIReportGenerator';

export default function ReportCenter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">AI_Intel_Report_Center_V4</h2>
      </div>
      
      <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <AIReportGenerator />
      </div>
    </div>
  );
}
