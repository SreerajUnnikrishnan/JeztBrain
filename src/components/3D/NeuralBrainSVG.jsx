import React from 'react';
import { motion } from 'framer-motion';

/* ─── Extended node network ──────────────────────────────────────────────── */
const NODES = [
  { id:  1, cx:185, cy:108, r:3.5, delay:0.0, dur:3.2, color:'#22d3ee' },
  { id:  2, cx:252, cy: 90, r:2.8, delay:0.8, dur:2.6, color:'#a78bfa' },
  { id:  3, cx:322, cy:112, r:3.5, delay:1.6, dur:3.8, color:'#22d3ee' },
  { id:  4, cx:158, cy:168, r:2.5, delay:0.3, dur:4.1, color:'#67e8f9' },
  { id:  5, cx:222, cy:152, r:4.5, delay:1.2, dur:2.9, color:'#22d3ee' },
  { id:  6, cx:295, cy:158, r:3.0, delay:2.1, dur:3.5, color:'#a78bfa' },
  { id:  7, cx:355, cy:182, r:2.8, delay:0.6, dur:4.4, color:'#818cf8' },
  { id:  8, cx:138, cy:225, r:3.0, delay:1.8, dur:3.1, color:'#22d3ee' },
  { id:  9, cx:210, cy:215, r:4.0, delay:0.1, dur:2.7, color:'#67e8f9' },
  { id: 10, cx:278, cy:208, r:3.0, delay:2.5, dur:3.9, color:'#22d3ee' },
  { id: 11, cx:352, cy:235, r:2.5, delay:1.0, dur:2.4, color:'#a78bfa' },
  { id: 12, cx:172, cy:268, r:3.0, delay:0.4, dur:4.2, color:'#67e8f9' },
  { id: 13, cx:252, cy:265, r:4.5, delay:1.5, dur:3.0, color:'#22d3ee' },
  { id: 14, cx:320, cy:272, r:2.8, delay:2.8, dur:3.6, color:'#818cf8' },
  { id: 15, cx:252, cy:142, r:3.5, delay:0.7, dur:4.0, color:'#a78bfa' },
  { id: 16, cx:118, cy:192, r:2.5, delay:3.2, dur:3.3, color:'#22d3ee' },
  { id: 17, cx:388, cy:200, r:2.5, delay:0.5, dur:4.6, color:'#a78bfa' },
  { id: 18, cx:252, cy:310, r:3.0, delay:1.9, dur:3.4, color:'#67e8f9' },
  { id: 19, cx:195, cy:188, r:2.5, delay:2.7, dur:2.8, color:'#22d3ee' },
  { id: 20, cx:312, cy:188, r:2.5, delay:0.9, dur:3.7, color:'#818cf8' },
  /* outer fringe */
  { id: 21, cx:160, cy:130, r:2.0, delay:1.4, dur:5.0, color:'#67e8f9' },
  { id: 22, cx:340, cy:130, r:2.0, delay:2.2, dur:4.5, color:'#818cf8' },
  { id: 23, cx:130, cy:260, r:1.8, delay:0.6, dur:5.2, color:'#22d3ee' },
  { id: 24, cx:375, cy:255, r:1.8, delay:3.5, dur:4.8, color:'#a78bfa' },
  { id: 25, cx:230, cy:320, r:2.2, delay:1.1, dur:3.9, color:'#67e8f9' },
  { id: 26, cx:275, cy:320, r:2.2, delay:2.4, dur:4.3, color:'#22d3ee' },
];

