import { supabase } from './supabase';
import type { Database } from '@/types/database.types';
import type { SalespersonSaveData } from '@/types';

export type Salesperson = Database['public']['Tables']['salespeople']['Row'];

export async function createSalesperson(data: SalespersonSaveData) {
  try {
    const { data: salesperson, error } = await supabase
      .from('salespeople')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        department: data.department,
        position: data.position,
        years_experience: Number(data.yearsExperience),
        languages: data.languages,
        specialties: data.specialties,
        soft_skills: data.softSkills,
        sales_style: data.salesStyle || null,
        work_motivation: data.workMotivation || null,
        bio: data.bioGenerated || null,
        image_url: data.imageUrl || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }

    return salesperson;
  } catch (error) {
    console.error('Error in createSalesperson:', error);
    throw error;
  }
}

export async function getSalesperson(id: string) {
  try {
    const { data: salesperson, error } = await supabase
      .from('salespeople')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }

    return salesperson;
  } catch (error) {
    console.error('Error in getSalesperson:', error);
    throw error;
  }
}

export async function updateSalesperson(id: string, data: Partial<SalespersonSaveData>) {
  try {
    const updateData: any = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      department: data.department,
      position: data.position,
      years_experience: data.yearsExperience,
      languages: data.languages,
      specialties: data.specialties,
      soft_skills: data.softSkills,
      sales_style: data.salesStyle || null,
      work_motivation: data.workMotivation || null,
      bio: data.bioGenerated || null,
      image_url: data.imageUrl || null
    };

    const { data: salesperson, error } = await supabase
      .from('salespeople')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }

    return salesperson;
  } catch (error) {
    console.error('Error in updateSalesperson:', error);
    throw error;
  }
}

export async function getAllSalespeople() {
  try {
    const { data: salespeople, error } = await supabase
      .from('salespeople')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }

    return salespeople || [];
  } catch (error) {
    console.error('Error in getAllSalespeople:', error);
    throw error;
  }
}

export async function deleteSalesperson(id: string) {
  try {
    const { error } = await supabase
      .from('salespeople')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteSalesperson:', error);
    throw error;
  }
}

export async function getSalespeopleByDepartment(department: string) {
  try {
    const { data: salespeople, error } = await supabase
      .from('salespeople')
      .select()
      .eq('department', department)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles by department:', error);
      throw error;
    }

    return salespeople || [];
  } catch (error) {
    console.error('Error in getSalespeopleByDepartment:', error);
    throw error;
  }
} 