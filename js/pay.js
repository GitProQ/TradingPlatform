$(function(){
	var json=JSON.parse(window.localStorage.getItem("buy"));
	if(json.g1!=undefined){
		goods1();
	}
	if(json.g2!=undefined){
		goods2();
	}
	if(json.g3!=undefined){
		goods3();
	}
	if(json.g4!=undefined){
		goods4();
	}
	for( key in json){
	    if(json[key]=="g1"){
	        var g1=window.localStorage.getItem("g1");
	        goods1();
	    } 
	    if(json[key]=="g2"){
	        var g2=window.localStorage.getItem("g2");
	        goods2();
	    }
	    if(json[key]=="g3"){
	        var g3=window.localStorage.getItem("g3");
	        goods3();
	    }
	    if(json[key]=="g4"){
	        var g4=window.localStorage.getItem("g4");
	        goods4();
	    }
	}
//	共需付款
	function amount(){
		var subtotal=$(".subtotal");
		var result=0;
		for(var i=0;i<subtotal.length;i++){
			result+=($(subtotal[i]).html()-0);
		}
		$(".cost .total").html(result.toFixed(2));
	}
	//	商品1请求本地数据
	function goods1(){
		$.ajax({
			url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
                img=data.g1[0].img;
                product=data.g1[0].product+data.g1[0].info;
                price=data.g1[0].price;
                var tr="<tr class='g1'>";
		         tr+="<td class='info'>"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="</tr>"
		        //添加数据
		        $("table").append($(tr));
		        $(".g1 .number").html(json.g1||g1);
		        $(".g1 .subtotal").html(((json.g1||g1)*price).toFixed(2));
		        amount();
            }
		})
	}
 	//	商品2请求本地数据
	function goods2(){
		$.ajax({
			url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
                img=data.g2[0].img;
                product=data.g2[0].product+data.g2[0].info;
                price=data.g2[0].price;
                var tr="<tr class='g2'>";
		         tr+="<td class='info'>"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="</tr>"
		        //添加数据
		        $("table").append($(tr));
		        $(".g2 .number").html(json.g2||g2);
		        $(".g2 .subtotal").html(((json.g2||g2)*price).toFixed(2));
		        amount();
            }
		})
	}
	//	商品3请求本地数据
	function goods3(){
		$.ajax({
			url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
                img=data.g3[0].img;
                product=data.g3[0].product+data.g3[0].info;
                price=data.g3[0].price;
                var tr="<tr class='g3'>";
		         tr+="<td class='info'>"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="</tr>"
		        //添加数据
		        $("table").append($(tr));
		        $(".g3 .number").html(json.g3||g3);
		        $(".g3 .subtotal").html(((json.g3||g3)*price).toFixed(2));
		        amount();
            }
		})
	}
	//	商品4请求本地数据
	function goods4(){
		$.ajax({
			url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
                img=data.g4[0].img;
                product=data.g4[0].product+data.g4[0].info;
                price=data.g4[0].price;
                var tr="<tr class='g4'>";
		         tr+="<td class='info'>"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="</tr>"
		        //添加数据
		        $("table").append($(tr));
		        $(".g4 .number").html(json.g4||g4);
		        $(".g4 .subtotal").html(((json.g4||g4)*price).toFixed(2));
		        amount();
            }
		})
	}
//	方式选择
	$(".pay-way li").on("click",function(){
		$(this).addClass("check").siblings().removeClass("check");
	})
	$(".commit .payButton").on("click",function(){
		if($(".order-body li").hasClass("checked")==true){
			if($(".wechat").hasClass("check")){
				$(".payment .txt i").html($(".order-total .total").html());
				$(".payment").show(200);
			}
			else if($(".card").hasClass("check")){
				$(".delivery").show(200);
			}
			$(".Info").hide(200);
			$(".title .paid").addClass("focus").siblings().removeClass("focus");
		}
		else{
			alert("请选择收货地址");
		}
	})
//	返回上一步
	$(".return").on("click",function(){
		$(".Info").show(200);
		$(".payment").hide(200);
		$(".delivery").hide(200);
		$(".title .affirm").addClass("focus").siblings().removeClass("focus");
	})
//	手动刷新支付验证
	$(".refresh").on("click",function(){
		$(".paySuccess").show(200);
		$(".payment").hide(200);
		$(".delivery").hide(200);
		$(".title .success").addClass("focus").siblings().removeClass("focus");
		
		var order=JSON.parse(window.localStorage.getItem(login+"order"))||[];
		var arr=[];
		$(".order-body li").each(function(i,e){
			if($(e).hasClass("checked")){
				take=$(e).find(".data").html();
			}
		})
		arr.push(take);
		for(var j=1;j<$("table tr").length;j++){
			var str=$($("table tr")[j]).attr("class");
			str+="-"+$($("table tr")[j]).find(".number").html();
			arr.push(str);
		}
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate();
		var hour=date.getHours();
		var min=date.getMinutes();
		var sec=date.getSeconds();
		var time=year+"/"+month+"/"+day+" "+hour+":"+min+":"+sec;
		arr.push(time);
		order.push(arr);
		window.localStorage.setItem(login+"order",JSON.stringify(order));
	})
//	收货地址
	$(".addAdress").on("click",function(){
		$(".maskBg").fadeIn(200);
		$(".adressForm input").val("");
	})
	$(".icon_close").on("click",function(){
		$(".maskBg").fadeOut(200);
		$(".adressForm input").val("");
	})
	arr=new Array();
	$(".append").on("click",function(){
		var str="";
		str+=$("#studNo").val()+"、";
		str+=$("#consName").val()+"、";
		str+=$("#consPhone").val()+"、";
		str+=$("#city-select").val();
		var inp=$(".adressForm input");
		var count=0;
		for(var i=0;i<inp.length;i++){
			if($(inp[i]).val()==""){
				count++;
			}
		}
		var stuNo=/^20[012]\d{9}$/;
		var phoNo=/^1[34578]\d{9}$/;
		if(count>0){
			$(".adressForm p").html("请填写完整信息！");
			$(".adressForm p").css("visibility","visible");
		}else{
			if(stuNo.test($("#studNo").val())==false){
				$(".adressForm p").html("您输入的学号格式不对！");
				$(".adressForm p").css("visibility","visible");
			}
			else if(phoNo.test($("#consPhone").val())==false){
				$(".adressForm p").html("您输入的手机号码格式不对！");
				$(".adressForm p").css("visibility","visible");
			}
			else{
				var login=window.localStorage.getItem("success");
				var arr=window.localStorage.getItem(login+"site");
				arr=JSON.parse(arr)||[];
				arr.push(str);
				window.localStorage.setItem(login+"site",JSON.stringify(arr));
				$(".order-body ul").append("<li><span class='data'>"+str+"</span>"+"<span class='del'>删除</span></li>");
				$(".maskBg").fadeOut(200);
			}
		}
	});
	$(".adressForm input").on("input",function(){
		$(".adressForm p").css("visibility","hidden");
	})
	var login=window.localStorage.getItem("success");
	var address=window.localStorage.getItem(login+"site");
	if(login==undefined){
		
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
		window.localStorage.setItem(login+"site",JSON.stringify(address));
		$(this).parent().remove();
	});	
//	收货地址选择
	$(".order-body").on("click","li",function(){
		$(this).addClass("checked").siblings().removeClass("checked");
	});
})
