import { supabase } from './supabase';

// Define the database schema type
export type Database = {
  public: {
    Tables: {
      passwords: {
        Row: {
          id: number
          website: string
          password: string
          created_at: string
        }
        Insert: {
          website: string
          password: string
          created_at?: string
        }
      }
    }
  }
}

export type Password = Database['public']['Tables']['passwords']['Row']

export const passwordService = {
  async getPasswords(): Promise<Password[]> {
    const { data, error } = await supabase
      .from('passwords')
      .select('*')
      .order('created_at', { ascending: false }) as { 
        data: Password[] | null; 
        error: Error | null 
      };

    if (error) throw error;
    return data || [];
  },

async savePassword(website: string, password: string): Promise<Password | null> {
const { data, error } = await supabase
    .from('passwords')
    .insert([{ 
    website, 
    password,
    created_at: new Date().toISOString()
    }])
    .select()
    .single() as {
    data: Password | null;
    error: Error | null
    };

if (error) throw error;
return data;
},

async deletePassword(id: number): Promise<boolean> {
const { error } = await supabase
    .from('passwords')
    .delete()
    .eq('id', id);

return !error;
}
};