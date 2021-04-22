<script>
import Topic from './Topic.svelte';
export let titleCn;
export let titleEn;
export let section;
</script>
<section class={section}>
    <div class="container col-12">
        <Topic titleCn={titleCn} titleEn={titleEn}/>
        <slot/>
    </div>
</section>