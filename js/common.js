/* 
* @Author: Marte
* @Date:   2016-10-08 18:20:23
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-11 17:19:15
*/

$(function(){
    //返回顶部
    $(window).scroll( function() { 
        if($(window).scrollTop()>100){
            $(".bTop").show();
        }
        else{
            $(".bTop").hide();
        }
    } );
    $(".bTop").on("click",function(){
        $('html,body').animate({scrollTop:0},400,"swing");
    })
    //购物车计数显示
    var oldNew=window.localStorage.getItem("count");
    $("#cartNum").html(oldNew);
    if(oldNew==undefined){
        $("#cartNum").html(0);
    }
    else if(oldNew>4){
    	$("#cartNum").html(4);
    }
    
	 //用户名显示
	$(".geren").on("mouseenter",function(){
		if(!$(".logoff").is(":animated")){
		  	$(".logoff").slideDown(200);
		}
//		$(".logoff").slideDown(200);
	})
	$(".geren").on("mouseleave",function(){
		$(this).find(".logoff").stop().slideUp(200);
	})
    var username=window.localStorage.getItem("success");
    if(username!=undefined){
    	$(".userName").html(username);
    	$(".login a").html("欢迎光临！");
    }
    else{
    	$(".userName").html("个人中心");
    }
	//注销
	$(".logoff a").on("click",function(){
		window.localStorage.removeItem("success");
		$(".userName").html("个人中心");
		$(".login a").html("您好，请登录！");
	})
	//搜索
	$(".search").on("click",function(){
		var txt=$(".logo input[type=text]").val();
		window.localStorage.setItem("tag",txt);
	})
})