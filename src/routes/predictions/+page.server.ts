import { supabase } from '$lib/supabase/supabaseClient';

export async function load({ locals }) {
    const { session, user } = await locals.safeGetSession();
    
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
        .eq('user_id', user.id)
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
