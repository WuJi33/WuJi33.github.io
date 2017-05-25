//globle variable
var lastTimeScrollTop;
var fromAddr = "/";

$(document).ready(function() {
    windowScroll();
    $(".glyphicon-arrow-up").each(function() {
        $(this).click(scrollToTop);
    })
    $(".glyphicon-arrow-left").each(function() {
        $(this).click(goBack);
    })
    window.onresize = resize;
    resize();
});

// Window Scroll
var windowScroll = function() {
    $(window).scroll(function() {

        var scrollPos = $(this).scrollTop();

        if ($(window).scrollTop() > 100) {
            $('.headerblock').addClass('headerblock-scrolltop');
        } else {
            $('.headerblock').removeClass('headerblock-scrolltop');
        }

    });
};

var scrollToTop = function() {
    $(window).scrollTop(0);
}
var goBack = function() {
    document.location = fromAddr;
}

var scrollHeaderEvent = function() {
    if ($(window).scrollTop() > 100) {
        $('.headerblock').addClass('headerblock-scrolltop');
    } else {
        $('.headerblock').removeClass('headerblock-scrolltop');
    }
}

var scrollCatelogEvent = function() {
    $(".CatelogBlock")
    if ($(window).scrollTop() > 70) {
        $('.site-header').addClass('site-header-nav-scrolled');
    } else {
        $('.site-header').removeClass('site-header-nav-scrolled');
    }
}


function dropdownmenu() {
    if ($("#dropdownmenu").is(":hidden")) {
        $("#dropdownmenu").show();
    } else {
        $("#dropdownmenu").hide();
    }
}


var openImage = function(trigger) {
    var img = $(trigger).find("img").first(); 
    var imgCanvas = $(".photos-bigshow");
    imgCanvas.find("img").first().prop("outerHTML", img.prop("outerHTML"));
    imgCanvas.find("img").first().attr("onload",function() {
        setTimeout(function() {
            imgCanvas.show();
        resize();
        }, 100);        
    });
}
var resize = function() {
    $(".photos-bigshow").css("top", $(window).height() / 2 - $(".photos-bigshow").height() / 2);
    if ($(window).width > 992) {
        $(".photos-bigshow").css("left", $(window).width() / 2 - $(".photos-bigshow").width() / 2);
    }

}