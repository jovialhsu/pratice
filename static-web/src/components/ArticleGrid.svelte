<script>
import Article from './Article.svelte';
import Topic from './Topic.svelte';
export let articles;
</script>
<style>
section{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
}
@media (min-width:768px){
    section{
        grid-template-columns: repeat (2,1fr);
    }
}
</style>
<section class="blog">
	<div class="container">
     <Topic titleCn={'小農紀事'} titleEn={'blog'}/>
		{#each articles as article}
			<Article 
				title={article.title}
				date={article.date}
				image={article.image}
				imageAlt={article.imageAlt}
				desc={article.desc}
				/>		
		{/each}
	</div>
</section>