import { handle } from '@sveltejs/kit';
import { supabase } from '$lib/supabase/supabaseClient';

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = supabase;
  event.locals.safeGetSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      return { session: null, user: null };
    }
    return { session, user: session?.user ?? null };
  };
  return resolve(event);
};
