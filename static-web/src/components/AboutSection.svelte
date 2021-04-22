<script>
import IndexSection from './IndexSection.svelte'
</script>
<style type="text/scss">
@import '../style/vars';
.aboutUsTxt{
    margin: auto;
    letter-spacing: 0.5px;
    line-height: 1.3;
    text-indent: 2em;
    padding: 4vmin;
    @media screen and (min-width: 992px){
        margin: auto;
        max-width: 1200px;
    }
}
.item{
    img{
        width: 100%;
    }
}
 .aboutPic{
    height: 81.6vw;
    position: relative;
    & > div{
        width: 200px;
        overflow: hidden;
    }
    img{
        width: 100%;
        vertical-align: top;
    }
    .lf{
        width: 26.66667vw;
        position: absolute;
        top: 0;
        right: 20px;
    }
    .cr{
        width: 52vw;
        top: 30px;
        left: 0;
        position: absolute;
        &::before{
            content: "";
            background: #ccc repeat left top;
            background-size: auto;
            z-index: -1;
            position: absolute;
            height: 41.6vw;
            width: 53.86666vw;
            top: 10.4vw;
            left: 8.53333vw;
        }
    }
    .rg{
        width: 60vw;
        right: 0;
        bottom: 0;
        position: absolute;
    }
}
.about{
    .story{
        position: relative;
        p{  
            text-indent: 2em;   
            line-height: 1.3;
            letter-spacing: 0.5px;
            padding: 4vmin;
        }
        &::before{
            position: absolute;
            content: '';
            z-index: -1;
            // filter: drop-shadow(2px 2px 3px #333355);
            background:#fff;
            width: 90%;
            height: 90%;
            left: 11vmin;
            bottom: -0.5vmin;
        }
        &:nth-child(3)::before{
            left: 8vmin;
        }
    }   
    .square{
        position: relative;
        background-color: #fff;
        &::before{
            position: absolute;
            content: '';
            width: 9vmin;
            height: 9vmin;
            background-color: $green;
            right: -4vmin;
            bottom: -5vmin;
            z-index: 2;
        }
    }
    .item.col-8.col-lg-8{
        margin:0 -3vmin; 
    }
    .square_left{
        position: relative;
        &::before{
            position: absolute;
            content: '';
            width: 9vmin;
            height: 9vmin;
            background-color: $green;
            left: -4vmin;
            bottom: -5vmin;
            z-index: 2;
        }
    }
}
@media screen and (min-width:768px){
    .aboutPic{
        height: 402px;
        position: relative;
        .item{
            position: relative;
        }
        img{
            width: 100%;
            vertical-align: top;
        }
        .lf{
            position: absolute;
            width: 20vw;
            bottom:-1vw;
            right: 0;
        }
        .cr{
            width: 25vw;
            top: 0;
            left: 0;
            position: absolute;
            &::before{
                content: '';
                position: absolute;
                background-color:#ccc;
                width: 150%;
                height: 120%;
                left: 5vw;
                top: 2vw;
                z-index: -1;
            }
        }
        .rg{
            width: 40vw;
            top: 132px;
            left: 27vw;
            position: absolute;      
        }
    }
}
@media screen and (min-width: 1200px){
    .aboutPic{
        height: 402px;
        position: relative;
        .item{
            position: relative;
        }
        .lf{
            position: absolute;
            width: 300px;
            bottom:-1vw;
            right: 0;
        }
        .cr{
            width: 300px;
            top: 0;
            left: 0;
            position: absolute;
            &::before{
                content: '';
                position: absolute;
                background-color: #ccc;
                width: 150%;
                height: 120%;
                left: 5vw;
                top:2vw;
                z-index: -1;
            }
        }
        .rg{
            width: 450px;
            top: 132px;
            left: 20vw;
            position: absolute;      
        }
    }
}
</style>
<IndexSection section={'about'} titleCn={'關於我們'} titleEn={'about'}>
    <div class="item">    
            <div class="item farm_story col-5 col-lg-3">
                <img src="img/about_us_story_1.jpg" alt="story"/>
            </div>
            <div class="item story col-7 col-lg-6">
                <img src="img/murcott.jpg" alt="murcott"/>
                <p>永柑果園位在台灣草莓主要生產地-苗栗大湖裡的少數橘子園，因其氣候良好，傍著馬拉邦山腰處，山嵐聚集創造了得天獨厚的水果培育環境，除了主力作物－茂谷柑，椪柑等，也有栽種一些其他經濟作物不定期推出，歡迎大家上山走走體驗不一樣的生活體驗。</p>
            </div>
            <div class="col-12 col-lg-3">
                <article>
                    <h3>農場故事:</h3>
                    <p class="aboutUsTxt square">位在台灣草莓主要生產地-苗栗大湖裡的少數橘子園，因其氣候良好，傍著馬拉邦山腰處，山嵐聚集創造了得天獨厚的水果培育環境，除了主力作物－茂谷柑，椪柑等，也有栽種一些其他經濟作物不定期推出，歡迎大家上山走走體驗不一樣的生活體驗。</p>
                </article>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="col-12">
            <div class="item aboutPic">
                <div class="lf item"><img src="img/banner_orange.jpg" alt="orange"/></div>
                <div class="cr item"><img src="img/index-l0.jpg" alt="orange"/></div>
                <div class="rg item"><img src="img/event.banner.jpg" alt="orange"/></div>
            </div>
        </div>
        <div class="clearfix"></div>
</IndexSection>
