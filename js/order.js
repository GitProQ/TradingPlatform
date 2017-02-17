$(function(){
	var login=window.localStorage.getItem("success");
	var address=JSON.parse(window.localStorage.getItem(login+"site"));
	var order=JSON.parse(window.localStorage.getItem(login+"order"));
	if(order!=undefined){
		var arrNameg1=[];
		var arrAddg1=[];
		var arrTimeg1=[];
		var arrNameg2=[];
		var arrAddg2=[];
		var arrTimeg2=[];
		var arrNameg3=[];
		var arrAddg3=[];
		var arrTimeg3=[];
		var arrNameg4=[];
		var arrAddg4=[];
		var arrTimeg4=[];
		var orderLength=[];
		for(var i=0;i<order.length;i++){
			var length=order[i].length-2;
			orderLength.push(length);
			for(var j=0;j<order[i].length;j++){
				if(order[i][j].indexOf("g1")>=0){
					var g1=order[i][j].substring(3);
					var address=order[i][0];
					var time=order[i][order[i].length-1];
					arrNameg1.push(g1);
					arrAddg1.push(address);
					arrTimeg1.push(time);
					goods1(arrNameg1.reverse(),arrAddg1.reverse(),arrTimeg1.reverse())
				}
				if(order[i][j].indexOf("g2")>=0){
					var g2=order[i][j].substring(3);
					var address=order[i][0];
					var time=order[i][order[i].length-1];
					arrNameg2.push(g2);
					arrAddg2.push(address);
					arrTimeg2.push(time);
					goods2(arrNameg2.reverse(),arrAddg2.reverse(),arrTimeg2.reverse());
				}
				if(order[i][j].indexOf("g3")>=0){
					var g3=order[i][j].substring(3);
					var address=order[i][0];
					var time=order[i][order[i].length-1];
					arrNameg3.push(g3);
					arrAddg3.push(address);
					arrTimeg3.push(time);
					goods3(arrNameg3.reverse(),arrAddg3.reverse(),arrTimeg3.reverse())
				}
				if(order[i][j].indexOf("g4")>=0){
					var g4=order[i][j].substring(3);
					var address=order[i][0];
					var time=order[i][order[i].length-1];
					arrNameg4.push(g4);
					arrAddg4.push(address);
					arrTimeg4.push(time);
					goods4(arrNameg4.reverse(),arrAddg4.reverse(),arrTimeg4.reverse())
				}
			}	
		}
		orderLength.reverse();
		var sum=0;
		$(document).ajaxStop(function(){
		  	for(var q=0;q<orderLength.length;q++){
				sum+=orderLength[q];
	        	$("<p class='timeTip'></p>").insertAfter($("table tr").eq(sum));
			}	
		});
		
	}
	function del(){
		$("table").on("click",".op",function(){
			
		})
	}
	//	商品1请求本地数据
	function goods1(arrName,arrAdd,arrTime){
		$.ajax({
			url:"json/pay.json",
	    	type:"get",
	    	dataType:"json",
	        success: function (data) {
	            img=data.g1[0].img;
	            product=data.g1[0].product;
	            price=data.g1[0].price;
	            var tr="<tr class='g1'>";
		         tr+="<td class='info'>"+img+product+"<p></p></td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='op'></td>";
		         tr+="</tr>"
		        //添加数据
		        var trLength=$("table tbody tr");
		        if(trLength.length==0){
		        	$("table").append($(tr));
		        }
		        else{
		        	$(tr).insertBefore($("table tbody tr:eq(0)"));
		        }
				for(var k=0;k<arrName.length;k++){
					$(".g1").eq(k).find(".number").html("x"+arrName[k]);
					$(".g1").eq(k).find(".subtotal").html((arrName[k]*price).toFixed(2));
					$(".g1").eq(k).find(".info p").html("收件人："+arrAdd[k]);
					$(".g1").eq(k).find(".op").html(arrTime[k]);
				}
	        }
		})
	}
	//	商品2请求本地数据
	function goods2(arrName,arrAdd,arrTime){
		$.ajax({
			url:"json/pay.json",
	    	type:"get",
	    	dataType:"json",
	        success: function (data) {
	            img=data.g2[0].img;
	            product=data.g2[0].product;
	            price=data.g2[0].price;
	            var tr="<tr class='g2'>";
		         tr+="<td class='info'>"+img+product+"<p></p></td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='op'></td>";
		         tr+="</tr>"
		        //添加数据
		        var trLength=$("table tbody tr");
		        if(trLength.length==0){
		        	$("table").append($(tr));
		        }
		        else{
		        	$(tr).insertBefore($("table tbody tr:eq(0)"));
		        }
		        for(var k=0;k<arrName.length;k++){
					$(".g2").eq(k).find(".number").html("x"+arrName[k]);
					$(".g2").eq(k).find(".subtotal").html((arrName[k]*price).toFixed(2));
					$(".g2").eq(k).find(".info p").html("收件人："+arrAdd[k]);
					$(".g2").eq(k).find(".op").html(arrTime[k]);
				}
	        }
		})
	}
	//	商品3请求本地数据
	function goods3(arrName,arrAdd,arrTime){
		$.ajax({
			url:"json/pay.json",
	    	type:"get",
	    	dataType:"json",
	        success: function (data) {
	            img=data.g3[0].img;
	            product=data.g3[0].product;
	            price=data.g3[0].price;
	            var tr="<tr class='g3'>";
		         tr+="<td class='info'>"+img+product+"<p></p></td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='op'></td>";
		         tr+="</tr>"
		        //添加数据
		        var trLength=$("table tbody tr");
		        if(trLength.length==0){
		        	$("table").append($(tr));
		        }
		        else{
		        	$(tr).insertBefore($("table tbody tr:eq(0)"));
		        }
		        for(var k=0;k<arrName.length;k++){
					$(".g3").eq(k).find(".number").html("x"+arrName[k]);
					$(".g3").eq(k).find(".subtotal").html((arrName[k]*price).toFixed(2));
					$(".g3").eq(k).find(".info p").html("收件人："+arrAdd[k]);
					$(".g3").eq(k).find(".op").html(arrTime[k]);
				}
	        }
		})
	}
	//	商品4请求本地数据
	function goods4(arrName,arrAdd,arrTime){
		$.ajax({
			url:"json/pay.json",
	    	type:"get",
	    	dataType:"json",
	        success: function (data) {
	            img=data.g4[0].img;
	            product=data.g4[0].product;
	            price=data.g4[0].price;
	            var tr="<tr class='g4'>";
		         tr+="<td class='info'>"+img+product+"<p></p></td>";
		         tr+="<td class='number'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='op'></td>";
		         tr+="</tr>"
		        //添加数据
		        var trLength=$("table tbody tr");
		        if(trLength.length==0){
		        	$("table").append($(tr));
		        }
		        else{
		        	$(tr).insertBefore($("table tbody tr:eq(0)"));
		        }
		        for(var k=0;k<arrName.length;k++){
					$(".g4").eq(k).find(".number").html("x"+arrName[k]);
					$(".g4").eq(k).find(".subtotal").html((arrName[k]*price).toFixed(2));
					$(".g4").eq(k).find(".info p").html("收件人："+arrAdd[k]);
					$(".g4").eq(k).find(".op").html(arrTime[k]);
				}
	        }
		})
	}
})
