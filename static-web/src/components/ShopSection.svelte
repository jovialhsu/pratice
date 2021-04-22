<script>
import IndexSection from './IndexSection.svelte';
import FruitShop from './FruitShop.svelte';
export let fruits
</script>

<IndexSection section={'shop'} titleCn={'購買商品'} titleEn={'shop'}>
    <FruitShop {fruits}/>
</IndexSection>