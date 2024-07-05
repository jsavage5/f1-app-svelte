import { supabase } from '$lib/supabase/supabaseClient';

export async function load({ locals }) {
  const { session, user } = await locals.safeGetSession(); // Updated line
  
  if (!session) {
    return {
      predictions: []
    };
  }

  const { data: predictions, error } = await supabase
    .from('predictions')
    .select(`
      id,
      driver_order,
      race:races(id, name, date)
    `)
    .eq('user_id', user.id) // Updated line
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching predictions:', error);
    return {
      predictions: []
    };
  }

  return {
    predictions
  };
}
