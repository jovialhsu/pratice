<script>
export let title;
export let image;
export let imageAlt;
export let desc;
export let date;
</script>

<style type="text/scss">
@import '../style/vars';
.Big_colum{
    width: 100%;
    float: left;
}
.Small_colum{ 
    float: left;
    width: 100%;
    column-count: 2;
    column-gap: 0.854700854700855%;
    column-width: 40.17094%;
}
.blogcard{
    background-color: #fff;
    border-left:3px solid $green;
    padding: 10px;
    overflow:hidden;
    // letter-spacing: 3pt;
    color:#353535;
    border-radius: 2px;
    padding: 20px 10px;
    box-shadow: 0 1px 3px 0 #00000012,
                0 1px 2px 0 #00000024;
    span{
        display: block;
        padding: 2vmin;
        font-size: 1.5rem;
        font-weight: 510;
        line-height: 25px;
    }
}
    .s{
        vertical-align: bottom;
        display: inline-block;
        break-inside: avoid;    
        margin: 10px 10px 15px 10px;
        .blogtxt{
            padding: 20px 20px;
        }
        img{
            width: 55.865%;
            overflow: hidden;
            vertical-align: bottom;
            float: left;
            margin-right: 20px;
        }
        &:hover{
            background-color: #eee;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
        }
    }
    .blogtxt{
        color:$black;
        text-indent: 2em;
        line-height: 1.4;
        // letter-spacing: 1.2px;
        padding: 2vmin;
        left:1rem;
        top: 1rem;
        position: relative;
    }
    .b{    
        margin: 10px;
        float: left;
        .blogtxt{
            width: 92.9059829059829%;
        }
        &:hover{
            background-color: #fff;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
        }
        img{
            vertical-align: top;
            margin-right: 20px;
            float:left;
            width:39.3162393162393%;
        }
    }
</style>
<div class="blogcard s">
    <span>{date}<br>{title}</span>
    <img src="{image}" alt="{imageAlt}">
    <p class="blogtxt">
        {desc}
    </p>
</div>