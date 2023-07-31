$(function(){
	$("tr").each(function(){
		var LinkDir = $(this).children(".director").text()
		var LinkFile = $(this).children(".file").text()
		$(this).find(".btn").prop("href",LinkDir+"/"+LinkFile)
	})
	$(".date .btn").each(function(){
		if($(this).text().length){
			$(this).closest("ul").not(".guide ul").addClass("hislist")
		}
		if($(this).text().match("-")){
			$(this).closest("ul").removeClass("hislist")
		}
	})
})

$(function($){
	$("a").click(function(){
		if($(this).attr("href") == "#none"){
			return false;
		}
	})
	
	// 수정이력
	var history = $(".hislist");
	var btnDate = history.find("a");
	
	history.each(function(){
		history.find("li:first-child").addClass("on");
		$(this).wrap("<div class='hisWrap'>");
		var nodes=$(this).children();
		if(nodes.length>1){
			$("<a class='btn off btnHis'>").prependTo($(this).parent("div")).text("수정이력");
		}
	});
	btnDate.hover(function(){
		$(this).children("span").toggle();
	});
	$(".btnHis").click(function(){
		$(this).toggleClass("off");
		$(this).next(history).children("li:not(.on)").toggle();
	});

	// 메뉴 탭
	var tm = $(".menu>dt");
	var tc = $(".menu>dd");
	var btnAll = $(".view_all");
	var menu = tm.not(btnAll);
	
	$(".menu>dt.selected").next("dd").show();
	btnAll.click(function(){
		btnAll.addClass("selected")
		tm.removeClass("selected")
		tc.show();
	});
	tm.click(function(){
		btnAll.removeClass("selected")
		tm.addClass("selected")
	});
	menu.click(function(){
		tm.not($(this).addClass("selected")).removeClass("selected");
		$(this).next("dd").show().siblings("dd").hide();
	});
	menu.not(menu.eq(0)).each(function(){
		var tmw = $(this).prevAll("dt").width();
		var tml = $(this).prevAll("dt").position().left;
		var tmp = tml+tmw;
		$(this).css("left", tmp);
	});
	
	//etc
	$(".tip").hover(function(){
		$(this).find("ul").toggle();
	});
	$(".notice li").append("<span class='bul'></span>");

	//상태
	$(".hold").attr("title","보류");
	$(".del").attr("title","삭제");
	$(".guide").attr("title","가이드");
	$(".link").attr("title","링크");
	$(".nohtml").attr("title","html페이지 아님");

	// to top
	var scrollDiv = document.createElement("div");
	$(scrollDiv).attr("id", "toTop").html("<a href='#none'>↑ 처음으로 이동</a>").appendTo("body");    
	$(window).scroll(function(){
		if ($(this).scrollTop() != 0) {
			$("#toTop").fadeIn();
		} else {
			$("#toTop").fadeOut();
		}
	});
	$("#toTop").click(function(){
		$("body,html").animate({scrollTop: 0},	600);
	});
});
$(window).ready(function(e) {
	//--total
	var total=$("tbody tr:not(.del, .link, .nohtml, .guide) td.date").length;
	var complete=$("tbody td .hislist, td .editlist").length;
	var edit=$("td .editlist").length;
	var per = (complete/total*100).toFixed(1);
	var nohtml=$("tbody tr.nohtml, tr.link").length;

	$(".siteInfo dd span").eq(0).text(total + "p");
	$(".siteInfo dd span").eq(1).text(complete + "p");
	$(".siteInfo dd span").eq(2).text(edit + "p");
	$(".siteInfo dd span").eq(3).text(per + "%");
	$(".siteInfo dd span").eq(4).text(nohtml + "p");
	//--total end
	
});
$(document).ready(function(){
	$(".btn").attr({ target:"_blank" });
});


$(function(){
	$(".notice li").each(function(){
		var CodeExample = $(this).children("div");
		var CodeButton = $(this).children("button");
		var CodeButtonPosition = $(CodeButton).position().left
		$(CodeExample).hide()
		$(CodeButton).click(function(){
			if($(CodeExample).hasClass("on")){
				$(CodeExample).removeClass("on").hide();
				$(".overlay").hide()
			}else{
				offsetY = window.pageYOffset;
				$(CodeExample).addClass("on").show();
				$(".overlay").show()
				$("body").css({
					position:"fixed",
					top:-offsetY+"px"
				})
			}
		})
		$(CodeExample).css({left:(CodeButtonPosition)+"px"})
		$(".overlay").click(function(){
			$(CodeExample).removeClass("on").hide();
			$(".overlay").hide()
			$("body").css("position","")
			$(window).scrollTop(offsetY);
		})
	})

	
	// var CodeEdit = $(".code_edit div")
	// $(CodeEdit).hide()
	// $(".code_edit button").on("click", function(){
	// 	$(CodeEdit).toggle()
	// });
	// var CodeButtonPosition = $(".code_edit button").position().left
	// $(CodeEdit).css({left:(CodeButtonPosition)+"px"})
});