/* ─── Flow paths ──────────────────────────────────────────────────────────── */
const PATHS = [
  { d:'M 185,108 C 210,118 232,132 252,142', len:82,  del:0.0, dur:2.8, c:'#22d3ee' },
  { d:'M 252,142 C 278,130 302,120 322,112', len:85,  del:0.5, dur:3.2, c:'#818cf8' },
  { d:'M 252,142 C 244,148 235,150 222,152', len:40,  del:1.0, dur:2.4, c:'#22d3ee' },
  { d:'M 252,142 C 262,150 278,154 295,158', len:52,  del:1.5, dur:3.0, c:'#a78bfa' },
  { d:'M 185,108 C 172,135 165,152 158,168', len:72,  del:0.2, dur:3.4, c:'#67e8f9' },
  { d:'M 322,112 C 338,140 348,162 355,182', len:78,  del:1.1, dur:2.9, c:'#818cf8' },
  { d:'M 158,168 C 178,178 196,196 210,215', len:68,  del:0.6, dur:3.8, c:'#22d3ee' },
  { d:'M 222,152 C 218,178 214,196 210,215', len:65,  del:1.7, dur:2.6, c:'#67e8f9' },
  { d:'M 295,158 C 318,172 338,188 355,182', len:72,  del:0.3, dur:3.1, c:'#a78bfa' },
  { d:'M 295,158 C 290,180 285,194 278,208', len:58,  del:2.0, dur:4.0, c:'#22d3ee' },
  { d:'M 355,182 C 372,205 382,220 388,200', len:55,  del:0.8, dur:2.7, c:'#818cf8' },
  { d:'M 210,215 C 196,238 185,254 172,268', len:64,  del:1.3, dur:3.5, c:'#67e8f9' },
  { d:'M 210,215 C 228,238 240,252 252,265', len:66,  del:0.5, dur:2.9, c:'#22d3ee' },
  { d:'M 278,208 C 295,232 308,252 320,272', len:72,  del:1.9, dur:3.3, c:'#a78bfa' },
  { d:'M 252,265 C 282,268 302,270 320,272', len:72,  del:0.1, dur:4.2, c:'#818cf8' },
  { d:'M 158,168 C 148,192 142,210 138,225', len:62,  del:2.3, dur:3.0, c:'#22d3ee' },
  { d:'M 138,225 C 152,245 162,256 172,268', len:54,  del:0.7, dur:2.5, c:'#67e8f9' },
  { d:'M 252,265 C 252,284 252,296 252,310', len:46,  del:1.6, dur:3.7, c:'#a78bfa' },
  { d:'M 185,108 C 215,100 234,94  252,90',  len:72,  del:2.2, dur:3.6, c:'#67e8f9' },
  { d:'M 252,90  C 280,96  302,104 322,112', len:78,  del:0.9, dur:2.8, c:'#22d3ee' },
  { d:'M 118,192 C 130,200 144,210 158,168', len:60,  del:3.0, dur:4.0, c:'#22d3ee' },
  { d:'M 195,188 C 205,196 208,206 210,215', len:34,  del:0.4, dur:2.3, c:'#67e8f9' },
  { d:'M 312,188 C 302,196 290,202 278,208', len:42,  del:2.6, dur:3.8, c:'#818cf8' },
  /* extra cross-connections */
  { d:'M 160,130 C 172,149 166,158 158,168', len:48,  del:1.8, dur:3.5, c:'#22d3ee' },
  { d:'M 340,130 C 348,150 352,165 355,182', len:60,  del:0.3, dur:2.9, c:'#818cf8' },
  { d:'M 138,225 C 134,244 132,252 130,260', len:38,  del:2.1, dur:4.2, c:'#67e8f9' },
  { d:'M 388,200 C 384,222 380,238 375,255', len:58,  del:1.0, dur:3.6, c:'#a78bfa' },
  { d:'M 172,268 C 200,292 220,310 230,320', len:72,  del:0.8, dur:4.0, c:'#22d3ee' },
  { d:'M 320,272 C 302,292 285,308 275,320', len:68,  del:1.5, dur:3.4, c:'#818cf8' },
];

function FlowPath({ d, len, del, dur, c }) {
  return (
    <>
      <path d={d} fill="none" stroke={c} strokeWidth={0.5} strokeLinecap="round" opacity={0.10} />
      <motion.path
        d={d} fill="none" stroke={c} strokeWidth={2.2} strokeLinecap="round"
        strokeDasharray={len}
        initial={{ strokeDashoffset: len, opacity: 0 }}
        animate={{ strokeDashoffset: [-len], opacity: [0, 1, 1, 0] }}
        transition={{ duration: dur, delay: del, repeat: Infinity, ease: 'easeInOut', times:[0,0.1,0.9,1] }}
        style={{ filter:`drop-shadow(0 0 5px ${c}) drop-shadow(0 0 12px ${c}) drop-shadow(0 0 20px ${c})` }}
      />
    </>
  );
}

function Node({ cx, cy, r, delay, dur, color }) {
  return (
    <>
      {/* outer halo */}
      <circle cx={cx} cy={cy} r={r + 8} fill={color} opacity={0.04} />
      <circle cx={cx} cy={cy} r={r + 4} fill={color} opacity={0.07} />
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill={color}
        animate={{ opacity:[0.1, 1, 0.1], r:[r, r*1.7, r] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease:'easeInOut' }}
        style={{ filter:`drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color})` }}
      />
    </>
  );
}

