
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '../types';
import { getJarvisAssistantResponse } from '../services/geminiService';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ client, onBack }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `I've loaded the case file for ${client.name}. I've identified several opportunities regarding ${client.goals[0].description}. How would you like to proceed?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const context = `Client: ${client.name}. Address: ${client.address}. Assets: ${JSON.stringify(client.assets)}. Goals: ${JSON.stringify(client.goals)}. Notes: ${client.notes.join(' ')}`;
    
    try {
      const response = await getJarvisAssistantResponse(userMsg, context);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm processing that information now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Unable to reach Jarvis. Check connectivity." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark transition-colors">
      <header className="px-8 py-6 border-b border-border-light dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-semibold uppercase tracking-widest">
          <button onClick={onBack} className="hover:text-primary transition-colors">Clients</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-primary font-bold">Case ${client.id}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <img className="w-16 h-16 rounded-2xl border-2 border-white dark:border-slate-600 shadow-lg object-cover" src={client.avatar} alt={client.name} />
            <div>
              <h1 className="font-display text-4xl text-slate-900 dark:text-white font-medium">
                {client.name} {client.partner && <span className="text-lg font-sans font-normal text-slate-400 ml-2">& {client.partner.split(' ')[0]}</span>}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span> {client.address}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-lg">edit_note</span> Edit Profile
            </button>
            <button className="bg-primary hover:bg-sky-400 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-glow flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-lg">auto_awesome</span> Generate Suitability Report
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Column - Financial Snapshot */}
        <div className="lg:col-span-3 space-y-6 overflow-y-auto custom-scroll pr-2">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Financial Overview</h3>
            <div className="space-y-5">
              <DetailStat label="Household Income" value={client.householdIncome} icon="payments" color="emerald" />
              <DetailStat label="AUM Under Management" value={client.aum} icon="account_balance" color="primary" />
              <DetailStat label="Estimated Net Worth" value={client.netWorth} icon="diamond" color="purple" />
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-border-dark">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Risk Profile</h4>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${client.riskScore > 7 ? 'bg-rose-500' : client.riskScore > 4 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  style={{width: `${client.riskScore * 10}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                <span>Safe</span>
                <span className="text-slate-800 dark:text-white">{client.riskProfile} ({client.riskScore}/10)</span>
                <span>Adventurous</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vault Storage</h3>
                <button className="text-primary text-[10px] font-bold border border-primary/20 px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors">UPLOAD FILE</button>
             </div>
             <div className="space-y-4">
                <FileItem name="Suitability_Evidence_Jan26.pdf" date="24 Jan" size="3.1MB" type="pdf" />
                <FileItem name="Portfolio_Valuation_Q4.xlsx" date="15 Jan" size="1.2MB" type="xls" />
                <FileItem name="Fact_Find_Locked.docx" date="10 Jan" size="450KB" type="doc" />
             </div>
          </div>
        </div>

        {/* Middle Column - Intelligence Hub */}
        <div className="lg:col-span-6 space-y-6 overflow-y-auto custom-scroll pr-2">
          <div className="bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-sky-100/50 dark:border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <span className="material-symbols-outlined text-9xl">psychology</span>
             </div>
             <h2 className="font-display text-2xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">intelligence</span>
               Case Intelligence
             </h2>
             <div className="grid grid-cols-3 gap-6">
                <IntelligenceAgent name="Evie" initial="Ev" status="ANALYZING" color="blue" active />
                <IntelligenceAgent name="Emma" initial="Em" status="IDLE" color="purple" />
                <IntelligenceAgent name="Colin" initial="Co" status="IDLE" color="slate" />
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="font-display text-xl text-slate-800 dark:text-white border-b border-border-light dark:border-border-dark pb-3 flex items-center gap-2">
               <span className="material-symbols-outlined text-amber-500">target</span>
               Strategic Goals
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {client.goals.map((goal, i) => (
                  <div key={i} className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-border-light dark:border-border-dark hover:border-primary/30 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${goal.priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-sky-50 text-sky-600'}`}>
                        {goal.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">{goal.description}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="font-display text-xl text-slate-800 dark:text-white border-b border-border-light dark:border-border-dark pb-3">Consultant Notes</h3>
             <div className="space-y-3">
                {client.notes.map((note, i) => (
                  <div key={i} className="bg-amber-50/50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-4 rounded-r-xl">
                    <p className="text-xs text-amber-900 dark:text-amber-200 italic leading-relaxed">"{note}"</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column - Jarvis Chat Assistant */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
          <div className="flex flex-col bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden h-full">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
                </div>
                <div>
                  <span className="font-display font-semibold block leading-none">Jarvis AI</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Case Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-400">SYNCED</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex-1 p-5 space-y-5 overflow-y-auto custom-scroll text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-primary/20 text-primary border border-primary/20'}`}>
                    {msg.role === 'user' ? 'AM' : 'JV'}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-slate-400 italic px-2">Jarvis is thinking...</div>}
            </div>

            <div className="p-4 border-t border-border-light dark:border-border-dark bg-white dark:bg-slate-800/50">
              <div className="relative">
                <input 
                  value={input}
                  disabled={loading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-primary dark:text-white transition-all shadow-inner" 
                  placeholder="Ask Jarvis about this case..." 
                  type="text" 
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="absolute right-2 top-1.5 text-primary hover:text-white hover:bg-primary w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailStat = ({ label, value, icon, color }: any) => (
  <div className="flex items-center gap-4 group">
    <div className={`w-10 h-10 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-lg font-display font-semibold text-slate-900 dark:text-white leading-none">{value}</p>
    </div>
  </div>
);

const FileItem = ({ name, date, size, type }: any) => (
  <div className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-border-light dark:hover:border-border-dark shadow-sm hover:shadow-md">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-inner ${type === 'pdf' ? 'bg-red-50 text-red-500' : type === 'xls' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
      <span className="material-symbols-outlined text-lg">{type === 'pdf' ? 'picture_as_pdf' : type === 'xls' ? 'table_chart' : 'description'}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-primary transition-colors">{name}</p>
      <p className="text-[10px] text-slate-400 font-medium">{date} • {size}</p>
    </div>
    <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">download</span>
  </div>
);

const IntelligenceAgent = ({ name, initial, status, color, active }: any) => (
  <div className={`p-4 rounded-2xl border transition-all shadow-sm ${active ? 'bg-white dark:bg-slate-800 border-primary shadow-glow scale-105' : 'bg-white/40 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700 opacity-60'}`}>
    <div className="flex flex-col items-center text-center">
      <div className={`w-10 h-10 rounded-xl bg-${color}-100 text-${color}-600 flex items-center justify-center text-xs font-bold mb-3 shadow-sm`}>{initial}</div>
      <span className="text-xs font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-tighter">{name}</span>
      <span className={`inline-block px-2 py-0.5 text-[8px] font-bold rounded-lg border ${status === 'ANALYZING' ? 'bg-primary/10 text-primary border-primary/20 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
        {status}
      </span>
    </div>
  </div>
);

export default ClientDetail;
