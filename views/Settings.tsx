
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scroll p-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <h1 className="font-display text-3xl font-semibold">Automation Settings</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                    System Online
                </span>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium bg-white border rounded-lg hover:bg-slate-50">Discard Changes</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-glow">Save Configuration</button>
            </div>
        </header>

        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_tree</span>
              Workflow Builder
            </h2>
            <button className="text-sm font-medium text-primary hover:underline">+ Add Rule</button>
          </div>
          
          <div className="space-y-4">
             <WorkflowRule 
                condition="LOA Status is Pending Provider" 
                duration="> 10 Days" 
                actions={['Send SMS to Client', 'Email Provider']}
                active={true}
             />
             <WorkflowRule 
                condition="Status is Action Required" 
                actions={['Push Notification to Advisor']}
                active={true}
             />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Agent Personalities
            </h2>
            <div className="space-y-4">
                <ToggleItem label="Gentle Nudge" description="Polite reminders, weekly frequency" icon="spa" color="green" />
                <ToggleItem label="Standard Persistent" description="Follow-ups every 3 days" icon="robot_2" color="blue" active />
                <ToggleItem label="Urgent Escalation" description="Daily chasing & phone calls" icon="priority_high" color="rose" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">hub</span>
              Channel Management
            </h2>
            <div className="space-y-4">
                <ToggleItem label="Email Communication" icon="mail" color="blue" active />
                <ToggleItem label="WhatsApp Updates" icon="chat" color="green" active />
                <ToggleItem label="Automated VOIP Calls" icon="call" color="purple" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const WorkflowRule = ({ condition, duration, actions, active }: any) => (
    <div className="p-4 bg-slate-50 rounded-xl border flex items-center gap-4 flex-wrap">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IF</span>
        <div className="bg-white px-3 py-1.5 rounded-lg text-sm border font-medium">{condition}</div>
        {duration && <><span className="text-[10px] font-bold text-slate-400">FOR</span><div className="bg-white px-3 py-1.5 rounded-lg text-sm border font-medium">{duration}</div></>}
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">THEN</span>
        <div className="flex gap-2">
            {actions.map((a: string) => (
                <div key={a} className="bg-sky-50 px-3 py-1.5 rounded-lg text-xs border border-sky-100 text-primary font-bold">{a}</div>
            ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
            <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
            </div>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-rose-500">delete</span>
        </div>
    </div>
);

const ToggleItem = ({ label, description, icon, color, active }: any) => (
    <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-semibold">{label}</h4>
                {description && <p className="text-[10px] text-slate-500">{description}</p>}
            </div>
        </div>
        <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-primary' : 'bg-slate-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
        </div>
    </div>
);

export default Settings;
