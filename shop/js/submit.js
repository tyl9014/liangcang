$(function(){
	if(localStorage.getItem("username")){
		$(".login").html("欢迎您，" + localStorage.getItem("username"));
	}
	$("#cart").click(function(){
		if(!localStorage.getItem("token")){
			alert("请登录后才能使用购物车功能！");
			location.href = "login.html";
		}else{
			location.href = "cart.html";
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
	$("#addNew").click(function(){
		$("#add").show();
	})
	$("#btn1").click(function(){
		$("#add").hide();
	})
	var address_id = 0;
	addressAjax();
	function addressAjax(){
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token,
			"type": "GET",
			"dataType": "json",
			"success": function(response){
				if(response.data.length > 8){
					alert("最多添加8个收货地址，请删除不需要的地址或再添加新地址！");
					return;
				}
//				console.log(response);
				var htmlData = '';
				for(var i=0;i<response.data.length;i++){
					var obj = response.data[i];
					htmlData+='<li class="address-item" data-id="' +obj.address_id+ '"><h4>'
					+obj.address_name 
					+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
					+obj.mobile 
					+'</h4><p>'
					+obj.province + '省'
					+obj.city +'市'
					+obj.district 
					+obj.address
					+'</p><span class="remove">删除地址</span></li>';
				}
				$(".addList").html(htmlData);
				$(".address-item").click(function(event){
					$(this).addClass("active").siblings().removeClass("active");
					if(event.target){
						address_id = this.getAttribute('data-id');
//						console.log(address_id);
					}
				})
				$(".remove").click(function(){
//					console.log(this.parentNode);
					var removeLi = this.parentNode;
					removeLi.parentNode.removeChild(removeLi);
					removeAjax(removeLi);
				})
				if(response.data.length > 0){
					$(".addressList").show();
				}
				if(response.data.length > 4 && response.data.length <= 9){
					$("#right").click(function(){
						if($(".addList").is(":animated")) return;
						$(".addList").animate({"left": -1110},1000);
					})
				}
				$("#left").click(function(){
					if($(".addList").is(":animated")) return;
					$(".addList").animate({"left": 0},1000);
				})
			}
		})
	}
	$("#btn").click(function(){
		var data = $("form").serialize();
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=add",
			"type": "POST",
			"dataType": "json",
			"data": data,
			"success": function(response){
				if(response.code === 0){
//					console.log(response);
					$("#add").hide();
					addressAjax();
				}
			}
		});
	})
	function removeAjax(obj){
//		console.log( $(obj).attr("data-id") );
		var address_id = $(obj).attr("data-id");
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.token + "&status=delete&address_id="+address_id,
			"type": "GET",
			"dataType": "json",
			"success": function(response){
//				console.log(response);
			}
		})
	}
	var str = location.search.substr(1);
	var sum = str.split("=");
	$("#totalPay").text("￥ " + sum[1] + ".00");
	$(".pay").click(function(){
		if( address_id === 0){
			alert("亲，请先选择收货地址哦~");
			return;
		}
		$.ajax({
			"url": "http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add",
			"type": "POST",
			"dataType": "json",
			"data": {
				"address_id": address_id,
				"total_prices": sum[1]  
			},
			"success": function(response){
//				console.log(response);
				if(response.code === 0){
					alert("提交订单成功~");
					location.href = "order.html";
				}
			}
		})
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