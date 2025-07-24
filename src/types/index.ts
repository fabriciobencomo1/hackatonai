interface SelectOption {
  value: string;
  label: string;
}

export const BADGES = [
  'EV Specialist',
  'Multilingual Speaker',
  '5-Year Veteran',
  'First-Time Buyer Friendly',
  'Truck Expert'
] as const;

export const MODELS = [
  'F-150',
  'Mach-E',
  'Mustang',
  'Focus',
  'Fiesta'
] as const;

export interface SalespersonFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: 'Sales' | 'Managers' | 'Parts';
  position: string;
  yearsExperience: number;
  profileImage?: File;
  imageUrl?: string;
  languages?: SelectOption[];
  specialties?: SelectOption[];
  softSkills?: SelectOption[];
  badges?: SelectOption[];
  favoriteModels?: SelectOption[];
  salesStyle?: string;
  workMotivation?: string;
  bioGenerated?: string;
}

export interface SalespersonSaveData extends Omit<SalespersonFormData, 'languages' | 'specialties' | 'softSkills' | 'badges' | 'favoriteModels' | 'profileImage'> {
  languages: string[];
  specialties: string[];
  softSkills: string[];
  badges: string[];
  favoriteModels: string[];
}

export interface SalespersonData extends SalespersonSaveData {} 