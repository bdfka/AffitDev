const SUPABASE_URL = 'https://hzwsxszdslebzmzpamjs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_if031z_AUeXH1RhGX7svrw_nbAEnIwB';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
