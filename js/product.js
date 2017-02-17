var app=angular.module("productApp",['ngRoute','modApp']);
app.config(['$routeProvider', function ($routeProvider) {
   	$routeProvider.when('/CET',{
        templateUrl:'product/mod.html',
        controller:'modCtrl'
   	}).when('/Guliduo',{
        templateUrl:'product/mod.html',
        controller:'modCtrl'
   	}).otherwise({
        redirectTo:'/CET'
    })
}]);


