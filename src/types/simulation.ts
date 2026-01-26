export type RiskLevel = 'low' | 'elevated' | 'high' | 'critical';

export type ActionType = 'open' | 'report' | 'delete' | 'ignore';

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isPhishing: boolean;
  phishingIndicators?: string[];
  urgency: 'normal' | 'high';
  timerSeconds?: number;
  attachments?: {
    name: string;
    type: string;
  }[];
  links?: {
    text: string;
    url: string;
    isMalicious: boolean;
  }[];
}

export interface ActionFeedback {
  title: string;
  description: string;
  riskChange: number;
  isPositive: boolean;
}

export interface ActionConsequence {
  open: ActionFeedback;
  report: ActionFeedback;
  delete: ActionFeedback;
  ignore: ActionFeedback;
}

export interface SimulationState {
  phase: 'intro' | 'inbox' | 'incident' | 'summary';
  currentEmailIndex: number;
  riskScore: number;
  maxRisk: number;
  actions: { emailId: string; action: ActionType }[];
  completedEmails: string[];
  incidentTriggered: boolean;
}

export interface SummaryData {
  finalRiskLevel: RiskLevel;
  riskScore: number;
  totalEmails: number;
  correctActions: number;
  phishingReported: number;
  phishingOpened: number;
  legitimateMisreported: number;
  strongBehaviors: string[];
  areasToWatch: string[];
}
