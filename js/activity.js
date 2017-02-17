$(function(){
//	初始化显示时间
	var flag=0;
	var count=0;
	var json=[];
	var date=new Date();
	var actTime=JSON.parse(window.localStorage.getItem("activity"));
	if(actTime==null){
		window.location=location;
	}
	var nowTime=date.getTime();
	var oldTime=window.localStorage.getItem("closeTime");
//	计算关闭回话后过去的时间
	var passTime=nowTime-oldTime;
	$(".items").each(function(index,ele){
		if(actTime==null){
			var arr=[];
			arr.push($(ele).find("p span").html());
			json.push(arr);
			window.localStorage.setItem("activity",JSON.stringify(json));
		}else{
			$(ele).find("p span").html(actTime[index]);
		}
		var days=$(ele).find("p span .day").html()*24*3600*1000;
		var hours=$(ele).find("p span .hour").html()*3600*1000;
		var mins=$(ele).find("p span .min").html()*60*1000;
		var secs=$(ele).find("p span .sec").html()*1000;
		var totals=days+hours+mins+secs;
		var change=totals-passTime;
		var newday=Math.floor(change/(24*3600*1000));
		var leave1=change%(24*3600*1000);    //计算天数后剩余的毫秒数
		var newhour=Math.floor(leave1/(3600*1000));
		var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
		var newmin=Math.floor(leave2/(60*1000));
		var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
		var newsec=Math.round(leave3/1000);
		$(ele).find(".day").html(newday);
		$(ele).find(".hour").html(newhour);
		$(ele).find(".min").html(newmin);
		$(ele).find(".sec").html(newsec);
	})
//	时间倒计时
	timer=setInterval(function(){
		$(".items").each(function(index,ele){
			var day=$(ele).find(".day").html()*24*3600*1000;
			var hour=$(ele).find(".hour").html()*3600*1000;
			var min=$(ele).find(".min").html()*60*1000;
			var sec=$(ele).find(".sec").html()*1000;
//			记录未改变的时间
			var arr=[];
			arr.push($(ele).find("p span").html());
			json.push(arr);
			window.localStorage.setItem("activity",JSON.stringify(json));
			
			var total=day+hour+min+sec;
			total-=1000;
			var changeday=Math.floor(total/(24*3600*1000));
			var leave1=total%(24*3600*1000);    //计算天数后剩余的毫秒数
			var changehour=Math.floor(leave1/(3600*1000));
			var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
			var changemin=Math.floor(leave2/(60*1000));
			var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
			var changesec=Math.round(leave3/1000);
			$(ele).find(".day").html(changeday);
			$(ele).find(".hour").html(changehour);
			$(ele).find(".min").html(changemin);
			$(ele).find(".sec").html(changesec);
			if(day==0&&hour==0&&min==0&&sec==0){
				flag++;
				$(ele).find("p").html("距活动结束:已经结束")
			}
			if(flag==4){
				clearInterval(timer);
			}
		})
	},1000);
//	记录关闭页面时间
	$(window).on("unload",function(){
		closeTime=date.getTime();	
		window.localStorage.setItem("closeTime",closeTime);
	})
	
})
