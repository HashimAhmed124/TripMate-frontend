export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  preferences: {
    budgetRange?: { min: number; max: number };
    travelStyle?: string;
  };
}