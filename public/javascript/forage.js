var randomItemsArray = ["apple", "carrot", "cupcake", "steak", "rock", "empty", "spider"];
var guessesLeft = 4;
var foundItemArray = [];
var apple;
var carrot;
var cupcake;
var steak;
var username = "test";
var currentQuantity;

$(".itemBush").click(function(){
	if(guessesLeft > 0){
		var thisBush = $(this).attr("id");
		$("#" + thisBush).hide();
		$("#item" + thisBush).show();
		var foundItem = $("#item" + thisBush).text();
		foundItemArray.push(foundItem);
		guessesLeft -= 1;
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
		$("#item" + i).text(randomItem);
	}
}

function displayForageResults(){
	for(i=0; i < foundItemArray.length; i++){
		var li = $("<li>");
		li.append(foundItemArray[i]);
		$("#foundItemList").append(li);
		switch (foundItemArray[i]) {
			case "apple":
				currentQuantity = apple;
				break;
			case "carrot":
				currentQuantity = carrot;
				break;
			case "cupcake":
				currentQuantity = cupcake;
				break;
			case "steak":
				currentQuantity = steak;
				break;
		}
		if(foundItemArray[i] === "apple" || "carrot" || "cupcake" || "steak"){
			var changeQuantity = {
			username: "test",
			item: foundItemArray[i],
			quantity: currentQuantity + 1}
			$.ajax({
				method: "PUT",
				url: "/api/test/" + foundItemArray[0],
				data: changeQuantity
			})
			.done(function() {
			});
		}else{}
	}
}

function getItemQuantity(){
	$.get("api/" + username + "/items", function(data) {
		apple = data[0].quantity;
		carrot = data[1].quantity;
		cupcake = data[2].quantity;
		steak = data[3].quantity;
	}).done(function(){
		console.log(apple, carrot, cupcake, steak);
	});
}

randomizeItems();
getItemQuantity();