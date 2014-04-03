function getContentHeight() {
    return $(window).height() - $(".header").height() - $(".footer").height();
}

function jsbinembed(code, version) {
    $(".content").html("<a class=\"jsbin-embed\" href=\"http://jsbin.com/" + code + "/" + version + "/embed?js,output&height=" + getContentHeight() + "px\">JS Bin</a>");
    jsbinrender();
}

$(function () {
    $(".menu").on("click", "span", function () {
        for (var i = 0, max = data.length; i < max; i++) {
            if (data[i].name === $(this).text()) {
                jsbinembed(data[i].code, data[i].version);
            }
        }
    });

    $(".header,.menu").on("mouseenter mouseleave", function (e) {
        var $menu = $(".menu");
        if (e.type === "mouseenter") {
            $menu.stop(false, false).slideDown("fast");
        } else {
            $menu.stop(false, false).slideUp("fast");
        }
    });
    $(window).resize(function () {
        $(".content").find(">iframe").css({ "min-height": getContentHeight(), "max-height": getContentHeight() });
    });

    (function () {
        var html = "";
        for (var i = 0, max = data.length; i < max; i++) {
            html += "<span>" + data[i].name + "</span>";
        }
        $(".menu").html(html);
    })(); //generate menu

    (function () {
        $(".menu").hide();
        jsbinembed("xigaf", 4);
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