<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase/supabaseClient';
    
    let races = [];
    let loading = true;
    let error = null;
    
    onMount(async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('races')
          .select('*')
          .order('date', { ascending: true })
          .gte('date', new Date().toISOString());
        
        if (fetchError) throw fetchError;
        races = data;
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    });
    </script>
    
    <h1>Upcoming Races</h1>
    
    {#if loading}
      <p>Loading races...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else}
      <ul>
        {#each races as race}
          <li>
            <h2>{race.name}</h2>
            <p>Date: {new Date(race.date).toLocaleDateString()}</p>
            <p>Time: {race.time}</p>
            <p>Location: {race.location}</p>
            <a href="/predictions/{race.id}">Make Prediction</a>
          </li>
        {/each}
      </ul>
    {/if}
    
    <style>
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 1em;
        padding: 1em;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .error {
        color: red;
      }
    </style>