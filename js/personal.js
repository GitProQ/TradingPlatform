$(function(){
//	动画	
	$(".max").slideUp(0);
	setTimeout(function(){
		$(".max").slideDown(400);
	},300)

//	退出
	$(".exit").on("click",function(){
		window.localStorage.removeItem("success");
		$(".userName").html("个人中心");
		$(".login a").html("您好，请登录！");
	})
//	tab切换
	$(".gotoSafe").on("click",function(){
		if($(".safe").css("display")=="none"){
			$(".module>div").hide();
			$(".safe").show(200);
		}
	})
	$(".gotoAddress").on("click",function(){
		if($(".address").css("display")=="none"){
			$(".module>div").hide();
			$(".address").show(200);
		}
	})
	$(".retreat").on("click",function(){
		if($(".waveCanvas").css("display")=="none"){
			$(".module>div").hide();
			$(".waveCanvas").show(200);
		}
	})
//	修改密码
	$(".changePw").on("click",function(){
		var now=window.localStorage.getItem("success");
		var oldPassword=window.localStorage.getItem(now);
		var inp=$(".safe input");
		var flag=0;
		for(var i=0;i<inp.length;i++){
			if($(inp[i]).val()==""){
				flag++;
			}
		}
		if(flag>0){
			$(".error").html("密码不能为空！");
			$(".error").css("visibility","visible");
		}else{
			if($("#oldPw").val()==oldPassword){
				if($("#newPw").val()!=$("#newPwtwo").val()){
					$(".error").html("第二次密码输入错误！");
					$(".error").css("visibility","visible");
				}else{
					window.localStorage.setItem(now,$("#newPw").val())
					$(".error").html("密码修改成功，请重新登录！");
					$(".error").css("visibility","visible");
					$(".exit").trigger("click");
				}
			}else{
				$(".error").html("旧密码输入错误！");
				$(".error").css("visibility","visible");
			}
		}
	})
	$(".safe input").on("input",function(){
		$(".error").css("visibility","hidden");
	})
//	收货地址
	arr=new Array();
	$(".append").on("click",function(){
		var str="";
		str+=$("#studNo").val()+"、";
		str+=$("#consName").val()+"、";
		str+=$("#consPhone").val()+"、";
		str+=$("#city-select").val();
		var inp=$(".address input");
		var count=0;
		for(var i=0;i<inp.length;i++){
			if($(inp[i]).val()==""){
				count++;
			}
		}
		var stuNo=/^20[012]\d{9}$/;
		var phoNo=/^1[34578]\d{9}$/;
		if(count>0){
			$(".address .error").html("请填写完整信息！");
			$(".address .error").css("visibility","visible");
		}else{
			if(stuNo.test($("#studNo").val())==false){
				$(".address .error").html("您输入的学号格式不对！");
				$(".address .error").css("visibility","visible");
			}
			else if(phoNo.test($("#consPhone").val())==false){
				$(".address .error").html("您输入的手机号码格式不对！");
				$(".address .error").css("visibility","visible");
			}
			else{
				var login=window.localStorage.getItem("success");
				var arr=window.localStorage.getItem(login+"site");
				arr=JSON.parse(arr)||[];
				arr.push(str);
				window.localStorage.setItem(login+"site",JSON.stringify(arr));
				$(".order-body ul").append("<li><span class='data'>"+str+"</span>"+"<span class='del'>删除</span></li>");
				inp.val("");
			}
		}
	});
	$(".address input").on("input",function(){
		$(".address .error").css("visibility","hidden");
	});
	var login=window.localStorage.getItem("success");
	var address=window.localStorage.getItem(login+"site");
	if(login==undefined){
		alert("登录后,才能查看个人信息哟");
		window.location.href="login.html";
	}else{
		if(address!=undefined){
			var site=JSON.parse(window.localStorage.getItem(login+"site"));
			for(var i=0;i<site.length;i++){
				$(".order-body ul").append("<li><span class='data'>"+site[i]+"</span>"+"<span class='del'>删除</span></li>");
			}
		}
	}
//	收货地址删除
	$(".order-body").on("click",".del",function(){
		var txt=$(this).parent().find(".data").html();
		var login=window.localStorage.getItem("success");
		var address=JSON.parse(window.localStorage.getItem(login+"site"));
		for(var i=0;i<address.length;i++){
			if(address[i]==txt){
				address.splice(i,1)
			}
		}
		window.localStorage.setItem(login+"site",JSON.stringify(address))
		$(this).parent().remove();
	});
})
