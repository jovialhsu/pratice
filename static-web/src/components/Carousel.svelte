<script>

import { onMount } from 'svelte'
export let slideImages;
let currentIndex = 0;
// onMount(()=>{})
const slide = index =>{
    console.log(index)
 if(index>currentIndex){
     slideImages[index].css.left='100%';
     console.log(index)
 }else{
     slideImages[index].css.left='-100%';
     console.log(index)
 }
 
}
</script>
<style type="text/scss">
.slider{
    max-width: 1200px;
    margin: 0 auto 30px auto;
    .slide_viewer{
        position: relative;
        overflow: hidden;
        height: 60vmin;
        .slide_group{
            width: 100%;
            height: 100%;
            position: relative;
            touch-action: pan-y;
        }
        .slide{
            width: 100%;
            height: 100%;
            display: none;
            position: absolute;
            img{
                width: 100%;
            }
            &:first-child{
                display: block;
            }
        }
    }
}
.slide_buttons{
    text-align: center;
}
.slide-btn{
    border: none;
    background:none;
    color: #ccc;
    font-size: 100%;
}
.slide-btn.active,.slide-btn:hover {
    color: #000;
    cursor: pointer;
}
</style>

    
        <div class="slide_group">
        {#each slideImages as slideImage}
            <div class="slide" style="left:{slideImage.css.left};display:{slideImage.css.block}">
                <img src={slideImage.image} alt="slider_image"/>
        </div>
        {/each}
        </div>  
            
            <!-- <div class="slide slide-2" style="left: 0px; display: none;">
                <img src="img/slide02_productpic_unsplash.jpg">
                </div>
            <div class="slide slide-3" style="left: 0px; display: block;">
                <img src="img/pic_slides03.jpg">
            </div>
            <div class="slide slide-4" style="left: 0px; display: none;">
                <img src="img/slide04_max-1053152-unsplash.jpg">
            </div> -->
        
  
    
    {#each slideImages as {slideImage},index}
        <button type="button" class="slide-btn" on:click={slide(index)}>•</button>
    {/each}
        <!-- <button type="button" class="slide-btn">•</button>
        <button type="button" class="slide-btn active">•</button>
        <button type="button" class="slide-btn">•</button> -->

