<script>
	export let data;
	$: ({ drivers } = data);
</script>

<h1>Welcome to Supabase!</h1>
<ul>
	{#each drivers as driver}
		<li>{driver.first_name}</li>
	{/each}
</ul>