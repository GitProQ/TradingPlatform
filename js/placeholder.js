/* 
* @Author: Marte
* @Date:   2016-10-06 11:45:06
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-08 09:11:42
*/

//$(function(){
//  /* placeholder */
//  var user = $("#user");
//  var pw= $("#pw");
//  $("input[type=text]").css("color","#ccc")
//  user.on("focus",function(){
//      if($(this).val() == "学号/手机号") { 
//          $(this).val(""); 
//          $(this).css("color","black")
//      }
//  })
//  user.on("blur",function(){
//      if($(this).val() == "") { 
//          $(this).val("学号/手机号") ; 
//          $(this).css("color","#ccc")       
//      }
//  })
//  pw.on("focus",function(){
//      if($(this).val() == "密码") { 
//          $(this).val(""); 
//          $(this).css("color","black");
//      }
//  })
//  pw.on("blur",function(){
//      if($(this).val() == "") { 
//          $(this).val("密码") ; 
//          $(this).css("color","#ccc")       
//      }
//  })
//})

$(function(){
	//将输入框的文字的颜色设置为#9f9f9f
	$("input[type=text]").css("color","#9f9f9f")
	//获得焦点
	$("input[type=text]").on("focus",function(){
		if($(this).val() == $(this).attr("value")) { //相等才清
            $(this).val(""); 
            $(this).css("color","black")
        }
	})
	//失去焦点
	$("input[type=text]").on("blur",function(){
		if($(this).val() == "") { //为空时添加
            $(this).val($(this).attr("value")) ; 
            $(this).css("color","#9f9f9f")       
        }
	})
})
