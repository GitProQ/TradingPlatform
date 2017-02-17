/* 
* @Author: Marte
* @Date:   2016-10-06 11:43:22
* @Last Modified by:   Marte
* @Last Modified time: 2016-12-05 19:17:07
*/

$(function(){
    // 用户名格式验证  学号或者手机号码
    var reg=/(^20[012]\d{9}$)|(^1[34578]\d{9}$)/;
    var user=$("#user");
    var pw=$("#pw");
    user.on("input propertychange",function(){
    	$("span").eq(1).css("visibility","hidden");
        if(reg.test(user.val())==false){ 
            $("span").eq(0).html("<i></i>请输入正确格式的用户名!")
            $("span").eq(0).css("visibility","visible");
        }
        else{
            $("span").eq(0).css("visibility","hidden");
        }
        if(user.val()==""){
            $("span").eq(0).css("visibility","hidden");
        }
    })
    pw.on("input propertychange",function(){
        $("span").eq(1).css("visibility","hidden");
    }) 
    
//  input type转换  
    $("#txt").on("focus",function(){
        var text_value = $(this).val();
        if (text_value == "") {
			$("#txt").hide();
			$("#pw").show().focus();
			$("#pw").css("color","black");
		}
    })
    pw.on("blur",function(){
        var text_value = $(this).val();
		if (text_value == "") {
			$("#txt").show();
			$("#pw").hide();
		}
    })

    //登录验证
    $(".login").on("click",function(){
        var username=user.val();
        var info=window.localStorage.getItem(username);
        if(username=="学号/手机号"||pw.val()=="密码"){
        	$("span").eq(1).html("<i></i>用户名、密码不能为空!")
        	$("span").eq(1).css("visibility","visible");
        }else{
        	if(info==undefined){
	            $("span").eq(0).html("<i></i>用户名不存在!")
	            $("span").eq(0).css("visibility","visible");
	        }
	        else{
	            if(pw.val()==info){
	                alert("恭喜您！登录成功 正在跳转到主页……");
	                window.localStorage.setItem("success",username);
	                window.location.href="index.html";
	            }
	            else{
	            	$("span").eq(1).html("<i></i>请输入正确的密码!")
	                $("span").eq(1).css("visibility","visible");
	            }
	        }
        }
    })
    
//  根据ip获取天气
	if(ip!=undefined){
		if(!+[1,]){
			$(".weather").hide();
			$("#rain").remove();
			$("#ip").remove();
		}else{
			$.ajax({
				url:"http://v.juhe.cn/weather/ip",
				type:"get",
				data:"format=2&key=4009cb9015b91548d5536776be240263&ip="+ip.substring(1),
				dataType:"jsonp",
				timeout:3000,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
	                $("#rain").remove();
					$("#ip").remove();
					$("#container").remove();
					$(".weather").remove();
					return;
	 			},
				success: function (data) {
					if(data.result==null){
						$("#rain").remove();
						$("#ip").remove();
						$("#container").remove();
						$(".weather").remove();
						return;
					}else{
						var weather=data.result.today.weather;
					}
					if(weather.indexOf("雨")>=0){
						if(weather.indexOf("小雨")>=0){
							location.hash="#slide-2";
						}else{
							location.hash="#slide-1";
						}
					}else if(weather.indexOf("雷")>=0){
						location.hash="#slide-5";
					}else{
						location.hash="#slide-3";
					}
					$(".weather .time").html(data.result.today.date_y);
					$(".weather .city").html(data.result.today.city);
					$(".weather .temp").html(data.result.today.temperature);
					$(".weather .wea").html(data.result.today.weather);
				}
			});
		} 
	}
})