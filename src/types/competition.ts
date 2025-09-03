export interface Competition {
  id: string;
  name: string;
  type: 'age' | 'hairColor';
  criteria: string | number; // hair color name or age range
  participants: string[]; // user IDs
  maxParticipants: number;
  duration: number; // in minutes
  startTime: Date | null;
  isActive: boolean;
  isCompleted: boolean;
  winner: string | null; // user ID
  prize: number; // points
}

export interface CreateCompetitionData {
  name: string;
  type: 'age' | 'hairColor';
  criteria: string;
  maxParticipants: number;
  duration: number;
  prize: number;
}
