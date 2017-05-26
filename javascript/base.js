//globle variable
var lastTimeScrollTop;
var fromAddr = "/";
var photosInfoPos = [];
var photosInfoPosphotosInfoNag = [];

$(document).ready(function() {
    windowScroll();
    $(".glyphicon-arrow-up").each(function() {
        $(this).click(scrollToTop);
    })
    $(".glyphicon-arrow-left").each(function() {
        $(this).click(goBack);
    })

    if ($(".photos-bigshow")) {
        handSX = 0;
        handSY = 0;
        handEX = 0;
        handEY = 0;
        $(".photos-bigshow").on("touchstart", function(e) {
            handSX = e.targetTouches[0].pageX;
            handSY = e.targetTouches[0].pageY;
        });
        $(".photos-bigshow").on("touchend",TouchEndDo);
        $.getJSON("/photoalbum/imginfo.json", function(rs) {
            photosInfoPos = rs;
            photosInfoPos.sort(function(a, b) {
                return a.basename > b.basename;
            });
            photosInfoNag = photosInfoPos.concat([]);
            photosInfoNag.reverse();
        });

        window.onresize = resize;
        resize();
    }

});
var TouchEndDo = function(e) {
    handEX = e.targetTouches[0].pageX;
    handEY = e.targetTouches[0].pageY;
    if(handEX-handSX>20 && Math.abs(handEY-handSY)<50){
        $(".photos-left").click();
    }
     if(handSX-handEX>20 && Math.abs(handEY-handSY)<50){
        $(".photos-right").click();
    }
};
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
    history.back();
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
var closeImage = function() {
    $(".photos-cover").hide();
    $(".photos-bigshow").hide();
}

var openImage = function(trigger) {
    var imgsrc = "";
    if (typeof(trigger) == "object") {
        imgsrc = $(trigger).find("img").first().prop("src");
    } else if (typeof(trigger) == "string") {
        imgsrc = "/photoalbum/photos/" + trigger;
    }

    var imgCanvas = $(".photos-bigshow");
    var newImg = imgCanvas.find("img").first();
    newImg.prop("src", imgsrc);


    photosInfoPos.forEach(function(ele) {
        if (imgsrc.indexOf(ele.filename) > -1) {
            $(".photo-bottomdesc").text(ele.desc);
            newImg.prop("name", ele.basename);
        }
    }, this);

    newImg.attr("onload", function() {
        setTimeout(function() {
            resize();
            imgCanvas.show();
            $(".photos-cover").show();
        }, 100);
    });
}
var resize = function() {
    $(".photos-bigshow").css("top", $(window).height() / 2 - $(".photos-bigshow").height() / 2);
    if ($(window).width() > 992) {
        $(".photos-bigshow").css("left", $(window).width() / 2 - $(".photos-bigshow").width() / 2);
    } else {
        $(".photos-bigshow").css("left", 0);
    }
    $(".photos-left").css("font-size", $(".photos-left").height());
}

var changeImg = function(tr, dir, e) {
    $(".photos-bigshow").hide();
    var img = $(tr).siblings("img").attr("name");
    var find = false;
    var imgFilName = "";
    var ary = null;
    var inforList = null;
    if (dir == 1) {
        inforList = photosInfoNag;
    } else {
        inforList = photosInfoPos;
    }
    inforList.forEach(function(item) {
        if (find && imgFilName == "") {
            imgFilName = item.filename;
        }
        if (item.basename == img) {
            find = true;
        }

    })
    if (imgFilName != "") {
        openImage(imgFilName);
    } else {
        $(".photos-bigshow").show();
        alert("已经没有了！");
    }
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }

}