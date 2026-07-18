import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const { login, signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('signup') === 'true') {
      setIsLogin(false);
    }
  }, [location]);

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setError('');
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        // Fallback if needed, but requirements specified Google
        setError('Provider currently not optimized for forced account selection.');
        setSocialLoading(null);
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(err.message || `Failed to authenticate with ${provider}.`);
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setFormLoading(true);
    try {
      if (isLogin) {
        const result = await login(email, password);
        const userRole = result?.role;
        
        const isSpecialist = ['security_specialist', 'network_specialist', 'expert', 'security', 'network'].includes(userRole);
        const isAdmin = userRole === 'admin';

        if (isAdmin) {
          navigate('/admin');
        } else if (isSpecialist) {
          if (userRole === 'network_specialist' || userRole === 'network') {
            navigate('/network-dashboard');
          } else {
            navigate('/expert-dashboard');
          }
        } else if (userRole === 'user') {
          navigate('/user-dashboard');
        } else {
          setError(`Access denied: Unknown role '${userRole}'`);
        }
        return; // Prevent setting formLoading to false to avoid flicker
      } else {
        await signUp(email, password, { 
          displayName: name,
          role: role 
        });
        
        setError('Signup successful. Please check your email for a verification link if required, otherwise try logging in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      let msg = err.message;
      if (msg.includes('User already registered')) msg = 'An account with this email already exists.';
      if (msg.includes('Invalid login credentials')) msg = 'Invalid email or password. Please try again.';
      if (msg.includes('Password should be at least 6 characters')) msg = 'Password is too weak. Must be at least 6 characters.';
      
      setError(msg || 'Authentication failed. Tactical node link interrupted.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#030712] selection:bg-fuchsia-500/30">
      {/* Left side - Tactical Branding */}
      <div className="hidden md:flex flex-1 relative overflow-hidden group border-r border-white/5">
        {/* Startup Cybersecurity Animated Network Visual — replaces generic stock photo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#030A14] via-[#071020] to-[#040C18]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(123, 47, 247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 47, 247,0.07) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#A855F7]/8 rounded-full blur-[110px] animate-pulse" style={{animationDuration:'5s'}} />
          <div className="absolute bottom-1/3 left-16 w-72 h-72 bg-[#7C3AED]/8 rounded-full blur-[130px]" />
          <div className="absolute top-2/3 right-1/3 w-56 h-56 bg-[#00FFB2]/4 rounded-full blur-[90px] animate-pulse" style={{animationDuration:'8s'}} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.18}}>
            <defs>
              <filter id="af-glow">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <line x1="110" y1="220" x2="250" y2="380" stroke="#A855F7" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.5"/>
            <line x1="390" y1="200" x2="250" y2="380" stroke="#A855F7" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.5"/>
            <line x1="85" y1="490" x2="250" y2="380" stroke="#7C3AED" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.5"/>
            <line x1="415" y1="510" x2="250" y2="380" stroke="#7C3AED" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.5"/>
            <line x1="250" y1="590" x2="250" y2="380" stroke="#00FFB2" strokeWidth="0.8" strokeDasharray="5 12" opacity="0.5"/>
            <line x1="155" y1="700" x2="250" y2="590" stroke="#00FFB2" strokeWidth="0.6" strokeDasharray="4 10" opacity="0.35"/>
            <line x1="345" y1="690" x2="250" y2="590" stroke="#00FFB2" strokeWidth="0.6" strokeDasharray="4 10" opacity="0.35"/>
            <circle cx="250" cy="380" r="48" fill="rgba(123, 47, 247,0.03)" stroke="#A855F7" strokeWidth="1.2" filter="url(#af-glow)"/>
            <circle cx="250" cy="380" r="32" fill="rgba(123, 47, 247,0.04)" stroke="#A855F7" strokeWidth="0.7" opacity="0.6"/>
            <text x="250" y="376" fill="#A855F7" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">JEZTBRAIN</text>
            <text x="250" y="388" fill="#00FFB2" fontSize="6" fontFamily="monospace" textAnchor="middle">AI CORE · LIVE</text>
            <circle cx="110" cy="220" r="24" fill="rgba(123, 47, 247,0.04)" stroke="#A855F7" strokeWidth="0.9" filter="url(#af-glow)"/>
            <text x="110" y="217" fill="#A855F7" fontSize="5.5" fontFamily="monospace" textAnchor="middle">API</text>
            <text x="110" y="226" fill="#A855F7" fontSize="5.5" fontFamily="monospace" textAnchor="middle">GATEWAY</text>
            <circle cx="390" cy="200" r="24" fill="rgba(123, 47, 247,0.04)" stroke="#A855F7" strokeWidth="0.9"/>
            <text x="390" y="197" fill="#A855F7" fontSize="5.5" fontFamily="monospace" textAnchor="middle">AUTH0</text>
            <text x="390" y="206" fill="#A855F7" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SERVICE</text>
            <circle cx="85" cy="490" r="24" fill="rgba(124,58,237,0.06)" stroke="#7C3AED" strokeWidth="0.9"/>
            <text x="85" y="487" fill="#7C3AED" fontSize="5.5" fontFamily="monospace" textAnchor="middle">K8S</text>
            <text x="85" y="496" fill="#7C3AED" fontSize="5.5" fontFamily="monospace" textAnchor="middle">CLUSTER</text>
            <circle cx="415" cy="510" r="24" fill="rgba(124,58,237,0.06)" stroke="#7C3AED" strokeWidth="0.9"/>
            <text x="415" y="507" fill="#7C3AED" fontSize="5.5" fontFamily="monospace" textAnchor="middle">SECURE</text>
            <text x="415" y="516" fill="#7C3AED" fontSize="5.5" fontFamily="monospace" textAnchor="middle">DB</text>
            <circle cx="250" cy="590" r="24" fill="rgba(0,255,178,0.04)" stroke="#00FFB2" strokeWidth="0.9"/>
            <text x="250" y="587" fill="#00FFB2" fontSize="5.5" fontFamily="monospace" textAnchor="middle">THREAT</text>
            <text x="250" y="596" fill="#00FFB2" fontSize="5.5" fontFamily="monospace" textAnchor="middle">INTEL</text>
            <circle cx="155" cy="700" r="18" fill="rgba(0,255,178,0.03)" stroke="#00FFB2" strokeWidth="0.7" opacity="0.5"/>
            <text x="155" y="704" fill="#00FFB2" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.65">SIEM</text>
            <circle cx="345" cy="690" r="18" fill="rgba(0,255,178,0.03)" stroke="#00FFB2" strokeWidth="0.7" opacity="0.5"/>
            <text x="345" y="694" fill="#00FFB2" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.65">SOC OPS</text>
            <circle cx="138" cy="205" r="4" fill="#00FFB2" opacity="0.7"/>
            <circle cx="418" cy="185" r="4" fill="#00FFB2" opacity="0.7"/>
            <circle cx="63" cy="474" r="4" fill="#A855F7" opacity="0.7"/>
            <circle cx="441" cy="494" r="4" fill="#FF3B5C" opacity="0.7"/>
            <circle cx="278" cy="575" r="4" fill="#00FFB2" opacity="0.7"/>
          </svg>
          <div className="absolute bottom-10 left-6 right-6 space-y-1.5 pointer-events-none">
            {[
              "> [SHIELD] Brute-force probe 104.18.34.2 — BLOCKED",
              "> [AI] 14,200 IOC signatures matched — CLEAR",
              "> [K8S] Container sweep complete — 0 CVEs",
              "> [SOC] Zero-day threat neutralized in 12ms"
            ].map((line, i) => (
              <div key={i} className="font-mono text-[7px] text-[#A855F7]/22 truncate">{line}</div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0B0F19]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,132,255,0.1),transparent)]"></div>

        <div className="relative z-10 flex flex-col justify-start items-start w-full p-16 pt-32 h-full">
          
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span> Security Operations Center v4.0
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 text-white tracking-tight">
              Secure Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-purple-600">Digital Sovereignty</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed font-light">
              Autonomous threat intelligence and expert-driven response for the modern enterprise.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-2xl max-w-md shadow-2xl relative overflow-hidden group-hover:border-fuchsia-500/30 transition-all duration-700">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-400 to-purple-600"></div>
            
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-fuchsia-400" />
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Security Intelligence Core</span>
            </div>

            <p className="text-base text-slate-300 mb-8 relative z-10 font-light leading-relaxed">
              Our autonomous engine processes millions of signals per second to detect, isolate, and neutralize threats before they impact your network operations.
            </p>

            <div className="grid grid-cols-3 gap-6 relative z-10 border-t border-white/5 pt-6">
               <div>
                  <p className="text-xl font-bold text-white tracking-tight">99.9%</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Uptime</p>
               </div>
               <div>
                  <p className="text-xl font-bold text-fuchsia-400 tracking-tight">&lt;2ms</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Response</p>
               </div>
               <div>
                  <p className="text-xl font-bold text-purple-400 tracking-tight">1M+</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Neutralized</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Tactical Auth Interface */}
      <div className="flex-1 flex items-center justify-center p-12 bg-[#030712] relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
              {isLogin ? 'Initialize Uplink' : 'Activate Node'}
            </h2>
            <p className="text-slate-500 text-lg">
              {isLogin 
                ? 'Authorized personnel only. Secure credentials required.' 
                : 'Establish your tactical footprint in the SOC network.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl mb-8 text-sm font-medium border ${
                  error.includes('successful') 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}
              >
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-fuchsia-400 transition-colors">
                    <User size={18} className="text-slate-600" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500/50 outline-none transition-all font-medium"
                    placeholder="e.g. Agent_Zero"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-fuchsia-400 transition-colors">
                  <Mail size={18} className="text-slate-600" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500/50 outline-none transition-all font-medium"
                  placeholder="name@corp.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-fuchsia-400 hover:text-fuchsia-300 font-bold uppercase tracking-widest transition-colors">Forgot Key?</button>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-fuchsia-400 transition-colors">
                  <Lock size={18} className="text-slate-600" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500/50 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Role / Specialization</label>
                <div className="grid grid-cols-1 gap-3">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500/50 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="user" className="bg-[#0B0F19]">General User</option>
                    <option value="security_specialist" className="bg-[#0B0F19]">Security Specialist</option>
                    <option value="network_specialist" className="bg-[#0B0F19]">Network Specialist</option>
                  </select>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={formLoading || socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-[#030712] py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(123, 47, 247,0.2)] hover:shadow-[0_0_30px_rgba(123, 47, 247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 uppercase tracking-[0.1em] text-sm"
            >
              {formLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>{isLogin ? 'Login' : 'Sign Up'} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center gap-4">
              <div className="flex-1 border-t border-white/5"></div>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Or continue with</span>
              <div className="flex-1 border-t border-white/5"></div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={formLoading || socialLoading !== null}
                className="flex-1 flex justify-center items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-fuchsia-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-fuchsia-400" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="group-hover:text-fuchsia-400 transition-colors uppercase tracking-widest text-[11px]">Google</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-slate-500 hover:text-fuchsia-400 transition-all text-xs font-bold uppercase tracking-[0.2em]"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-fuchsia-400 underline underline-offset-4 decoration-2">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

