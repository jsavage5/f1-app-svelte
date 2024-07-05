<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase/supabaseClient';
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores/authStore';
    
    onMount(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        user.set(session?.user ?? null);
      });
    });
    
    async function handleLogout() {
      await supabase.auth.signOut();
      user.set(null);
      goto('/auth');
    }
    </script>
    
    <nav>
        <a href="/">Home</a>
        <a href="/races">Races</a>
        <a href="/predictions">My Predictions</a>
        {#if $user}
          <button on:click={handleLogout}>Logout</button>
        {:else}
          <a href="/auth">Login</a>
        {/if}
    </nav>
      
    <main>
        <slot />
    </main>
    
    <style>
      nav {
        display: flex;
        justify-content: space-around;
        padding: 1em;
        background-color: #f0f0f0;
      }
      main {
        padding: 2em;
      }
    </style>