<script>
export let titleCn;
export let titleEn;
</script>
<style type="text/scss">
@import '../style/vars';
.topic{
    width: 100%;
    text-align: center;
    line-height: 1.5;
    position: relative;
    margin: 10px 0;
    padding: 10px 0;
    font-size: 1.75rem;
    &:after{
        content: '';
        width: 50%;
        height: 1px;
        background-color:#006b41;
        position:absolute;
        bottom:50%;
        left: 0;
        z-index: 1;
        left:25%;
    }
    &:before{
        width: 50%;
        height: 60%;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        z-index: -10;
        position: absolute;
        content:"";
        background-color: $orange;
        background-size: cover;
        overflow: hidden;
        transform: skewY(-5deg);
        filter: blur(1px);
    }
}

</style>
<h2 class="topic">{titleCn}<br>{titleEn}</h2>