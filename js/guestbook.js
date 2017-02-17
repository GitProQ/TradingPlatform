
$(function(){
	//提示
	$(".textArea").html("有事没事说两句...");
	$(".textArea").on("focus",function(){
		if($(this).html()=="有事没事说两句..."){
			$(".textArea").html("");
		}
	})
	$(".textArea").on("blur",function(){
		if($(".textArea").html()==""){
			$(".textArea").html("有事没事说两句...");
		}
	})
	
	var message=JSON.parse(window.localStorage.getItem("note"))||[];
	for(var i=0;i<message.length;i++){
		var span1="<span class='username'>"+message[i][0]+"：</span>"
		var span2="<span class='time'>"+message[i][1]+"</span>"
		var con="<p>"+message[i][2]+"</p>";
		var a="<span class='del'>Delete</span>"
		$("<li class='clearfix'>"+span1+span2+con+a+"</li>").insertBefore(".con ul li:eq(0)");
	}
	//发送
	$(".send").on("click",function(){
		var username=window.localStorage.getItem("success");
		if(username==undefined){
			username="游客";
		}
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var h=date.getHours();
		var m=date.getMinutes()
		var s=date.getSeconds();
		var time=year+"年"+month+"月"+day+"日"+h+":"+m+":"+s;
		var span1="<span class='username'>"+username+"：</span>"
		var span2="<span class='time'>"+year+"年"+month+"月"+day+"日"+h+":"+m+":"+s+"</span>"
		var con="<p>"+$(".textArea").html()+"</p>";
		var a="<span class='del'>Delete</span>"
		$("<li>"+span1+span2+con+a+"</li>").insertBefore(".con ul li:eq(0)");
		var arr=[];
		arr.push(username);
		arr.push(time);
		arr.push($(".textArea").html());
		message.push(arr);
		window.localStorage.setItem("note",JSON.stringify(message));
		$(".textArea").html("有事没事说两句...");
	})
	//删除
	$(".con ul").on("click",".del",function(){
		$(this).parent().remove();
		var time=$(this).parent().find(".time").html()
		for(var i=0;i<message.length;i++){
			if(message[i][1]==time){
				message.splice(i,1);
			}
		}
		window.localStorage.setItem("note",JSON.stringify(message));
	})
	
	
	$(".input i").on("click",function(){
		$(".face").fadeIn(0)
	})
	$(".face").on("mouseleave",function(){
		$(".face").fadeOut(0)
	})
	//表情
	$(".input li").append("<img />")
	for(var k=0;k<$(".input li").length;k++){
		$(".input li").eq(k).find("img").prop("src","img/guestbook/"+(k+1)+".gif")
		$(".input li").eq(k).find("img").attr("value","/"+(k+1))
	}
	//添加表情
	$(".input li").on("click",function(){
		if($(".textArea").html()=="有事没事说两句..."){
			$(".textArea").html("");
		}
		var src=$(this).find("img").attr("src");
		var val="<img src='"+src+"' />"
		$(".textArea").append(val)

	})

})
