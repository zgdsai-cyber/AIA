export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const { createClient } = require('@supabase/supabase-js');
  return createClient(supabaseUrl, supabaseKey);
};
