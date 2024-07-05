<script>
    export let data;
  
    $: ({ predictions } = data);
  </script>
  
  <h1>My Predictions</h1>
  
  {#if predictions && predictions.length > 0}
    <ul>
      {#each predictions as prediction}
        <li>
          <h2>{prediction.race.name}</h2>
          <p>Date: {new Date(prediction.race.date).toLocaleDateString()}</p>
          <p>Your prediction:</p>
          <ol>
            {#each prediction.driver_order as driverId}
              <li>{driverId}</li>
            {/each}
          </ol>
        </li>
      {/each}
    </ul>
  {:else}
    <p>You haven't made any predictions yet.</p>
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
  </style>