import { useCompetitionStore } from '../store/competitionStore';
import type { CreateCompetitionData } from '../types/competition';

export const initializeSampleCompetitions = () => {
  const createCompetition = useCompetitionStore.getState().createCompetition;
  
  const sampleCompetitions: CreateCompetitionData[] = [
    {
      name: "Young Gamers Challenge",
      type: "age",
      criteria: "18-25",
      maxParticipants: 8,
      duration: 5,
      prize: 150
    },
    {
      name: "Brunette Battle",
      type: "hairColor",
      criteria: "brown",
      maxParticipants: 6,
      duration: 3,
      prize: 100
    },
    {
      name: "Experienced Players Tournament",
      type: "age",
      criteria: "26-35",
      maxParticipants: 10,
      duration: 7,
      prize: 200
    },
    {
      name: "Blonde Blitz",
      type: "hairColor",
      criteria: "blonde",
      maxParticipants: 5,
      duration: 4,
      prize: 120
    }
  ];

  // Only add sample competitions if none exist
  const existingCompetitions = useCompetitionStore.getState().competitions;
  if (existingCompetitions.length === 0) {
    sampleCompetitions.forEach(comp => createCompetition(comp));
  }
};
