$(function () {

    function getContentHeight() {
        return $(window).height() - $(".header").height() - $(".footer").height();
    }

    function jsbinembed(code, version) {
        $(".content").html("<a class=\"jsbin-embed\" href=\"http://jsbin.com/" + code + "/" + version + "/embed?js,output&height=" + getContentHeight() + "px\">JS Bin</a>");
    }
    
    $(window).resize(function() {
        $(".content").find(">iframe").css({ "min-height": getContentHeight(), "max-height": getContentHeight() });
    });
    

    jsbinembed("xigaf", 4);

});