//globle variable
var lastTimeScrollTop;
var fromAddr = "/";
var photosInfoPos = [];
var photosInfoPosphotosInfoNag = [];
var touchDo = false;
var imgRatios = [];
var isPC = false;
$(document).ready(function () {
    windowScroll();
    $(".glyphicon-arrow-up").each(function () {
        $(this).click(scrollToTop);
    })
    $(".glyphicon-arrow-left").each(function () {
        $(this).click(goBack);
    })

    if ($(".photos-bigshow")) {
        handSX = 0;
        handSY = 0;
        handEX = 0;
        handEY = 0;
        $(".photos-bigshow").on("touchstart", function (e) {
            handSX = e.targetTouches[0].pageX;
            handSY = e.targetTouches[0].pageY;
            touchDo = false;
        });
        $(".photos-bigshow").on("touchend", TouchEndDo);
        $.getJSON("/photoalbum/imginfo.json", function (rs) {
            photosInfoPos = rs;
            photosInfoPos.sort(function (a, b) {
                return a.basename > b.basename;
            });
            photosInfoNag = photosInfoPos.concat([]);
            photosInfoNag.reverse();
        });

    }
    window.onresize = Resize;
    isPC = IsPC();

});
var TouchEndDo = function (e) {
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

var scrollToTop = function () {
    $(window).scrollTop(0);
}
var goBack = function () {
    history.back();
}

var scrollHeaderEvent = function () {
    if ($(window).scrollTop() > 100) {
        $('.headerblock').addClass('headerblock-scrolltop');
    } else {
        $('.headerblock').removeClass('headerblock-scrolltop');
    }
}

var scrollCatelogEvent = function () {
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
var closeImage = function (e) {
    if (touchDo) {
        return;
    }
    $(".photos-bigshow").hide();
    $(".photos-cover").hide();

}

var openImage = function (basename) {
    var desc = "";
    var imgCanvas = $(".photos-bigshow");
    var ratio = 0;
    var imgsrc = $("#" + basename).prop("src");
    var ratio = 0;

    imgCanvas.hide();
    imgRatios.forEach(function (ele) {
        if (ele.basename == basename) {
            ratio = ele.ratio;
        }
    })
    if (ratio == 0) {
        ratio = $("#" + basename).height() / $("#" + basename).width();
        imgRatios.push({ basename: basename, ratio: ratio });
    }
    Resize(ratio);
    photosInfoPos.forEach(function (ele) {
        if (ele.basename == basename) {
            desc = ele.desc;
        }
    }, this);
    $(".photo-bottomdesc").text(desc);
    imgCanvas.children("img").prop("name", basename);
    imgCanvas.children("img").prop("src", imgsrc);
    imgCanvas.show();
    $(".photos-cover").show();
}

var Resize = function (ratio) {
    if (!ratio) {
        ratio = $(".photos-bigshow").children("img").height() / $(".photos-bigshow").children("img").width();
    }
    if (!isPC) {
        if (ratio <= ($(window).height() / $(window).width())) {
            //图片比浏览器可视角度扁时
            $(".photos-bigshow").addClass("temp1OnPhone");
            $(".photos-bigshow").removeClass("temp2OnPhone");
            $(".photos-bigshow").css("height", $(window).width() * ratio);
            $(".photos-bigshow").css("width", "");
        } else {
            $(".photos-bigshow").addClass("temp2OnPhone");
            $(".photos-bigshow").removeClass("temp1OnPhone");
            $(".photos-bigshow").css("width", $(window).height() / ratio);
            $(".photos-bigshow").css("height", "");

        }
    } else {
        if (ratio <= ($(window).height() / $(window).width())) {
            //图片比浏览器可视角度扁时
            var wWidth = $(window).width();
            var baseW = 0;
            var w = 0;
            if (wWidth >= 2800) {
                baseW = 0.5 / ratio;
            } else if (wWidth >= 1400) {
                baseW = 1200;
            } else if (wWidth >= 900) {
                baseW = 900;
            } else {
                baseW = wWidth;
            }

            $(".photos-bigshow").css("height", baseW * ratio);
            $(".photos-bigshow").css("width", baseW);
        } else {
            var wHeight = $(window).height();
            var baseH = 0;
            var shouldCheck = true;
            if (wHeight >= 1800) {
                baseH = 0.5 * ratio;
            } else if (wHeight >= 900) {
                baseH = 900;
            } else if (wHeight >= 700) {
                baseH = 700;
            } else {
                baseH = wHeight;
                shouldCheck = false;
            }

            if (shouldCheck) {
                if (baseH * ratio / $(window).width() > 0.7) {
                    baseH *= 0.85;
                }
            }
            $(".photos-bigshow").css("width", baseH / ratio);
            $(".photos-bigshow").css("height", baseH);
        }
    }
}
var changeImg = function (tr, dir, e) {
    var imgBasename = $(tr).siblings("img").attr("name");
    var find = false;
    var nextBaseName = "";
    var ary = null;
    var inforList = null;
    if (dir == 1) {
        inforList = photosInfoNag;
    } else {
        inforList = photosInfoPos;
    }
    inforList.forEach(function (item) {
        if (find && nextBaseName == "") {
            nextBaseName = item.basename;
        }
        if (item.basename == imgBasename) {
            find = true;
        }

    })
    if (nextBaseName != "") {
        openImage(nextBaseName);
    }
    stopE(e);

}

var stopE = function (e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
}
var IsPC = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}