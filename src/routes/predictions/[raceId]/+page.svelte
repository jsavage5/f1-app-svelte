<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { supabase } from '$lib/supabase/supabaseClient';
    import { dndzone } from 'svelte-dnd-action';
    import { user } from '$lib/stores/authStore';
    
    let race = null;
    let drivers = [];
    let loading = true;
    let error = null;
    
    onMount(async () => {
      const raceId = $page.params.raceId;
      try {
        // Fetch race details
        let { data: raceData, error: raceError } = await supabase
          .from('races')
          .select('*')
          .eq('id', raceId)
          .single();
        
        if (raceError) throw raceError;
        race = raceData;
    
        // Fetch drivers
        let { data: driversData, error: driversError } = await supabase
          .from('drivers')
          .select('*');
        
        if (driversError) throw driversError;
        drivers = driversData ? driversData.map((driver, index) => ({ ...driver, position: index + 1 })) : [];
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    });
    
    function handleDndConsider(e) {
      drivers = e.detail.items;
    }
    
    function handleDndFinalize(e) {
      drivers = e.detail.items;
    }
    
    async function submitPrediction() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
    
        // Check if the user exists in the users table
        const { data: existingUser, error: userCheckError } = await supabase
          .from('users')
          .select('id')
          .eq('id', currentUser.id)
          .single();
    
        if (userCheckError) {
          console.error('Error checking user:', userCheckError);
          throw userCheckError;
        }
    
        // If the user doesn't exist in the users table, insert them
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: currentUser.id,
              email: currentUser.email,
              name: currentUser.user_metadata?.full_name || currentUser.email
            });
    
          if (insertError) {
            console.error('Error inserting user:', insertError);
            throw insertError;
          }
        }
    
        if (!race || !drivers.length) {
          throw new Error('Race or drivers data is missing');
        }
    
        const prediction = {
          race_id: race.id,
          user_id: currentUser.id,
          driver_order: drivers.map(d => d.id)
        };
    
        const { error: predictionError } = await supabase.from('predictions').upsert(prediction);
    
        if (predictionError) {
          console.error('Error submitting prediction:', predictionError);
          throw predictionError;
        }
    
        alert('Prediction submitted successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert(`Error submitting prediction: ${error.message}`);
      }
    }
    </script>
    
    <h1>Make Prediction for {race?.name || 'Loading...'}</h1>
    
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if drivers.length}
      <div use:dndzone={{items: drivers}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
        {#each drivers as driver (driver.id)}
          <div class="driver-item">
            {driver.position}. {driver.first_name} {driver.Last_name} ({driver.team})
          </div>
        {/each}
      </div>
    
      <button on:click={submitPrediction}>Submit Prediction</button>
    {:else}
      <p>No drivers available for this race.</p>
    {/if}
    
    <style>
      .driver-item {
        padding: 10px;
        margin: 5px 0;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        cursor: move;
      }
      .error {
        color: red;
      }
    </style>