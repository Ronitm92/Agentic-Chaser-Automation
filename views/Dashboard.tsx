
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scroll">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="font-display text-3xl font-medium text-slate-900 dark:text-white">
            Good morning, <span className="italic text-primary">Alex</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what your AI team is working on today.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon="folder_open" label="Active Cases" value="24" color="blue" />
          <MetricCard icon="pending_actions" label="Pending LOAs" value="8" color="orange" />
          <MetricCard icon="event_available" label="Upcoming Reviews" value="3" color="emerald" />
          <MetricCard icon="auto_awesome" label="AI Tasks Saved" value="12h" color="purple" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-slate-800 dark:text-white">AI Agent Hub</h2>
              <button className="text-sm text-primary font-medium hover:underline">View All Activity</button>
            </div>

            <AgentCard 
              name="Evie" 
              role="Meeting Assistant" 
              status="Active" 
              task="Transcribing meeting with Sarah Jenkins. Drafting action points." 
              initial="E" 
              gradient="from-blue-400 to-indigo-500"
            />
            <AgentCard 
              name="Emma" 
              role="Paraplanner Assistant" 
              status="Review" 
              task="Generated Suitability Report for Michael Chang. Review risk section." 
              initial="Em" 
              gradient="from-purple-400 to-fuchsia-500"
            />
            <AgentCard 
              name="Colin" 
              role="Compliance Assistant" 
              status="Idle" 
              task="No active checks. Last completed 2 hours ago." 
              initial="C" 
              gradient="from-emerald-400 to-teal-500"
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-primary to-sky-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <h3 className="font-display text-xl mb-2">Start New Workflow</h3>
              <p className="text-sky-100 text-sm mb-4">Launch a new client review or compliance check instantly.</p>
              <button className="w-full py-2 bg-white text-primary font-medium rounded-lg text-sm hover:bg-sky-50 transition-colors shadow-sm">
                + Create New Case
              </button>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-col h-[400px]">
              <div className="p-5 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                <h3 className="font-display text-lg text-slate-900 dark:text-white">Live Chaser Feed</h3>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scroll">
                <FeedItem time="Just now" provider="AVIVA" label="LOA Received" detail="Scanned for Client #8821." color="primary" />
                <FeedItem time="14 mins ago" provider="PRUDENTIAL" label="Email Sent" detail="Follow-up regarding Policy #P-992." color="amber" />
                <FeedItem time="45 mins ago" provider="INTERNAL" label="Report Ready" detail="Compliance check completed for Q3." color="slate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, color }: { icon: string, label: string, value: string, color: string }) => (
  <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex items-center gap-4 hover:-translate-y-1 transition-transform">
    <div className={`p-3 bg-${color}-50 dark:bg-${color}-900/30 rounded-xl text-${color}-600 dark:text-${color}-400`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-2xl font-display font-semibold text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const AgentCard = ({ name, role, status, task, initial, gradient }: any) => (
  <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-md border border-border-light dark:border-border-dark relative overflow-hidden group">
    <div className="relative flex items-start gap-5">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center text-white text-2xl font-display font-bold`}>
        {initial}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{name}</h3>
            <p className="text-sm text-slate-500">{role}</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-700' : status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
            {status}
          </span>
        </div>
        <div className="mt-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-border-light dark:border-border-dark">
          <p className="text-sm text-slate-700 dark:text-slate-300">{task}</p>
        </div>
      </div>
    </div>
  </div>
);

const FeedItem = ({ time, provider, label, detail, color }: any) => (
  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 pb-1">
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-${color}-500`}></div>
    <div className="flex justify-between items-start mb-1">
      <span className="text-xs font-semibold text-primary">{time}</span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wide">{provider}</span>
    </div>
    <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{label}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{detail}</p>
  </div>
);

export default Dashboard;
