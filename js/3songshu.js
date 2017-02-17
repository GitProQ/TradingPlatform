/* 
* @Author: Marte
* @Date:   2016-10-08 18:40:42
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-09 20:07:06
*/

$(function(){
    // 款式选择
    $(".info ul li").eq(0).on("click",function(){
        $(".info span").eq(0).html("￥48.90");
        $(".info del").html("原价￥58.00");
    })
    $(".info ul li").eq(1).on("click",function(){
        $(".info span").eq(0).html("￥39.60");
        $(".info del").html("原价￥47.00");
    })
})