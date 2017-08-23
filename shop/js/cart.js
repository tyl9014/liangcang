$(function(){
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
		"url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
		"type": "get",
		"dataType": "json",
		"success": function(response){
			console.log(response);
			if(response.data.length > 0 ){
				for(var i=0;i<response.data.length;i++){
					var obj = response.data[i];
					var html = `<div class="goods">
									<div class="goods-box">
										<input type="checkbox" class="chkbox" />
										<input type="hidden" class="goods_id" value=" ${ obj.goods_id } "/>
										<img src=" ${ obj.goods_thumb } " alt="" />
										<p> ${ obj.goods_name } </p>
									</div>
									<div class="goods-lists">
										<span class="left-button">-</span>
										<input type="text" class="center-text" value="${ obj.goods_number }"/>
										<span class="right-button">+</span>
									</div>
									<div class="goods-one">${ obj.goods_price }</div>
									<div class="goods-sum">${ obj.goods_price * obj.goods_number }</div>
									<div class="goods-op">
										<span>删除</span>
									</div>
								</div>`;
					$("#goodsBox").html( $("#goodsBox").html()  +html  );
				}
			}
			$(".goods-op").click(function(){
				alert("确定");
				var goods = this.parentNode;
				$(goods).remove();
			})
			$(".left-button").click(function(){
				var goodsNum = this.nextSibling.nextSibling.value;
				var goodsPrice = this.parentNode.nextSibling.nextSibling.innerText;
				goodsNum--;
				if(goodsNum < 0) goodsNum = 0;
				this.nextSibling.nextSibling.value = goodsNum;
				var totalGoodsPrice = this.nextSibling.nextSibling.value * goodsPrice;
				var total = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
//				console.log(goodsNum,goodsPrice,totalGoodsPrice,total);
				total.innerText = totalGoodsPrice;
			})
			$(".right-button").click(function(){
				var goodsNum = this.previousSibling.previousSibling.value;
				var goodsPrice = this.parentNode.nextSibling.nextSibling.innerText;
				goodsNum++;
				if(goodsNum > 10) goodsNum = 10;
				this.previousSibling.previousSibling.value = goodsNum;
				var totalGoodsPrice = this.previousSibling.previousSibling.value * goodsPrice;
				var total = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
//				console.log(goodsNum,goodsPrice,totalGoodsPrice,total);
				total.innerText = totalGoodsPrice;
			})
		}
	})
	$(".shop").click(function(event){
		var sum = 0;
		if(event.target.id === "selectAll"){
			var selected = event.target.checked;
			var checkboxs = document.getElementsByClassName("chkbox");
			console.log(1);
			for(var i=0;i<checkboxs.length;i++){
				checkboxs[i].checked = selected;
				var totalGoodsPrice = checkboxs[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
				if($("#selectAll").is(":checked")){
					sum += parseInt(totalGoodsPrice);
				}
			}
			$("#sumMoney").text("￥" + sum);
			return;
		}
		if(event.target.type === "checkbox"){
			var checkboxs = document.getElementsByClassName("chkbox");
			console.log(2);
			for(var i=0;i<checkboxs.length;i++){
				var objGoods = checkboxs[i];
				if($(objGoods).is(':checked')){
					var totalGoodsPrice = checkboxs[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
					sum += parseInt(totalGoodsPrice);
				}
			}
			$("#sumMoney").text("￥" + sum);
		}
	})
})