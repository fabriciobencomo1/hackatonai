export interface SalespersonData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  yearsExperience: number;
  languages: string | string[];
  specialties: string | string[];
  salesStyle: string;
  workMotivation: string;
  bioGenerated?: string;
} 