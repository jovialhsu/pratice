<style type="text/scss">
@import '../style/vars';
.foot{
    position: relative;
    width: 100%;
    text-align: center;
    &::before{
        content:"";
        width: 100%;
        left: 0;
        right: 0;   
        margin: auto;
        position: absolute;
        height: 120%;
        background:url(img/footer.png);
        background-size: cover;
        z-index: -1;
    }
    .col-12{
        color:#eee;
        picture img{
            width:auto;
        }
    }
}
.col-4.col-lg-2{
    margin-bottom: 1vmin;
    .fmenu{
        position: relative;
        width: 63%;
        margin: auto;
        text-decoration: none;
        display: block;
        cursor: pointer;
        padding: 1rem;
        color: $green;
        font-size: 1.3rem;
        background-color: #ffffff80;
        border-radius:2px; 
        transition: .75s;
        &::before{
            position: absolute;
            content: '';
            width: 2px;
            height: 4vmin;
            background-color: $orange;
            left: 5px;
            top: -5px;
            opacity: 0;
        }
        &::after{
            position: absolute;
            content: '';
            width: 4vmin;
            height: 2px;
            background-color: $orange;
            left: 5px;
            top: -5px;
            opacity: 0;
            z-index: 2;
        }
        &:hover{
            background-color: $green;
            color:#fff;
        }
        &:hover:after{
            opacity: 1;
        }
        &:hover:before{
            opacity: 1;
        }            
    }
}
</style>

<footer class="foot">
    <div class="container">
        <div class="col-4 col-lg-2">
            <a href="about_us.html" class="fmenu">關於我們</a>
        </div>
        <div class="col-4 col-lg-2">
            <a href="experience.html" class="fmenu">體驗活動</a>
        </div>
        <div class="col-4 col-lg-2">
            <a href="shop.html" class="fmenu">購買商品</a>
        </div>
        <div class="col-4 col-lg-2">
            <a href="orange.html" class="fmenu">柑橘知識</a>
        </div>
        <div class="col-4 col-lg-2">
            <a href="note.html" class="fmenu">小農紀事</a>
        </div>
        <div class="col-4 col-lg-2">
            <a href="contact_us.html" class="fmenu">聯絡我們</a>
        </div>
        <div class="item">
            <a href="index.html" class="logo">
                <img src="img/logo.png" alt="logo"/>
            </a>
        <div class="col-12">
            © copyright by jovial
        </div>
    </div>
</footer>