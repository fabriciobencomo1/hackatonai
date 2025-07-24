import { supabase } from './supabase';
import type { Database } from '@/types/database.types';
import type { SalespersonData } from '@/types';

export type Salesperson = Database['public']['Tables']['salespeople']['Row'];

export async function createSalesperson(data: SalespersonData): Promise<Salesperson | null> {
  const { data: salesperson, error } = await supabase
    .from('salespeople')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      position: data.position,
      years_experience: data.yearsExperience,
      languages: data.languages,
      specialties: data.specialties,
      sales_style: data.salesStyle,
      work_motivation: data.workMotivation,
      bio: data.bioGenerated || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating salesperson:', error);
    return null;
  }

  return salesperson;
}

export async function getSalesperson(id: string): Promise<Salesperson | null> {
  const { data: salesperson, error } = await supabase
    .from('salespeople')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching salesperson:', error);
    return null;
  }

  return salesperson;
}

export async function updateSalesperson(id: string, data: Partial<SalespersonData>): Promise<Salesperson | null> {
  const { data: salesperson, error } = await supabase
    .from('salespeople')
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      position: data.position,
      years_experience: data.yearsExperience,
      languages: data.languages,
      specialties: data.specialties,
      sales_style: data.salesStyle,
      work_motivation: data.workMotivation,
      bio: data.bioGenerated || null,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating salesperson:', error);
    return null;
  }

  return salesperson;
}

export async function getAllSalespeople(): Promise<Salesperson[]> {
  const { data: salespeople, error } = await supabase
    .from('salespeople')
    .select()
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching salespeople:', error);
    return [];
  }

  return salespeople;
} 