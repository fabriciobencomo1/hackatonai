interface SelectOption {
  value: string;
  label: string;
}

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
  salesStyle?: string;
  workMotivation?: string;
  bioGenerated?: string;
}

export interface SalespersonSaveData extends Omit<SalespersonFormData, 'languages' | 'specialties' | 'softSkills' | 'profileImage'> {
  languages: string[];
  specialties: string[];
  softSkills: string[];
}

export interface SalespersonData extends SalespersonSaveData {} 