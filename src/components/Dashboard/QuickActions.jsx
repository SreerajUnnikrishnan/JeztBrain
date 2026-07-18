import React, { useState } from 'react';
import { Terminal, Cpu, FileText, Zap } from 'lucide-react';
import TerminalModal from './TerminalModal';
import InvestigationPanel from './InvestigationPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import ReportModal from './ReportModal';

export default function QuickActions() {
  const [activeModal, setActiveModal] = useState(null);

  const actions = [
    { id: 'investigation', label: 'Start Investigation', icon: <Zap size={18} />, primary: true },
    { id: 'terminal', label: 'Open Terminal', icon: <Terminal size={18} />, primary: false },
    { id: 'ai', label: 'Run AI Analysis', icon: <Cpu size={18} />, primary: false },
    { id: 'report', label: 'Generate Report', icon: <FileText size={18} />, primary: false },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            id={`btn-${action.id}`}
            onClick={() => setActiveModal(action.id)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${
              action.primary 
                ? 'bg-fuchsia-500 hover:bg-fuchsia-400 text-[#030712] shadow-[0_0_20px_rgba(123, 47, 247,0.2)]' 
                : 'bg-[#030712]/50 border border-white/10 text-white hover:bg-white/10 hover:border-fuchsia-500/50'
            }`}
          >
            <span className={`${action.primary ? 'text-[#030712]' : 'text-fuchsia-400 group-hover:scale-110 transition-transform'}`}>
              {action.icon}
            </span>
            {action.label}
          </button>
        ))}
      </div>

      <InvestigationPanel isOpen={activeModal === 'investigation'} onClose={() => setActiveModal(null)} />
      <TerminalModal isOpen={activeModal === 'terminal'} onClose={() => setActiveModal(null)} />
      <AIAnalysisPanel isOpen={activeModal === 'ai'} onClose={() => setActiveModal(null)} />
      <ReportModal isOpen={activeModal === 'report'} onClose={() => setActiveModal(null)} />
    </div>
  );
}
