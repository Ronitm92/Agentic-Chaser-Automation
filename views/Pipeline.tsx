
import React from 'react';
import { ViewType } from '../types';

interface PipelineProps {
    onSelectClient: (clientName: string) => void;
}

const Pipeline: React.FC<PipelineProps> = ({ onSelectClient }) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="h-16 bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl text-slate-800 dark:text-white font-semibold">Agentic Chaser Pipeline</h1>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Operations Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
            <input className="pl-10 pr-4 py-2 w-64 text-sm rounded-xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Filter requests..." type="text"/>
          </div>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-primary rounded-xl shadow-glow hover:bg-sky-600 transition-all">
            <span className="material-symbols-outlined text-lg">post_add</span>
            <span>New Case Request</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto overflow-y-hidden kanban-scroll p-8 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex h-full gap-8 min-w-max pb-4">
          <KanbanColumn title="Request Generated" count={3} color="slate">
            <KanbanCard 
                name="Sarah Thompson" 
                providers={["Aviva SIPP", "Unilever DB"]} 
                id="REQ-802" 
                note="Automatic request sent to Aviva. Checking for Unilever portal access." 
                tag="Paraplanning" 
                initial="ST" 
                bg="bg-indigo-100" 
                onClick={() => onSelectClient('Sarah Thompson')}
            />
            <KanbanCard 
                name="Keith Lard" 
                providers={["Brewin Dolphin", "SIPP Partnership"]} 
                id="REQ-805" 
                note="Valuation request pending for Partnership scheme." 
                initial="KL" 
                bg="bg-emerald-100" 
                onClick={() => onSelectClient('Keith Lard')}
            />
          </KanbanColumn>

          <KanbanColumn title="Awaiting Signature" count={1} color="amber">
            <KanbanCard 
                name="Alan Partridge" 
                providers={["Aviva", "Prudential"]} 
                id="REQ-911" 
                status="e-Sign Sent" 
                action="Reminder Sent to Client" 
                initial="AP" 
                bg="bg-orange-100" 
                onClick={() => onSelectClient('Alan Partridge')}
            />
          </KanbanColumn>

          <KanbanColumn title="Provider Chasing" count={2} color="primary">
            <KanbanCard 
                name="David Chen" 
                providers={["Goldman SIPP", "Barclays SIPP"]} 
                id="REQ-772" 
                days={18} 
                alert="Chaser 3 Sent" 
                alertNote="Barclays slow to reply. Agent Emma on standby for phone call." 
                initial="DC" 
                bg="bg-sky-100" 
                onClick={() => onSelectClient('David Chen')}
            />
             <KanbanCard 
                name="Emma Thompson" 
                providers={["AstraZeneca Pension"]} 
                id="REQ-404" 
                days={4} 
                note="Normal processing time: 12 days." 
                initial="ET" 
                bg="bg-purple-100" 
                onClick={() => onSelectClient('Emma Thompson')}
            />
          </KanbanColumn>

          <KanbanColumn title="Resolved / Complete" count={5} color="emerald">
            <KanbanCard 
                name="Delbert Wilkins" 
                providers={["SIPP", "Spain Property"]} 
                id="REQ-017" 
                status="Data Imported" 
                initial="DW" 
                bg="bg-slate-100" 
                onClick={() => onSelectClient('Delbert Wilkins')}
            />
          </KanbanColumn>
        </div>
      </div>
    </div>
  );
};

const KanbanColumn = ({ title, count, color, children }: any) => (
  <div className="w-80 flex flex-col h-full group">
    <div className="flex items-center justify-between mb-5 px-1">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-6 rounded-full bg-${color === 'primary' ? 'primary' : color + '-400'}`}></div>
        <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-widest leading-none">{title}</h3>
      </div>
      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-border-light dark:border-border-dark">{count}</span>
    </div>
    <div className="flex-1 overflow-y-auto pr-3 flex flex-col gap-5 custom-scroll pb-10">
      {children}
    </div>
  </div>
);

const KanbanCard = ({ name, providers, id, note, tag, initial, bg, status, action, days, alert, alertNote, error, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-soft border border-border-light dark:border-border-dark group hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center font-black text-slate-800 text-xs shadow-inner border border-black/5`}>
          {initial}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{name}</h4>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {providers.map((p: string) => (
              <span key={p} className="text-[9px] bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-600 leading-none font-bold uppercase tracking-tight">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      {id && <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 font-mono tracking-tighter">#{id}</span>}
      {days && <div className="text-right flex flex-col items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800">
        <span className="block text-sm font-black text-amber-600 dark:text-amber-400 leading-none">{days}</span>
        <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest">Days</span>
      </div>}
    </div>

    <div className="flex flex-wrap gap-2 mb-3">
      {tag && <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100">{tag}</span>}
      {status && <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">{status}</span>}
    </div>

    {error && <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-xl p-3 mb-3">
      <p className="text-[10px] font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">report</span> {error}
      </p>
    </div>}

    {alert && <div className="bg-rose-50 dark:bg-rose-900/10 rounded-xl p-3 border border-rose-100 dark:border-rose-900/30 flex gap-3 mb-3">
      <span className="material-symbols-outlined text-rose-500 text-lg flex-shrink-0">notifications_active</span>
      <div>
        <p className="text-[10px] font-black text-rose-700 dark:text-rose-400 uppercase tracking-widest">{alert}</p>
        {alertNote && <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{alertNote}</p>}
      </div>
    </div>}

    {note && (
      <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 animate-pulse">psychology</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic leading-relaxed">"{note}"</p>
        </div>
      </div>
    )}

    {action && (
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 -mx-5 -mb-5 px-5 py-4 bg-sky-50/50 dark:bg-sky-900/10 group-hover:bg-primary transition-colors">
        <button className="w-full text-[10px] font-black text-primary group-hover:text-white uppercase tracking-widest flex items-center justify-center gap-2">
          {action} <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    )}
  </div>
);

export default Pipeline;
