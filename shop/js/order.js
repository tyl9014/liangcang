$(function(){
	if(localStorage.getItem("username")){
		$(".login").html("欢迎您，" + localStorage.getItem("username"));
	}
	$("#cart").click(function(){
		location.href = "cart.html";
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
	$.get("http://h6.duchengjiu.top/shop/api_cat.php",function(data){
		var obj = data;
		for(var i = 0;i < obj.data.length;i++){
			$(".goodsMajor").append("<li><a href='list.html?cat_id=" + obj.data[i].cat_id + "'>" + obj.data[i].cat_name + "</a></li>")
		}
	})
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
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
		"type": "GET",
		"dataType": "json",
		"success": function(response){
//			console.log(response);
			if(response.code === 0){
				var htmlData = '';
				for(var i=0;i<response.data.length;i++){
						var obj = response.data[i];
//						console.log(obj);
						htmlData += '<div class="order-item">';
						htmlData += '<div class="order-item-header">订单号：' +obj.order_id+ '</div>';
						for(var j=0;j<obj.goods_list.length;j++){
							var goods = obj.goods_list[j];
							goods.subtotal = goods.goods_price * goods.goods_number;
							htmlData += `<div class="goods">
											<div class="goods-box">
												<img src="${goods.goods_thumb}" alt="" />
												<p>${goods.goods_name}</p>
											</div>
											<div class="goods-lists">
												<input type="text" class="center-text" value="x${goods.goods_number}"/>
											</div>
											<div class="goods-one">${goods.goods_price}</div>
											<div class="goods-sum">${goods.subtotal}</div>
										</div>`;
						}
						htmlData += '</div>';
				}
				$("#goodsBox").html(htmlData);
			}
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