(function(d) {
    var config = {
        kitId: 'yyd2kyt',
        scriptTimeout: 3000,
        async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
var bodyFixed = function(){
    offsetY = window.pageYOffset;
    $("#header").addClass("expanded")
    $("body").css({
        position:"fixed",
        width:"100%",
        height:"100%",
        top: -offsetY + "px"
    });
}
var bodyFixedClose = function(){
    offsetY = window.pageYOffset;
    $("body").css({
        position: "",
        width: "",
        height: "",
        top:""
    });
    $(window).scrollTop(offsetY);
    $("#header").removeClass("expanded");
}


var apInterview = function(){
    bodyFixed()
    $("#wrap").addClass("scroll");
}

var apInterviewClose = function(){
    bodyFixedClose()
    $("#wrap").removeClass("scroll");
}

var searchShow = function(){
    var wrap = $("#wrap") // 23.01.12
    if(wrap.hasClass("search-show")){
        wrap.removeClass("search-show");
        $(".btn_search").removeClass("active")
        $("header .search_wrap").removeClass("active").slideUp(300)
        $(".dim").fadeOut(300);
        $("#header").removeClass("search")
    } else {
        wrap.addClass("search-show");
        $(".btn_search").addClass("active")
        $("header .search_wrap").addClass("active").slideDown(300)
        $(".dim").fadeIn(300);
        $("#header").addClass("search")
    }
}
var searchHide = function(){
    $("#wrap").removeClass("search-show");
    $(".btn_search").removeClass("active")
    $("header .search_wrap").slideUp(300)
    $(".dim").hide();
    $("#header").removeClass("search")
}
function resizeContent() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
    var headerHeight = $("header").outerHeight(true);
    var footerHeight = $("footer").outerHeight(true);
    $("main").css({minHeight:(windowHeight-footerHeight)*0.1+"rem"})
    var docHeight = windowHeight-footerHeight
    var contentHeight = $("#container").height() - 75
    if(docHeight > contentHeight){
        $("#content").css({paddingBottom:"7.5rem"})
    }
    var features_itemHeight = $(".pdp .features_item .img img").height();
    $(".pdp .features_item .img, .product_details").css({height:features_itemHeight+"px"});
    $("#content").css({marginTop:headerHeight+"px"})
    $(".errors .layout_inner").css({minHeight:(windowHeight-(headerHeight+footerHeight))*0.1+"rem"})
    // 23.02.06 소스 삭제
    /* 23.01.17 주석처리 ~
    if($(".our_story").length){
        $(".our_story .breadcrumbs").css({top:(headerHeight+20)+"px"})
        $(".our_story .story_keyvisual").css({paddingTop:headerHeight+"px"})
    }
    */

    if($(".main_keyvisual").length){
        // var UserAgent = navigator.platform;
        // if (UserAgent.match(/i(Phone|Pod)/i) != null ){
        //     $(".btn_scroll").click(function(){
        //         $("body,html").animate({scrollTop:windowHeight+60}, 500);
        //     })
        // } else{
        //     $(".btn_scroll").click(function(){
        //         $("body,html").animate({scrollTop:windowHeight+40}, 500);
        //     })
        // }
        // $(".btn_scroll").click(function(){
        //     $("body,html").animate({scrollTop:windowHeight+60}, 500);
        // })
    }
    var newitemHeight = $(".newness .product_item:nth-of-type(1)").outerHeight(true)
    if($(".newness").length){
        $(".banner_item").css({minHeight:(newitemHeight*0.1)+"rem"})
    }
    // 23.01.11
    $(function(){
        $(".newness_content .item:first-child .banner_item").addClass("on")
    })
    if(windowWidth > 1280){
        $("#wrap").removeClass("mobile");
		$("#wrap").addClass("normal");
        
        searchHide()
        $(".gnb-1dep-item").removeClass("open");
        $(".utility").css({top:""})
        // 23.01.11 수정
        if($('#wrap').hasClass('scroll')) {
            $("#gnb .nv_btn").css({width:windowWidth+"px", top:82+"px"}) // 23.02.08 수정
            $(".search_wrap").css({top:82+"px"})
        }else {
            $("#gnb .nv_btn").css({width:windowWidth+"px", top:156+"px"}) // 23.02.08 수정
            $(".search_wrap").css({top:156+"px"})
        }
        $(".gnb-1dep-item").hover(
            function(e){
                searchHide()
                $(this).closest("#header").addClass("hover")
                $(this).addClass("hover")
                $(this).children(".lnb").addClass("hover")
                $(this).siblings('.gnb-1dep-item').children(".lnb").removeClass("hover") // 23.01.31 추가
                $(this).parents("nav").children(".nv_btn").addClass("hover") // 23.02.08 수정
                $(".dim").show()
                e.stopImmediatePropagation();
            },
            function(e){
                $(this).closest("#header").removeClass("hover")
                $(this).removeClass("hover")
                $(this).parents("nav").children(".nv_btn").removeClass("hover") // 23.02.08 수정
                $(this).children(".lnb").removeClass("hover")
                $(".dim").hide()
                e.stopImmediatePropagation();
            }
        );

        // 23.01.31 keyboard 이동 script ~
        $(".gnb-1dep-item > a").focus(
            function(e){
                var item = $(this).parent('.gnb-1dep-item')
                searchHide()
                item.closest("#header").addClass("hover")
                item.addClass("hover")
                item.children(".lnb").addClass("hover")
                item.siblings(".gnb-1dep-item").removeClass("hover")
                item.parents("nav").children(".nv_btn").addClass("hover") // 23.02.08 수정
                $(".dim").show()
                e.stopImmediatePropagation();
            }
        );
        
        $(".gnb-1dep-item .last a").focus(
            function(e){
                var item = $(this).parents('.gnb-1dep-item')
                item.closest("#header").addClass("hover")
                item.addClass("hover")
                item.children(".lnb").addClass("hover")
                item.siblings(".gnb-1dep-item").removeClass("hover")
                item.parents("nav").children(".nv_btn").addClass("hover") // 23.02.08 수정
                $(".dim").show()
                e.stopImmediatePropagation();
            }
        );
        
        $(".logo ,.language .btn_open, .utility_item a").focus(function(e){
            $("#header").removeClass("hover")
            $(".gnb-1dep-item").removeClass("hover")
            $("#header nav").children(".nv_btn").removeClass("hover") // 23.02.08 수정
            $("#header").children(".lnb").removeClass("hover")
            $(".dim").hide()
            e.stopImmediatePropagation();
        })
        
        $(".special_menu .open_btn").focus(function(e){
            if($("header .search_wrap.active").length) {
                $("header .search_wrap").removeClass("active").slideUp(300)
                $(".dim").hide()
            }
        })
        //  ~ 23.01.31 
        // $(".language .btn_open").click(function(){
        //     if($(this).parents(".language").hasClass("active")){
        //         $(this).parents(".language").removeClass("active");
        //         // $(this).siblings(".box").slideUp(300)
        //     } else {
        //         $(this).parents(".language").addClass("active");
        //         // $(this).siblings(".box").slideDown(300)
        //     }
        //     e.stopImmediatePropagation();
        // });
    }else if(windowWidth <= 1280){
        $("#wrap").removeClass("normal");
        $("#wrap").addClass("mobile");

        $(".language").removeClass("active");
        $(".language .box").slideUp(0)

        $(".gnb_inner").css({top:"", height:""})
        $("#gnb .nv_btn").css({width:"", top:""}) // 23.02.08 수정
        $("#gnb .nv_btn").click(function(e){ // 23.02.08 수정
            bodyFixed()
            searchHide()
            $(".utility").css({top:windowHeight-176+"px"})
            e.stopImmediatePropagation();
        });
        $(".gnb_close").click(function(){
            bodyFixedClose()
            $(".utility").css({top:""})
        });
        $(".gnb_inner").css({top:headerHeight+"px", height:(windowHeight-222)+"px"})
        $(".btn_search").click(function(){
            bodyFixedClose()
        })
        
        // lnb
        $(".gnb-1dep-item .btn_lnb").click(function(e){
            var gnb_item = $(this).parent(".gnb-1dep-item")
            if($(gnb_item).hasClass("open")){
                $(gnb_item).removeClass("open");
                $(this).siblings(".lnb").slideUp()
            } else {
                $(gnb_item).addClass("open");
                $(this).siblings(".lnb").slideDown()
                $(gnb_item).siblings().removeClass("open")
                $(gnb_item).siblings().children(".lnb").slideUp()
            }
            e.stopImmediatePropagation();
        });
        
        // $(".language .btn_open").click(function(e){
        //     $(this).parents(".language").addClass("active")
        //     // $(this).siblings(".box").show()
        //     $(".utility").css({zIndex:"999"})
        //     $(".gnb_close").css({zIndex:"10"})
        //     e.stopImmediatePropagation();
        // })
        // $(".language .language_close").click(function(e){
        //     $(this).parents(".language").removeClass("active")
        //     // $(this).parents(".language").children(".box").hide()
        //     $(".utility").css({zIndex:""})
        //     $(".gnb_close").css({zIndex:""})
        //     e.stopImmediatePropagation();
        // })
    }
    if(windowWidth < 768){
        if($(".newness_content").length){
            $(".newness_content .banner").css({height:$(".newness_content .product_item").height()})
        }
        if($(".main").length){
            //var slidHwight = $(".etcservices .swiper-slide:nth-child(1) img").height()
            //$(".etcservices .swiper-slide .img").css({height:slidHwight+"px"})

            var snsservicesWidth = $(".snsservices > div").width()
            $(".snsservices ul").css({height:snsservicesWidth+"px"})
        }
    }

    
    if($("#content.sitemap").length){
        $("#content.sitemap").css({minHeight:(windowHeight-(headerHeight+footerHeight))*0.1+"rem"})
    }
}
window.addEventListener("load", resizeContent)
window.addEventListener("resize", resizeContent)

$(window).scroll(function(){
    // 23.02.01 수정
    var contMinHeight = $(window).height() + $("header").height()
    var contHeight = $("#wrap").height()
    if ($(this).scrollTop() >= 1 && contMinHeight < contHeight) {
        $("#wrap").addClass("scroll")
        var headerHeight = $("header").outerHeight(true);
        $("#content").css({marginTop:headerHeight+"px"})
        if($(window).width() > 1280){
            $("#gnb .nv_btn").css({top:82+"px"})  // 23.02.08 수정
            $(".search_wrap").css({top:82+"px"})
        }
        if($(".progress_indicator").length){
            $(".progress_indicator").css({top:(headerHeight)*0.1+"rem"})
        }
    } else {
        $("#wrap").removeClass("scroll")
        var headerHeight = $("header").outerHeight(true);
        $("#content").css({marginTop:headerHeight+"px"})
        if($(window).width() > 1280){
            // 23.01.11 수정
            $("#gnb .nv_btn").css({top:156+"px"})  // 23.02.08 수정
            $(".search_wrap").css({top:156+"px"})
        }
        if($(".progress_indicator").length){
            $(".progress_indicator").css({top:(headerHeight)*0.1+"rem"})
        }
    }
});

// 자동완성 레이어
var autocomplete_layer = function(){
    $(".search_box input").focus(function(){
        $(this).closest(".search_box").addClass("focus")
    })
    $('.btn_search, .keyword_item button').blur(function(){
        $(".search_box").removeClass("focus")
    })
    $(document).mouseup(function(e){
        var autocomplete_layer = $(".search_box");
        if(autocomplete_layer.has(e.target).length === 0){
            autocomplete_layer.removeClass("focus");
        }
    });
}

// 특정 스크롤에서 클래스명
var scroll_motion = function(){
    var $contents = $('.scroll_ani');
    
    window.addEventListener('scroll', function() {
        var scltop = $(window).scrollTop();

        $contents.each(function(idx, item){
            var $target   = $contents.eq(idx),
                i         = $target.index(),
                targetTop = $target.offset().top + $target.outerHeight(true) / 2 - $(window).height();
                targetBottom = $target.offset().top + $target.outerHeight(true);
            if (targetTop <= scltop && targetBottom > scltop) {
                $contents.eq(idx).addClass('on');
                // 23.01.16 추가
                if($(this).find('.video').length) {
                    $(this).find('video').get(0).play();
                }
            }else {
                $contents.eq(idx).removeClass('on');
                // 23.01.16 추가
                if($(this).find('.video').length) {
                    $(this).find('video').get(0).pause();
                }
            }
        })
    });
}
var key_motion = function(){
    var $contents = $('.key_ani');
    var scltop = $(window).scrollTop();
    var headerHeight = $("header").outerHeight(true);
    if($(window).scrollTop() >= 0) {
        $contents.each(function(idx, item){
            var $target   = $contents.eq(idx),
                targetBottom = $target.offset().top + $target.outerHeight(true) - headerHeight;
            if (0 <= scltop && targetBottom > scltop) {
                $contents.eq(idx).addClass('on');
                // 23.01.16 추가
                if($(this).find('.video').length) {
                    $(this).find('video').get(0).play();
                }
            }else {
                $contents.eq(idx).removeClass('on');
                // 23.01.16 추가
                if($(this).find('.video').length) {
                    $(this).find('video').get(0).pause();
                }
            }
        })
    }
    window.addEventListener('scroll', function() {
        var scltop = $(window).scrollTop();
        var headerHeight = $("header").outerHeight(true);
        $contents.each(function(idx, item){
            var $target   = $contents.eq(idx),
                targetBottom = $target.offset().top + $target.outerHeight(true) - headerHeight;
            if (0 <= scltop && targetBottom > scltop) {
                $contents.eq(idx).addClass('on');
            }else {
                $contents.eq(idx).removeClass('on');
            }
        })
    });
}

$(function(){
    $(".btn_search").click(function(){
        searchShow()
    });
    $(".btn_close, .dim").click(function(){
        searchHide()
        bodyFixedClose()
    })

    if($(".search_box").length){
        autocomplete_layer()
    }
    if($(".scroll_ani").length){
        scroll_motion()
    }
    if($(".key_ani").length){
        key_motion()
    }
    if($(".search_box").length){
        $(".search_box .input").each(function(){
            $(this).append("<button class='search_del'>del</button>")
            // 23.01.11 추가
            if ($(".search_box .input input").val() !== '') {
                $(".search_del").addClass("on");
            }
            $(".search_del").on("click", function(){
                // 23.02.03 수정
                $(this).siblings("label").find("input").val("")
                // 23.01.10 추가
                $(".search_del").removeClass("on")
            })
        })
    }
    
    // 23.01.10 추가
    $(".search_box .input input").on("input", function() {
        if ($(this).val() !== '') {
            $(".search_del").addClass("on");
        }
        else {
            $(".search_del").removeClass("on");
        }
    })
    
    $(".language .btn_open").click(function(){
        if($(this).parents(".language").hasClass("active")){
            $(this).parents(".language").removeClass("active");
            $(".utility").css({zIndex:""})
            $(".gnb_close").css({zIndex:""})
        } else {
            $(this).parents(".language").addClass("active");
            $(".utility").css({zIndex:"999"})
            $(".gnb_close").css({zIndex:"10"})
        }
    });
    $(".language .language_close").click(function(e){
        $(this).parents(".language").removeClass("active")
        $(".utility").css({zIndex:""})
        $(".gnb_close").css({zIndex:""})
    })

    if($(".special_menu").length){
        $(".special_menu .open_btn, .special_menu strong").click(function(){ // 23.02.08 수정
            var menu = $(this).parents(".special_menu")
            var menuWidth = $(menu).width()
            if($(menu).hasClass("open")){
                $(menu).animate({right:"-"+(menuWidth-48)}, 300).removeClass("open")
                $(".special_menu .open_btn").text("open")
            } else {
                $(menu).animate({right:0}, 300).addClass("open")
                $(".special_menu .open_btn").text("close")
            }
        });
    }
    

});


$(function() {
    $("body").append("<a href='javascript:void(0)' class='to_top'>TOP</a>")

    $(window).scroll(function(){
        var windowTop = $(window).scrollTop();
        var footerHeight = $("#footer").outerHeight()
        var val = $(document).height() - $(window).height() - footerHeight;
        if(windowTop > 100){
            $(".to_top").fadeIn();
        }else{
            $(".to_top").fadeOut();
        }
        
        if (windowTop >= val){
            $(".to_top").addClass("bottom").css({bottom:(footerHeight+40)+"px"})
            $(".special_menu").css({bottom:(footerHeight+98)+"px"})
        }
        else{
            $(".to_top").removeClass("bottom").css({bottom:""})
            $(".special_menu").css({bottom:""})
        }
    })

    $(".to_top").click(function(){
        $("body,html").animate({scrollTop: 0}, 400);
    });
});
