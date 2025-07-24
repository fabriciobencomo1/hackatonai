export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      salespeople: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          department: string
          position: string
          years_experience: number
          image_url: string | null
          languages: string[]
          specialties: string[]
          soft_skills: string[]
          badges: string[]
          favorite_models: string[]
          sales_style: string | null
          work_motivation: string | null
          bio: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          department: string
          position: string
          years_experience: number
          image_url?: string | null
          languages: string[]
          specialties: string[]
          soft_skills: string[]
          badges: string[]
          favorite_models: string[]
          sales_style?: string | null
          work_motivation?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          department?: string
          position?: string
          years_experience?: number
          image_url?: string | null
          languages?: string[]
          specialties?: string[]
          soft_skills?: string[]
          badges?: string[]
          favorite_models?: string[]
          sales_style?: string | null
          work_motivation?: string | null
          bio?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 