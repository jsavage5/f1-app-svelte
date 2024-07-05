<!-- src/routes/+layout.svelte -->
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

<nav class="fixed w-full bg-white shadow-md">
  <div class="container mx-auto flex justify-between items-center p-4">
    <a href="/" class="text-2xl font-bold text-blue-500">F1 Predictions</a>
    <div class="flex space-x-4">
      <a href="/" class="text-gray-600 hover:text-blue-500">Home</a>
      <a href="/races" class="text-gray-600 hover:text-blue-500">Races</a>
      <a href="/predictions" class="text-gray-600 hover:text-blue-500">My Predictions</a>
      {#if $user}
        <button on:click={handleLogout} class="text-gray-600 hover:text-blue-500">Logout</button>
      {:else}
        <a href="/auth" class="text-gray-600 hover:text-blue-500">Login</a>
      {/if}
    </div>
  </div>
</nav>

<main class="pt-16 container mx-auto p-4">
  <slot />
</main>

<style>
  nav {
    z-index: 10;
  }
</style>
