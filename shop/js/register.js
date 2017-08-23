$(function(){
	$("input[name='username']").blur(function(){
		var username = $(this).val();
		$.ajax({
			"type":"post",
			"url":"http://h6.duchengjiu.top/shop/api_user.php",
			"data":{
				"status": "check",
				"username": username
			},
			"dataType": "json",
			"success": function(response){
						if(response.code === 0){
							$(".success").show();
							$(".error").hide();
						}else if(response.code === 2001){
							$(".success").hide();
							$(".error").show();
						}
					}
		});
	})
	$("input[name='passwordConfirm']").blur(function(){
		var passwordConfirm = $(this).val();
		var password = $("input[name='password']").val();
		if( password.length < 6 || password.length > 20){
			alert("密码长度应该是6-20位之内！");
			return;
		}
		if(passwordConfirm === password){
			$(".success1").show();
			$(".error1").hide();
		}else{
			$(".success1").hide();
			$(".error1").show();
		}
	})
	$("#btn").click(function(){
		
		var password = $("input[name='password']").val();
		var username = $("input[name='username']").val();
		$.ajax({
			"type": "POST",
			"url": "http://h6.duchengjiu.top/shop/api_user.php",
			"data": {
				"status": "register",
				
				"username": username,
				"password": password
			},
			"dataType": "json",
			"success": function(response){
				if(response.code === 0){
					alert("注册成功");
					window.location.href = "login.html";
				}
			}
		});
	})
})