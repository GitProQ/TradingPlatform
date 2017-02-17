
//版本2   只能请求4个商品  并对4个商品的价格进行计算、判断
$(function(){
	//	购物车信息
    var g1=window.localStorage.getItem("g1");
    var g2=window.localStorage.getItem("g2");
    var g3=window.localStorage.getItem("g3");
    var g4=window.localStorage.getItem("g4");
    //商品1
    if(g1!=undefined){
    	//请求商品信息
        $.ajax({
        	url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
                img=data.g1[0].img;
                product=data.g1[0].product+data.g1[0].info;
                price=data.g1[0].price;
                remain1=parseInt(data.g1[0].remain);
                var tr="<tr class='g1'>";
		         tr+="<td class='info'><input class='check' type='checkbox' />"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'><input type='button' class='reduce' value='-'><input type='text' class='num' value='1'><input type='button' class='add' value='+'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='delete'><button class='del'>删除</button></td>";
		         tr+="</tr>"
		        //添加数据
		        $("table").append($(tr));
		        info($(".g1"),"g1");
            }
       });
    }
    //商品2
    if(g2!=undefined){
    	//请求商品信息
        $.ajax({
        	url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
           	    img=data.g2[0].img;
                product=data.g2[0].product+data.g2[0].info;
                price=data.g2[0].price;
                remain2=parseInt(data.g2[0].remain);	
                var tr="<tr class='g2'>";
		         tr+="<td class='info'><input class='check' type='checkbox' />"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'><input type='button' class='reduce' value='-'><input type='text' class='num' value=1><input type='button' class='add' value='+'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='delete'><button class='del'>删除</button></td>";
		         tr+="</tr>"
		        $("table").append($(tr));
		        info($(".g2"),"g2");
            }
       });
    }
    //商品3
    if(g3!=undefined){
    	//请求商品信息
        $.ajax({
        	url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
           	    img=data.g3[0].img;
                product=data.g3[0].product+data.g3[0].info;
                price=data.g3[0].price;
                remain3=parseInt(data.g3[0].remain);	
                var tr="<tr class='g3'>";
		         tr+="<td class='info'><input class='check' type='checkbox' />"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'><input type='button' class='reduce' value='-'><input type='text' class='num' value=1><input type='button' class='add' value='+'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='delete'><button class='del'>删除</button></td>";
		         tr+="</tr>"
		        $("table").append($(tr));
		        info($(".g3"),"g3");
            }
       });
    }
    //商品4
    if(g4!=undefined){
    	//请求商品信息
        $.ajax({
        	url:"json/pay.json",
        	type:"get",
        	dataType:"json",
            success: function (data) {
           	    img=data.g4[0].img;
                product=data.g4[0].product+data.g4[0].info;
                price=data.g4[0].price;
                remain4=parseInt(data.g4[0].remain);	
                var tr="<tr class='g4'>";
		         tr+="<td class='info'><input class='check' type='checkbox' />"+img+product+"</td>";
		         tr+="<td class='price'>"+price+"</td>";
		         tr+="<td class='number'><input type='button' class='reduce' value='-'><input type='text' class='num' value=1><input type='button' class='add' value='+'></td>";
		         tr+="<td class='subtotal'></td>";
		         tr+="<td class='delete'><button class='del'>删除</button></td>";
		         tr+="</tr>"
		        $("table").append($(tr));
		        info($(".g4"),"g4");
            }
       });
    }
    //公共方法  增减改
    function info(obj,val){
        obj.find(".num").val(window.localStorage.getItem(val));
        var sum=parseFloat(price)*parseFloat(obj.find(".num").val());
        obj.find("td").eq(3).html(sum.toFixed(2));
        //删除 按钮所在行
        obj.find("td").on("click",".del",function(){
            window.localStorage.removeItem(val);
            obj.remove();
            var count=window.localStorage.getItem("count");
            count--;
            $("#cartNum").html(count);
            if(count==0){
            	$("#all").prop("checked",false);
            	$(".tips .sum").html("0.00");
            }
            window.localStorage.setItem("count",count);
            var oldNew=window.localStorage.getItem("count");
			//全选商品时
			if($("#all").prop("checked")==true){
            	allChange();
            }
			//部分选择时
			else{
				partChange();
			}
        })
        //数量减
        obj.find(".reduce").on("click",function(){
            var i=window.localStorage.getItem(val);
            i--;
            if(i<1){
                i=1;
            }
            obj.find(".num").prop("value",i);
            window.localStorage.setItem(val,i);
            sum=parseFloat(obj.find(".price").html())*parseFloat(obj.find(".num").val());
            obj.find("td").eq(3).html(sum.toFixed(2));
            //全选商品时
			if($("#all").prop("checked")==true){
            	allChange();
            }
			//部分选择时
			else{
				partChange();
			}
        })
        //数量加
        obj.find(".add").on("click",function(){
            var i=window.localStorage.getItem(val);
            i++;
            if(obj.selector==".g1"){
            	if(i>remain1){
	                i=remain1;
	            }
            }
            if(obj.selector==".g2"){
            	if(i>remain2){
	                i=remain2;
	            }
            }
            if(obj.selector==".g3"){
            	if(i>remain3){
	                i=remain3;
	            }
            }
            if(obj.selector==".g4"){
            	if(i>remain4){
	                i=remain4;
	            }
            }
            obj.find(".num").prop("value",i);
            window.localStorage.setItem(val,i);
            sum=parseFloat(obj.find(".price").html())*parseFloat(obj.find(".num").val());
            obj.find("td").eq(3).html(sum.toFixed(2));
            //全选商品时
			if($("#all").prop("checked")==true){
            	allChange();
            }
			//部分选择时
			else{
				partChange();
			}
        })
        //数量的值改变
        obj.find(".num").on("change",function(){
        	var i=parseInt(obj.find(".num").val());
            if(obj.selector==".g1"){
            	if(i>remain1){
	                i=remain1;
	            }
            }
            if(obj.selector==".g2"){
            	if(i>remain2){
	                i=remain2;
	            }
            }
            if(obj.selector==".g3"){
            	if(i>remain3){
	                i=remain3;
	            }
            }
            if(obj.selector==".g4"){
            	if(i>remain4){
	                i=remain4;
	            }
            }
            if(i<1){
            	i=1;
            }
            if(isNaN(i)){
            	i=1;
            }
            obj.find(".num").prop("value",i);
            var i=Number($(this).val());
            window.localStorage.setItem(val,i);
            sum=parseFloat(obj.find(".price").html())*parseFloat(obj.find(".num").val());
            obj.find("td").eq(3).html(sum.toFixed(2));
            //全选商品时
			if($("#all").prop("checked")==true){
            	allChange();
            }
			//部分选择时
			else{
				partChange();
			}
        })
        //选择物品 总金额才会变
        obj.find(".check").on("click",function(){
            if($(this).prop("checked")==true){
                oldSum=Number($(".tips .sum").html());
                newSum=oldSum+Number(sum.toFixed(2));
                $(".tips .sum").html(newSum.toFixed(2));
            }
            else{
                oldSum=Number($(".tips .sum").html());
                newSum=oldSum-Number(sum.toFixed(2));
                $(".tips .sum").html(newSum.toFixed(2));
            }
        }) 
        //没选完 取消全选 
        $(".check").on("click",function(){
        	var allLength=$(".check").length;
        	var checkLength=$(".check:checked").length;
	    	if(allLength==checkLength){
	    		$("#all").prop("checked",true);
	    		allChange();
	    	}
	    	else{
	    		$("#all").prop("checked",false);
	    		partChange();
	    	}
    	})
    }
    //全选 反选
    $("#all").on("click",function(){
        if($(this).prop("checked")==true){
            $(".check").prop("checked",true);
            	allChange();
        }
        else{
            $(".check").prop("checked",false);
            $(".tips .sum").html("0.00");
             $(".tips .num i").html(0);
        }
    })
    //  公共方法更新总金额 全选时
    function allChange(){
    	var num1=$(".g1 .subtotal").html();
        var num2=$(".g2 .subtotal").html();
        var num3=$(".g3 .subtotal").html();
        var num4=$(".g4 .subtotal").html();
        if(num1==undefined){
        	num1=0;
        }else{
        	num1=Number($(".g1 .subtotal").html());
        }
        if(num2==undefined){
        	num2=0;
        }else{
        	num2=Number($(".g2 .subtotal").html());
        }
        if(num3==undefined){
        	num3=0;
        }else{
        	num3=Number($(".g3 .subtotal").html());
        }
        if(num4==undefined){
        	num4=0;
        }else{
        	num4=Number($(".g4 .subtotal").html());
        }
        var result=num1+num2+num3+num4;
        $(".tips .sum").html(Number(result).toFixed(2));
        var g1=window.localStorage.getItem("g1");
	    var g2=window.localStorage.getItem("g2");
	    var g3=window.localStorage.getItem("g3");
	    var g4=window.localStorage.getItem("g4");
        $(".tips .num i").html((g1-0)+(g2-0)+(g3-0)+(g4-0));
    }
	//  公共方法更新总金额 部分选择时
    function partChange(){
    	var result = 0;
    	var number=0;
   		var chc=$(".check:checked");
   		for(var i=0;i<chc.length;i++){
   			result +=Number($(chc[i]).parent().parent().find(".subtotal").html());
   			number +=Number($(chc[i]).parent().parent().find(".num").val());
   		}
		$(".tips .sum").html(result.toFixed(2));
		$(".tips .num i").html(number);
    }
    //结 算
    $(".pay").on("click",function(){
    	var chc=$(".check:checked");
    	var login=window.localStorage.getItem("success");
    	if(login==undefined){
    		alert("登录后,才能结算支付哦");
			window.location.href="login.html";
    	}else{
    		if(chc.length==0){
	    		alert("请选择需要购买的商品")
	    	}else{
	    		var arr=[];
		        for(var i=0;i<chc.length;i++){
		            arr.push($(chc[i]).parent().parent().attr("class"))
		        }
		        var obj={};
		        for(var j=0;j<arr.length+1;j++){
		            obj[j]=arr[j];
		        }
		        var obj = JSON.stringify(obj);
		        window.localStorage.setItem("buy",obj);
		        window.location.href="pay.html";
	    	}
    	}
    })
})