/* ─── God-ray lines emanating from brain core ──────────────────────────────── */
const GOD_RAYS = [
  { x1:252,y1:196, x2:90,  y2: 60,  del:0.0, dur:4.0 },
  { x1:252,y1:196, x2:420, y2: 55,  del:1.2, dur:5.0 },
  { x1:252,y1:196, x2: 60, y2:210,  del:0.6, dur:4.5 },
  { x1:252,y1:196, x2:450, y2:200,  del:1.8, dur:3.8 },
  { x1:252,y1:196, x2:110, y2:380,  del:0.3, dur:4.2 },
  { x1:252,y1:196, x2:400, y2:370,  del:2.4, dur:5.2 },
  { x1:252,y1:196, x2:252, y2: 20,  del:0.9, dur:3.6 },
  { x1:252,y1:196, x2:252, y2:400,  del:1.5, dur:4.8 },
];

export default function NeuralBrainSVG() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ scale:[1, 1.03, 1], y:[0, -16, 0] }}
      transition={{ duration:11, repeat:Infinity, ease:'easeInOut' }}
      style={{ willChange:'transform' }}
    >
      <svg
        viewBox="40 20 430 380"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width:'100%', height:'100%', overflow:'visible',
          maskImage:'radial-gradient(ellipse 78% 76% at 50% 50%, black 0%, black 25%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.18) 76%, transparent 90%)',
          WebkitMaskImage:'radial-gradient(ellipse 78% 76% at 50% 50%, black 0%, black 25%, rgba(0,0,0,0.92) 42%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.18) 76%, transparent 90%)',
        }}
      >
        <defs>
          <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-bloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="28" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-ray" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
          <radialGradient id="bFill" cx="50%" cy="48%" r="56%">
            <stop offset="0%"   stopColor="#0e7490" stopOpacity="0.32"/>
            <stop offset="40%"  stopColor="#0c2a4a" stopOpacity="0.20"/>
            <stop offset="100%" stopColor="#030712" stopOpacity="0.03"/>
          </radialGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.30"/>
            <stop offset="45%"  stopColor="#a78bfa" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="outerBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.18"/>
            <stop offset="55%"  stopColor="#4C1D95" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="strokeG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.55"/>
            <stop offset="50%"  stopColor="#a78bfa" stopOpacity="0.38"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25"/>
          </linearGradient>
          <radialGradient id="rayFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── Deep outer volumetric bloom (purple) ── */}
        <motion.ellipse cx="252" cy="200" rx="200" ry="175"
          fill="url(#outerBloom)" filter="url(#glow-bloom)"
          animate={{ opacity:[0.35, 1, 0.35], rx:[200,215,200], ry:[175,190,175] }}
          transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        />
        {/* ── Cyan mid bloom ── */}
        <motion.ellipse cx="252" cy="196" rx="130" ry="110"
          fill="rgba(123, 47, 247,0.09)" filter="url(#glow-bloom)"
          animate={{ opacity:[0.3, 0.9, 0.3] }}
          transition={{ duration:6.5, repeat:Infinity, ease:'easeInOut', delay:1 }}
        />

        {/* ── God rays (volumetric light) ── */}
        {GOD_RAYS.map((r, i) => (
          <motion.line
            key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="#22d3ee" strokeWidth={0.8} strokeLinecap="round"
            filter="url(#glow-ray)"
            initial={{ opacity: 0 }}
            animate={{ opacity:[0, 0.12, 0.05, 0.12, 0] }}
            transition={{ duration: r.dur, delay: r.del, repeat:Infinity, ease:'easeInOut' }}
          />
        ))}

        {/* ── Brain hemisphere fills ── */}
        <path
          d="M 252,295 C 228,296 202,292 180,280 C 155,266 136,246 124,220 C 112,194 110,164 118,140 C 126,116 146,96 172,86 C 196,78 220,80 240,90 C 248,95 252,104 252,118 Z"
          fill="url(#bFill)" stroke="url(#strokeG)" strokeWidth="1.2" opacity="0.94"
        />
        <path
          d="M 252,295 C 276,296 302,292 324,280 C 349,266 368,246 380,220 C 392,194 394,164 386,140 C 378,116 358,96 332,86 C 308,78 284,80 264,90 C 256,95 252,104 252,118 Z"
          fill="url(#bFill)" stroke="url(#strokeG)" strokeWidth="1.2" opacity="0.94"
        />

        {/* ── Corpus callosum ── */}
        <line x1="252" y1="118" x2="252" y2="295" stroke="rgba(123, 47, 247,0.10)" strokeWidth="1" strokeDasharray="3,7"/>

        {/* ── Gyri fold lines left ── */}
        <g fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.16">
          <path d="M 172,100 C 155,122 144,150 146,180"/>
          <path d="M 146,180 C 144,205 152,228 162,246"/>
          <path d="M 200,84  C 192,106 188,130 190,158"/>
          <path d="M 190,158 C 192,182 198,204 204,222"/>
          <path d="M 228,82  C 224,106 222,130 226,156"/>
        </g>
        {/* ── Gyri fold lines right ── */}
        <g fill="none" stroke="#a78bfa" strokeWidth="0.8" opacity="0.16">
          <path d="M 332,100 C 349,122 360,150 358,180"/>
          <path d="M 358,180 C 360,205 352,228 342,246"/>
          <path d="M 304,84  C 312,106 316,130 314,158"/>
          <path d="M 314,158 C 312,182 306,204 300,222"/>
          <path d="M 276,82  C 280,106 282,130 278,156"/>
        </g>

        {/* ── Core inner glow ── */}
        <ellipse cx="252" cy="196" rx="85" ry="74" fill="url(#coreGlow)" filter="url(#glow-soft)"/>
        {/* Secondary bright core */}
        <motion.ellipse cx="252" cy="196" rx="42" ry="36"
          fill="rgba(123, 47, 247,0.14)"
          animate={{ opacity:[0.5,1,0.5], rx:[42,48,42], ry:[36,42,36] }}
          transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
          filter="url(#glow-soft)"
        />

        {/* ── All flow paths ── */}
        {PATHS.map((p,i) => <FlowPath key={i} {...p}/>)}

        {/* ── All nodes ── */}
        {NODES.map(n => <Node key={n.id} {...n}/>)}

        {/* ── Pulsing brain outline ── */}
        <motion.path
          d="M 252,118 C 248,95 240,90 220,80 C 196,78 172,86 150,98 C 126,110 114,132 112,158 C 110,184 116,210 126,232 C 136,254 154,272 178,282 C 202,292 228,296 252,295 C 276,296 302,292 326,282 C 350,272 368,254 378,232 C 388,210 394,184 392,158 C 390,132 378,110 356,98 C 334,86 310,78 286,80 C 266,82 256,95 252,118"
          fill="none" stroke="rgba(123, 47, 247,0.35)" strokeWidth="1.4"
          filter="url(#glow-soft)"
          animate={{ opacity:[0.25,0.9,0.25] }}
          transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        />
        {/* Purple outline layer */}
        <motion.path
          d="M 252,118 C 248,95 240,90 220,80 C 196,78 172,86 150,98 C 126,110 114,132 112,158 C 110,184 116,210 126,232 C 136,254 154,272 178,282 C 202,292 228,296 252,295 C 276,296 302,292 326,282 C 350,272 368,254 378,232 C 388,210 394,184 392,158 C 390,132 378,110 356,98 C 334,86 310,78 286,80 C 266,82 256,95 252,118"
          fill="none" stroke="rgba(167,139,250,0.20)" strokeWidth="2.5"
          filter="url(#glow-bloom)"
          animate={{ opacity:[0.15,0.6,0.15] }}
          transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:2 }}
        />

        {/* ── Brainstem ── */}
        <path
          d="M 238,295 C 236,310 238,324 244,330 C 248,334 256,334 260,330 C 266,324 268,310 266,295"
          fill="url(#bFill)" stroke="rgba(123, 47, 247,0.20)" strokeWidth="1.1"
        />

        {/* ── Floating data sparks near brain edge ── */}
        {[
          {cx:120,cy:155,del:0.5},{cx:387,cy:145,del:1.8},{cx:108,cy:240,del:0.9},
          {cx:395,cy:235,del:2.4},{cx:240,cy:72,del:1.1},{cx:268,cy:72,del:2.8},
        ].map((s,i)=>(
          <motion.circle key={i} cx={s.cx} cy={s.cy} r={1.5}
            fill="#22d3ee"
            animate={{ opacity:[0,1,0], r:[1,2.5,1] }}
            transition={{ duration:3, delay:s.del, repeat:Infinity, ease:'easeInOut' }}
            style={{ filter:'drop-shadow(0 0 6px #22d3ee)' }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

