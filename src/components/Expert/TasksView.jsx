import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export default function TasksView({ setActiveTab, setActiveIncidentId }) {
  const { user } = useAuth();
  const [activeTabLocal, setActiveTabLocal] = useState('New Requests');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['New Requests', 'Accepted Tasks', 'In Progress', 'Completed'];

  const seedMockIncidents = async () => {
    try {
      const mockData = [
        { id: 'INC-2045', title: 'Suspicious Login Activity', severity: 'Medium', client: 'Client-X892', status: 'New Requests', date: '2026-04-26', expertId: null },
        { id: 'INC-2046', title: 'Ransomware Infection', severity: 'Critical', client: 'Client-V104', status: 'New Requests', date: '2026-04-26', expertId: null },
        { id: 'INC-2039', title: 'DDoS Attack Mitigation', severity: 'High', client: 'Client-B920', status: 'In Progress', date: '2026-04-25', expertId: user.id },
        { id: 'INC-2011', title: 'Firewall Config Review', severity: 'Low', client: 'Client-A110', status: 'Completed', date: '2026-04-20', expertId: user.id },
      ];
      
      for (const item of mockData) {
        await supabase.from('incidents').upsert(item);
      }
    } catch (err) {
      console.error("Failed to seed incidents:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
    
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('incidents').select('*');
      if (error) {
        console.error("Error fetching incidents:", error);
        setLoading(false);
        return;
      }
      
      if (!data || data.length === 0) {
        await seedMockIncidents();
        const { data: newData } = await supabase.from('incidents').select('*');
        setTasks(newData || []);
      } else {
        setTasks(data);
      }
      setLoading(false);
    };

    fetchTasks();

    const subscription = supabase
      .channel('public:incidents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, payload => {
        if (payload.eventType === 'INSERT') {
          setTasks(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
        } else if (payload.eventType === 'DELETE') {
          setTasks(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);


  const handleAcceptTask = async (taskId) => {
    try {
      const { error } = await supabase.from('incidents').update({
        status: 'In Progress',
        expertId: user.id
      }).eq('id', taskId);
      if (error) throw error;
      setActiveIncidentId(taskId);
      setActiveTab('Chat');
    } catch (err) {
      console.error("Failed to accept task:", err);
      alert("Failed to accept task.");
    }
  };

  const handleViewDetails = (taskId) => {
    setActiveIncidentId(taskId);
    setActiveTab('Incident');
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTabLocal === 'Accepted Tasks') return t.expertId === user.id && t.status === 'New Requests';
    if (activeTabLocal === 'New Requests') return t.status === 'New Requests' && !t.expertId;
    return t.status === activeTabLocal && t.expertId === user.id;
  });

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Task Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input type="text" placeholder="Search tasks..." className="bg-hacker-card border border-hacker-border text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-hacker-neon/50 w-full sm:w-64" />
          </div>
          <button className="bg-hacker-card border border-hacker-border p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-hacker-border space-x-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTabLocal(tab)}
            className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTabLocal === tab ? 'text-hacker-neon' : 'text-gray-400 hover:text-gray-200'}`}
          >
            {tab}
            {activeTabLocal === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-hacker-neon shadow-[0_0_10px_rgba(123, 47, 247,0.8)]" />
            )}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-lg overflow-hidden relative">
        {loading && (
           <div className="absolute inset-0 bg-hacker-bg/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-hacker-neon border-t-transparent rounded-full animate-spin"></div>
           </div>
        )}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hacker-border bg-hacker-bg/50 text-sm text-gray-400">
              <th className="p-4 font-medium">Task ID</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Severity</th>
              <th className="p-4 font-medium">Client</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hacker-border">
            {filteredTasks.length > 0 ? filteredTasks.map(task => (
              <tr key={task.id} className="hover:bg-hacker-bg/50 transition-colors group">
                <td className="p-4">
                  <span className="text-xs font-mono bg-hacker-bg text-gray-300 px-2 py-1 rounded border border-hacker-border">{task.id}</span>
                </td>
                <td className="p-4">
                  <p className="text-white font-medium">{task.title}</p>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getSeverityStyle(task.severity)}`}>
                    {task.severity}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm">
                  {task.client}
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {task.date}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {activeTabLocal === 'New Requests' && (
                      <>
                        <button onClick={() => handleAcceptTask(task.id)} className="p-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors" title="Accept Task">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors" title="Reject Task">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    {activeTabLocal === 'In Progress' && (
                       <button onClick={() => { setActiveIncidentId(task.id); setActiveTab('Chat'); }} className="p-1.5 bg-purple-500/10 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition-colors" title="Open Chat">
                          <Eye size={16} />
                       </button>
                    )}
                    <button onClick={() => handleViewDetails(task.id)} className="p-1.5 bg-hacker-neon/10 text-hacker-neon rounded hover:bg-hacker-neon hover:text-white transition-colors" title="View Details">
                      <Search size={16} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No tasks found in this section.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

