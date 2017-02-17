/* 
* @Author: Marte
* @Date:   2016-10-08 08:46:50
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-08 18:20:42
*/

$(function(){
    //透明度轮播 无箭头控制
    var liS=$(".sliderImg li");
    var num=0;

    liS.eq(0).css("z-index",1).siblings().css("opacity",0);
    for(var i=0;i<liS.length;i++){
        $("<span></span>").appendTo(".circle");
    }
    var spanS=$(".circle span")
    $(".circle").css("marginLeft","-36px");
    light();
    spanS.on("mouseenter",function(){
        var index=$(this).index();
        if(num!=index){
        	liS.eq(num).css("z-index",0)
	        liS.eq(index).css("opacity",0)
	        liS.eq(num).animate({"opacity":0}, 500);
	        liS.eq(index).animate({"opacity":1}, 500)
	        liS.eq(num).css("z-index",1)
        }
        num=index;
        light();
    })
    liS.timer=setInterval(autoplay, 3000);
    $(".slider").on("mouseenter",function(){
        clearInterval(liS.timer);
    })
    $(".slider").on("mouseleave",function(){
        liS.timer=setInterval(autoplay, 3000);
    })
    function autoplay(){
        liS.eq(num).animate({"opacity":0}, 500);
        ++num>liS.length-1?num=0:num;
        liS.eq(num).css("opacity",0)
        liS.eq(num).animate({"opacity":1}, 500);
        light();
    }
    function light(){
        spanS.eq(num).css("background","url('img/gift/cir_on.png')").siblings().css("background","url('img/gift/cir.png')");
    }

})