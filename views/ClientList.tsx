
import React, { useState } from 'react';
import { Client } from '../types';
import { MOCK_CLIENTS } from '../data/mockData';

interface ClientListProps {
  onSelectClient: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredClients = MOCK_CLIENTS.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="p-8 border-b border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Client Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Access detailed case files and financial intelligence for your client base.</p>
          </div>
          <button className="bg-primary hover:bg-sky-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-glow flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-lg">person_add</span>
            Add New Client
          </button>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search by name, email or ID..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Active', 'Onboarding', 'Review'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  filterStatus === status 
                    ? 'bg-primary border-primary text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 border-border-light dark:border-border-dark text-slate-600 dark:text-slate-400 hover:border-primary'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8 custom-scroll">
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Client ID</th>
                <th className="px-6 py-4">Client Profile</th>
                <th className="px-6 py-4">Financials</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredClients.map(client => (
                <tr 
                  key={client.id} 
                  onClick={() => onSelectClient(client)}
                  className="hover:bg-sky-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-slate-400">{client.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={client.avatar} alt={client.name} className="w-11 h-11 rounded-full border-2 border-white dark:border-slate-700 shadow-sm transition-transform group-hover:scale-105" />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${client.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{client.name}</div>
                        <div className="text-xs text-slate-400">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{client.netWorth}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Net Worth</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${client.riskScore >= 7 ? 'bg-rose-500' : client.riskScore >= 4 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                       <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{client.riskProfile}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{client.lastInteraction}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      client.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' :
                      client.status === 'Onboarding' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
