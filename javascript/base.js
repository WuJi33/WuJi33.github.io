//globle variable
var lastTimeScrollTop;
var fromAddr = "/";
var photosInfoPos = [];
var photosInfoPosphotosInfoNag = [];
var touchDo = false;
var imgRatios = [];

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
            touchDo = false;
        });
        $(".photos-bigshow").on("touchend", TouchEndDo);
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
    stopE(e);
    handEX = e.changedTouches[0].pageX;
    handEY = e.changedTouches[0].pageY;
    if (handEX - handSX > 50 && Math.abs(handEY - handSY) < 150) {
        $(".photos-left").click();
        touchDo = true;
    }
    if (handSX - handEX > 50 && Math.abs(handEY - handSY) < 150) {
        $(".photos-right").click();
        touchDo = true;
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
var closeImage = function(e) {
    if (touchDo) {
        return;
    }
    $(".photos-bigshow.high").hide();
    $(".photos-cover").hide();
    $(".photos-bigshow-low").hide();


}

var openImage = function(basename) {
    var imgsrc = "";
    var desc = "";
    var isHigh = true;
    var imgCanvasH = $(".photos-bigshow-high");
    var imgCanvasL = $(".photos-bigshow-low");
    var imgEle = null;
    var ratio = 0;
    imgsrc = $("#" + basename).prop("src");
    imgRatios.forEach(function(ele) {
        if (ele.basename == basename) {
            ratio = ele.ratio;
        }
    })
    if (ratio == 0) {
        ratio = $("#" + basename).height() / $("#" + basename).width();
        imgRatios.push({ basename: basename, ratio: ratio });
    }

    photosInfoPos.forEach(function(ele) {
        if (imgsrc.indexOf(encodeURI(ele.filename)) > -1) {
            basename = ele.basename;
            desc = ele.desc;
            isHigh = ele.isHigh;
        }
    }, this);

    if (isHigh) {
        imgCanvasH.text(desc);
        imgCanvasH.prop("name", ele.basename);
        imgEle = imgCanvasH;
    } else {
        imgCanvasL.text(ele.desc);
        imgCanvasL.prop("name", ele.basename);
        imgEle = imgCanvasL;
    }
    imgEle = imgEle.find("img").first();
    imgEle.prop("src", imgsrc);

    imgEle.attr("onload", function() {
        setTimeout(function() {
            resize(ratio);
        }, 100);
    });
    if (isHigh) {
        imgCanvasH.show();
        $("photos-cover").show();
    } else {
        imgCanvasL.show();
        $("photos-cover").show();
    }
}
var resize = function(ratio) {
    $(".photos-left").css("font-size", $(".photos-left").height());
    if(ratio>($(window).height()/$(window).width()))
    {
        
    }
}

var changeImg = function(tr, dir, e) {
    var img = $(tr).siblings("img").attr("name");
    var find = false;
    var nextBaseName = "";
    var ary = null;
    var inforList = null;
    if (dir == 1) {
        inforList = photosInfoNag;
    } else {
        inforList = photosInfoPos;
    }
    inforList.forEach(function(item) {
        if (find && imgFilName == "") {
            nextBaseName = item.basename;
        }
        if (item.basename == img) {
            find = true;
        }

    })
    if (nextBaseName != "") {
        openImage(nextBaseName);
    }
    stopE(e);

}

var stopE = function(e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
}