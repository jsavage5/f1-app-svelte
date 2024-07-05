<!-- src/routes/predictions/+page.svelte -->
<script>
  export let data;
  $: ({ predictions } = data);
</script>

<h1 class="text-3xl font-bold mb-4">My Predictions</h1>

{#if predictions && predictions.length > 0}
  <ul class="space-y-4">
    {#each predictions as prediction}
      <li class="bg-white shadow-md p-4 rounded-md">
        <h2 class="text-xl font-semibold">{prediction.race.name}</h2>
        <p class="text-gray-500">Date: {new Date(prediction.race.date).toLocaleDateString()}</p>
        <p class="font-semibold mt-2">Your prediction:</p>
        <ol class="list-decimal list-inside ml-4 mt-2 space-y-1">
          {#each prediction.driver_order as driverId}
            <li class="bg-gray-100 p-2 rounded-md">{driverId}</li>
          {/each}
        </ol>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-gray-500">You haven't made any predictions yet.</p>
{/if}
