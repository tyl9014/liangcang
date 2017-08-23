$(function(){
	$("#btn").click(function(){
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "login",
				"username": username,
				"password": password
			},
			"dataType": "json",
			"success": function(response){
				console.log(response);
				if(response.code === 0){
					var data = response.data;
					for(key in data){
						if(data.hasOwnProperty(key)){
							localStorage.setItem(key,data[key]);
						}
					}
					var callBackUrl = location.hash.substr(10);
					if(callBackUrl){
						location.href = callBackUrl;
					}else{
						location.href = "index.html";
					}
				}else if(response.code === 2002){
					alert("账号不存在");
				}else if(response.code === 1001){
					alert("密码错误");
				}
			}
		});
	})
})
