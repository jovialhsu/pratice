<script>
import Button from "./Button.svelte";
export let image;
export let desc;
export let fruit;
export let price;
export let weight;
</script>
<style type="text/scss">
@import '../style/vars';
.shopCard{
    position: relative;
    margin: 10px;
    box-shadow: inset 5px 3px #eee,5px 3px #eee;
   &::before{
       position: absolute;
       content:'';
       top: 10px;
       left: 30px;
       background: url(img/ABOUTORANGE.JPG) repeat;
       width: 100%;
       height: 100%;
       z-index: -5;
       transform: skewY(-5deg);
   }
}
h4{
    font-size: 18px;
    color: $green;
    padding: 15px;
    text-align: center;
}
</style>
<div class="col-6 col-lg-4 col-xl-2">
    <div class="item shopCard">
    <img src={image} alt={desc}>
        <h4>{fruit}</h4><span>NT$ {price}({weight}kg)</span>
        <Button type='text' caption='加入購物車'/>
    </div>
</div>