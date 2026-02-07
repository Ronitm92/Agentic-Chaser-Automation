
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  CLIENT_LIST = 'CLIENT_LIST',
  PIPELINE = 'PIPELINE',
  CLIENT_DETAIL = 'CLIENT_DETAIL',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  SETTINGS = 'SETTINGS'
}

export interface ClientAsset {
  name: string;
  value: string;
  type: 'Pension' | 'ISA' | 'Property' | 'Other';
}

export interface ClientGoal {
  description: string;
  targetDate?: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Client {
  id: string;
  name: string;
  partner?: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  aum: string;
  netWorth: string;
  householdIncome: string;
  riskProfile: string;
  riskScore: number;
  lastInteraction: string;
  avatar: string;
  status: 'Active' | 'Onboarding' | 'Review' | 'Inactive';
  assets: ClientAsset[];
  goals: ClientGoal[];
  notes: string[];
  loaStatus: string;
  nextStep: string;
  goalProgress: number;
}

export interface KanbanItem {
  id: string;
  clientId: string;
  clientName: string;
  providers: string[];
  status: string;
  daysOpen: number;
  aiNote?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
