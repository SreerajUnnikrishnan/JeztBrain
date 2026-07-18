import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Tooltip, XAxis, YAxis
} from 'recharts';
import { 
  Shield, Target, Activity, Cpu, Database, AlertTriangle, Server, Radio, 
  Users, FileText, Settings, Search, Bell, ChevronLeft, ChevronRight, 
  Send, Terminal, RefreshCw, Layers, Compass, Skull, Play, Volume2, ShieldAlert
} from 'lucide-react';

export default function SocDashboard() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Stats Counters (Ticking Upwards Live)
  const [stats, setStats] = useState({
    blocked: 2418716,
    incidents: 152,
    accuracy: 99.89,
    responseTime: 1.3,
    zeroDay: 48,
    traffic: 2.4
  });

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! I'm JeztBrain Bot. How can I help secure your environment today?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isMascotBlinking, setIsMascotBlinking] = useState(false);

  // Log Feed State
  const [logs, setLogs] = useState([
    { time: '11:24:32', text: 'Blocked malicious payload', severity: 'High', type: 'critical' },
    { time: '11:24:18', text: 'Zero-day exploit detected', severity: 'High', type: 'critical' },
    { time: '11:23:47', text: 'Firewall breach prevented', severity: 'Medium', type: 'warning' },
    { time: '11:23:21', text: 'Suspicious login detected', severity: 'Medium', type: 'warning' },
    { time: '11:22:59', text: 'Phishing attempt blocked', severity: 'Low', type: 'info' }
  ]);

  // Sparkline data
  const blueSparkline = [
    { value: 20 }, { value: 35 }, { value: 25 }, { value: 45 }, { value: 30 }, { value: 50 }, { value: 42 }
  ];
  const redSparkline = [
    { value: 50 }, { value: 40 }, { value: 65 }, { value: 55 }, { value: 80 }, { value: 70 }, { value: 75 }
  ];
  const purpleSparkline = [
    { value: 90 }, { value: 85 }, { value: 95 }, { value: 92 }, { value: 98 }, { value: 96 }, { value: 99 }
  ];
  const cyanSparkline = [
    { value: 1.8 }, { value: 1.5 }, { value: 1.6 }, { value: 1.3 }, { value: 1.4 }, { value: 1.1 }, { value: 1.3 }
  ];
  const goldSparkline = [
    { value: 40 }, { value: 42 }, { value: 45 }, { value: 43 }, { value: 47 }, { value: 46 }, { value: 48 }
  ];

  // Pie chart data for Vulnerability Analysis
  const vulnData = [
    { name: 'Critical', value: 152, color: '#ef4444' },
    { name: 'High', value: 320, color: '#f97316' },
    { name: 'Medium', value: 498, color: '#eab308' },
    { name: 'Low', value: 278, color: '#10b981' }
  ];

  // Area chart data for Attack Trend (7 Days)
  const trendData = [
    { name: 'May 12', value: 500 },
    { name: 'May 13', value: 1200 },
    { name: 'May 14', value: 800 },
    { name: 'May 15', value: 1500 },
    { name: 'May 16', value: 1100 },
    { name: 'May 17', value: 1800 },
    { name: 'May 18', value: 1247 }
  ];

  // References for Canvas Animation
  const mapCanvasRef = useRef(null);
  const neuralCanvasRef = useRef(null);

  // Synchronized Blinking Timer for Mascot
  useEffect(() => {
    let blinkTimeout;
    const blinkLoop = () => {
      setIsMascotBlinking(true);
      setTimeout(() => setIsMascotBlinking(false), 140);
      blinkTimeout = setTimeout(blinkLoop, 2000 + Math.random() * 2000);
    };
    blinkTimeout = setTimeout(blinkLoop, 1500);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Live Stats Incrementor Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        blocked: prev.blocked + Math.floor(Math.random() * 3) + 1,
        incidents: Math.max(120, prev.incidents + (Math.random() > 0.85 ? 1 : Math.random() > 0.9 ? -1 : 0)),
        accuracy: Math.min(99.98, +(prev.accuracy + (Math.random() > 0.5 ? 0.01 : -0.01)).toFixed(2)),
        responseTime: Math.max(0.9, +(prev.responseTime + (Math.random() > 0.5 ? 0.05 : -0.05)).toFixed(2)),
        traffic: Math.max(1.5, +(prev.traffic + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1))
      }));

      // Add a live log entry
      const logTemplates = [
        { text: 'Blocked malicious payload', severity: 'High', type: 'critical' },
        { text: 'Zero-day exploit detected', severity: 'High', type: 'critical' },
        { text: 'Firewall breach prevented', severity: 'Medium', type: 'warning' },
        { text: 'Suspicious login detected', severity: 'Medium', type: 'warning' },
        { text: 'Phishing attempt blocked', severity: 'Low', type: 'info' }
      ];
      const selected = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      
      setLogs(prev => [
        { time: timeStr, text: selected.text, severity: selected.severity, type: selected.type },
        ...prev.slice(0, 4)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // HTML5 Live 3D Rotating Dotted Globe Canvas Drawing
  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 250;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pre-calculated 3D landmass vertices to simulate continents (latitude & longitude)
    const points = [];
    const landmasses = [
      // North America
      { minLat: 0.2, maxLat: 1.1, minLon: -2.3, maxLon: -1.2 },
      // South America
      { minLat: -0.9, maxLat: 0.1, minLon: -1.3, maxLon: -0.6 },
      // Eurasia (Europe + Asia)
      { minLat: 0.1, maxLat: 1.3, minLon: -0.2, maxLon: 2.2 },
      // Africa
      { minLat: -0.6, maxLat: 0.6, minLon: -0.3, maxLon: 0.8 },
      // Australia
      { minLat: -0.7, maxLat: -0.2, minLon: 1.8, maxLon: 2.6 }
    ];

    // Populate dots in continent bounding areas
    landmasses.forEach(land => {
      const step = 0.085;
      for (let lat = land.minLat; lat <= land.maxLat; lat += step) {
        for (let lon = land.minLon; lon <= land.maxLon; lon += step) {
          // Add organic fractal noisiness to simulate real coastlines
          const noise = Math.sin(lat * 12) * Math.cos(lon * 12);
          if (noise > -0.35) {
            points.push({ lat, lon });
          }
        }
      }
    });

    // 3D attack curves on globe
    let attacks = [];
    const createAttack = () => {
      // Choose random origin and target points from dotted landmasses
      const orig = points[Math.floor(Math.random() * points.length)];
      const dest = points[Math.floor(Math.random() * points.length)];
      return {
        origLat: orig ? orig.lat : 0.4,
        origLon: orig ? orig.lon : -1.8,
        destLat: dest ? dest.lat : 0.8,
        destLon: dest ? dest.lon : 1.2,
        progress: 0,
        speed: 0.006 + Math.random() * 0.008,
        color: Math.random() > 0.6 ? '#f97316' : '#ef4444'
      };
    };

    for (let i = 0; i < 4; i++) {
      attacks.push(createAttack());
    }

    let rotY = 0;

    const drawGlobe = () => {
      // Dark cyber backplane
      ctx.fillStyle = '#05080f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 100;

      // Draw background cyber atmosphere gradient glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5);
      radialGlow.addColorStop(0, 'rgba(123, 47, 247, 0.02)');
      radialGlow.addColorStop(0.5, 'rgba(123, 47, 247, 0.08)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw spherical cyber rings (Grid outline behind globe)
      ctx.strokeStyle = 'rgba(123, 47, 247, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 0.4, radius, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Rotate Y-axis
      rotY += 0.0016;

      // Project & Draw 3D Dotted Continents
      points.forEach(pt => {
        // Orthographic projection math
        const x3d = radius * Math.cos(pt.lat) * Math.sin(pt.lon + rotY);
        const y3d = radius * Math.sin(pt.lat);
        const z3d = radius * Math.cos(pt.lat) * Math.cos(pt.lon + rotY);

        // Render only front-facing vertices (z > 0)
        if (z3d > 0) {
          const px = centerX + x3d;
          const py = centerY - y3d;

          // Draw continental glowing pixel dots
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(123, 47, 247, 0.45)';
          ctx.fill();

          // Sparkle accent dot occasionally
          if (Math.random() > 0.9998) {
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#A855F7';
            ctx.shadowColor = '#A855F7';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Project and draw curved Bezier attacks in 3D projection space
      attacks.forEach((atk, idx) => {
        atk.progress += atk.speed;
        if (atk.progress >= 1) {
          attacks[idx] = createAttack();
          return;
        }

        // Get 3D coordinates for start/end
        const origX = radius * Math.cos(atk.origLat) * Math.sin(atk.origLon + rotY);
        const origY = radius * Math.sin(atk.origLat);
        const origZ = radius * Math.cos(atk.origLat) * Math.cos(atk.origLon + rotY);

        const destX = radius * Math.cos(atk.destLat) * Math.sin(atk.destLon + rotY);
        const destY = radius * Math.sin(atk.destLat);
        const destZ = radius * Math.cos(atk.destLat) * Math.cos(atk.destLon + rotY);

        // Only render if both origin and destination are somewhat in front-facing space
        if (origZ > -30 && destZ > -30) {
          const sx = centerX + origX;
          const sy = centerY - origY;
          const ex = centerX + destX;
          const ey = centerY - destY;

          // Calculate height of projected 3D arc curve
          const midX = (sx + ex) / 2;
          const midY = (sy + ey) / 2 - 35; // curved upward arc height

          // Draw attack route
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(midX, midY, ex, ey);
          ctx.strokeStyle = atk.color === '#ef4444' ? 'rgba(239, 68, 68, 0.18)' : 'rgba(249, 115, 22, 0.18)';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Flowing spark coordinate along arc progress
          const t = atk.progress;
          const mt = 1 - t;
          const px = mt * mt * sx + 2 * mt * t * midX + t * t * ex;
          const py = mt * mt * sy + 2 * mt * t * midY + t * t * ey;

          // Spark particle
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = atk.color;
          ctx.shadowColor = atk.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pulse destination coordinate
          if (atk.progress > 0.8) {
            ctx.beginPath();
            ctx.arc(ex, ey, 2.5 + (1 - atk.progress) * 8, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(239, 68, 68, ${1 - atk.progress})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });

      // Outer holographic atmospheric shell line
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(123, 47, 247, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // HTML5 Live AI Neural Network Canvas Drawing
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 120;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [];
    const totalNodes = 14;
    for (let i = 0; i < totalNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 2
      });
    }

    const drawNeural = () => {
      ctx.fillStyle = '#05080f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(123, 47, 247, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < totalNodes; i++) {
        for (let j = i + 1; j < totalNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#8B5CF6';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawNeural);
    };

    drawNeural();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Form Submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const lower = userMessage.toLowerCase();

      // Cybersecurity keyword detection
      const cyberKeywords = [
        'threat', 'analyze', 'analysis', 'scan', 'vulnerability', 'cve', 'malware',
        'ransomware', 'phish', 'incident', 'breach', 'report', 'generate', 'expert',
        'talk', 'connect', 'siem', 'log', 'alert', 'monitor', 'block', 'attack',
        'hack', 'security', 'firewall', 'intrusion', 'endpoint', 'forensic',
        'hello', 'hi', 'hey', 'help', 'assist', 'start'
      ];
      const isCyberRelated = cyberKeywords.some(kw => lower.includes(kw));

      let botText;

      if (!isCyberRelated) {
        botText = "⚠️ I am JeztBrain AI Assistant. I can only assist with cybersecurity topics, incident reporting, threat analysis, security awareness, and JeztBrain platform services. Please ask a cybersecurity-related question or report a security incident.";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('help') || lower.includes('start') || lower.includes('assist')) {
        botText = "JeztBrain AI Assistant is online. I can assist with incident reporting, threat analysis, CVE investigation, malware triage, and expert connections. What security concern can I help you with?";
      } else if (lower.includes('threat') || lower.includes('analyze') || lower.includes('analysis')) {
        botText = "Threat analysis initiated. AI Threat Detection module is scanning behavioral patterns and correlating against global IOC feeds. No critical anomalies detected in the current session. Would you like to escalate to a JeztBrain Expert?";
      } else if (lower.includes('scan') || lower.includes('vulnerability') || lower.includes('cve')) {
        botText = "Vulnerability scan queued. Cross-referencing against NVD, MITRE CVE, and CISA KEV databases. All monitored endpoints are operating within acceptable security parameters. Use the AI Reports module to generate a full vulnerability report.";
      } else if (lower.includes('report') || lower.includes('generate')) {
        botText = `Security report compiled via JeztBrain AI. Total Threats Blocked: ${stats.blocked.toLocaleString()}. AI Detection accuracy: ${stats.accuracy}%. Use the AI Reports tab for a full forensics export.`;
      } else if (lower.includes('expert') || lower.includes('talk') || lower.includes('connect')) {
        botText = "Connecting you with the JeztBrain Expert Network. Our verified SOC specialists are available 24/7 for live incident support. Navigate to the Expert Network tab to select a specialist by skillset and availability.";
      } else if (lower.includes('incident') || lower.includes('breach') || lower.includes('attack') || lower.includes('hack')) {
        botText = "Incident response protocol activated. Immediate steps: (1) Isolate affected systems, (2) Preserve evidence, (3) Classify severity. Use the JeztBrain Incident Tracking module to log this event and escalate to a live expert.";
      } else if (lower.includes('malware') || lower.includes('ransomware') || lower.includes('phish')) {
        botText = "Threat classified. Containment recommendation: isolate the affected host immediately, do not reboot, and preserve memory artifacts. Submit threat samples to the JeztBrain AI Threat Detection module for automated forensic triage.";
      } else {
        botText = "JeztBrain AI Assistant is monitoring your security environment. All active systems are reporting within normal operational parameters. How can I assist with your cybersecurity needs?";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botText }]);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleActionClick = (actionText) => {
    setChatInput(actionText);
  };

  return (
    <div className="flex-1 bg-[#05080f] text-slate-100 flex overflow-hidden min-h-[calc(100vh-64px)] relative font-sans">
      
      {/* CSS Animation Overrides */}
      <style>{`
        @keyframes border-glow-sweep {
          0%, 100% { border-color: rgba(123, 47, 247, 0.12); box-shadow: 0 0 20px rgba(123, 47, 247, 0.03); }
          50% { border-color: rgba(123, 47, 247, 0.35); box-shadow: 0 0 35px rgba(123, 47, 247, 0.12); }
        }
        .cyber-border-animate {
          animation: border-glow-sweep 6s infinite ease-in-out;
        }
        @keyframes radar-pulse-green {
          0% { transform: scale(0.95); opacity: 0.45; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .radar-pulse-green-effect {
          animation: radar-pulse-green 3s infinite linear;
        }
        .radar-sweep-spin {
          animation: spin 10s infinite linear;
        }
        .custom-soc-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-soc-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
        }
        .custom-soc-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(123, 47, 247, 0.25);
          border-radius: 9px;
        }
        .custom-soc-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(123, 47, 247, 0.5);
        }
        @keyframes ecg-pulse {
          0%, 100% { transform: scaleX(1); opacity: 0.7; }
          50% { transform: scaleX(1.15); opacity: 1; }
        }
        .ecg-line-animate {
          animation: ecg-pulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* ─── Left Fixed Sidebar ─── */}
      <motion.aside 
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="shrink-0 bg-[#070b14]/90 border-r border-[#8B5CF6]/15 flex flex-col relative z-20 backdrop-blur-md"
      >
        {/* Sidebar Toggle Collapse Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3.5 top-5 w-7 h-7 bg-[#070b14] border border-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] hover:text-[#A855F7] hover:border-[#8B5CF6] hover:shadow-[0_0_10px_rgba(123, 47, 247,0.4)] transition-all cursor-pointer z-30"
        >
          {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#8B5CF6]/10 overflow-hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-tr from-[#005cff] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_12px_rgba(123, 47, 247,0.4)]">
              <Shield size={18} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-left">
                <span className="font-sans font-black tracking-wider text-white text-sm leading-none">
                  Jezt<span className="text-[#8B5CF6]">Brain</span>
                </span>
                <span className="text-[7.5px] font-mono tracking-[0.18em] text-[#8B5CF6] uppercase font-black mt-1">
                  Security Operations Center
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-soc-scrollbar">
          {[
            { name: 'Dashboard', icon: <Activity size={16} /> },
            { name: 'Threat Monitoring', icon: <Target size={16} /> },
            { name: 'AI Analysis', icon: <Cpu size={16} /> },
            { name: 'Vulnerabilities', icon: <Layers size={16} /> },
            { name: 'Incident Response', icon: <Skull size={16} /> },
            { name: 'Threat Intelligence', icon: <Compass size={16} /> },
            { name: 'Users', icon: <Users size={16} /> },
            { name: 'Reports', icon: <FileText size={16} /> },
            { name: 'Settings', icon: <Settings size={16} /> },
          ].map(item => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group text-left cursor-pointer ${
                  isActive 
                    ? 'text-white bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(123, 47, 247,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#8B5CF6]' : 'text-slate-400 group-hover:text-[#8B5CF6] transition-colors'}>
                  {item.icon}
                </span>
                {!isSidebarCollapsed && (
                  <span className="font-sans font-bold text-[11px] tracking-wide">{item.name}</span>
                )}
                {/* Active Indicator side tick */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#8B5CF6] rounded-l-md" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Crest Shield Asset */}
        {!isSidebarCollapsed && (
          <div className="p-4 mx-4 mb-3 bg-[#05080f]/60 border border-[#8B5CF6]/10 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/5 to-transparent pointer-events-none" />
            <Shield className="text-[#8B5CF6] h-10 w-10 drop-shadow-[0_0_12px_rgba(123, 47, 247,0.4)] mb-3 animate-pulse" />
            
            {/* Status indicators */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-950 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              <span className="text-[10px] font-mono font-black text-white uppercase tracking-wider">SOC AI ACTIVE</span>
            </div>
            <span className="text-[8px] font-mono text-slate-500 mt-1 select-none">All systems operational</span>
          </div>
        )}

        {/* Footprint copyright text */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-[#8B5CF6]/10 text-center shrink-0">
            <span className="text-[8.5px] font-mono text-slate-600 block">
              © 2026 JeztBrain AI | All rights reserved
            </span>
          </div>
        )}
      </motion.aside>

      {/* ─── Main Content Area ─── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-soc-scrollbar relative z-10">
        
        {/* Top Navbar */}
        <header className="h-16 shrink-0 bg-[#070b14]/70 border-b border-[#8B5CF6]/10 backdrop-blur-md flex items-center justify-between px-8 relative z-20">
          
          {/* Global search bar */}
          <div className="flex items-center bg-[#05080f] border border-[#8B5CF6]/25 rounded-xl px-4 py-1.5 w-96 focus-within:border-[#8B5CF6] focus-within:shadow-[0_0_15px_rgba(123, 47, 247,0.25)] transition-all">
            <Search size={14} className="text-slate-400 mr-2.5" />
            <input 
              type="text" 
              placeholder="Search threats, IP, domains, vulnerabilities..." 
              className="bg-transparent text-xs w-full text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Right Header Navigation controls */}
          <div className="flex items-center gap-6">
            
            {/* Threat level indicator */}
            <div className="hidden lg:flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/25 px-4 py-1.5 rounded-xl font-mono text-[9px] uppercase tracking-wider">
              <span className="text-slate-400">Threat Level:</span>
              <span className="text-rose-400 font-black flex items-center gap-1.5">
                HIGH
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-2 bg-rose-500 rounded-sm" />
                  <span className="w-1.5 h-2 bg-rose-500 rounded-sm" />
                  <span className="w-1.5 h-2 bg-rose-500 rounded-sm animate-pulse" />
                  <span className="w-1.5 h-2 bg-rose-500/20 rounded-sm" />
                </span>
              </span>
            </div>

            {/* Notification Bell */}
            <div className="relative cursor-pointer">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#8B5CF6] text-slate-300 hover:text-white transition-all shadow-sm">
                <Bell size={15} />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full border border-slate-950 flex items-center justify-center text-[8px] font-black text-white">7</span>
            </div>

            {/* User profile info */}
            <div className="flex items-center gap-3.5 border-l border-slate-800 pl-6">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                alt="Admin User" 
                className="w-8.5 h-8.5 rounded-full border border-[#8B5CF6]/30 object-cover shadow-[0_0_10px_rgba(123, 47, 247,0.2)]"
              />
              <div className="text-left">
                <div className="text-xs font-black text-white leading-none">Admin User</div>
                <div className="text-[9px] font-mono text-[#8B5CF6] uppercase tracking-wider mt-1 font-bold">SOC Analyst</div>
              </div>
            </div>

          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="flex-1 p-8 space-y-8">
          
          {/* Main Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight uppercase">SOC Dashboard</h1>
              <p className="text-slate-400 text-[11px] mt-1 font-mono">Real-time overview of your security operations</p>
            </div>
            
            {/* AI DEFENSE ACTIVE Button */}
            <button className="flex items-center gap-4.5 px-5 py-3 bg-[#070b14] border border-[#10b981]/30 hover:border-[#10b981]/60 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer relative group">
              <div className="absolute inset-0 bg-[#10b981]/5 rounded-xl pointer-events-none group-hover:bg-[#10b981]/10 transition-colors" />
              
              {/* Pulsing indicator wave */}
              <div className="flex items-center gap-2 relative z-10">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-950 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">AI Defense Active</span>
              </div>
              
              {/* Animated ECG Pulse graph stroke */}
              <svg className="w-14 h-6 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity ecg-line-animate" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0,15 L30,15 L35,5 L40,25 L45,15 L50,15 L53,10 L56,20 L59,15 L100,15" />
              </svg>
            </button>
          </div>

          {/* Row 1: Five Analytics Cards (with Recharts Sparklines) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: 'Threats Blocked', value: stats.blocked.toLocaleString(), change: '▲ 42.5%', desc: 'vs last 24h', color: 'text-[#8B5CF6]', sparkline: blueSparkline, stroke: '#8B5CF6', fill: 'rgba(123, 47, 247, 0.05)', icon: <Shield size={14} /> },
              { label: 'Active Incidents', value: stats.incidents, change: '▲ 12.4%', desc: 'vs last 24h', color: 'text-rose-400', sparkline: redSparkline, stroke: '#f43f5e', fill: 'rgba(244, 63, 94, 0.05)', icon: <Target size={14} /> },
              { label: 'AI Accuracy', value: `${stats.accuracy}%`, change: '▲ 0.38%', desc: 'vs last 24h', color: 'text-emerald-400', sparkline: purpleSparkline, stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.05)', icon: <Cpu size={14} /> },
              { label: 'Response Time', value: `${stats.responseTime}ms`, change: '▼ 8.7%', desc: 'vs last 24h', color: 'text-[#A855F7]', sparkline: cyanSparkline, stroke: '#A855F7', fill: 'rgba(123, 47, 247, 0.05)', icon: <Activity size={14} /> },
              { label: 'Zero-Day Threats', value: stats.zeroDay, change: '▲ 6.2%', desc: 'vs last 24h', color: 'text-amber-400', sparkline: goldSparkline, stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.05)', icon: <AlertTriangle size={14} /> }
            ].map(item => (
              <div key={item.label} className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-2xl flex flex-col relative overflow-hidden backdrop-blur-md shadow-md min-h-[140px] text-left">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#8B5CF6]/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="p-5 pb-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">{item.label}</span>
                    <span className={`${item.color} p-1.5 rounded-lg bg-slate-900 border border-slate-800`}>{item.icon}</span>
                  </div>
                  <div className="text-xl font-black text-white">{item.value}</div>
                  <div className="flex items-center gap-1.5 mt-2 text-[9px] font-mono">
                    <span className={`${item.color} font-black`}>{item.change}</span>
                    <span className="text-slate-500">{item.desc}</span>
                  </div>
                </div>
                {/* Embedded Recharts Sparkline */}
                <div className="w-full h-10 mt-auto overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.sparkline} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`grad-${item.label}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={item.stroke} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={item.stroke} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={item.stroke} 
                        strokeWidth={1.5} 
                        fill={`url(#grad-${item.label})`} 
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>

          {/* Core Dashboard Content Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 text-left">
            
            {/* Left Side Blocks: Map, Radar, Graphs (spans 3 columns) */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Row 1: 3D Globe visualizer & concentric Green Radar scanner */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Global Attack Map (3D Globe Hologram) */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] overflow-hidden flex flex-col shadow-lg backdrop-blur-md">
                  <div className="px-6 py-4 border-b border-[#8B5CF6]/10 bg-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Global Attack Telemetry</h3>
                      <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase leading-none font-bold">Live</span>
                    </div>
                    {/* Map controls mockup */}
                    <div className="flex items-center gap-2 text-slate-500 hover:text-white">
                      <RefreshCw size={11} className="cursor-pointer animate-spin" style={{ animationDuration: '6s' }} />
                      <Settings size={11} className="cursor-pointer" />
                    </div>
                  </div>
                  
                  {/* Canvas area */}
                  <div className="relative flex-1 bg-[#05080f]">
                    <canvas ref={mapCanvasRef} className="w-full h-[250px] block" />
                  </div>
                  
                  {/* Bottom Attack statistics segments */}
                  <div className="p-4 bg-black/40 border-t border-[#8B5CF6]/10 grid grid-cols-4 gap-4 text-center">
                    <div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-wider">Attack Origins</span>
                      <span className="text-sm font-black text-white mt-1 block">32 Countries</span>
                    </div>
                    <div className="border-l border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-wider">Live Attacks</span>
                      <span className="text-sm font-black text-rose-400 mt-1 block">1,247 Ongoing</span>
                    </div>
                    <div className="border-l border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-wider">Targeted Assets</span>
                      <span className="text-sm font-black text-[#8B5CF6] mt-1 block">8,932 Endpoints</span>
                    </div>
                    <div className="border-l border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block tracking-wider">Data Transfer</span>
                      <span className="text-sm font-black text-[#10b981] mt-1 block">{stats.traffic} TB/s</span>
                    </div>
                  </div>
                </div>

                {/* AI Threat Scanner (Concentric Green Radar) */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] overflow-hidden flex flex-col shadow-lg backdrop-blur-md">
                  <div className="px-6 py-4 border-b border-[#8B5CF6]/10 bg-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Radio size={14} className="text-[#10b981] animate-pulse" />
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">AI Threat Scanner</h3>
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase leading-none font-bold animate-pulse">Scanning</span>
                  </div>

                  <div className="p-5 flex flex-col lg:flex-row items-center gap-6 flex-1 bg-[#05080f]">
                    {/* Circular green radar element */}
                    <div className="relative w-36 h-36 rounded-full border border-[#10b981]/20 flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 rounded-full border border-[#10b981]/5 radar-pulse-green-effect" />
                      <div className="absolute inset-4 rounded-full border border-[#10b981]/10" />
                      <div className="absolute inset-10 rounded-full border border-[#10b981]/15" />
                      <div className="absolute inset-0 rounded-full overflow-hidden radar-sweep-spin">
                        <div 
                          className="w-1/2 h-full origin-right float-left"
                          style={{ background: 'linear-gradient(90deg, transparent 80%, rgba(16, 185, 129, 0.3) 100%)' }}
                        />
                      </div>
                      <span className="absolute top-10 left-8 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                      <span className="absolute top-10 left-8 w-2 h-2 bg-rose-500 rounded-full" />
                      <Shield className="text-[#10b981] h-8 w-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                    </div>

                    {/* Progress metrics bars list */}
                    <div className="flex-1 w-full space-y-2.5">
                      <span className="text-[9px] font-mono text-[#10b981] block mb-1">Scanning network traffic...</span>
                      {[
                        { label: 'Network Traffic', val: '92.4%' },
                        { label: 'System Processes', val: '87.1%' },
                        { label: 'User Behavior', val: '78.3%' },
                        { label: 'Firewall Logs', val: '95.6%' },
                        { label: 'DNS Activity', val: '88.7%' }
                      ].map(bar => (
                        <div key={bar.label} className="space-y-1">
                          <div className="flex items-center justify-between text-[9px] font-mono leading-none">
                            <span className="text-slate-400">{bar.label}</span>
                            <span className="text-white font-black">{bar.val}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#10b981] to-[#A855F7] rounded-full" style={{ width: bar.val }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Confidence/Severity panels */}
                  <div className="p-4 bg-black/40 border-t border-[#8B5CF6]/10 grid grid-cols-2 gap-6">
                    <div className="space-y-1 text-left">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Threat Confidence</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[#10b981]">96.7%</span>
                        <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.7%' }} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-left border-l border-slate-900 pl-6">
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Threat Severity</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-rose-400">HIGH</span>
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-3 bg-amber-500 rounded-sm" />
                          <span className="w-2.5 h-3 bg-amber-600 rounded-sm" />
                          <span className="w-2.5 h-3 bg-rose-500 rounded-sm" />
                          <span className="w-2.5 h-3 bg-rose-600 rounded-sm animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 2: Recharts Donut Pie Chart, Attack Line Trend & Endpoint security radial progress */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Vulnerability Analysis (Donut Pie Chart) */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] p-5.5 flex flex-col justify-between shadow-lg backdrop-blur-md h-[260px]">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono mb-2">Vulnerability Analysis</h3>
                  
                  {/* Pie chart container */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={140}>
                      <PieChart>
                        <Pie
                          data={vulnData}
                          innerRadius={45}
                          outerRadius={58}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {vulnData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <div className="text-base font-black text-white">1,248</div>
                      <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Total</div>
                    </div>
                  </div>

                  {/* Indicators legend list */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-900 text-center font-mono text-[9px]">
                    {vulnData.map(entry => (
                      <div key={entry.name}>
                        <span className="text-slate-500 block truncate">{entry.name}</span>
                        <span className="font-bold text-white block mt-0.5">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attack Trend 7 Days (Area Chart) */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] p-5.5 flex flex-col justify-between shadow-lg backdrop-blur-md h-[260px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Attack Trend (7 Days)</h3>
                    <span className="text-[8px] font-mono text-slate-500">All Attacks</span>
                  </div>
                  
                  {/* Recharts Area Chart */}
                  <div className="flex-1 w-full h-[130px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="trend-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="name" 
                          stroke="rgba(255,255,255,0.2)" 
                          fontSize={8} 
                          fontFamily="monospace"
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.2)" 
                          fontSize={8} 
                          fontFamily="monospace"
                        />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8B5CF6" 
                          strokeWidth={2} 
                          fill="url(#trend-grad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary overlay details */}
                  <div className="pt-3 border-t border-slate-900 text-left font-mono text-[9px] flex items-center justify-between text-slate-500">
                    <span>1,247 Live Attacks</span>
                    <span>Peak: 1,800</span>
                  </div>
                </div>

                {/* Endpoint Security Gauge */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] p-5.5 flex flex-col justify-between shadow-lg backdrop-blur-md h-[260px]">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono mb-2">Endpoint Security</h3>
                  
                  {/* Circular/radial progress */}
                  <div className="flex-1 flex items-center justify-center relative">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="42" stroke="rgba(123, 47, 247, 0.05)" strokeWidth="6" fill="transparent" />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="42" 
                        stroke="#10b981" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={263.8} 
                        strokeDashoffset={263.8 * 0.08}
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-xl font-black text-white">92%</div>
                      <div className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Secure</div>
                    </div>
                  </div>

                  {/* Status checklist metrics */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-900 text-left font-mono text-[9px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-500">Protected:</span>
                      <span className="text-white font-bold ml-auto">2,932</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="text-slate-500">At Risk:</span>
                      <span className="text-white font-bold ml-auto">213</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span className="text-slate-500">Threat:</span>
                      <span className="text-white font-bold ml-auto">24</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                      <span className="text-slate-500">Unknown:</span>
                      <span className="text-white font-bold ml-auto">58</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 3: Holographic Neural Engine & SOC Operator Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* AI Neural Engine [ANALYZING] */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] overflow-hidden flex flex-col shadow-lg backdrop-blur-md">
                  <div className="px-6 py-4 border-b border-[#8B5CF6]/10 bg-black/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Cpu size={14} className="text-[#8B5CF6]" />
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">AI Neural Engine</h3>
                    </div>
                    <span className="text-[8px] font-mono text-[#A855F7] bg-[#A855F7]/10 border border-[#A855F7]/20 px-1.5 py-0.5 rounded uppercase leading-none font-bold animate-pulse">Analyzing</span>
                  </div>

                  <div className="p-5.5 bg-[#05080f] flex flex-col md:flex-row gap-6 flex-1 items-center">
                    {/* Animated Canvas */}
                    <div className="relative w-full md:w-1/2 h-[120px] rounded-xl overflow-hidden border border-[#8B5CF6]/10">
                      <canvas ref={neuralCanvasRef} className="w-full h-full block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Threat analysis description */}
                    <div className="flex-1 w-full space-y-3 font-mono text-[10px]">
                      <span className="text-white font-bold uppercase tracking-wider block">Analyzing threat behavior...</span>
                      <div className="space-y-1.5 text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                          <span>Pattern Recognition active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                          <span>Behavioral Analysis tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                          <span>Anomaly Detection compiled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                          <span>Threat Correlation live</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom progress bar */}
                  <div className="px-6 py-3.5 bg-black/40 border-t border-[#8B5CF6]/10 flex items-center justify-between text-[9px] font-mono">
                    <span className="text-slate-500">Analysis Progress:</span>
                    <div className="w-48 h-2.5 bg-slate-950 border border-slate-900 rounded-full overflow-hidden p-0.5 ml-4 flex-1">
                      <div className="h-full bg-gradient-to-r from-[#005cff] to-[#8B5CF6] rounded-full" style={{ width: '78%' }} />
                    </div>
                    <span className="text-white font-bold ml-4">78%</span>
                  </div>
                </div>

                {/* SOC Expert Panel */}
                <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] overflow-hidden flex flex-col shadow-lg backdrop-blur-md p-5.5 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2">
                        <Users size={14} className="text-[#8B5CF6]" /> SOC Expert Panel
                      </h3>
                      <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase leading-none font-bold animate-pulse">Online</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4.5 mb-5 font-mono text-[9px]">
                      {/* Operator Avatars */}
                      <div className="space-y-1">
                        <span className="text-slate-500 uppercase block tracking-wider">Online Experts</span>
                        <div className="flex items-center -space-x-2">
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80" alt="Op 1" className="w-6.5 h-6.5 rounded-full border border-slate-950 object-cover" />
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&q=80" alt="Op 2" className="w-6.5 h-6.5 rounded-full border border-slate-950 object-cover" />
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80" alt="Op 3" className="w-6.5 h-6.5 rounded-full border border-slate-950 object-cover" />
                          <div className="w-6.5 h-6.5 rounded-full bg-[#005cff] text-[7.5px] font-black text-white flex items-center justify-center border border-slate-950 border-slate-950">+12</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1 border-l border-slate-900 pl-4.5">
                        <span className="text-slate-500 uppercase block tracking-wider">Active Sessions</span>
                        <span className="text-xs font-black text-white block mt-1">24</span>
                      </div>

                      <div className="space-y-1 border-l border-slate-900 pl-4.5">
                        <span className="text-slate-500 uppercase block tracking-wider">Avg Response Time</span>
                        <span className="text-xs font-black text-white block mt-1">1.8 min</span>
                      </div>
                    </div>

                    {/* Incident Queue summaries */}
                    <div className="pt-3 border-t border-slate-900 flex items-center justify-between font-mono text-[9px]">
                      <span className="text-slate-500 uppercase tracking-wider">Incident Queue</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Critical: <strong className="text-white">8</strong></span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> High: <strong className="text-white">16</strong></span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium: <strong className="text-white">24</strong></span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Low: <strong className="text-white">7</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Red Emergency escalation trigger button */}
                  <button className="w-full mt-5 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/60 rounded-xl text-rose-400 hover:text-rose-300 text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.05)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]">
                    <AlertTriangle size={12} className="animate-pulse" /> Emergency Escalation
                  </button>
                </div>

              </div>

            </div>

            {/* Right Side Column Panels: Live Logs & System Health (spans 1 column) */}
            <div className="xl:col-span-1 space-y-6 flex flex-col justify-start">
              
              {/* Live Incident Feed Log Panel */}
              <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] overflow-hidden flex flex-col shadow-lg backdrop-blur-md h-[400px]">
                <div className="px-6 py-4 border-b border-[#8B5CF6]/10 bg-black/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Terminal size={14} className="text-[#8B5CF6]" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Live Incident Feed</h3>
                  </div>
                  <span className="text-[8px] font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-1.5 py-0.5 rounded uppercase leading-none font-bold animate-pulse">Live</span>
                </div>
                
                {/* Scrollable logs */}
                <div className="p-4 bg-[#05080f] flex-1 overflow-y-auto custom-soc-scrollbar space-y-2.5 font-mono text-[10.5px]">
                  <AnimatePresence initial={false}>
                    {logs.map((log, idx) => {
                      const color = 
                        log.severity === 'High' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' :
                        log.severity === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                        'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
                      return (
                        <motion.div
                          key={`${log.time}-${idx}`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-start gap-3 p-2.5 border rounded-xl hover:border-slate-800 transition-colors ${color}`}
                        >
                          <span className="text-slate-500 text-[9px] pt-0.5 select-none">{log.time}</span>
                          <p className="text-slate-300 text-left leading-relaxed flex-1">{log.text}</p>
                          <span className="text-[8px] font-black uppercase tracking-widest select-none mt-0.5">{log.severity}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
                
                <div className="p-3 bg-black/40 border-t border-[#8B5CF6]/10 text-center shrink-0">
                  <span className="text-[9px] font-mono text-[#8B5CF6] hover:text-[#A855F7] cursor-pointer font-bold transition-colors">
                    View all incidents →
                  </span>
                </div>
              </div>

              {/* System Health Status Checklist */}
              <div className="bg-[#070b14]/50 border border-[#8B5CF6]/10 rounded-[24px] p-5.5 shadow-lg backdrop-blur-md text-left">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono mb-4.5 flex items-center gap-2">
                  <Server size={14} className="text-[#8B5CF6]" /> System Health
                </h3>
                
                <div className="space-y-3 font-mono text-[10.5px]">
                  {[
                    { name: 'Firewall', status: 'Active' },
                    { name: 'Intrusion Detection', status: 'Active' },
                    { name: 'AI Engine', status: 'Active' },
                    { name: 'Threat Intelligence', status: 'Active' },
                    { name: 'Database', status: 'Healthy' },
                    { name: 'Cloud Security', status: 'Active' },
                  ].map(sys => (
                    <div key={sys.name} className="flex items-center justify-between p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl">
                      <span className="text-slate-400">{sys.name}</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {sys.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* ─── Bottom-Right Floating Chatbot overlay ─── */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="w-96 h-[520px] bg-[#05080f]/95 border border-[#8B5CF6]/30 rounded-[24px] shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_40px_rgba(123, 47, 247,0.2)] flex flex-col overflow-hidden mb-4 backdrop-blur-3xl"
            >
              {/* Chat window Header */}
              <div className="px-5 py-4 border-b border-[#8B5CF6]/10 bg-black/45 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 select-none">
                    <img 
                      src="/images/robot_avatar_white.png" 
                      alt="JeztBrain Bot" 
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(123, 47, 247,0.45)]"
                    />
                    {isMascotBlinking && (
                      <>
                        <div className="absolute bg-[#091125] rounded-full" style={{ left: "32%", top: "42%", width: "12%", height: "15%" }} />
                        <div className="absolute bg-[#091125] rounded-full" style={{ left: "56%", top: "42%", width: "12%", height: "15%" }} />
                      </>
                    )}
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-950 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)] z-20" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black text-white leading-none">
                      Jezt<span className="text-[#8B5CF6]">Brain</span> <span className="text-[#A855F7]">Bot</span>
                    </h4>
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">AI Security Co-Pilot</span>
                  </div>
                </div>
                
                {/* Minimize button */}
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <ChevronDownIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Chat history list */}
              <div className="flex-1 p-5 overflow-y-auto custom-soc-scrollbar space-y-4">
                {chatMessages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-wider">
                        {isUser ? 'Operator' : 'JeztBrain Bot'}
                      </span>
                      <div className={`p-3 rounded-2xl text-xs max-w-[75%] text-left leading-relaxed ${
                        isUser 
                          ? 'bg-[#005cff] text-white rounded-tr-none border border-[#005cff]/20 shadow-md' 
                          : 'bg-slate-950/60 border border-slate-900 text-slate-200 rounded-tl-none shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {/* Bot typing indication */}
                {isBotTyping && (
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-wider">JeztBrain Bot</span>
                    <div className="flex items-center gap-1.5 px-4.5 py-3.5 bg-slate-950/60 border border-slate-900 rounded-2xl rounded-tl-none shrink-0 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Action shortcut pills */}
              <div className="p-4 bg-black/40 border-t border-[#8B5CF6]/10 shrink-0 text-left">
                <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest block mb-2.5 font-black">SUGGESTED ACTIONS</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Analyze Threat', action: 'Analyze Threat' },
                    { label: 'Scan Vulnerability', action: 'Scan Vulnerability' },
                    { label: 'Generate Report', action: 'Generate Report' },
                    { label: 'Talk to Expert', action: 'Talk to Expert' }
                  ].map(pill => (
                    <button
                      key={pill.label}
                      onClick={() => handleActionClick(pill.action)}
                      className="px-2.5 py-2 bg-slate-950 hover:bg-[#8B5CF6]/15 border border-slate-900 hover:border-[#8B5CF6]/40 text-[#8B5CF6] hover:text-white text-[9.5px] font-bold rounded-xl transition-all duration-300 text-left hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-between"
                    >
                      <span>{pill.label}</span>
                      <ChevronRight size={10} className="opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input bar form */}
              <div className="p-4 bg-[#070b14] border-t border-[#8B5CF6]/10 shrink-0">
                <form onSubmit={handleChatSubmit} className="relative flex items-center bg-[#05080f] border border-[#8B5CF6]/20 focus-within:border-[#8B5CF6] rounded-full p-1 transition-all">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Query SOC Co-Pilot..."
                    className="w-full bg-transparent text-xs text-white pl-4.5 pr-12 py-2.5 focus:outline-none placeholder-slate-500 font-sans"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isBotTyping}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#005cff] hover:bg-[#007bbf] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Send size={12} className="translate-x-[0.5px]" />
                  </button>
                </form>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Launcher Button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer relative shrink-0"
          style={{ background: 'transparent' }}
        >
          {/* Standing avatar glowing head */}
          <div className="relative w-full h-full p-1">
            <img 
              src="/images/robot_avatar_white.png" 
              alt="JeztBrain Bot Launcher" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(123, 47, 247,0.65)] hover:drop-shadow-[0_0_18px_rgba(123, 47, 247,0.95)]"
            />
            {/* Blinking eyes mask */}
            {isMascotBlinking && (
              <>
                <div className="absolute bg-[#091125] rounded-full" style={{ left: "32%", top: "42%", width: "12%", height: "15%" }} />
                <div className="absolute bg-[#091125] rounded-full" style={{ left: "56%", top: "42%", width: "12%", height: "15%" }} />
              </>
            )}
            {/* Green Online Dot */}
            <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#05080f] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.95)] z-30" />
          </div>
        </motion.button>
      </div>

    </div>
  );
}

// Simple Helper Icons
function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
