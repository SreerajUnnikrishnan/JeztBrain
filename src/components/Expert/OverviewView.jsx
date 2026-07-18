import React from 'react';
import { Shield, Clock, AlertTriangle, Users, MessageSquare, CheckSquare } from 'lucide-react';

export default function OverviewView() {
  const activeTickets = [
    { id: 'INC-2045', user: 'Client-X892', type: 'Phishing', waitTime: '4m', priority: 'Medium' },
    { id: 'INC-2046', user: 'Client-V104', type: 'Ransomware', waitTime: '1m', priority: 'Critical' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile & Welcome */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-hacker-card border border-hacker-neon/50 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(123, 47, 247,0.3)]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=hacker1&backgroundColor=0B0F19" alt="Profile" className="h-full w-full rounded-full object-cover bg-hacker-bg" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Welcome back, Agent_Null <Shield className="text-hacker-neon h-5 w-5" />
            </h2>
            <p className="text-gray-400">System is nominal. 14 pending requests in queue.</p>
          </div>
        </div>
        <button className="bg-hacker-neon hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(123, 47, 247,0.4)]">
          Go Offline
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Earnings" value="$12,450" icon={<Shield className="text-hacker-neon h-5 w-5" />} />
        <StatCard title="Active Tasks" value="3" icon={<Clock className="text-hacker-neon h-5 w-5" />} />
        <StatCard title="Pending Requests" value="14" icon={<Users className="text-yellow-500 h-5 w-5" />} />
        <StatCard title="Completed Tasks" value="89" icon={<CheckSquare className="text-green-500 h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Requests */}
        <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-hacker-border flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Incoming Requests</h3>
            <span className="bg-hacker-neon/20 text-hacker-neon text-xs font-bold px-2 py-1 rounded-full">{activeTickets.length}</span>
          </div>
          <div className="divide-y divide-hacker-border">
            {activeTickets.map(ticket => (
              <div key={ticket.id} className="p-6 hover:bg-hacker-border/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded mb-2 inline-block border border-gray-700">{ticket.id}</span>
                    <h4 className="font-semibold text-white">{ticket.user}</h4>
                    <p className="text-sm text-gray-400">{ticket.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      ticket.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {ticket.priority}
                    </span>
                    <p className="text-xs text-gray-400 mt-2 flex items-center justify-end gap-1"><Clock size={12}/> {ticket.waitTime}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button className="flex-1 bg-hacker-neon/10 hover:bg-hacker-neon hover:text-white text-hacker-neon border border-hacker-neon/50 py-2 rounded-lg font-medium transition-all text-sm flex justify-center items-center gap-2">
                    <CheckSquare size={16} /> Accept Task
                  </button>
                  <button className="flex-1 bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700 py-2 rounded-lg font-medium transition-colors text-sm">
                    View Requests
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-hacker-border">
            <h3 className="text-lg font-semibold text-white">System Notifications</h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              { id: 1, text: "New critical vulnerability (CVE-2026-1045) detected in client network.", time: "10m ago", critical: true },
              { id: 2, text: "Client INC-2039 uploaded new evidence logs.", time: "1h ago", critical: false },
              { id: 3, text: "Payment of $1,200 cleared to your account.", time: "3h ago", critical: false },
              { id: 4, text: "Reminder: Scheduled review for INC-1982.", time: "5h ago", critical: false },
            ].map((alert) => (
               <div key={alert.id} className="flex items-start gap-3 p-3 bg-hacker-bg rounded-lg border border-hacker-border/50 hover:border-hacker-border transition-colors">
                <div className={`mt-0.5 ${alert.critical ? 'text-red-500' : 'text-hacker-neon'}`}>
                  {alert.critical ? <AlertTriangle size={18} /> : <MessageSquare size={18} />}
                </div>
                <div>
                  <p className="text-sm text-gray-300">{alert.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="p-6 bg-hacker-card rounded-xl border border-hacker-border shadow-lg relative overflow-hidden group hover:border-hacker-neon/50 transition-colors cursor-pointer">
      <div className="absolute inset-0 bg-hacker-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="p-2 bg-hacker-bg rounded-lg border border-hacker-border">{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white relative z-10">{value}</p>
    </div>
  );
}

