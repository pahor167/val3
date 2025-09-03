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
