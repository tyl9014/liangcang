$(function(){
	if(localStorage.getItem("username")){
		$(".login").html("欢迎您，" + localStorage.getItem("username"));
	}
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
		var obj = data;
		for(var i = 0;i < obj.data.length;i++){
			$(".goodsMajor").append("<li><a href='list.html?cat_id=" + obj.data[i].cat_id + "'>" + obj.data[i].cat_name + "</a></li>")
		}
	})
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
				$.ajax({
					"type":"get",
					"url":"http://h6.duchengjiu.top/shop/api_goods.php",
					"data":{
						"search_text": search
					},
					"dataType": "json",
					"success": function(response){
						console.log(search);
						$(".left").html("<img src='" + response.data[0].goods_thumb + "' />");
						$(".right .disc").html("<p>"+ response.data[0].goods_name+"</p><span>" + response.data[0].goods_desc+"</span><h2>￥"+ response.data[0].price+"</h2>");
					}
				});
			}else{
				$(".moveSerach").animate({"left" : 1210},1000);
			}
		}
	})
	var str = location.search.substr(1);
	var goodsId = str.split("=");
	var searchText = decodeURI(goodsId[1]);
	if(goodsId[0]==="search_text"){
		$.ajax({
			"type":"get",
			"url":"http://h6.duchengjiu.top/shop/api_goods.php",
			"data":{
				"search_text": searchText
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				$(".left").html("<img src='" + response.data[0].goods_thumb + "' />");
				$(".right .disc").html("<p>"+ response.data[0].goods_name+"</p><span>" + response.data[0].goods_desc+"</span><h2>￥"+ response.data[0].price+"</h2>");
			}
		});
	}else{
		$.ajax({
			"type":"get",
			"url":"http://h6.duchengjiu.top/shop/api_goods.php",
			"data":{
				"goods_id": searchText
			},
			"dataType": "json",
			"success": function(response){
				console.log(searchText);
				$(".left").html("<img src='" + response.data[0].goods_thumb + "' />");
				$(".right .disc").html("<p>"+ response.data[0].goods_name+"</p><span>" + response.data[0].goods_desc+"</span><h2>￥"+ response.data[0].price+"</h2>");
			}
		});
	}
	$("#btn2").click(function(){
		if(!localStorage.getItem("token")){
			alert("请登录后才能使用购物车功能！");
			location.href = "login.html#callback=" + location.href;
			return;
		}
		console.log(goodsId[1]);
		var goods_number = localStorage.getItem("cart"+goodsId[1]);
		goods_number = goods_number ? parseInt(goods_number)+1 : 1;
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
			"type": "POST",
			"data": {
				"goods_id": goodsId[1],
				"number": goods_number
			},
			"dataType": "json",
			"success": function(response){
				localStorage.setItem("cart"+goodsId[1],goods_number);
			}
		})
	})
	$("#cart").click(function(){
		location.href = "cart.html";
	})
})