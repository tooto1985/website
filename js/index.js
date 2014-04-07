﻿$(function () {

    function map(value, fromLow, fromHigh, toLow, toHigh) {
        var a = (fromHigh - fromLow) / (value - fromLow);
        if (a === Infinity || value === fromLow) {
            return toLow;
        }
        return ((toHigh - toLow) / ((fromHigh - fromLow) / (value - fromLow))) + toLow;
    }

    function getContentHeight() {
        return $(window).height() - $(".header").height() - $(".footer").height();
    }

    function jsbinembed(code, version) {
        $(".content").html("<a class=\"jsbin-embed\" href=\"http://jsbin.com/" + code + "/" + version + "/embed?js,output&height=" + getContentHeight() + "px\">JS Bin</a>");
        jsbinrender();
    }

    $(".header,.menu").on("mouseenter mouseleave", function (e) {
        var $menu = $(".menu");
        if (e.type === "mouseenter") {
            $menu.stop(false, false).slideDown("fast");
        } else {
            $menu.stop(false, false).slideUp("fast");
        }
    });

    $(".menu").on("click", "span", function () {
        for (var i = 0, max = data.length; i < max; i++) {
            if (data[i].name === $(this).text()) {
                jsbinembed(data[i].code, data[i].version);
            }
        }
    });

    $(".header,.menu").on("mousemove",function(e){
        var space=50,
            x = e.pageX,
            width = $(window).width()-space,
            left = 0-($(".menu>div").width()-$(window).width());
        if(left<0 && x > space && x < width){
            $(".menu>div").css({"left":map(x,space,width,0,left)});
        }
    });

    $(window).resize(function () {
        $(".content").find(">iframe").css({ "min-height": getContentHeight(), "max-height": getContentHeight() });
    });

    (function () {
        function search(text) {
            var html = "";
            html += "<div>";
            for (var i = 0, max = data.length; i < max; i++) {
                if (text===undefined || data[i].name.toLowerCase().indexOf(text.toLowerCase())>-1) {
                    html += "<span>" + data[i].name + "</span>";
                }
            }
            html += "</div>";
            $(".menu").html(html);
            var totalWidth=0;
            $(".menu>div>span").each(function(i) {
                totalWidth += $(this).outerWidth(true); 
            });
            $(".menu>div").width(totalWidth);
        }


        $(".search>input").click(function(){
            if ($(this).val()==="Search") {
                $(this).val("");
            }
        });

        $(".search>input").blur(function(){
            if ($(this).val()==="") {
                $(this).val("Search");
            }
        });

        $(".search>input").keyup(function(e) {
            //if (e.keyCode === 13) {
                search($(this).val())
            //}

        });

        search();
    })(); //generate menu

    (function () {
        $(".menu").hide();
        $(".menu>div>span:eq(0)").click();
    })(); //initializing

    (function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-49667069-1', 'tooto1985.github.io');
        ga('send', 'pageview');
    })(); //google analytics

});