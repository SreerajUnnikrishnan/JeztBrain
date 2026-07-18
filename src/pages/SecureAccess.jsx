import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Terminal, Loader2, AlertCircle, CheckCircle2, Cpu, RefreshCcw, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecureAccess() {
  const [unikey, setUnikey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { user, role, verifyUnikey, isVerified, generateAndSendUnikey } = useAuth();
  const navigate = useNavigate();
  const logContainerRef = useRef(null);

  // Redirect if already verified or not an expert
  useEffect(() => {
    if (isVerified) {
      navigate('/expert-dashboard');
    }
    if (role === 'user') {
      navigate('/dashboard');
    }
  }, [isVerified, role, navigate]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), msg, type, time: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleRequestOTP = async (isInitial = false) => {
    if (!user?.email || (countdown > 0 && !isInitial)) return;

    setIsResending(true);
    addLog(isInitial ? 'Requesting initial access vector...' : 'Regenerating secure access vector...', 'warning');
    
    const result = await generateAndSendUnikey(user.email);
    
    if (result.success) {
      addLog(`UNIKEY_TRANSMITTED: Encrypted code sent to ${user.email}`, 'success');
      setCountdown(60); // 1 minute cooldown
    } else {
      addLog('TRANSMISSION_FAILED: Error in key generation.', 'error');
      setError('Failed to send verification code.');
    }
    setIsResending(false);
  };

  useEffect(() => {
    addLog('System Initialization...', 'info');
    addLog('Establishing secure tunnel to SOC v4.0...', 'info');
    
    if (user?.email) {
      handleRequestOTP(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (unikey.length !== 6 || isVerifying) return;

    setIsVerifying(true);
    setError('');
    addLog(`Decrypting access vector [${unikey}]...`, 'info');

    // Verification steps
    const fakeSteps = [
      'Querying secure key store...',
      'Validating timestamp integrity...',
      'Comparing hash vectors...'
    ];

    for (const step of fakeSteps) {
      await new Promise(r => setTimeout(r, 400));
      addLog(step, 'info');
    }

    const isValid = await verifyUnikey(unikey);

    if (isValid) {
      addLog('ACCESS_GRANTED: Signature verified.', 'success');
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/expert-dashboard');
      }, 1500);
    } else {
      setIsVerifying(false);
      setError('INVALID_KEY: Authentication rejected.');
      addLog('ACCESS_DENIED: Unauthorized or expired key.', 'error');
      setUnikey('');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Matrix background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,47,247,0.1),transparent)]"></div>
        <div className="grid grid-cols-12 h-full gap-4 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-purple-500/20 h-full"></div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-black/40 border border-white/10 rounded-[32px] backdrop-blur-2xl p-8 relative z-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-fuchsia-600"></div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 shadow-[0_0_15px_rgba(123,47,247,0.2)]">
                <Shield size={24} className="text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">SOC Uplink</h1>
                <p className="text-[10px] text-purple-500/60 uppercase tracking-widest font-bold">Unikey OTP Verification</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Mail size={18} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Target Address</p>
                <p className="text-sm text-white font-bold">{user?.email || 'N/A'}</p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">6-Digit Unikey</label>
                  <button 
                    type="button"
                    onClick={() => handleRequestOTP()}
                    disabled={countdown > 0 || isResending}
                    className="text-[10px] font-bold text-purple-400 hover:text-purple-300 disabled:text-slate-600 flex items-center gap-1 transition-colors"
                  >
                    {isResending ? <Loader2 size={10} className="animate-spin" /> : <RefreshCcw size={10} />}
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Key'}
                  </button>
                </div>
                
                <div className="relative group/input">
                  <input 
                    type="text" 
                    maxLength={6}
                    value={unikey}
                    onChange={(e) => setUnikey(e.target.value.replace(/\D/g, ''))}
                    disabled={isVerifying || isSuccess}
                    className={`w-full py-5 bg-white/5 border rounded-2xl text-center text-3xl font-bold tracking-[0.8em] outline-none transition-all ${
                      error ? 'border-red-500/50 text-red-500 bg-red-500/5' : 
                      isSuccess ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' :
                      'border-white/10 text-white focus:border-purple-500/50 focus:bg-purple-500/5'
                    }`}
                    placeholder="000000"
                  />
                  
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-1 text-[10px] text-red-400 font-bold uppercase tracking-widest">
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isVerifying || isSuccess || unikey.length !== 6}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-3 transition-all ${
                  isSuccess ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]' :
                  isVerifying ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                  'bg-purple-500 hover:bg-purple-400 text-black shadow-[0_0_20px_rgba(123,47,247,0.2)] hover:shadow-[0_0_30px_rgba(123,47,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Sig...</>
                ) : isSuccess ? (
                  <><CheckCircle2 className="w-5 h-5" /> Signature Accepted</>
                ) : (
                  <>Establish Link</>
                )}
              </button>
            </form>
          </div>

          {/* Right Side (Terminal) */}
          <div className="w-full md:w-72 flex flex-col h-64 md:h-auto">
            <div className="flex items-center gap-2 mb-3 px-1">
              <Terminal size={14} className="text-purple-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operation Log</span>
            </div>
            <div 
              ref={logContainerRef}
              className="flex-1 bg-black/60 rounded-2xl p-4 font-mono text-[9px] overflow-y-auto space-y-2 border border-white/5 custom-scrollbar"
            >
              {logs.map(log => (
                <div key={log.id} className="leading-tight">
                  <span className="text-slate-700 mr-2">[{log.time}]</span>
                  <span className={
                    log.type === 'error' ? 'text-red-500' :
                    log.type === 'success' ? 'text-emerald-500' :
                    log.type === 'warning' ? 'text-amber-500' :
                    'text-purple-500/80'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
              {isVerifying && <div className="text-purple-500 animate-pulse">_</div>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

