function getContentHeight() {
    return $(window).height() - $(".header").height() - $(".footer").height();
}

function jsbinembed(code, version) {
    $(".content").html("<a class=\"jsbin-embed\" href=\"http://jsbin.com/" + code + "/" + version + "/embed?js,output&height=" + getContentHeight() + "px\">JS Bin</a>");
    jsbinrender();
}

$(function () {
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
        $.ajax({
            url: "data/data.json",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                alert(data.length);
            }
        });
    })(); //menu

    $(".menu").hide();
    jsbinembed("xigaf", 4);
});