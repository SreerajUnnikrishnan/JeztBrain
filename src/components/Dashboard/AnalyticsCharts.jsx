import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function AnalyticsCharts() {
  const [data, setData] = useState([
    { time: '10:00', threats: 12, response: 5, health: 98 },
    { time: '10:05', threats: 18, response: 8, health: 96 },
    { time: '10:10', threats: 15, response: 4, health: 99 },
    { time: '10:15', threats: 25, response: 12, health: 94 },
    { time: '10:20', threats: 20, response: 6, health: 97 },
    { time: '10:25', threats: 32, response: 15, health: 92 },
    { time: '10:30', threats: 28, response: 9, health: 95 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastTime = prev[prev.length - 1].time;
        const [h, m] = lastTime.split(':').map(Number);
        const nextM = (m + 5) % 60;
        const nextH = nextM === 0 ? (h + 1) % 24 : h;
        const newTime = `${nextH.toString().padStart(2, '0')}:${nextM.toString().padStart(2, '0')}`;
        
        const newEntry = {
          time: newTime,
          threats: Math.max(5, Math.floor(Math.random() * 40)),
          response: Math.max(2, Math.floor(Math.random() * 20)),
          health: Math.max(90, Math.floor(Math.random() * 10) + 90),
        };

        return [...prev.slice(1), newEntry];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Threats & Response Chart */}
      <div className="bg-white dark:bg-[#070B14] border border-slate-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tactical Analysis</h3>
              <p className="text-[10px] text-slate-500 font-mono">Live Threat & Response Metrics</p>
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#070B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="threats" 
                stroke="#22d3ee" 
                fillOpacity={1} 
                fill="url(#threatGradient)" 
                strokeWidth={2}
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="response" 
                stroke="#a855f7" 
                fillOpacity={1} 
                fill="url(#responseGradient)" 
                strokeWidth={2}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health Chart */}
      <div className="bg-white dark:bg-[#070B14] border border-slate-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">System Integrity</h3>
              <p className="text-[10px] text-slate-500 font-mono">Uptime & Health Integrity Score</p>
            </div>
          </div>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}}
              />
              <YAxis 
                domain={[80, 100]}
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#070B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}
              />
              <Line 
                type="stepAfter" 
                dataKey="health" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={false}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

