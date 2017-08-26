$(function(){
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
		var obj = data;
		for(var i = 0;i < obj.data.length;i++){
			$(".goodsMajor").append("<li><a href='list.html?cat_id=" + obj.data[i].cat_id + "'>" + obj.data[i].cat_name + "</a></li>")
		}
	})
	var index = 0;
	var $aLis1 = $("#autoPlay li");
	$("#autoPlay").append($aLis1.eq(0).clone());
	function rightBtnHandler(){
		if($("#autoPlay").is(":animated")) return;
		index++;
		$("#autoPlay").animate({"left": -1000*index},500,function(){
			if(index > $aLis1.length-1){
				index = 0;
				$("#autoPlay").css("left",0);
			}
		});
		changeCircle();
	}
	function changeCircle(){
		var n = index < $aLis1.length ? index : 0;
		$(".circles ul li").eq(n).addClass("cur").siblings().removeClass("cur");
	}
	var timer = setInterval(rightBtnHandler,2000);
	$("#btnRight").click(rightBtnHandler);
	$("#btnLeft").click(function(){
		if($("#autoPlay").is(":animated")) return;
		index--;
		if(index < 0){
			index = $aLis1.length-1;
			$("#autoPlay").css("left",-1000*index);
		}
		$("#autoPlay").animate({"left": -1000*index},500);
		changeCircle();
	});
	$(".circles ul li").click(function(){
		index = $(this).index();
		$("#autoPlay").animate({"left": -1000*index},1500);
		changeCircle();
	})
	$(".showPic").mouseenter(function(){
		clearInterval(timer);
	})
	$(".showPic").mouseleave(function(){
		timer = setInterval(rightBtnHandler,2000);
	})
	if(localStorage.getItem("username")){
		$(".login").html("欢迎您，" + localStorage.getItem("username"));
	}
	$(window).mousewheel(function(event){
		if($("header").is(":animated")) return;
		if(event.deltaY < 0){
			$("header").animate({"top" : -56},500);
		}else{
			$("header").animate({"top" : 0},500);
		}
	})
	$("#logo").mouseenter(function(){
		$(this).animate({"opacity":0.8},500);
	});
	$("#logo").mouseleave(function(){
		$(this).animate({"opacity":1},500);
	});
	$(".cur").mouseenter(function(){
		$(this).css({"color":"#ccc"});
	});
	$(".cur").mouseleave(function(){
		$(this).css({"color":"#666"});
	});
	$("em:eq(0)").css({"margin-left":16});
	var isMove = 1;
	$("#magnifier").click(function(){
		if($(".moveSerach").is(":animated")) return;
		isMove++;
		if(isMove%2==0){
			$(".moveSerach").animate({"left" : 960},1000);
		}else{
			if($("#serachText").val() != ""){
				$(".moveSerach").animate({"left" : 1210},1000);
				var search = $("#serachText").val();
				window.location.href = "detail.html?search_text=" + search;
			}else{
				$(".moveSerach").animate({"left" : 1210},1000);
			}
		}
	})
	//商品分类数据
	var str = location.search.substr(1);
	var catId = str.split("=");
	$.ajax({
		"type": "get",
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"data": {
			"cat_id": catId[1]
		},
		"success": function(response){
			var obj = response;
			for(var i = 0;i < obj.data.length;i++){
				$("#classificList").append("<li><a href='detail.html?goods_id="
			+ obj.data[i].goods_id
			+ "'><img src='"
			+ obj.data[i].goods_thumb
			+ "' /><div class='cover'><h2>￥"
			+ obj.data[i].price+"</h2><p>"
			+ obj.data[i].goods_name+"</p><span>"
			+ obj.data[i].goods_desc+"</span></div></a></li>")
			}
		}
	});
	$("#cart").click(function(){
		if(!localStorage.getItem("token")){
			alert("请登录后才能使用购物车功能！");
			location.href = "login.html";
		}else{
			location.href = "cart.html";
		}
	})
	$("#point").mouseenter(function(){
		if($(this).is(":animated")) return;
		$(this).animate({"left": 635},350);
		$(this).animate({"left": 650},350);
		$(this).animate({"left": 635},350);
		$(this).animate({"left": 650},350);
	})
	$(".phone").mouseenter(function(){
//		if($(".phone span").is(":animated")) return; 
//		if($(".phone p").is(":animated")) return; 
		$(".phoneQr").css({"display": "block"});
		$(".phone span").animate({"opacity": 1},300);
		$(".phone p").animate({"opacity": 1},300);
	})
	$(".phone").mouseleave(function(){
//		if($(".phone span").is(":animated")) return; 
//		if($(".phone p").is(":animated")) return; 
		$(".phoneQr").css({"display": "none"});
		$(".phone span").animate({"opacity": 0.3},300);
		$(".phone p").animate({"opacity": 0.3},300);
	})
	$(".friendly p a").mouseenter(function(){
//		if($(this).is(":animated")) return; 
		$(this).animate({"opacity": 1},300);
	})
	$(".friendly p a").mouseleave(function(){
//		if($(this).is(":animated")) return; 
		$(this).animate({"opacity": 0.3},300);
	})
	$(".wechat").mouseenter(function(){
		$(".wechatQr").css({"display": "block"});
	})
	$(".wechat").mouseleave(function(){
		$(".wechatQr").css({"display": "none"});
	})
})
