$(function() {

    var root = "/website/",
        hash = location.hash.substring(1,location.hash.length);

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

    function openjsbin(name, isFirst) {
        var isFind = false;
        for (var i = 0, max = data.length; i < max; i++) {
            if (data[i].name === name || isFirst) {
                jsbinembed(data[i].code, data[i].version);
                if (!isFirst) {
                    location.href = location.href.split("#")[0] + "#" + name;
                }
                $(".menu>div>span.selected").removeClass("selected");
                $(".menu>div>span:contains('" + name + "')").addClass("selected");
                isFind = true;
                break;
            }
        }
        if (!isFind) {
            alert("not find!");
            location.href = location.href.split("#")[0];
        }
    }

    $(".logo,.title").on("click",function() {
        location.href = root;
    });

    $(".header,.menu").on("mouseenter mouseleave", function(e) {
        var $menu = $(".menu");
        if (e.type === "mouseenter") {
            $menu.stop(false, false).slideDown("fast");
        } else {
            $menu.stop(false, false).slideUp("fast");
        }
    });

    $(".menu").on("click", "span", function() {
        openjsbin($(this).text(),false);
    });

    $(".header,.menu").on("mousemove", function(e) {
        var space = 50,
            x = e.pageX,
            width = $(window).width() - space,
            left = 0 - ($(".menu>div").width() - $(window).width());
        if (left < 0 && x > space && x < width) {
            $(".menu>div").css({ "left": map(x, space, width, 0, left) });
        }
        e.stopPropagation();
    });

    $(".library").on("click",function() {
        location.href = root;
    });

    $(".blog").on("click", function () {
        $(".title").text("Tommy's Blog");
        $.ajax({
            url: "blog.html",
            dataType: "html",
            success: function(html) {
                $(".content").html(html);
            }
        });
    });

    $(".about").on("click", function () {
        $(".title").text("Tommy's About");
        $.ajax({
            url: "about.html",
            dataType: "html",
            success: function(html) {
                $(".content").html(html);
            }
        });
    });

    $(".contact").on("click", function () {
        $(".title").text("Tommy's Contact");
        $.ajax({
            url: "contact.html",
            dataType: "html",
            success: function(html) {
                $(".content").html(html);
            }
        });
    });

    $(window).resize(function() {
        $(".content").find(">iframe").css({ "min-height": getContentHeight(), "max-height": getContentHeight() });
    });

    (function() {

        function searchKeyword(source, keyword, text) {
            var result;
            text = text.toLowerCase();
            result = source.toLowerCase().indexOf(text) > -1;
            if (result) {
                return true;
            } else {
                if (keyword !== undefined && keyword !== null) {
                    for (var i = 0, max = keyword.length; i < max; i++) {
                        if (keyword[i].toLowerCase().indexOf(text) > -1 || text.indexOf(keyword[i].toLowerCase()) > -1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function search(text) {
            var count=0,
                html = "";
            html += "<div>";
            for (var i = 0, max = data.length; i < max; i++) {
                if (text === null || text === undefined || searchKeyword(data[i].name, data[i].keyword, text)) {
                    html += "<span>" + data[i].name + "</span>";
                    count++;
                }
            }
            html += "</div>";
            $(".menu").html(html);
            $(".result").html("Find " + count + " item" + (count > 1 ? "s" : "") + ".");
            var totalWidth = 0;
            $(".menu>div>span").each(function() {
                totalWidth += $(this).outerWidth(true);
            });
            $(".menu>div").width(totalWidth);
        }

        $(".search>input").click(function() {
            if ($(this).val() === "Search") {
                $(this).val("");
            } else {
                $(this).select();
            }
        });

        $(".search>input").blur(function() {
            if ($(this).val() === "") {
                $(this).val("Search");
            }
        });

        $(".search>input").keyup(function() {
            search($(this).val());
        });

        search();
    })(); //generate menu

    (function() {
        $(".menu").hide();
        openjsbin(hash,hash==="");
    })(); //initializing

    (function() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-49667069-1', 'tooto1985.github.io');
        ga('send', 'pageview');
    })(); //google analytics
});