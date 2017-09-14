var randomItemsArray = ["apple", "carrot", "cupcake", "steak", "rock", "empty", "spider"];
var guessesLeft = 4;
var foundItemArray = [];
var apples;
var carrots;
var cupcakes;
var steaks;
var currentUsername;
var currentQuantity;


$(".itemBush").click(function(){
	if(guessesLeft > 0){
		var thisBush = $(this).attr("id");
		$("#" + thisBush).hide();
		$("#item" + thisBush).show();
		var foundItem = $("#item" + thisBush).children().attr("class");
		foundItemArray.push(foundItem);
		switch (foundItem) {
			case "apple":
				apples ++;
				break;
			case "carrot":
				carrots ++;
				break;
			case "cupcake":
				cupcakes ++;
				break;
			case "steak":
				steaks ++;
				break;
		}
		console.log(apples, carrots, cupcakes, steaks);
		guessesLeft -= 1;
		displayNumberGuesses();
		if(guessesLeft === 0){
			setTimeout(function(){
				$("#forageArea").hide();
				$("#forageConclusion").show();
				displayForageResults();
			}, 1000);
		}else{}
	}else{}
});

function randomizeItems() {
	for(i=1; i < 13; i++){
		var randomNumber = Math.floor(Math.random() * 7);
		var randomItem = randomItemsArray[randomNumber];
		$("#item" + i).append("<img src='images/food/" + randomItem + ".png' class='" + randomItem + "'>");
	}
}

function displayForageResults(){
	for(i=0; i < foundItemArray.length; i++){
		var li = $("<li>");
		li.append(foundItemArray[i]);
		$("#foundItemList").append(li);
		var changeQuantity = {
		username: currentUsername,
		apples: apples,
		carrots: carrots,
		cupcakes: cupcakes,
		steaks: steaks}
		$.ajax({
			method: "PUT",
			url: "/api/updateItems/" + currentUsername,
			data: changeQuantity
		})
		.done(function() {
			console.log("items updated");
		});
	};
};

function getItemQuantity(){
	$.get("api/" + currentUsername + "/items", function(data) {
		apples = data[0].apples;
		carrots = data[0].carrots;
		cupcakes = data[0].cupcakes;
		steaks = data[0].steaks;
	}).done(function(){
		console.log(apples, carrots, cupcakes, steaks);
	});
}

function displayNumberGuesses() {
	$("#numberRemaining").text(guessesLeft);
}

function getUserData() {
    $.ajax('/user', {
        credentials: "include",
    })
    .then((res) => {
        currentUserId = res.user;
        getCurrentUsername();
        this.isAuthenticated = true
        if (typeof cb === 'function') {
            cb(res.json().user);
        }
    });
};

function getCurrentUsername(){
    console.log(currentUserId);
    $.get("/api/userinfo/" + currentUserId, function(data){
        console.log(data.username);
        currentUsername = data.username;
        getItemQuantity();
    });
};

displayNumberGuesses();
randomizeItems();
getUserData();