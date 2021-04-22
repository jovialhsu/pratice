<script>
import FruitCard from './FruitCard.svelte'
export let fruits;
</script>
<style>

</style>

{#each fruits as fruit}
    <FruitCard 
        fruit={fruit.fruit}
        weight={fruit.weight}
        image={fruit.image}
        desc={fruit.desc}
        price={fruit.price}
    />		
{/each}