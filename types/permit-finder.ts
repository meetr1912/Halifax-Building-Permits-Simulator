export type PermitType = 
  | 'Building Permit'
  | 'Development Permit'
  | 'Zoning Approval'
  | 'Deck Permit'
  | 'Fence Permit'
  | 'Swimming Pool Permit'
  | 'Driveway Permit'
  | 'Demolition Permit'
  | 'Lot Grading Permit'
  | 'Heritage Approval'
  | 'Environmental Assessment';

export type Answers = {
  [key: string]: string;
};

export interface Question {
  id: string;
  text: string;
  options: string[];
  nextQuestion: { [key: string]: string | null };
}

export interface PermitResult {
  permits: PermitType[];
  additionalInfo: string[];
}

