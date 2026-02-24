
import React, { useState } from 'react';
import { MessageTemplate, TemplateType } from '../types';

const INITIAL_TEMPLATES: MessageTemplate[] = [
  {
    id: '1',
    name: 'Initial LOA Request',
    type: 'Email',
    subject: 'Action Required: Letter of Authority for {{provider}}',
    body: 'Dear {{client_name}},\n\nI hope you are well. To proceed with your financial review, we need your signature on the attached Letter of Authority for {{provider}}.\n\nYou can sign this digitally via the link below.',
    lastEdited: '2 days ago'
  },
  {
    id: '2',
    name: 'Urgent Signature Reminder',
    type: 'SMS',
    body: 'Hi {{client_name}}, just a quick nudge to sign the LOA for {{provider}} so we can stay on track for your {{goal}} target. Check your email!',
    lastEdited: '1 week ago'
  },
  {
    id: '3',
    name: 'Provider Chaser Script',
    type: 'VOIP',
    body: 'Hello, I am calling from AdvisoryAI on behalf of {{client_name}}. We are chasing an outstanding valuation for policy {{policy_number}}. Please confirm the current status.',
    lastEdited: '3 days ago'
  }
];

const Settings: React.FC = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>(INITIAL_TEMPLATES);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MessageTemplate>>({});

  const handleEdit = (template: MessageTemplate) => {
    setIsEditing(template.id);
    setEditForm(template);
  };

  const handleSave = () => {
    if (isEditing === 'new') {
        const newId = Math.random().toString(36).substr(2, 9);
        setTemplates([...templates, { ...editForm, id: newId, lastEdited: 'Just now' } as MessageTemplate]);
    } else {
        setTemplates(templates.map(t => t.id === isEditing ? { ...t, ...editForm, lastEdited: 'Just now' } as MessageTemplate : t));
    }
    setIsEditing(null);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scroll p-8 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">settings</span>
                </div>
                <div>
                    <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Automation Settings</h1>
                    <p className="text-sm text-slate-500">Configure your firm's AI workflows and communication logic.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-glow hover:bg-sky-600 transition-all">Save System Config</button>
            </div>
        </header>

        {/* Workflow & Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                {/* Workflow Builder */}
                <section className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-soft">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">account_tree</span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Agentic Workflows</h2>
                    </div>
                    <button className="text-sm font-bold text-primary hover:underline">+ New Logic Rule</button>
                  </div>
                  
                  <div className="space-y-4">
                     <WorkflowRule 
                        condition="LOA Status is Pending Provider" 
                        duration="> 10 Days" 
                        actions={['Send SMS Reminder', 'VOIP Provider Chaser']}
                        active={true}
                     />
                     <WorkflowRule 
                        condition="Status is Action Required" 
                        actions={['Alert Advisor via WhatsApp']}
                        active={true}
                     />
                  </div>
                </section>

                {/* TEMPLATE MANAGER SECTION */}
                <section className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-soft overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">dynamic_feed</span>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Communication Templates</h2>
                        </div>
                        <button 
                            onClick={() => { setIsEditing('new'); setEditForm({ type: 'Email', body: '', name: 'New Template' }); }}
                            className="bg-sky-50 dark:bg-sky-900/20 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                        >
                            + Add Template
                        </button>
                    </div>

                    {isEditing ? (
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-primary/30 animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-slate-900 dark:text-white">Editing {editForm.name}</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                                    <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg">Save Template</button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Template Name</label>
                                        <input 
                                            value={editForm.name} 
                                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-2 px-4 text-sm" 
                                            placeholder="e.g. Signature Follow-up" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Channel</label>
                                        <select 
                                            value={editForm.type} 
                                            onChange={(e) => setEditForm({...editForm, type: e.target.value as TemplateType})}
                                            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-2 px-4 text-sm"
                                        >
                                            <option>Email</option>
                                            <option>SMS</option>
                                            <option>WhatsApp</option>
                                            <option>VOIP</option>
                                        </select>
                                    </div>
                                </div>
                                {editForm.type === 'Email' && (
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Subject Line</label>
                                        <input 
                                            value={editForm.subject} 
                                            onChange={(e) => setEditForm({...editForm, subject: e.target.value})}
                                            className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl py-2 px-4 text-sm font-medium" 
                                            placeholder="Enter email subject" 
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Message Body</label>
                                    <textarea 
                                        rows={5}
                                        value={editForm.body} 
                                        onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                                        className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-2xl py-3 px-4 text-sm leading-relaxed" 
                                        placeholder="Use {{placeholder}} for dynamic fields..." 
                                    />
                                    <div className="flex gap-2 mt-3">
                                        {['client_name', 'provider', 'policy_number', 'goal'].map(v => (
                                            <button 
                                                key={v} 
                                                onClick={() => setEditForm({...editForm, body: editForm.body + ` {{${v}}}`})}
                                                className="text-[9px] font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded hover:bg-primary/10 transition-colors text-slate-500"
                                            >
                                                + {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {templates.map(t => (
                                <div key={t.id} className="group relative bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            t.type === 'Email' ? 'bg-blue-100 text-blue-600' : 
                                            t.type === 'SMS' ? 'bg-orange-100 text-orange-600' :
                                            t.type === 'WhatsApp' ? 'bg-green-100 text-green-600' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                            <span className="material-symbols-outlined text-lg">
                                                {t.type === 'Email' ? 'mail' : t.type === 'SMS' ? 'textsms' : t.type === 'WhatsApp' ? 'chat_bubble' : 'call'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{t.name}</h4>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.type}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 italic">"{t.body}"</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <span className="text-[10px] text-slate-400">Edited {t.lastEdited}</span>
                                        <button onClick={() => handleEdit(t)} className="text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit Template <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
                {/* Agent Personalities */}
                <section className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-soft">
                  <h2 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">psychology</span>
                    AI Personalities
                  </h2>
                  <div className="space-y-2">
                      <ToggleItem label="Gentle Nudge" description="Polite, spaced follow-ups" icon="spa" color="green" />
                      <ToggleItem label="Standard Persistent" description="Follow-ups every 3 days" icon="robot_2" color="blue" active />
                      <ToggleItem label="Urgent Escalation" description="Daily chasers & priority VOIP" icon="priority_high" color="rose" />
                  </div>
                </section>

                {/* Channel Management */}
                <section className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-soft">
                  <h2 className="text-xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">hub</span>
                    Live Channels
                  </h2>
                  <div className="space-y-2">
                      <ToggleItem label="Email Gateway" icon="mail" color="blue" active />
                      <ToggleItem label="WhatsApp Business" icon="chat" color="green" active />
                      <ToggleItem label="AI VOIP Engine" icon="call" color="purple" />
                      <ToggleItem label="Secure SMS" icon="textsms" color="orange" active />
                  </div>
                </section>

                {/* AI Safety/Compliance Note */}
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-3xl">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-amber-500">verified_user</span>
                        <h4 className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest">Compliance Guard</h4>
                    </div>
                    <p className="text-[11px] text-amber-700/80 dark:text-amber-400 leading-relaxed">
                        All generated communication is automatically cross-referenced with your firm's compliance library before transmission.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowRule = ({ condition, duration, actions, active }: any) => (
    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-5 flex-wrap group transition-all hover:border-primary/30 shadow-sm">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IF</span>
        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">{condition}</div>
        {duration && <><span className="text-[10px] font-black text-slate-400 uppercase">FOR</span><div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">{duration}</div></>}
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">THEN</span>
        <div className="flex gap-2 flex-wrap">
            {actions.map((a: string) => (
                <div key={a} className="bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-lg text-[10px] border border-sky-100 dark:border-sky-800 text-primary font-black uppercase tracking-tighter">{a}</div>
            ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
            <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-primary shadow-glow' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-md ${active ? 'right-0.5' : 'left-0.5'}`} />
            </div>
            <span className="material-symbols-outlined text-slate-300 cursor-pointer hover:text-rose-500 transition-colors">delete</span>
        </div>
    </div>
);

const ToggleItem = ({ label, description, icon, color, active }: any) => (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 flex items-center justify-center shadow-inner transition-transform group-hover:scale-105`}>
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none mb-1">{label}</h4>
                {description && <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{description}</p>}
            </div>
        </div>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
        </div>
    </div>
);

export default Settings;
