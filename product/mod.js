var app=angular.module('modApp',[]);
app.controller('modCtrl',['$scope','$http','$location',function($scope,$http,$location){
	$http.get(
		'/TradingPlatform/product/mod.json'
	).success(function(response){
		$scope.loca = $location;
		$scope.$watch('loca.url()', function (newValue,oldValue) {
			if(newValue=='/CET'){
				$scope.data=response.CET;
				$("title").html("校园物品交易平台—星火英语 书籍");
			  	$(".num").on("change",function(){
			  		if($(".num").val()>=86){
				    	$(".add").attr("disabled",true);
				    	$(".num").val(86);
				    }
			  	})
			  	$(".add").on("click",function(){
			  		if($(".num").val()>=86){
				    	$(".add").attr("disabled",true);
				    	$(".num").val(86);
				    }
			  	})
			}else if(newValue=='/Guliduo'){
				$scope.data=response.Guliduo;
				$("title").html("校园物品交易平台—校园超市 牛奶");
				$(".num").on("change",function(){
			  		if($(".num").val()>=56){
				    	$(".add").attr("disabled",true);
				    	$(".num").val(56);
				    }
			  	})
			  	$(".add").on("click",function(){
			  		if($(".num").val()>=56){
				    	$(".add").attr("disabled",true);
				    	$(".num").val(56);
				    }
			  	})
			}
			else{
				$scope.data=response.CET;
			}
		})
	});
}]);