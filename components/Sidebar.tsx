
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: ViewType.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { id: ViewType.CLIENT_LIST, label: 'Clients', icon: 'group' },
    { id: ViewType.PIPELINE, label: 'Agentic Chaser', icon: 'work_history' },
    { id: ViewType.KNOWLEDGE_BASE, label: 'Knowledge Base', icon: 'auto_stories' },
  ];

  return (
    <aside className="w-20 lg:w-64 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col z-20 transition-all h-screen">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border-light dark:border-border-dark">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-glow">A</div>
        <span className="hidden lg:block ml-3 font-display font-semibold text-xl text-slate-800 dark:text-white">AdvisoryAI</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex items-center px-3 py-2.5 rounded-lg transition-all group ${
              currentView === item.id 
                ? 'bg-sky-50 dark:bg-slate-700/50 text-primary shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700/30 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
          </button>
        ))}
        
        <button
          onClick={() => onViewChange(ViewType.SETTINGS)}
          className={`flex items-center px-3 py-2.5 rounded-lg transition-all group mt-auto ${
            currentView === ViewType.SETTINGS 
              ? 'bg-sky-50 dark:bg-slate-700/50 text-primary' 
              : 'text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700/30 hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined">settings_suggest</span>
          <span className="hidden lg:block ml-3 font-medium">Automation Settings</span>
        </button>
      </nav>
      
      <div className="p-4 border-t border-border-light dark:border-border-dark">
        <button className="flex items-center w-full hover:bg-sky-50 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
          <img 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full border border-border-light dark:border-border-dark" 
            src="https://picsum.photos/seed/alex/100/100" 
          />
          <div className="hidden lg:block ml-3 text-left">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Alex Morgan</p>
            <p className="text-xs text-slate-400">Senior Paraplanner</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
