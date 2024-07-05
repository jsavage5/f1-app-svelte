import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
  const { data: drivers, error } = await supabase
    .from('drivers')
    .select('*');

  if (error) {
    console.error('Error fetching drivers:', error);
    return { drivers: [] };
  }

  return { drivers };
}