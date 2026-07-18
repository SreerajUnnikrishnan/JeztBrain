import React, { useState, useEffect, useCallback } from 'react';
import { 
  Coins, Award, Clock, ArrowUpRight, TrendingUp, Wallet, 
  CheckCircle, AlertCircle, Sparkles, Loader2, ArrowRight, 
  ShieldCheck, HelpCircle, Landmark, CreditCard, Send
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { useAuth, BACKEND_URL } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function RewardsRevenue() {
  const { user, getAccessToken } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rewards'); // 'rewards' | 'badges' | 'payouts'
  
  // Withdrawal Form State
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('upi'); // 'upi' | 'bank_transfer' | 'paypal' | 'razorpay'
  const [withdrawDest, setWithdrawDest] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  // Fetch all stats from backend
  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const token = await getAccessToken();
      const response = await axios.get(`${BACKEND_URL}/api/rewards/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('[Rewards] Fetch Error:', err.message);
      toast.error('Failed to synchronize rewards telemetry.');
    } finally {
      setLoading(false);
    }
  }, [user, getAccessToken]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      toast.error('Please enter a valid payout amount.');
      return;
    }
    if (Number(withdrawAmount) > stats.metrics.availableBalance) {
      toast.error('Amount exceeds your current available withdrawable balance.');
      return;
    }
    if (!withdrawDest) {
      toast.error('Please specify target billing address / gateway destination.');
      return;
    }

    setWithdrawLoading(true);
    const loadingToast = toast.loading('Initiating secure gateway transaction...');
    try {
      const token = await getAccessToken();
      const response = await axios.post(`${BACKEND_URL}/api/rewards/withdraw`, {
        amount: Number(withdrawAmount),
        method: withdrawMethod,
        destination: withdrawDest
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('WITHDRAWAL_SUBMITTED: Processing secure payout.', { id: loadingToast });
        setShowWithdrawModal(false);
        setWithdrawAmount('');
        setWithdrawDest('');
        fetchStats(); // Reload stats to update balance instantly
      }
    } catch (err) {
      console.error('[Withdraw] Error:', err.message);
      toast.error('Transaction Terminated: Bank secure handshake rejected.', { id: loadingToast });
    } finally {
      setWithdrawLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin text-fuchsia-400" size={40} />
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] animate-pulse">Synchronizing Rewards Telemetry...</p>
      </div>
    );
  }

  const { metrics, ledger, payouts, badges, leaderboard, charts } = stats;

  const getMethodIcon = (method) => {
    switch (method) {
      case 'upi': return <Send size={14} className="text-fuchsia-400" />;
      case 'bank_transfer': return <Landmark size={14} className="text-emerald-400" />;
      default: return <CreditCard size={14} className="text-purple-400" />;
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* ─── Header ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(123, 47, 247,0.8)] animate-pulse"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Expert_Compensation_Center</h2>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Rewards_&amp;_Revenue</h1>
        </div>

        {/* Database Sync Status Badge */}
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Database_Uplink</p>
            <p className={`text-xs font-black uppercase ${stats.hasTables ? 'text-emerald-400' : 'text-amber-500'}`}>
              {stats.hasTables ? 'Custom_Tables_Synced' : 'Fallback_Telemetry'}
            </p>
          </div>
          <div className="h-10 w-px bg-white/10 mx-2"></div>
          {stats.hasTables ? (
            <ShieldCheck className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" size={28} />
          ) : (
            <AlertCircle className="text-amber-500 animate-pulse" size={28} />
          )}
        </div>
      </div>

      {/* ─── Metrics Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Earnings Card */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <TrendingUp size={80} className="text-fuchsia-400" />
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Total Earnings</p>
          <p className="text-3xl font-black text-fuchsia-400 tracking-tighter mb-2">₹{metrics.totalEarnings.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 font-mono">
            <span className="text-emerald-400 flex items-center"><ArrowUpRight size={12} /> +{metrics.growthPercentage}%</span>
            <span>growth this month</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Wallet size={80} className="text-emerald-400" />
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Available Balance</p>
          <p className="text-3xl font-black text-emerald-400 tracking-tighter mb-2">₹{metrics.availableBalance.toLocaleString('en-IN')}</p>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            disabled={metrics.availableBalance <= 0}
            className="w-full mt-1.5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:hover:bg-emerald-500 disabled:hover:text-black hover:text-black text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            Withdraw Payout
          </button>
        </div>

        {/* Cases Completed Card */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <CheckCircle size={80} className="text-purple-400" />
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Cases Completed</p>
          <p className="text-3xl font-black text-white tracking-tighter mb-2">{String(metrics.casesCompleted).padStart(2, '0')}</p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 font-mono">
            <span className="text-purple-400 font-black">{metrics.successRate}% Success</span>
            <span>resolution rate</span>
          </div>
        </div>

        {/* Reputation Score Card */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Award size={80} className="text-amber-500" />
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Reputation Score</p>
          <p className="text-3xl font-black text-amber-500 tracking-tighter mb-2">{metrics.reputationScore}%</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 font-mono uppercase">
            <span className="text-white font-black">{metrics.expertRank}</span>
            <span>●</span>
            <span>LVL {metrics.verificationLevel}</span>
          </div>
        </div>
      </div>

      {/* ─── Revenue Analytics Charts ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* area chart */}
        <div className="lg:col-span-8 bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-3">
              <TrendingUp size={14} className="text-fuchsia-400" /> Revenue_History_Monthly
            </h3>
            <span className="text-[9px] font-mono text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-widest">INR_Denominated</span>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.analytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#070B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}
                  itemStyle={{ color: '#22d3ee', fontSize: '12px', fontWeight: 'black' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue Earned']}
                />
                <Area type="monotone" dataKey="earnings" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* severity distribution */}
        <div className="lg:col-span-4 bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-3">
            <Award size={14} className="text-fuchsia-400" /> Case_Severity_Share
          </h3>

          <div className="flex-1 h-[220px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.severity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#070B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" name="Cases Solved" radius={[4, 4, 0, 0]}>
                  {charts.severity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 border-t border-white/5 pt-5">
            {charts.severity.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{entry.name}</p>
                  <p className="text-xs font-mono text-white font-bold leading-none">{entry.value} Cases</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Sub-Console sections ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Tab selectors & Dynamic display panel */}
        <div className="xl:col-span-2 bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
          {/* Tab Selector Header */}
          <div className="flex border-b border-white/5 bg-white/[0.01]">
            {[
              { id: 'rewards', label: 'Rewards Ledger', icon: <Coins size={14} /> },
              { id: 'badges', label: 'Badges & Achievements', icon: <Award size={14} /> },
              { id: 'payouts', label: 'Payout History', icon: <Clock size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-fuchsia-400 bg-fuchsia-400/[0.02] text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content viewport */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'rewards' && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {ledger.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center opacity-30">
                      <Coins size={44} className="text-slate-500 mb-4" />
                      <p className="text-[10px] font-mono uppercase tracking-widest">No_Rewards_Credited_Yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[9px] uppercase tracking-widest text-slate-500 font-black">
                            <th className="pb-3">Ticket</th>
                            <th className="pb-3">Incident Profile</th>
                            <th className="pb-3">Severity</th>
                            <th className="pb-3 text-right">Compensation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {ledger.map((item, idx) => (
                            <tr key={idx} className="text-xs group hover:bg-white/[0.01] transition-colors">
                              <td className="py-4 font-mono text-fuchsia-400 font-bold">#{item.ticket_number}</td>
                              <td className="py-4 text-white font-bold max-w-[200px] truncate">{item.incidenttype}</td>
                              <td className="py-4">
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                  item.severitylevel === 'critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                  item.severitylevel === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                  item.severitylevel === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                  'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                }`}>
                                  {item.severitylevel}
                                </span>
                              </td>
                              <td className="py-4 text-right font-mono text-emerald-400 font-black">
                                +₹{item.reward_amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'badges' && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {badges.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl border transition-all ${
                        item.unlocked 
                          ? 'bg-[#0f1d30]/60 border-fuchsia-400/30 shadow-[0_0_15px_rgba(123, 47, 247,0.05)]' 
                          : 'bg-white/[0.02] border-white/5 opacity-55'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl p-3 bg-black/40 border border-white/10 rounded-2xl select-none">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{item.title}</h4>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-4">{item.description}</p>
                          
                          {/* Progress bar */}
                          <div>
                            <div className="flex justify-between text-[8px] font-mono uppercase text-slate-500 mb-1">
                              <span>Mission Progress</span>
                              <span className={item.unlocked ? 'text-fuchsia-400 font-bold' : ''}>
                                {item.unlocked ? 'UNLOCKED' : `${item.progress}%`}
                              </span>
                            </div>
                            <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  item.unlocked ? 'bg-fuchsia-400' : 'bg-slate-700'
                                }`} 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'payouts' && (
                <motion.div
                  key="payouts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {payouts.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center opacity-30">
                      <Clock size={44} className="text-slate-500 mb-4" />
                      <p className="text-[10px] font-mono uppercase tracking-widest">No_Payout_Records_Found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {payouts.map((item, idx) => (
                        <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl shrink-0">
                              {getMethodIcon(item.payment_method)}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white uppercase leading-none mb-1">
                                {item.payment_method.replace('_', ' ')} withdrawal
                              </p>
                              <p className="text-[9px] text-slate-500 font-mono leading-none">
                                {new Date(item.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-mono text-white font-black leading-none mb-1.5">
                              ₹{item.amount.toLocaleString('en-IN')}
                            </p>
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                              item.payout_status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              item.payout_status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              ● {item.payout_status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Leaderboard Standings */}
        <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <Award size={18} className="text-fuchsia-400" /> Leaderboard_Standings
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="space-y-4 flex-1">
            {leaderboard.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl flex items-center justify-between border relative overflow-hidden transition-all ${
                  item.name === 'expert_analyst'
                    ? 'bg-fuchsia-500/[0.05] border-fuchsia-400/30'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Position Tag */}
                  <span className={`w-6 h-6 rounded-lg font-mono text-[10px] font-black flex items-center justify-center ${
                    item.rank === 1 ? 'bg-amber-500 text-black font-black' :
                    item.rank === 2 ? 'bg-slate-300 text-black' :
                    item.rank === 3 ? 'bg-orange-500 text-black' : 'bg-black/40 text-slate-500'
                  }`}>
                    {item.rank}
                  </span>
                  <div>
                    <p className={`text-xs font-black leading-none mb-1.5 truncate ${item.name === 'expert_analyst' ? 'text-fuchsia-400' : 'text-white'}`}>
                      {item.name === 'expert_analyst' ? 'You (Expert Analyst)' : item.name}
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono leading-none">
                      {item.cases} solved cases ● {item.trust}% trust
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-mono text-white font-black leading-none">
                    ₹{item.revenue.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── SECURE PAYOUT WITHDRAWAL MODAL ─── */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-[#0b1220] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Wallet size={16} className="text-fuchsia-400" /> Secure_Payout_Request
              </h3>

              <form onSubmit={handleWithdraw} className="space-y-5">
                <div>
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Available to Withdraw</label>
                  <p className="text-xl font-black text-emerald-400 font-mono bg-black/40 border border-white/5 px-4 py-3 rounded-2xl">
                    ₹{metrics.availableBalance.toLocaleString('en-IN')}
                  </p>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Withdraw Amount (₹)</label>
                  <input 
                    type="number"
                    min="1"
                    max={metrics.availableBalance}
                    placeholder="Enter amount in ₹..."
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-fuchsia-500/50 rounded-2xl text-sm font-mono text-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">Gateway Payout Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'upi', label: 'UPI Payout', desc: 'Instant UPI' },
                      { id: 'bank_transfer', label: 'Bank NEFT', desc: 'Secure Transfer' },
                      { id: 'paypal', label: 'PayPal Log', desc: 'Global Payout' },
                      { id: 'razorpay', label: 'Razorpay', desc: 'Direct Ledger' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setWithdrawMethod(method.id)}
                        className={`p-3 text-left border rounded-xl transition-all ${
                          withdrawMethod === method.id
                            ? 'bg-fuchsia-500/10 border-fuchsia-400 text-white'
                            : 'bg-black/20 border-white/5 text-slate-500 hover:border-white/10'
                        }`}
                      >
                        <p className="text-[10px] font-black uppercase tracking-tight">{method.label}</p>
                        <p className="text-[8px] opacity-60 font-mono mt-0.5">{method.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                    {withdrawMethod === 'upi' ? 'UPI Virtual ID' : 
                     withdrawMethod === 'bank_transfer' ? 'Bank Account & IFSC details' : 
                     withdrawMethod === 'paypal' ? 'PayPal Email address' : 'Razorpay Billing ID'}
                  </label>
                  <input 
                    type="text"
                    placeholder={
                      withdrawMethod === 'upi' ? 'e.g. expert@okaxis' : 
                      withdrawMethod === 'bank_transfer' ? 'A/C: 123456789, IFSC: SBIN000123' : 
                      withdrawMethod === 'paypal' ? 'e.g. payout@paypal.com' : 'Razorpay gateway address ID...'
                    }
                    value={withdrawDest}
                    onChange={(e) => setWithdrawDest(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 focus:border-fuchsia-500/50 rounded-2xl text-xs font-mono text-white focus:outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={withdrawLoading || !withdrawAmount || Number(withdrawAmount) <= 0 || !withdrawDest}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black disabled:opacity-40 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-1.5"
                  >
                    {withdrawLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                    {withdrawLoading ? 'Authorizing...' : 'Submit Payout'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
