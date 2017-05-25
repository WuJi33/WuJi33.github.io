//globle variable
var lastTimeScrollTop;
var fromAddr="/";
// Window Scroll
var windowScroll = function () {
    $(window).scroll(function () {

        var scrollPos = $(this).scrollTop();

        if ($(window).scrollTop() > 100) {
            $('.headerblock').addClass('headerblock-scrolltop');
        } else {
            $('.headerblock').removeClass('headerblock-scrolltop');
        }

    });
};

$(document).ready(function() {
    windowScroll();
    $(".glyphicon-arrow-up").each(function(){
        $(this).click(scrollToTop);
    })
    $(".glyphicon-arrow-left").each(function(){
        $(this).click(goBack);
    })
});
var scrollToTop=function(){
    $(window).scrollTop(0);
}
var goBack=function(){
    document.location=fromAddr;
}

var scrollHeaderEvent = function(){
    if ($(window).scrollTop() > 100) {
            $('.headerblock').addClass('headerblock-scrolltop');
        } else {
            $('.headerblock').removeClass('headerblock-scrolltop');
        }
}

var scrollCatelogEvent = function(){
    $(".CatelogBlock")
    if ($(window).scrollTop() > 70) {
            $('.site-header').addClass('site-header-nav-scrolled');
        } else {
            $('.site-header').removeClass('site-header-nav-scrolled');
        }
}


function dropdownmenu()
{
    if($("#dropdownmenu").is(":hidden"))
    {
        $("#dropdownmenu").show();
    }
    else
    {
        $("#dropdownmenu").hide();
    }
}
