<script>
	import Header from './components/Header.svelte';
	import ArticleGrid from './components/ArticleGrid.svelte';
	import Footer from './components/Footer.svelte';
    import AboutSection from './components/AboutSection.svelte';
    import ShopSection from './components/ShopSection.svelte';
import ExpSection from './components/ExpSection.svelte';
	const articles =[
		{
			date:'2019-04-23',
			title:'雨過天晴後的豐收',
			image:'img/blog_big.jpg',
			imageAlt:'blog_rain',
			desc:'最近的雨還真是有夠多的，好險雨勢算一陣一陣的也不大，不然應該會很麻煩，麻煩的點有很多。<br>主要最麻煩的就是土壤積水太多，小顆蔬菜的根系容易受影響，土太溼的話開根會比較不容易，大顆蔬菜的根系是不太容易受影響，但結的果實就會有影響，因為土太溼，養份的吸收一定會受影響，連帶的對結的果，如青花菜、甜豌豆，也會產生一些不好的影響。<br>加上長期日照不足，植物的生長也是會變得比較緩慢，但看天吃飯就是務農的原罪，所以就是要趁天氣好的時候趕快種菜。<br>上週趁一陣子天氣大好的時候，一口氣把蒲瓜/小黃瓜/玉米筍/四季豆種下去。<br>希望之後也可以順順利利的長大，是說農場之前種的一批結頭菜，似乎也快要可以採收了，還有白花菜，好久不見了，再過一陣子就會跟大家見面嘍!!'
		},
		{
			date:'2019-01-19',
			title:'※持續近一週的藍天 ~~',
			image:'img/blog_s_1.jpg',
			imageAlt:'blog_bluesky',
			desc:'根據這幾年的經驗，每次一到冬季，藍色天空出現的機會真的比以前少了很多，甚至要連續出現三天的藍天也不是這麼容易，但最近是回歸正常了嗎?居然連續一星期的藍天，讓小編覺得，這才是真正的田間生活，往來於田野之中，大口呼吸乾淨的空氣，讓精神更加神采奕奕。<br>為了紀念這段難得的日子，特此放張藍天照，當成回憶的一部分~~'
		},
	];
	const fruits =[
		{
			fruit:'產銷履歷金桔',price:400,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
		{
			fruit:'自產自銷茂谷柑',price:300,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
		{
			fruit:'自產自銷茂谷柑',price:300,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
		{
			fruit:'無籽香水檸檬',price:200,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
		{
			fruit:'梨山有機限量富士蘋果',price:500,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
		{
			fruit:'有機紅寶石葡萄柚',price:350,weight:6,desc:'金桔',image:'img/Kumquat.png'
		},
	]
</script>
<style type="text/scss">
@font-face {
		font-family: 'kangxi';
		src: url("files/WenYue-GuDianMingChaoTi-NC-W5.otf") format("opentype");
		unicode-range:U+6C38, U+67D1, U+89C0, U+5149, U+679C, U+5712,U+9AD4, U+9A57, U+6D3B, U+52D5, U+806F, U+7D61, U+6211, U+5011, U+8CFC, U+8CB7, U+8FB2, U+7522, U+5C0F, U+8FB2, U+7D00, U+4E8B, U+95DC, U+65BC, U+6A58,U+5546, U+54C1,U+82B1, U+7D6E,U+65E5, U+4E00, U+4E8C, U+4E09, U+56DB, U+4E94, U+516D,U+63A1,U+6458,U+5834,U+6545,U+88FD,U+4F5C,U+9999,U+6A59,U+86CB,U+7CD5,U+5B50,U+624B,U+5DE5,U+91AC,U+7522,U+898f,U+683C,U+548C,U+6CE8,U+610F,U+9805,;
    }
@font-face{
	font-family: 'NotoSans';
	src:url("files/NotoSansTC-Regular.otf") format("opentype");
}

</style>
<Header/>
<!-- <main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main> -->
<AboutSection/>
<ExpSection/>
<ShopSection {fruits}/>
<ArticleGrid {articles}/>

<Footer/>
