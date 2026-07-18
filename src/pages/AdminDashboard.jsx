import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Users, Activity, Shield, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', company: 'Acme Corp' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@technova.com', role: 'User', status: 'Active', company: 'TechNova' },
    { id: 3, name: 'Alex M.', email: 'alex@jeztbrain.com', role: 'Expert', status: 'Active', company: 'JeztBrain' },
    { id: 4, name: 'Admin User', email: 'admin@jeztbrain.com', role: 'Admin', status: 'Active', company: 'JeztBrain' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="text-gray-700" /> Platform Administration
          </h1>
          <p className="text-gray-500 mt-1">Manage users, experts, and system configurations.</p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">1,248</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Shield size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Experts</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Activity size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">System Status</p>
            <p className="text-2xl font-bold text-gray-900">Healthy</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 bg-white">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      u.role === 'Admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      u.role === 'Expert' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.company}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-gray-400">
                      <button className="hover:text-primary transition-colors p-1"><Edit2 size={16} /></button>
                      <button className="hover:text-red-500 transition-colors p-1"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 text-sm text-gray-500 text-center">
          Showing 4 of 1,248 users
        </div>
      </div>
    </div>
  );
}

