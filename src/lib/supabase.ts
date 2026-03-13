import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://viuqvtdixlmjqtayekmx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7PmmUZhYkD01O-GBKvTDJg_tE4Ef7f7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
