import { create } from 'zustand';
import type { Competition, CreateCompetitionData } from '../types/competition';

interface CompetitionStore {
  competitions: Competition[];
  activeCompetition: Competition | null;
  createCompetition: (data: CreateCompetitionData) => void;
  joinCompetition: (competitionId: string, userId: string) => void;
  startCompetition: (competitionId: string) => void;
  endCompetition: (competitionId: string, winnerId: string) => void;
}

export const useCompetitionStore = create<CompetitionStore>((set) => ({
  competitions: [],
  activeCompetition: null,
  
  createCompetition: (data: CreateCompetitionData) => {
    const competition: Competition = {
      id: Date.now().toString(),
      ...data,
      participants: [],
      startTime: null,
      isActive: false,
      isCompleted: false,
      winner: null,
    };
    set((state) => ({
      competitions: [...state.competitions, competition],
    }));
  },
  
  joinCompetition: (competitionId: string, userId: string) => {
    set((state) => ({
      competitions: state.competitions.map((comp) => {
        if (comp.id === competitionId) {
          // Prevent duplicate joins
          if (comp.participants.includes(userId)) {
            return comp;
          }
          return { ...comp, participants: [...comp.participants, userId] };
        }
        return comp;
      }),
    }));
  },
  
  startCompetition: (competitionId: string) => {
    set((state) => {
      const competition = state.competitions.find((c) => c.id === competitionId);
      if (!competition) return state;
      
      const updatedCompetition = {
        ...competition,
        isActive: true,
        startTime: new Date(),
      };
      
      return {
        competitions: state.competitions.map((comp) =>
          comp.id === competitionId ? updatedCompetition : comp
        ),
        activeCompetition: updatedCompetition,
      };
    });
  },
  
  endCompetition: (competitionId: string, winnerId: string) => {
    set((state) => ({
      competitions: state.competitions.map((comp) =>
        comp.id === competitionId
          ? { ...comp, isActive: false, isCompleted: true, winner: winnerId }
          : comp
      ),
      activeCompetition: null,
    }));
  },
}));
