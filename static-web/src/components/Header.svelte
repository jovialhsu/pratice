<style type="text/scss">
@import '../style/vars';
.fixmenu{
    width: 50px;
    height: 100px;
    background-color: $green;
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 10;
    &:hover{
        background-color: $green;
    }
    .icons{
        margin: 10px;
    }
}
.logo{
    display: inline-block;
    max-width: 18vmin;
    font-size: 0;
    padding: 2vmin;
    img{
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
} 
.page_header{
    width:100%;
    height: 40vh;
    display: flex;
    position: relative;
    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(img/title.png);
        background-size: cover;
        overflow: hidden;
        z-index: -1;
    }
    nav{
        width: 100%;
        height: 100%;
        display: flex;
        ul{
            width: 60%;
            display: flex;
            position: relative;
            li{
                position: relative;
                flex-basis: 0;
                flex-grow: 1;
                transition: 0.5s;
                background-size: cover;
                box-shadow: 2px 2px 5px #11112280;
                filter: drop-shadow(2px 2px 5px #11112280);
                &:first-of-type{
                    background-image: url(img/1371329014-3807217774.jpg);
                }
                &:nth-of-type(2){
                    background-image: url(img/experience.png);
                }
                &:nth-of-type(3){
                    background-image: url(img/menu_shop.png);
                }
                &:nth-of-type(4){
                    background-image: url(img/menu_orange.png);
                }
                &:nth-of-type(5){
                    background-image: url(img/menu_farmer.png);
                }
                &:last-of-type{
                    background-image: url(img/menu_contact.png);
                }
                &:hover{
                    background-color:$black;
                }
                a{
                    font-family: 'kangxi';
                    text-shadow: 0px 0px 5px $black,0px 0px 2px $black;
                    text-transform: uppercase;
                    color:#fff;
                    text-decoration: none;
                    writing-mode: vertical-lr;
                    font-size: 1.4rem;
                    display: block;
                    padding: 20px;
                    position: absolute;
                    bottom: 0;
                    // width: 100%;
                    &:hover{
                        text-shadow: 0px 0px 5px $green,0px 0px 2px $green;
                    }
                }
            }
        }
    }
}
.title{
    width: 40%;
    position: relative;
    z-index: 1;
    overflow: hidden;
}
.menu_list{
    position: relative;   
    padding: 1%;
    color:#eee;
    line-height: 1.5;
    text-transform: uppercase;
    transition: all 2s;
}
@keyframes fill {
    0% {
      width: 0%;
      height: 1px;
    }
    50% {
      width: 25%;
      height: 1px;
    }
    100% {
      width: 50%;
      height: 100%;
      background-color:$green;
    }
  }
  
.burger{
    right: -42vmin;
    display: none;
    position: relative;
    background-color: #eeeeee80;
    span{
        user-select: none;
        display: block;
        position: absolute;
        margin: 0.0625rem auto 0.525rem -0.75rem;
        text-indent: -999em;
        top: 50%;
        left: 50%;
        margin-top: -0.0625rem;
        cursor: pointer;
        width: 1.5rem;   
        height: 0.125rem;
        background-color:#353535;
        transition: .3s;
        opacity: 1;
        &::before,&::after{
            position: absolute;
            content: '';
            display: block;
            width: 1.5rem;
            height: 0.125rem;
            background-color:#353535;
            transition: 0.3s;
            opacity: 1;
        }
   }
}
.burger span::before{
    top:-0.525rem;
}
.burger span::after{
    top:0.525rem;
}
#menu_control{
    position: absolute;
    opacity: 0;
}
@media screen and (max-width:767px){
    .page_header{
        height: 15vh;
        transition: .25s;
        nav{
            .burger{
                display: block;
                width: 3rem;
                height: 3rem;
                position: relative;
                border-radius:3px;
                margin: 0.5rem;
            }
            ul{
                text-align: center;
                flex-direction: column;
                background-color: #cccccc;
                position: absolute;
                width: 100%;
                height: calc(100vh - 49vh);
                top: 80%;
                left: -150%;
                z-index: 12;
                transition: left 1s; 
                border-bottom: 1px solid #fff;
                li{
                    background-size: cover;
                    a{
                        // width: 100%;
                        display: block;
                        position: relative;
                        writing-mode: horizontal-tb;
                        padding: 2%;
                    } 
                }
            }
        }
    }
    #menu_control:checked ~ ul{
        left: 0;
    }
    #menu_control:checked ~ .burger span::before, #menu_control:checked ~ .burger span::after{
        top: 0;
        margin-top: -0.5875rem;
    }
    #menu_control:checked ~ .burger span {
        transform: rotate(-360deg);
        background-color: transparent;
    }
    #menu_control:checked ~ .burger span::before {
        transform: translateY(0.525rem) rotate(-45deg);
    }
    #menu_control:checked ~ .burger span::after{
        transform: translateY(0.525rem) rotate(45deg);
    }
    .fixed{
        height: 15vh;
        transition: .5s;
        width: 100%;
        top: 0;
        position: fixed;
        z-index: 5;
    }
}

    
</style>
<header class="page_header">
    <nav>
        <h1 class="title">
            <a href="#" class="logo">
                <img src="img/logo.png">
            </a>
        </h1>
        <input type="checkbox" name="menu_control" id="menu_control"/>
        <label for="menu_control" class="burger">
            <span></span>
        </label>
        <ul>
            <li class="menu_list"><a href="about_us.html">關於我們ABOUT US</a></li>
            <li class="menu_list"><a href="experience.html">體驗活動experience</a></li>
            <li class="menu_list"><a href="shop.html">購買商品shop</a></li>
            <li class="menu_list"><a href="orange.html">關於柑橘orange</a></li>
            <li class="menu_list"><a href="note.html">小農紀事note</a></li>
            <li class="menu_list"><a href="contact_us.html">聯絡我們contact</a></li>
        </ul>
    </nav>
</header>