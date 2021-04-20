$(function(){
         
    let scrollTop = 0;
    let navHi = $('nav').outerHeight();
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        console.log(scrollTop)
        if(scrollTop >= navHi /2 ){
            $('.page_header').addClass('fixed');
        }else{
            $('.page_header').removeClass('fixed');
        }
    }

)
})
