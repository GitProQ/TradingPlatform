var app=angular.module("marketApp",[]);
app.controller('marketCtrl',['$scope','$http',function($scope,$http){
	$http.get(
		'/TradingPlatform/json/market.json'
	).success(function(response){
		$scope.data=response;	
	});
	$scope.load = function() {  
        $('body').append("<script src='js/echo.min.js'></script>");
		$('body').append("<script>Echo.init({offset: 0,throttle: 1500})</script>");  
    }  
    banner();
    initProduct();
}]);
app.config([
    '$compileProvider',
    function($compileProvider)
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    }
]);
function banner(){
    //实现滑动功能
    var isMove = false;
    var startX = 0;
    var moveX = 0;
    var distanceX=0;
    $(".carousel-inner").on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on("touchmove", function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        isMove = true;
    }).on("touchend", function (e) {
        distanceX = moveX - startX;
        if(Math.abs(distanceX)>50&&isMove){
            if(distanceX<0){
                //下一张
                $('#carousel-example-generic').carousel('next');
                $('#carousel-example-generic1').carousel('next');
            }else if(distanceX>0){
                //上一张
                $('#carousel-example-generic').carousel('prev');
                $('#carousel-example-generic1').carousel('prev');
            }
        }
    })
}
function initProduct(){
	var $parent=$(".wjs_product_tabs_parent");
	var $ul = $parent.find("ul");
    var $lis = $ul.find("li");
    var sum = 0;
    $lis.each(function(index,item){
    	sum+=$(item).innerWidth();
    })
    $ul.width(sum);
    wjs.iScroll({
        swipeDom:$parent[0],//父容器的DOM元素
        swipeType:"x",//活动的方向
        swipeDistance:20//缓冲距离
    });
}
