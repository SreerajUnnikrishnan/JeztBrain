import React, { useState, useEffect } from 'react';
import { Server, Activity, FileText, Download, ShieldAlert, Terminal } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function IncidentDetailsView({ activeIncidentId, setActiveTab }) {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeIncidentId) {
      setLoading(false);
      return;
    }

    const fetchIncident = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('incidents').select('*').eq('id', activeIncidentId).single();
        if (error) throw error;
        if (data) {
          setIncident(data);
        }
      } catch (err) {
        console.error("Error fetching incident details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [activeIncidentId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-hacker-neon border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <ShieldAlert size={48} className="mb-4 opacity-50" />
        <p>No incident selected. Please select an incident from the Tasks view.</p>
        <button onClick={() => setActiveTab('Tasks')} className="mt-4 text-hacker-neon hover:underline">Go to Tasks</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono bg-hacker-card border border-hacker-border text-gray-300 px-2 py-1 rounded">{incident.id}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${incident.severity === 'Critical' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-orange-400 bg-orange-500/10 border-orange-500/30'}`}>
              {incident.severity}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">{incident.title}</h2>
        </div>
        <button 
          onClick={() => setActiveTab('Chat')}
          disabled={incident.status === 'New Requests'}
          className="bg-hacker-neon/10 text-hacker-neon border border-hacker-neon/50 px-4 py-2 rounded-lg font-medium hover:bg-hacker-neon hover:text-white transition-all shadow-[0_0_10px_rgba(123, 47, 247,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {incident.status === 'New Requests' ? 'Accept Task First' : 'Join Chat Room'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="text-hacker-neon h-5 w-5" /> Incident Description
            </h3>
            <div className="prose prose-invert max-w-none text-sm text-gray-300">
              <p>
                Client {incident.client} reports that several internal systems have been compromised. Immediate triage and containment are required.
              </p>
              <p className="mt-2">
                This is an auto-generated description for incident {incident.id}. Detailed forensic data should be requested via the Secure Chat channel.
              </p>
            </div>
          </div>

          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="text-hacker-neon h-5 w-5" /> Target System Info
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="OS" value="Unknown (Pending Recon)" />
              <InfoItem label="Network Segments" value="VLAN 10, VLAN 20" />
              <InfoItem label="Affected IPs" value="Multiple" />
              <InfoItem label="Status" value={incident.status} />
              <InfoItem label="Reported On" value={incident.date} />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Client Information</h3>
            <div className="space-y-3">
              <InfoItem label="Anonymous ID" value={incident.client} />
              <InfoItem label="Industry" value="Confidential" />
              <InfoItem label="Company Size" value="Enterprise" />
              <InfoItem label="Previous Incidents" value="0" />
            </div>
          </div>

          <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="text-hacker-neon h-5 w-5" /> Attached Evidence
            </h3>
            <div className="space-y-3">
              <EvidenceItem name="system_logs.csv" size="14 MB" />
              <EvidenceItem name="network_traffic.pcap" size="45 MB" />
            </div>
            <button className="w-full mt-4 bg-hacker-bg border border-hacker-border text-gray-300 py-2 rounded-lg font-medium hover:text-white hover:bg-hacker-border/50 transition-colors flex justify-center items-center gap-2 text-sm">
              <Download size={16} /> Download All Evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-hacker-bg p-3 rounded-lg border border-hacker-border/50">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm text-gray-200 font-medium">{value}</p>
    </div>
  );
}

function EvidenceItem({ name, size }) {
  return (
    <div className="flex items-center justify-between p-3 bg-hacker-bg rounded-lg border border-hacker-border/50 group">
      <div className="flex items-center gap-3 overflow-hidden">
        <FileText className="text-gray-400 h-4 w-4 flex-shrink-0" />
        <span className="text-sm text-gray-300 truncate">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{size}</span>
        <button className="text-gray-500 hover:text-hacker-neon opacity-0 group-hover:opacity-100 transition-all">
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}

