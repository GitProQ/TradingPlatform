/* 
* @Author: Marte
* @Date:   2016-10-08 13:07:30
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-10 16:25:39
*/

$(function(){
    //图片切换显示
    $(".img li").eq(0).siblings().css("opacity",0.5);
    $(".bigImg img").eq(0).siblings().hide();
    $(".img li").on("mouseenter",function(){
        var index=$(this).index();
        $(this).css("opacity",1).siblings().css("opacity",0.5);
        $(".bigImg img").eq(index).fadeIn().siblings().stop(true,true).fadeOut();
    })

    //款式
    $(".info ul li").eq(0).addClass('select');
    $(".info ul li").on("click",function(){
        $(this).addClass('select').siblings().removeClass('select');
    })
    
    //数量
    var num=1;
    var remain=parseInt($(".remain i").html());
    if($(".num").val()==1){
        $(".reduce").prop("disabled",true);
    }
    $(".reduce").on("click",function(){
        $(".add").prop("disabled",false);
        var num=$(".num").val();
        num--;
        $(".num").val(num);
        if($(".num").val()<=1){
            $(".reduce").prop("disabled",true);
        }
    })
    $(".add").on("click",function(){
        $(".reduce").prop("disabled",false);
        var num=$(".num").val();
        num++;
        $(".num").val(num);
        if($(".num").val()==remain||$(".num").val()>remain){
            $(".add").prop("disabled",true);
        }
    })
    $(".num").on("blur",function(){
        if($(".num").val()>remain){
            $(".add").prop("disabled",true);
            $(".num").val(remain);
            $(".reduce").prop("disabled",false);
        }  
        else if($(".num").val()<1){
            $(".reduce").prop("disabled",true);
            $(".num").val(1);
            $(".add").prop("disabled",false);
        }
    })
    
    //加入购物车  
//  var count=0;
//  var i=window.localStorage.getItem("g1");
//  var j=window.localStorage.getItem("g2");
//  var k=window.localStorage.getItem("g3");
//  if(i==undefined){
//  	i=0;
//  }
//  if(j==undefined){
//  	j=0;
//  }
//  if(k==undefined){
//  	k=0;
//  }
//  count=Number(i+j+k);
//  if(count>3){
//      count=3;
//  }
//  window.localStorage.setItem("count",count);

    $(".addCar").on("click",function(){
    	var i=window.localStorage.getItem("g1");
    	var j=window.localStorage.getItem("g2");
    	var k=window.localStorage.getItem("g3");
    	var l=window.localStorage.getItem("g4");
        var value=$(this).attr("value");
        var num=parseInt($(".num").val());
        if(value=="g1"){
            i=Number(i);
        	i+=num;
        	if(i>remain){
        		i=remain;
        	}
        	window.localStorage.setItem(value,i);
        }
        if(value=="g2"){
        	j=Number(j);
        	j+=num;
        	if(j>remain){
        		j=remain;
        	}
        	window.localStorage.setItem(value,j);
        }
        if(value=="g3"){
        	k=Number(k);
        	k+=num;
        	if(k>remain){
        		k=remain;
        	}
        	window.localStorage.setItem(value,k);
        }
        if(value=="g4"){
        	l=Number(l);
        	l+=num;
        	if(l>remain){
        		l=remain;
        	}
        	window.localStorage.setItem(value,l);
        }
	    //购物车计数
        var i=window.localStorage.getItem("g1");
        var j=window.localStorage.getItem("g2");
        var k=window.localStorage.getItem("g3");
        var l=window.localStorage.getItem("g4");
        if(i==undefined){
            i=0;
        }else{
        	i=1;
        }
        if(j==undefined){
            j=0;
        }else{
        	j=1;
        }
        if(k==undefined){
            k=0;
        }else{
        	k=1;
        }
        if(l==undefined){
            l=0;
        }else{
        	l=1;
        }
	    var count=parseInt(i)+parseInt(j)+parseInt(k)+parseInt(l);
	    if(count>4){
	    	count=4;
	    }
	    window.localStorage.setItem("count",count);
	    $("#cartNum").html(count);
	    //提示框
	    $(".mask").html("<i></i>商品已经成功加入购物车")
	    $(".mask").show(200);
	    clearInterval($(".mask").timer);
	    $(".mask").timer=setTimeout(function(){
	        $(".mask").hide(200);
	    }, 1000)
    })
    
    $(".buy").on("click",function(){
        var value=$(this).attr("value");
        var num=parseInt($(".num").val());
        if(value=="g1"){
        	var obj={
        		"g1":num
        	}
        }
        if(value=="g2"){
        	var obj={
        		"g2":num
        	}
        }
        if(value=="g3"){
        	var obj={
        		"g3":num
        	}
        }
        if(value=="g4"){
        	var obj={
        		"g4":num
        	}
        }
        var obj = JSON.stringify(obj);
        window.localStorage.setItem("buy",obj);
    	window.location.href="pay.html";
    })
})