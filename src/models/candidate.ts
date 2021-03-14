export interface Candidate {
  id: string;
  step: Step;
  name: string;
  email: string;
  address: string;
  age: number;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export enum Step {
  NONE = 'none',
  CONTACT = 'contact',
  DIALOGUE = 'dialogue',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  COMPLETED = 'completed',
}
