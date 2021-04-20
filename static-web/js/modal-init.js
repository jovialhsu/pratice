(function(){
    var $content = $('#shop_card').detach();
    $('#buy').on('click',function(){
        modal.open({content:$content,width:500,height:300});
    });
}());