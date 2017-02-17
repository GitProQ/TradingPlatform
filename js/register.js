/* 
* @Author: Marte
* @Date:   2016-10-06 14:15:20
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-13 08:56:52
*/

$(function(){
    // 用户名格式验证  学号或者手机号码
    var reg=/^(20[012]\d{9})|(1[34578]\d{9})$/;
    var user=$("#user");
    var pw=$("#pw");
    var tpw=$("#tpw");
    user.on("input propertychange",function(){
    	$("span").eq(1).css("visibility","hidden");
    	$("span").eq(2).css("visibility","hidden");
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
    	var passReg= /^[\w\W]{6,}$/;
    	if(passReg.test(pw.val())==false){
            $("span").eq(1).css("visibility","visible");
    	}else{
    		$("span").eq(1).css("visibility","hidden");
    	}
    })
    tpw.on("input propertychange",function(){
    	$("span").eq(2).css("visibility","hidden");
    })
    // 注册  本地存储信息
    $(".rg").on("click",function(){
        var username=user.val();
        var info=window.localStorage.getItem(username);
        if(info!=undefined){
            $("span").eq(0).html("<i></i>该用户名已存在!")
            $("span").eq(0).css("visibility","visible");
        }
        else{
            if(user.val()=="学号/手机号"||pw.val()=="密码"){
                $("span").eq(1).css("visibility","visible");
            }
            else{
            	if(pw.val()==tpw.val()){
            		$("span").eq(1).css("visibility","hidden");
            		$("span").eq(2).css("visibility","hidden");
            		var username=user.val();
	                var pass=pw.val();
	                window.localStorage.setItem(username,pass);
	                alert("恭喜您！注册成功 快去登录吧……");
            	}
                else{
                	$("span").eq(2).css("visibility","visible");
                }  
            }
        }
        //清除     history back会记录value
//      user.val("学号/手机号");
//      pw.val("密码");
//      user.css("color","#ccc")
//      pw.css("color","#ccc")
    })

    //更换背景  1个节气更换一张背景
    //获取当前时间
	var nowDateInfo = getNowDate();
	document.getElementById("DateInfo").innerHTML = nowDateInfo;
	function getNowDate(){
	    var today=new Date();
	    var nowDate= "";
	        nowDate = nowDate+ " " +SolarTerm(today); // 显示二十四节气
	        return nowDate;
	}
	function SolarTerm(DateGL){
	    var SolarTermStr=new Array(
	        "小寒","大寒","立春","雨水","惊蛰","春分",
	        "清明","谷雨","立夏","小满","芒种","夏至",
	        "小暑","大暑","立秋","处暑","白露","秋分",
	        "寒露","霜降","立冬","小雪","大雪","冬至");
	    var DifferenceInMonth=new Array(
	        1272060,1275495,1281180,1289445,1299225,1310355,
	        1321560,1333035,1342770,1350855,1356420,1359045,
	        1358580,1355055,1348695,1340040,1329630,1318455,
	        1306935,1297380,1286865,1277730,1274550,1271556);
	    
	    var DifferenceInYear=31556926;
	    var BeginTime=new Date(1901/1/1);
	    
	    BeginTime.setTime(947120460000);
        for(;DateGL.getFullYear()<BeginTime.getFullYear();){
            BeginTime.setTime(BeginTime.getTime()-DifferenceInYear*1000);
        }
        for(;DateGL.getFullYear()>BeginTime.getFullYear();){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInYear*1000);
        }
        for(var M=0;DateGL.getMonth()>BeginTime.getMonth();M++){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
        }
        if(DateGL.getDate()>BeginTime.getDate()){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
            M++;
        }
        if(DateGL.getDate()>BeginTime.getDate()){
            BeginTime.setTime(BeginTime.getTime()+DifferenceInMonth[M]*1000);
            M==23?M=0:M++;
        }
        // var JQ="二十四节气:";
        var JQ = "" ;
        if(DateGL.getDate()==BeginTime.getDate()){
            JQ+=" 今天 <font color='#598F03'><b>"+SolarTermStr[M] + "</b></font>";
            M++;
        }else if(DateGL.getDate()==BeginTime.getDate()-1){
            JQ+=" 明天 <font color='#598F03'><b>"+SolarTermStr[M] + "</b></font>";
        }else if(DateGL.getDate()==BeginTime.getDate()-2){
            JQ+=" 后天 <font color='#598F03'><b>"+SolarTermStr[M] + "</b></font>";
        } else{
                // JQ=" 二十四节气:";
            JQ = "";
        if(DateGL.getMonth()==BeginTime.getMonth()){
            JQ+=" 本月";
        } else{
            JQ+=" 下月";
        }
            JQ+=BeginTime.getDate()+"日 "+"<font color='#598F03'><b>"+SolarTermStr[M]+"</b></font>";
        }
        if(M==0){
        	M=24;
        }
        $("html").css({"background":"url('img/register/"+M+".jpg') no-repeat","background-size":"100% 100%"})
		$("body").css({"background":"url('img/register/"+M+".jpg') no-repeat","background-size":"100% 100%"})
        return JQ;
    }
})