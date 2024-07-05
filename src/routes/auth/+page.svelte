<script>
    import { supabase } from '$lib/supabase/supabaseClient';
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
    let loading = false;
    let error = null;
    
    async function handleLogin() {
      try {
        loading = true;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        goto('/');
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }
    
    async function handleSignUp() {
      try {
        loading = true;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the login link!');
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }
    </script>
    
    <h1>Login / Sign Up</h1>
    
    <form on:submit|preventDefault>
      <input type="email" placeholder="Email" bind:value={email} />
      <input type="password" placeholder="Password" bind:value={password} />
      <button on:click={handleLogin} disabled={loading}>Log In</button>
      <button on:click={handleSignUp} disabled={loading}>Sign Up</button>
    </form>
    
    {#if error}
      <p class="error">{error}</p>
    {/if}
    
    <style>
      form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        margin: 0 auto;
      }
      .error {
        color: red;
      }
    </style>