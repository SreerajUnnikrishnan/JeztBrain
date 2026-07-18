import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Shield, Clock, CheckCircle,
  MessageSquare, Star, Zap, Cpu, Activity,
  Lock, Globe, ArrowRight, User as UserIcon, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const mockExperts = [
  {
    id: 'expert-1',
    name: 'Nida',
    role: 'Penetration Tester',
    trustScore: 98,
    status: 'online',
    skills: ['Network Security', 'Web Exploitation', 'Python'],
    experience: '12 years',
    certifications: ['OSCP', 'CISSP', 'GXPN'],
    bio: 'Elite offensive security specialist with over a decade of experience in high-stakes penetration testing and red teaming.',
    specialization: 'Advanced Persistent Threats (APT) Simulation',
    availability: 'Available for high-priority missions'
  },
  {
    id: 'expert-2',
    name: 'Abin',
    role: 'SOC Analyst',
    trustScore: 95,
    status: 'busy',
    skills: ['Intrusion Detection', 'SIEM', 'Threat Hunting'],
    experience: '8 years',
    certifications: ['GCIA', 'GCIH', 'CompTIA CySA+', 'CompTIA Pentest+'],
    bio: 'Deep-dive analyst focused on identifying stealthy intrusions and maintaining zero-trust network integrity.',
    specialization: 'Traffic Pattern Analysis & Anomaly Detection',
    availability: 'Operational on active incident'
  },
  {
    id: 'expert-3',
    name: 'Anand',
    role: 'Malware Expert',
    trustScore: 99,
    status: 'online',
    skills: ['Reverse Engineering', 'Assembly', 'Kernel Debugging'],
    experience: '15 years',
    certifications: ['GREM', 'CREA'],
    bio: 'Digital pathologist specializing in the deconstruction of sophisticated ransomware and state-sponsored malware.',
    specialization: 'Heuristic Engine Development & Payload Analysis',
    availability: 'Ready for emergency triage'
  },
  {
    id: 'expert-4',
    name: 'Viahnu',
    role: 'Cloud Architect',
    trustScore: 92,
    status: 'offline',
    skills: ['AWS Security', 'Kubernetes', 'Serverless'],
    experience: '10 years',
    certifications: ['AWS Certified Security', 'CCSP'],
    bio: 'Infrastructure specialist building impenetrable cloud architectures for global-scale enterprise operations.',
    specialization: 'Multi-cloud Governance & Automated Compliance',
    availability: 'Offline - Routine Maintenance'
  },
  {
    id: 'expert-5',
    name: 'Sreeraj',
    role: 'Cryptographer',
    trustScore: 97,
    status: 'online',
    skills: ['Post-Quantum Crypto', 'Zero Knowledge', 'Rust'],
    experience: '9 years',
    certifications: ['PhD Mathematics', 'CISSP'],
    bio: 'Mathematical security expert implementing next-generation encryption standards for sensitive data protection.',
    specialization: 'Privacy-Preserving Computation & Protocol Design',
    availability: 'Uplink established'
  }
];

export default function FindExperts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [experts, setExperts] = useState(mockExperts);
  const [selectedExpert, setSelectedExpert] = useState(mockExperts[0]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const roles = ['All', 'Penetration Tester', 'SOC Analyst', 'Malware Expert', 'Cloud Architect', 'Cryptographer'];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'All' || expert.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Cyber Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Header & Search */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">Hacker <span className="text-fuchsia-400">Marketplace</span></h1>
                  <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">Connect with elite cybersecurity agents</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="Search by name or skill..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-fuchsia-500/50 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-2xl py-3 px-6 text-sm appearance-none outline-none focus:border-fuchsia-500/50 cursor-pointer pr-10"
                    >
                      {roles.map(r => <option key={r} value={r} className="bg-[#0B0F19]">{r}</option>)}
                    </select>
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20">
                    <UserIcon className="text-fuchsia-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">1,240+</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Agents</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Shield className="text-purple-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">99.8%</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Success Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Zap className="text-emerald-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">&lt;15m</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Response Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExperts.map(expert => (
                <motion.div
                  key={expert.id}
                  layoutId={expert.id}
                  onClick={() => setSelectedExpert(expert)}
                  className={`bg-white/5 border p-6 rounded-3xl backdrop-blur-xl cursor-pointer transition-all group ${selectedExpert?.id === expert.id ? 'border-fuchsia-500 shadow-[0_0_30px_rgba(123, 47, 247,0.1)]' : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                      <div className={`absolute -inset-1 rounded-2xl blur-md transition-opacity ${expert.status === 'online' ? 'bg-emerald-500 opacity-20 group-hover:opacity-40' :
                        expert.status === 'busy' ? 'bg-amber-500 opacity-20' : 'bg-slate-500 opacity-10'
                        }`} />
                      <div className="relative w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://ui-avatars.com/api/?name=${expert.name}&background=030712&color=22d3ee&font-size=0.4&bold=true`}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#030712] ${expert.status === 'online' ? 'bg-emerald-500' :
                        expert.status === 'busy' ? 'bg-amber-500' : 'bg-slate-500'
                        }`} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end text-fuchsia-400 font-bold text-lg">
                        <Activity size={16} />
                        {expert.trustScore}
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Trust Score</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">{expert.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mb-6 uppercase tracking-widest">{expert.role}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {expert.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-sm hover:bg-fuchsia-500 hover:text-black hover:border-fuchsia-500 transition-all active:scale-95">
                    Establish Connection
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="lg:w-[450px]">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                {selectedExpert && (
                  <motion.div
                    key={selectedExpert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-2xl shadow-2xl"
                  >
                    <div className="h-32 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123, 47, 247,0.1),transparent)]" />
                    </div>

                    <div className="px-8 pb-8 -mt-16 relative">
                      <div className="w-32 h-32 rounded-3xl bg-black border-4 border-[#030712] overflow-hidden shadow-2xl mb-6">
                        <img
                          src={`https://ui-avatars.com/api/?name=${selectedExpert.name}&background=030712&color=22d3ee&font-size=0.4&bold=true`}
                          alt={selectedExpert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-1">{selectedExpert.name}</h2>
                          <p className="text-fuchsia-400 font-mono text-sm uppercase tracking-[0.2em]">{selectedExpert.role}</p>
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                          {selectedExpert.status}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">Tactical Biography</p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {selectedExpert.bio}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Experience</p>
                            <p className="text-white font-bold">{selectedExpert.experience}</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Trust Rating</p>
                            <p className="text-fuchsia-400 font-bold">{selectedExpert.trustScore}/100</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">Advanced Specializations</p>
                          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                            <div className="flex items-center gap-3">
                              <CheckCircle size={14} className="text-fuchsia-400" />
                              <span className="text-xs text-slate-300">{selectedExpert.specialization}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock size={14} className="text-fuchsia-400" />
                              <span className="text-xs text-slate-300">{selectedExpert.availability}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">Clearances</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedExpert.certifications.map(cert => (
                              <span key={cert} className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 space-y-4">
                          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-fuchsia-500 text-black font-bold text-sm hover:bg-fuchsia-400 transition-all shadow-[0_0_20px_rgba(123, 47, 247,0.2)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.4)] active:scale-95">
                            <MessageSquare size={18} /> Start Operational Chat
                          </button>
                          <div className="grid grid-cols-2 gap-4">
                            <button className="py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-xs hover:bg-white/10 transition-all">
                              Assign Incident
                            </button>
                            <button className="py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-xs hover:bg-white/10 transition-all">
                              View Activity
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

