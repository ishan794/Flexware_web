export interface CollectedData {
  name: string | null;
  business_type: string | null;
  requirements: string | null;
  budget: string | null;
  timeline: string | null;
  email: string | null;
  phone: string | null;
  industry: string | null;
  [key: string]: string | null;
}

export interface QualificationStep {
  field: keyof CollectedData;
  detect?: (text: string) => string | null;
  ask: (name: string | null, data: CollectedData) => string | null;
  persuasion?: string;
}

export interface IntentConfig {
  id: string;
  label: string;
  keywords: string[];
  qualificationSteps: QualificationStep[];
  upsellSuggestions: string[];
}

export interface ConversationState {
  intent: IntentConfig | null;
  intentId: string | null;
  data: CollectedData;
  stage: 'greeting' | 'qualifying' | 'upselling' | 'complete';
  askedFields: Set<string>;
  upsellIndex: number;
}

export interface EngineResponse {
  reply: string;
  state: ConversationState;
  complete: boolean;
}
