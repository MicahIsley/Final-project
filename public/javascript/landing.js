$("#signIn").click(function(){
	$("#buttons").hide();
	$("#loginForm").show();
});

$("#signUp").click(function(){
	$("#buttons").hide();
	$("#registerForm").show();
});

$("#closeLoginButton").click(function(){
	$("#loginForm").hide();
	$("#buttons").show();
});

$("#closeRegisterButton").click(function(){
	$("#registerForm").hide();
	$("#buttons").show();
});