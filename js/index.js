/* 
* @Author: Marte
* @Date:   2016-10-06 14:22:00
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-12 22:40:39
*/

$(function(){
    // 透明度轮播图
    var liS=$(".sliderImg li");
    var prev=$(".slider .prev");
    var next=$(".slider .next");
    var arrow=$(".slider .arrow");
    var num=0;
	//第一张图片的层级设为1，其它图片透明度为0
    liS.eq(0).css("z-index",1).siblings().css("opacity",0);
    //添加小圆点
    for(var i=0;i<liS.length;i++){
        $("<span></span>").appendTo(".circle");
    }
    var spanS=$(".circle span")
    var marginL=$(".circle").width()/2;
    $(".circle").css("margin-left",-marginL);
    light();
    //点击小圆点 轮播图透明度和层级改变
    spanS.on("click",function(){
        var index=$(this).index();
        if(num!=index){
            liS.eq(index).css({"opacity":0,"z-index":1})
            liS.eq(num).css("z-index",0)
            liS.eq(num).animate({"opacity":0}, 500);
            liS.eq(index).animate({"opacity":1}, 500)
        }
        num=index;
        light();
    })
    prev.on("click",function(){
    	liS.eq(num).css("z-index",0)
        liS.eq(num).animate({"opacity":0}, 500);
        --num<0?num = liS.length-1:num;
        liS.eq(num).css({"opacity":0,"z-index":1})
        liS.eq(num).animate({"opacity":1}, 500);
        light();
    })
    next.on("click",autoplay);
    liS.timer=setInterval(autoplay, 3000);
    $(".slider").on("mouseenter",function(){
        arrow.show();
        clearInterval(liS.timer);
    })
    $(".slider").on("mouseleave",function(){
        arrow.hide();
        liS.timer=setInterval(autoplay, 3000);
    })
    function autoplay(){
    	liS.eq(num).css("z-index",0)
        liS.eq(num).animate({"opacity":0}, 500);
        ++num>liS.length-1?num=0:num;
        liS.eq(num).css({"opacity":0,"z-index":1})
        liS.eq(num).animate({"opacity":1}, 500);
        light();
    }
    function light(){
        spanS.eq(num).css("background","url('img/index/cir_on.png')").siblings().css("background","url('img/index/cir.png')");
    }

    // 焦点轮播图    箭头控制
    var box=$(".jdSlider");
    var ul=$(".jdSlider ul");
    var liArr=$(".jdSlider ul li");
    var arr=$(".jdSlider .arrow");
    var count=0;

    
    liArr.eq(0).clone().appendTo(ul);

    $(".jdSlider .left").on("click",function(){
        count--;
        if(count<0){
            ul.css("left",-(liArr.length)*box.width())
            count=liArr.length-1;
        }
        ul.animate({"left":-box.width()*count}, 500);
    })
    $(".jdSlider .right").on("click",function(){
        count++;
        if(count>liArr.length){
            ul.css("left",0);
            count=1;
        }
        ul.animate({"left":-box.width()*count}, 500);
    })

    box.on("mouseenter",function(){
        arr.show();
    })
    box.on("mouseleave",function(){
        arr.hide();
    })

    //city light   底部城市灯光显示
    function a(){
        $(".lightOne").show();
    }
    function b(){
        $(".lightTwo").show();
    }
    function c(){
        $(".lightThr").show();
    }
    function d(){
        $(".lightFou").show();
    }
    function e(){
        $(".lightFiv").show();
    }
    function f(){
        $(".city li").hide();
    }
//  for(var i=0;i<10;i++){
//      var j=i*8000;
//      setTimeout(a,1000+j);
//      setTimeout(b,2000+j);
//      setTimeout(c,3000+j);
//      setTimeout(d,4000+j);
//      setTimeout(e,5000+j);
//      setTimeout(f,8000+j);
//      if(i>10){
//      	i=0;
//      }
//      console.log(j)
//  }
    var i=1;
    clearInterval($(".city")[0].timer);
    $(".city")[0].timer=setInterval(function(){
    	$(".lightOne").timer=setTimeout(a,1000);
        $(".lightTwo").timer=setTimeout(b,2000);
        $(".lightThr").timer=setTimeout(c,3000);
        $(".lightFou").timer=setTimeout(d,4000);
        $(".lightFiv").timer=setTimeout(e,5000);
        $(".city li").timer=setTimeout(f,8000);
    	i++;
    	if(i>10){
    		i=1;
    	}
    },i*8000)
    
})