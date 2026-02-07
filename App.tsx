
import React, { useState } from 'react';
import { ViewType, Client } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Pipeline from './views/Pipeline';
import ClientList from './views/ClientList';
import ClientDetail from './views/ClientDetail';
import KnowledgeBase from './views/KnowledgeBase';
import Settings from './views/Settings';
import { MOCK_CLIENTS } from './data/mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setCurrentView(ViewType.CLIENT_DETAIL);
  };

  const handlePipelineSelect = (clientName: string) => {
    const client = MOCK_CLIENTS.find(c => c.name === clientName) || MOCK_CLIENTS[0];
    handleSelectClient(client);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewType.DASHBOARD:
        return <Dashboard />;
      case ViewType.CLIENT_LIST:
        return <ClientList onSelectClient={handleSelectClient} />;
      case ViewType.PIPELINE:
        return <Pipeline onSelectClient={handlePipelineSelect} />;
      case ViewType.CLIENT_DETAIL:
        return selectedClient ? (
          <ClientDetail 
            client={selectedClient} 
            onBack={() => {
              setSelectedClient(null);
              setCurrentView(ViewType.CLIENT_LIST);
            }} 
          />
        ) : <ClientList onSelectClient={handleSelectClient} />;
      case ViewType.KNOWLEDGE_BASE:
        return <KnowledgeBase />;
      case ViewType.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Sidebar 
        currentView={currentView} 
        onViewChange={(v) => {
            setCurrentView(v);
            setSelectedClient(null);
        }} 
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
