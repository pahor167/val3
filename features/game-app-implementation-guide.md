# Game App Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing a demo gaming application with user authentication, competition setup, and time-based competitions with random winners.

## Application Features
- **Simple Authentication**: Username + age + hair color
- **Competition System**: Age-based or hair color-based competitions
- **Time-based Games**: 5-minute competitions with random winners
- **Points System**: Winners earn points, losers can replay
- **Admin Setup**: Create new competitions

## Table of Contents
1. [Project Setup](#1-project-setup)
2. [Application Structure](#2-application-structure)
3. [User Authentication](#3-user-authentication)
4. [Competition Management](#4-competition-management)
5. [Game Logic](#5-game-logic)
6. [UI Components](#6-ui-components)
7. [State Management](#7-state-management)
8. [Implementation Steps](#8-implementation-steps)

---

## 1. Project Setup

### Prerequisites
- React with TypeScript
- Tailwind CSS (already configured)
- State management (React Context or Zustand)

### Additional Dependencies to Install
```bash
npm install zustand
npm install react-router-dom
npm install @types/react-router-dom
npm install lucide-react  # for icons
```

---

## 2. Application Structure

### Folder Structure
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── UserProfile.tsx
│   ├── competitions/
│   │   ├── CompetitionList.tsx
│   │   ├── CompetitionCard.tsx
│   │   ├── CreateCompetition.tsx
│   │   └── ActiveCompetition.tsx
│   ├── game/
│   │   ├── GameArea.tsx
│   │   ├── Timer.tsx
│   │   └── Results.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Layout.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCompetitions.ts
│   └── useGameTimer.ts
├── store/
│   ├── authStore.ts
│   ├── competitionStore.ts
│   └── gameStore.ts
├── types/
│   ├── user.ts
│   ├── competition.ts
│   └── game.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── CompetitionsPage.tsx
│   ├── GamePage.tsx
│   └── SetupPage.tsx
└── utils/
    ├── gameLogic.ts
    └── validations.ts
```

---

## 3. User Authentication

### Step 3.1: Define User Types
Create `src/types/user.ts`:
```typescript
export interface User {
  id: string;
  username: string;
  age: number;
  hairColor: string;
  points: number;
  isLoggedIn: boolean;
}

export interface LoginFormData {
  username: string;
  age: number;
  hairColor: string;
}

export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'gray' | 'other';
```

### Step 3.2: Create Auth Store
Create `src/store/authStore.ts`:
```typescript
import { create } from 'zustand';
import { User, LoginFormData } from '../types/user';

interface AuthStore {
  user: User | null;
  login: (formData: LoginFormData) => void;
  logout: () => void;
  updatePoints: (points: number) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (formData: LoginFormData) => {
    const user: User = {
      id: Date.now().toString(),
      username: formData.username,
      age: formData.age,
      hairColor: formData.hairColor,
      points: 0,
      isLoggedIn: true,
    };
    set({ user });
  },
  logout: () => set({ user: null }),
  updatePoints: (points: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, points: state.user.points + points } : null,
    })),
}));
```

### Step 3.3: Create Login Form Component
Create `src/components/auth/LoginForm.tsx`:
```typescript
import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { LoginFormData, HairColor } from '../../types/user';

const HAIR_COLORS: HairColor[] = ['black', 'brown', 'blonde', 'red', 'gray', 'other'];

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    age: 0,
    hairColor: 'brown',
  });
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.trim() && formData.age > 0) {
      login(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Join the Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hair Color
          </label>
          <select
            value={formData.hairColor}
            onChange={(e) => setFormData({ ...formData, hairColor: e.target.value as HairColor })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {HAIR_COLORS.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Enter Game
        </button>
      </form>
    </div>
  );
};
```

---

## 4. Competition Management

### Step 4.1: Define Competition Types
Create `src/types/competition.ts`:
```typescript
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
```

### Step 4.2: Create Competition Store
Create `src/store/competitionStore.ts`:
```typescript
import { create } from 'zustand';
import { Competition, CreateCompetitionData } from '../types/competition';

interface CompetitionStore {
  competitions: Competition[];
  activeCompetition: Competition | null;
  createCompetition: (data: CreateCompetitionData) => void;
  joinCompetition: (competitionId: string, userId: string) => void;
  startCompetition: (competitionId: string) => void;
  endCompetition: (competitionId: string, winnerId: string) => void;
}

export const useCompetitionStore = create<CompetitionStore>((set, get) => ({
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
      competitions: state.competitions.map((comp) =>
        comp.id === competitionId
          ? { ...comp, participants: [...comp.participants, userId] }
          : comp
      ),
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
```

### Step 4.3: Create Competition Components
Create `src/components/competitions/CompetitionCard.tsx`:
```typescript
import React from 'react';
import { Competition } from '../../types/competition';
import { useAuthStore } from '../../store/authStore';
import { useCompetitionStore } from '../../store/competitionStore';

interface CompetitionCardProps {
  competition: Competition;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition }) => {
  const user = useAuthStore((state) => state.user);
  const joinCompetition = useCompetitionStore((state) => state.joinCompetition);
  
  const canJoin = () => {
    if (!user || competition.isActive || competition.isCompleted) return false;
    if (competition.participants.includes(user.id)) return false;
    if (competition.participants.length >= competition.maxParticipants) return false;
    
    // Check criteria
    if (competition.type === 'age') {
      const [minAge, maxAge] = competition.criteria.toString().split('-').map(Number);
      return user.age >= minAge && user.age <= maxAge;
    } else {
      return user.hairColor === competition.criteria;
    }
  };

  const handleJoin = () => {
    if (user && canJoin()) {
      joinCompetition(competition.id, user.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{competition.name}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>Type: {competition.type === 'age' ? 'Age Group' : 'Hair Color'}</p>
        <p>Criteria: {competition.criteria}</p>
        <p>Duration: {competition.duration} minutes</p>
        <p>Prize: {competition.prize} points</p>
        <p>Participants: {competition.participants.length}/{competition.maxParticipants}</p>
      </div>
      
      {competition.isCompleted && (
        <div className="mt-4 text-green-600 font-semibold">
          Competition Completed
        </div>
      )}
      
      {competition.isActive && (
        <div className="mt-4 text-orange-600 font-semibold">
          Competition in Progress
        </div>
      )}
      
      {!competition.isActive && !competition.isCompleted && (
        <button
          onClick={handleJoin}
          disabled={!canJoin()}
          className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
            canJoin()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {user?.id && competition.participants.includes(user.id) ? 'Joined' : 'Join Competition'}
        </button>
      )}
    </div>
  );
};
```

---

## 5. Game Logic

### Step 5.1: Create Game Timer Hook
Create `src/hooks/useGameTimer.ts`:
```typescript
import { useState, useEffect, useCallback } from 'react';

export const useGameTimer = (duration: number, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert minutes to seconds
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(duration * 60);
    setIsActive(false);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    isActive,
    start,
    stop,
    reset,
    formatTime: formatTime(timeLeft),
  };
};
```

### Step 5.2: Create Game Utilities
Create `src/utils/gameLogic.ts`:
```typescript
export const selectRandomWinner = (participantIds: string[]): string | null => {
  if (participantIds.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * participantIds.length);
  return participantIds[randomIndex];
};

export const checkEligibility = (
  userAge: number,
  userHairColor: string,
  competitionType: 'age' | 'hairColor',
  criteria: string | number
): boolean => {
  if (competitionType === 'age') {
    const [minAge, maxAge] = criteria.toString().split('-').map(Number);
    return userAge >= minAge && userAge <= maxAge;
  } else {
    return userHairColor === criteria;
  }
};

export const generateAgeRanges = () => [
  '18-25',
  '26-35',
  '36-45',
  '46-55',
  '56-65',
  '66+',
];
```

---

## 6. UI Components

### Step 6.1: Create Timer Component
Create `src/components/game/Timer.tsx`:
```typescript
import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: string;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, isActive }) => {
  return (
    <div className={`flex items-center space-x-2 text-2xl font-bold ${
      isActive ? 'text-red-600' : 'text-gray-600'
    }`}>
      <Clock className="w-6 h-6" />
      <span>{timeLeft}</span>
    </div>
  );
};
```

### Step 6.2: Create Active Competition Component
Create `src/components/competitions/ActiveCompetition.tsx`:
```typescript
import React, { useEffect } from 'react';
import { useCompetitionStore } from '../../store/competitionStore';
import { useAuthStore } from '../../store/authStore';
import { useGameTimer } from '../../hooks/useGameTimer';
import { Timer } from '../game/Timer';
import { selectRandomWinner } from '../../utils/gameLogic';

export const ActiveCompetition: React.FC = () => {
  const activeCompetition = useCompetitionStore((state) => state.activeCompetition);
  const endCompetition = useCompetitionStore((state) => state.endCompetition);
  const updatePoints = useAuthStore((state) => state.updatePoints);
  const user = useAuthStore((state) => state.user);

  const handleTimeUp = () => {
    if (activeCompetition) {
      const winner = selectRandomWinner(activeCompetition.participants);
      if (winner) {
        endCompetition(activeCompetition.id, winner);
        if (user && user.id === winner) {
          updatePoints(activeCompetition.prize);
        }
      }
    }
  };

  const { timeLeft, isActive, start, formatTime } = useGameTimer(
    activeCompetition?.duration || 5,
    handleTimeUp
  );

  useEffect(() => {
    if (activeCompetition && !isActive) {
      start();
    }
  }, [activeCompetition, isActive, start]);

  if (!activeCompetition) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No active competition</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-4">{activeCompetition.name}</h2>
      <div className="mb-6">
        <Timer timeLeft={formatTime} isActive={isActive} />
      </div>
      <div className="space-y-2 text-lg">
        <p>Participants: {activeCompetition.participants.length}</p>
        <p>Prize: {activeCompetition.prize} points</p>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">Competition in progress...</p>
        <p className="text-sm text-blue-600">Winner will be selected randomly when time runs out!</p>
      </div>
    </div>
  );
};
```

---

## 7. State Management

### Step 7.1: Main App Router Setup
Create `src/pages/DashboardPage.tsx`:
```typescript
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useCompetitionStore } from '../store/competitionStore';
import { CompetitionCard } from '../components/competitions/CompetitionCard';
import { ActiveCompetition } from '../components/competitions/ActiveCompetition';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const competitions = useCompetitionStore((state) => state.competitions);
  const activeCompetition = useCompetitionStore((state) => state.activeCompetition);

  const availableCompetitions = competitions.filter(
    (comp) => !comp.isCompleted && !comp.isActive
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.username}!
        </h1>
        <p className="text-gray-600">Your Points: {user?.points || 0}</p>
      </div>

      {activeCompetition && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Competition</h2>
          <ActiveCompetition />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Competitions</h2>
        {availableCompetitions.length === 0 ? (
          <p className="text-gray-600">No competitions available at the moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCompetitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 8. Implementation Steps

### Phase 1: Basic Setup (Day 1)
1. **Install Dependencies**
   ```bash
   npm install zustand react-router-dom @types/react-router-dom lucide-react
   ```

2. **Create Type Definitions**
   - Create `src/types/user.ts`
   - Create `src/types/competition.ts`

3. **Setup State Management**
   - Create `src/store/authStore.ts`
   - Create `src/store/competitionStore.ts`

### Phase 2: Authentication (Day 2)
1. **Create Login System**
   - Build `LoginForm` component
   - Implement user authentication logic
   - Add form validation

2. **Create User Profile**
   - Display user information
   - Show current points
   - Add logout functionality

### Phase 3: Competition System (Day 3)
1. **Create Competition Components**
   - Build `CompetitionCard` component
   - Implement join competition logic
   - Add eligibility checking

2. **Create Competition Management**
   - Build admin setup page
   - Add create competition form
   - Implement competition validation

### Phase 4: Game Logic (Day 4)
1. **Implement Timer System**
   - Create `useGameTimer` hook
   - Build `Timer` component
   - Add countdown functionality

2. **Create Game Flow**
   - Build `ActiveCompetition` component
   - Implement random winner selection
   - Add points awarding system

### Phase 5: UI Polish & Testing (Day 5)
1. **Complete UI Components**
   - Create navigation
   - Add responsive design
   - Implement loading states

2. **Testing & Bug Fixes**
   - Test all user flows
   - Fix edge cases
   - Add error handling

### Phase 6: Advanced Features (Optional)
1. **Enhanced Features**
   - Add competition history
   - Implement leaderboards
   - Add sound effects
   - Create achievement system

2. **Data Persistence**
   - Add localStorage for user data
   - Implement competition history
   - Save game statistics

---

## Key Implementation Notes

### Security Considerations
- This is a demo app with no real authentication
- In production, implement proper user management
- Add input validation and sanitization

### Performance Optimizations
- Use React.memo for competition cards
- Implement virtual scrolling for large competition lists
- Add loading states for better UX

### Testing Strategy
- Unit tests for game logic utilities
- Integration tests for competition flow
- E2E tests for complete user journey

### Deployment
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or similar platform
- Configure environment variables if needed

---

## Conclusion

This implementation guide provides a complete roadmap for building the gaming application. Start with Phase 1 and progress through each phase systematically. The modular structure allows for easy maintenance and feature additions.

Remember to test each component thoroughly and maintain clean, readable code throughout the development process.
