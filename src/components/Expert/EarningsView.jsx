import React from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function EarningsView() {
  const transactions = [
    { id: 'TXN-9021', client: 'Client-A110', type: 'payment', amount: '+$850.00', status: 'Completed', date: '2026-04-20' },
    { id: 'TXN-9022', client: 'Client-B920', type: 'escrow', amount: '+$2,100.00', status: 'Pending', date: '2026-04-25' },
    { id: 'TXN-9023', client: 'Platform Fee', type: 'fee', amount: '-$85.00', status: 'Completed', date: '2026-04-20' },
    { id: 'TXN-8944', client: 'Withdrawal', type: 'withdrawal', amount: '-$3,500.00', status: 'Completed', date: '2026-04-15' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Earnings Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-900/40 to-hacker-card border border-hacker-neon/30 rounded-xl p-6 shadow-[0_0_20px_rgba(123, 47, 247,0.15)]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-purple-200">Total Available</h3>
            <div className="p-2 bg-hacker-neon/20 rounded-lg text-hacker-neon"><DollarSign size={20} /></div>
          </div>
          <p className="text-4xl font-bold text-white mb-2">$12,450.00</p>
          <div className="flex items-center gap-2 text-sm text-green-400 mt-4 bg-green-500/10 w-fit px-2 py-1 rounded">
            <TrendingUp size={14} /> +14% this month
          </div>
        </div>

        <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-400">Pending in Escrow</h3>
            <div className="p-2 bg-hacker-bg rounded-lg text-yellow-500 border border-hacker-border"><Clock size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">$2,100.00</p>
          <p className="text-sm text-gray-500 mt-4">Funds unlock upon task completion.</p>
        </div>

        <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-lg flex flex-col justify-center items-center text-center">
          <div className="h-16 w-16 rounded-full bg-hacker-bg border border-hacker-border flex items-center justify-center text-gray-400 mb-4">
            <CreditCard size={28} />
          </div>
          <h3 className="font-medium text-white mb-2">Withdraw Funds</h3>
          <p className="text-sm text-gray-400 mb-4">Transfer available balance to your crypto wallet or bank.</p>
          <button className="w-full bg-hacker-neon text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors shadow-[0_0_15px_rgba(123, 47, 247,0.3)]">
            Initiate Withdrawal
          </button>
        </div>
      </div>

      <div className="bg-hacker-card border border-hacker-border rounded-xl shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-hacker-border flex justify-between items-center bg-hacker-bg/50">
          <h3 className="text-lg font-semibold text-white">Transaction History</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hacker-border text-sm text-gray-400">
              <th className="p-4 font-medium">Transaction ID</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hacker-border">
            {transactions.map(txn => (
              <tr key={txn.id} className="hover:bg-hacker-bg/50 transition-colors">
                <td className="p-4">
                  <span className="text-xs font-mono text-gray-400">{txn.id}</span>
                </td>
                <td className="p-4 text-white text-sm">
                  {txn.client}
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {txn.date}
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${
                    txn.status === 'Completed' ? 'text-green-400 bg-green-500/10 border-green-500/30' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className={`p-4 text-right font-medium ${txn.amount.startsWith('+') ? 'text-green-400' : 'text-gray-300'}`}>
                  <div className="flex justify-end items-center gap-1">
                    {txn.amount.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} className="text-red-400" />}
                    {txn.amount}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

