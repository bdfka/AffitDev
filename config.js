const SUPABASE_URL = 'https://hzwsxszdslebzmzpamjs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_secret_gqa0N6UibMNMq7Z75i41zw_i13bXNcw';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);