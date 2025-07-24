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
          position: string
          years_experience: number
          languages: string[]
          specialties: string[]
          sales_style: string
          work_motivation: string
          bio: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          position: string
          years_experience: number
          languages: string[]
          specialties: string[]
          sales_style: string
          work_motivation: string
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          position?: string
          years_experience?: number
          languages?: string[]
          specialties?: string[]
          sales_style?: string
          work_motivation?: string
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