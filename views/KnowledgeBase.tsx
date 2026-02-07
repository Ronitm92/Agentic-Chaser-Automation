
import React, { useState } from 'react';
import { queryJarvisKnowledgeBase } from '../services/geminiService';
import { MOCK_CLIENTS } from '../data/mockData';

const KnowledgeBase: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string, sources: Array<{title: string, uri: string}> } | null>(null);

  const handleQuery = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await queryJarvisKnowledgeBase(query);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ text: "Sorry, I encountered an error searching for that.", sources: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scroll bg-slate-50/50 dark:bg-slate-900/50 relative">
      <div className="max-w-6xl mx-auto px-8 py-10 space-y-12">
        <section className="text-center space-y-8 py-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Firm Intelligence Knowledge Base</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto italic">
              "Unified intelligence across regulatory frameworks, provider benchmarks, and client roadmaps."
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 to-indigo-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition"></div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-5 text-primary text-2xl">psychology</span>
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                className="w-full pl-16 pr-24 py-5 text-lg rounded-2xl border-0 shadow-soft ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-surface-dark text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner" 
                placeholder="Ask Jarvis about firm policies or client case statuses..." 
                type="text"
              />
              <button 
                onClick={handleQuery}
                disabled={loading}
                className="absolute right-3 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-sky-600 transition shadow-lg text-sm disabled:opacity-50"
              >
                {loading ? 'Synthesizing...' : 'Search Engine'}
              </button>
            </div>
          </div>
        </section>

        {result && (
            <section className="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-border-light dark:border-border-dark animate-fade-in space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    <h3 className="font-display text-xl font-bold">Jarvis Intelligence Response</h3>
                </div>
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                    {result.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
                {result.sources.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">link</span> Sources & Citations
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {result.sources.map((source, i) => (
                        <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary transition-all group">
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary">{source.title}</span>
                          <span className="material-symbols-outlined text-[10px] text-slate-400">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </section>
        )}

        {/* New Client Status Matrix Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Case Management & Strategic Roadmap
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Firm Overview</span>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">LOA Status</th>
                  <th className="px-6 py-4">Goal Progress</th>
                  <th className="px-6 py-4">Intelligence Next Step</th>
                  <th className="px-6 py-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {MOCK_CLIENTS.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{client.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {client.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                        client.loaStatus.includes('Critical') ? 'bg-rose-50 text-rose-600' : 
                        client.loaStatus.includes('Pending') ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'
                      }`}>
                        {client.loaStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-primary" style={{width: `${client.goalProgress}%`}}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{client.goalProgress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm animate-pulse">forward</span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{client.nextStep}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${client.riskScore > 6 ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">trending_up</span>
              Firm Intelligence Updates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard title="BADR Legislation Watch" detail="Potential changes to Business Asset Disposal Relief expected in Q2 budget. Monitoring high-risk client Basil Fawlty." icon="gavel" color="red" />
              <InsightCard title="Mortgage Rates Divergence" detail="LOA chasing suggests 12-day faster processing via Digital Portals than traditional mail." icon="rule" color="orange" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <h3 className="font-display text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
              <span className="material-symbols-outlined text-emerald-500">menu_book</span>
              Firm Wisdom
            </h3>
            <div className="bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark p-6 space-y-6 shadow-soft">
               <div>
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest">Pinned Note</h4>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Joint Trust Onboarding 2024</p>
                    <p className="text-[11px] text-emerald-700/70 dark:text-emerald-400/70 mt-2 leading-relaxed">Always use revised Form 12-B for joint trusts to prevent LOA rejections.</p>
                  </div>
               </div>
               <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-border-light dark:border-border-dark">Access Policy Library</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, detail, icon, color }: any) => (
  <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark shadow-soft hover:border-primary/40 transition-all cursor-pointer group">
    <div className="flex items-center gap-3 mb-4">
      <span className={`p-2.5 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 material-symbols-outlined transition-transform group-hover:scale-110`}>{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Firm Insight</span>
    </div>
    <h4 className="font-bold text-slate-900 dark:text-white mb-2 leading-tight">{title}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{detail}</p>
  </div>
);

export default KnowledgeBase;
