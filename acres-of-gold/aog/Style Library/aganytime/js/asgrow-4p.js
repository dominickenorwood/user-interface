//TOOLTIP SHOW/HIDE
$("a.modal-open").click(function () {
    // Get the target from the name of the anchor
    var targetDiv = $(this).attr("name");
    // Show the new div and hide the parent div
    $("#" + targetDiv).fadeToggle(500);
    $(this).toggleClass('active');
    $('.circularBoxSlide').fadeIn();
    $('.circularBoxSlide.hide').fadeOut();
    if ($(this).hasClass('modal-open-rockBkg')) {
        $(this).parent('div').after('<div id="rockBkg" style="width:100%;height:100%;background:rgb(255,255,255);background:rgba(255,255,255,0.7);position:absolute;top:0;left:0;z-index:200;-ms-filter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\';">&nbsp;</div>')
    }
    return false;
});

$("body, .modal .close").click(function () {
    $('.modal').fadeOut(500);
    $('#rockBkg').fadeOut(300).remove();
    $('a.modal-open').removeClass('active');

});
$('.modal').click(function(e) {
    e.stopPropagation();

});


if ($('a').hasClass("anchor")) {
    $("a.anchor").localScroll({
        target: "body",
        //queue:true,
        lazy:true,
        duration:800,
        hash:false,
        offset: {top:-212, left:0},
        onBefore:function( e, anchor, $target ){

        },
        onAfter:function( anchor, settings ){
        }
    });
};

$(".plantDepthBox a").click(function(e){
    e.preventDefault();

    if($(this).hasClass("current")){
        return false;
    }else{
        $(".plantDepthBox a").removeClass("current");
        $(this).addClass("current");
        fadeInFadeOutBox($(this).attr("rel"))
    }
});

function fadeInFadeOutBox(box){
    //alert(box);
    $(".plantDepthBox .pdBox").fadeOut();
    $(".plantDepthBox ." + box).fadeIn();
};

$(".nextBtn").click(function(e){
    e.preventDefault();
    $('.circularBoxSlide').fadeToggle();
});