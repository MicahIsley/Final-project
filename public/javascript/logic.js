// Global Variables

//EaselJS animation variables
var canvas;
var stage;
//Dragon Animation Variables

var dragonRRotation = -.5;
var dragonLRotation = .5;

//Dino Animation Variables
var dinoBounce = 5;
var dinoWait = 0;
var dinoHeadRotation = .5;
//var dragonHead = 1;
var resourcesLoaded = 0;
var totalResources;
var images = {};
var spirit;
var currentUserId;
var currentUsername;

//Game variables
var hungryTime;
var currentTime;
var spicyDragon = new SpiritAnimal(150, 100, 100, 6, 15);
var mangoMonkey = new SpiritAnimal(120, 100, 100, 5, 15);
var cocoSeal = new SpiritAnimal(130, 100, 100, 5, 15);
var sourDino = new SpiritAnimal(130, 100, 100, 5, 15);
var normalCat = new SpiritAnimal(130, 100, 100, 5, 15);
var normalDog = new SpiritAnimal(130, 100, 100, 5, 15);
var normalBear = new SpiritAnimal(130, 100, 100, 5, 15);
var cherryWolf = new SpiritAnimal(130, 100, 100, 5, 15);
var cookieFerret = new SpiritAnimal(130, 100, 100, 5, 15);
var apple = new foodItem(50, "juicy");
var carrot = new foodItem(40, "crunchy");
var cupcake = new foodItem(80, "sweet");
var steak = new foodItem(100, "chewy");
var username = "test";
var optionMenuToggle = true;
var apples;
var carrots;
var cupcakes;
var steaks;
var animal;

moment().format();

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
        findSpiritAnimal();
    });
};

function findSpiritAnimal(){
	$.get("/api/spiritAnimal/" + currentUsername, function(data){
		//spirit = data.animal;
		spirit = "wolf";
	}).done(function(){
		init(spirit);
		$("#animalSpecies").text(spirit.toUpperCase());
		assignConstructor(spirit);
	});
};

getUserData();

// Game Logic

function assignConstructor(spirit) {
	switch (spirit) {
		case "dragon":
			animal = spicyDragon;
			break;
		case "monkey":
			animal = mangoMonkey;
			break;
		case "seal":
			animal = cocoSeal;
			break;
		case "dino":
			animal = sourDino;
			break;
		case "cat":
			animal = normalCat;
			break;
		case "dog":
			animal = normalDog;
			break;
		case "bear":
			animal = normalBear;
			break;
	}
	checkHungry(animal);
}

function checkHungry(animal) {
	if(animal.hunger > 0){
		animal.hunger -= 1;
		adjustHungerMeter();
	}else{}
	if(animal.hunger <= 100){
		$("#animalThoughtBubble").text("I'm hungry, feeed meeeee!");
	}
	setTimeout("checkHungry(animal)", 1000);
}

function checkBored() {
	if(animal.sleep > 0){
		animal.sleep -= 1;
	} else{}
	if(animal.sleep === 0){
		$("#")
	}
}

function clearThoughtBubble() {
	setTimeout(function(){
		$("#animalThoughtBubble").text(" ");
	}, 5000);
}

function adjustHungerMeter() {
	var percentage = ((animal.hunger/120) * 100);
	if(percentage < 100){
		$("#hungerMeterFill").css("width", percentage + "%");
	} else{
		$("#hungerMeterFill").css("width", "100%");
	}
	if(percentage >= 0 && percentage < 20){
		$("#hungerMeterFill").css("background", "red");
	}else if(percentage >=20 && percentage < 50){
		$("#hungerMeterFill").css("background", "yellow");
	}else{
		$("#hungerMeterFill").css("background", "green");
	}
}

// Game Buttons
$("#signIn").click(function(){
	$("#buttons").hide();
	$("#loginForm").show();
});

$("#signUp").click(function(){
	$("#buttons").hide();
	$("#registerForm").show();
});

$("#closeLoginWindow").click(function(){
	$("#buttons").show();
	$("#login").hide();
});

$("#options").click(function(){
	if(optionMenuToggle === true){
		$("#menuOptions").show()
		optionMenuToggle = false;
	}else if(optionMenuToggle === false){
		$("#menuOptions").hide();
		optionMenuToggle = true;
	}
});

$("#food").click(function(){
	renderFoodItems();
});

$(document).on("click", ".itemSlot", function(){
	var foodItemQuantity = $(this, "span").text();
	var foodItem = $(this).attr("id");
	if(animal.hunger < 100){
		switch (foodItem) {
			case "apples":
				apples -= 1;
				break;
			case "carrots":
				carrots -= 1;
				break;
			case "cupcakes":
				cupcakes -= 1;
				break;
			case "steaks":
				steaks -= 1;
				break;
		}
		console.log(foodItem);
		animal.feed(foodItem);
		console.log(animal.hunger);
		var changeQuantity = {
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
			renderFoodItems();
		});
	}else{}
});

function renderFoodItems(){
	$("#itemSlotRow").show();
	$.get("api/" + currentUsername + "/items", function(data) {
		apples = data[0].apples;
		carrots = data[0].carrots;
		cupcakes = data[0].cupcakes;
		steaks = data[0].steaks;
		$("#itemSlot0").text(apples);
		$("#itemSlot1").text(carrots);
		$("#itemSlot2").text(cupcakes);
		$("#itemSlot3").text(steaks);
	});
};

$(".hideButton").click(function(){
	var hideThis = $(this).parent().attr("id");
	$("#" + hideThis).hide();
});

// Spirit Animal constructor

function SpiritAnimal(hunger, sleep, bored, intelligence, happiness){
	this.hunger = hunger;
	this.sleep = sleep;
	this.bored = bored;
	this.intelligence = intelligence;

	this.feed = function(food){
		if(this.hunger < 100){
			switch (food) {
				case "apples":
					this.hunger += 40;
					break;
				case "carrots":
					this.hunger += 30;
					break;
				case "cupcakes":
					this.hunger += 60;
					break;
				case "steaks":
					this.hunger += 90;
					break;
			}
			console.log(" Delicious! New hunger level: " + this.hunger);
			$("#animalThoughtBubble").text("Thank you!");
			clearThoughtBubble();
			adjustHungerMeter();
		}else if(this.hunger >= 100){
			$("#animalThoughtBubble").text("No thanks! I'm full.");
			clearThoughtBubble();
		}
	}

	this.play = function(){
		if(this.bored = true){
			console.log("Yay! Let's play!")
			this.bored = false;
			this.hungry = true;
		}else if(this.bored = false){
			console.log("Not right now. Later?");
		}
	}

}

//Item constructor

function foodItem(energy, flavor){
	this.energy = energy;
	this.flavor = flavor;
}

// Spirit Animal Animation
$(document).ready(function(){
});

canvas = document.getElementById("canvasDiv");

function init(spirit) {
	stage = new createjs.Stage(canvas);
	switch (spirit) {
		case "dragon":
			loadSpicyDragon();
			break;
		case "dino":
			loadSourDino();
			break;
		case "monkey":
			loadMangoMonkey();
			break;
		case "seal":
			loadCocoSeal();
			break;
		case "dog":
			loadDog();
			break;
		case "cat":
			loadCat();
			break;
		case "bear":
			loadBear();
			break;
		case "wolf":
			loadCherryWolf();
			break;
		case "ferret":
			loadCookieFerret();
	}
}

function loadCat(){
	$("#catDisplay").show();
	$("#canvasDiv").hide();
}

function loadDog(){
	totalResources = 1;
	loadImage("dog");
}

function loadBear(){
	totalResources = 1;
	loadImage("bear");
}

function loadSpicyDragon(){
	totalResources = 4;
	loadImage("dragon/dragon-rwing4");
	loadImage("dragon/dragon-lwing4");
	loadImage("dragon/dragon-body4");
	loadImage("dragon/dragon-head4");
}

function loadSourDino(){
	totalResources = 6;
	loadImage("dino/dino-larm");
	loadImage("dino/dino-lleg");
	loadImage("dino/dino-body");
	loadImage("dino/dino-rleg");
	loadImage("dino/dino-rarm");
	loadImage("dino/dino-head");
}


function loadMangoMonkey(){
	totalResources = 5;
	loadImage("monkey/monkey-tail");
	loadImage("monkey/monkey-body");
	loadImage("monkey/monkey-top");
	loadImage("monkey/monkey-head");
	loadImage("monkey/monkey-arm");
}

function loadCocoSeal(){
	totalResources = 5;
	loadImage("seal/seal-lear");
	loadImage("seal/seal-rear");
	loadImage("seal/seal-body");
	loadImage("seal/seal-flippers");
	loadImage("seal/seal-tail");
}

function loadCherryWolf(){
	totalResources = 5;
	loadImage("wolf/wolf-body");
	loadImage("wolf/wolf-lear");
	loadImage("wolf/wolf-nose");
	loadImage("wolf/wolf-rear");
	loadImage("wolf/wolf-tail");
}

function loadCookieFerret(){
	totalResources = 7;
	loadImage("ferret/ferret-backleg");
	loadImage("ferret/ferret-body");
	loadImage("ferret/ferret-frontleg1");
	loadImage("ferret/ferret-frontleg2");
	loadImage("ferret/ferret-head");
	loadImage("ferret/ferret-lear");
	loadImage("ferret/ferret-rear");
}

function loadImage(name) {
	images[name] = new Image();
	images[name].onload = function() {
		resourceLoaded();
	}
	images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {
	resourcesLoaded += 1;
	if(resourcesLoaded === totalResources) {
		switch (spirit) {
		case "dragon":
			handleDragonLoad();
			break;
		case "dino":
			handleDinoLoad();
			break;
		case "monkey":
			handleMonkeyLoad();
			break;
		case "seal":
			handleSealLoad();
			break;
		case "dog":
			handleDogLoad();
			break;
		case "cat":
			handleCatLoad();
			break;
		case "bear":
			handleBearLoad();
			break;
		case "wolf":
			handleWolfLoad();
			break;
		case "ferret":
			handleFerretLoad();
			break;
		};
	};
};

function handleDragonLoad() {
	dragonRWing = new createjs.Bitmap("images/dragon/dragon-rwing4.png");
	dragonRWing.x = 160;
	dragonRWing.y = 220;
	dragonRWing.regX = images["dragon/dragon-rwing4"].width/2;
	dragonRWing.regY = images["dragon/dragon-rwing4"].height/2;

	dragonBody = new createjs.Bitmap("images/dragon/dragon-body4.png");
	dragonBody.x = 10;
	dragonBody.y = 170;

	dragonLWing = new createjs.Bitmap("images/dragon/dragon-lwing4.png");
	dragonLWing.x = 100;
	dragonLWing.y = 210;
	dragonLWing.regX = images["dragon/dragon-lwing4"].width/2;
	dragonLWing.regY = images["dragon/dragon-lwing4"].height/2;

	dragonHead = new createjs.Bitmap("images/dragon/dragon-head4.png");
	dragonHead.x = 30;
	dragonHead.y = 20;

	stage.addChild(dragonLWing);
	stage.addChild(dragonRWing);
	stage.addChild(dragonBody);
	stage.addChild(dragonHead);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", dragonTick);
};

function handleDinoLoad(){
	dinoLArm = new createjs.Bitmap("images/dino/dino-larm.png");
	dinoLArm.x = -90;
	dinoLArm.y = 20;

	dinoLLeg = new createjs.Bitmap("images/dino/dino-lleg.png");
	dinoLLeg.x = -65;
	dinoLLeg.y = 95;

	dinoBody = new createjs.Bitmap("images/dino/dino-body.png");
	dinoBody.x = 0;
	dinoBody.y = 30;

	dinoRLeg = new createjs.Bitmap("images/dino/dino-rleg.png");
	dinoRLeg.x = 10;
	dinoRLeg.y = 95;

	dinoRArm = new createjs.Bitmap("images/dino/dino-rarm.png");
	dinoRArm.x = 22;
	dinoRArm.y = 38;

	dinoHead = new createjs.Bitmap("images/dino/dino-head.png");
	dinoHead.x = 130;
	dinoHead.y = 120;
	dinoHead.regX = images["dino/dino-head"].width/2;
	dinoHead.regY = images["dino/dino-head"].height/2;

	stage.addChild(dinoLArm);
	stage.addChild(dinoLLeg);
	stage.addChild(dinoBody);
	stage.addChild(dinoRLeg);
	stage.addChild(dinoRArm);
	stage.addChild(dinoHead);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", dinoTick);
};

function handleMonkeyLoad(){
	monkeyTail = new createjs.Bitmap("images/monkey/monkey-tail.png");
	monkeyTail.x = 130;
	monkeyTail.y = 100;

	monkeyBody = new createjs.Bitmap("images/monkey/monkey-body.png");
	monkeyBody.x = 0;
	monkeyBody.y = 150;

	monkeyTop = new createjs.Bitmap("images/monkey/monkey-top.png");
	monkeyTop.x = -10;
	monkeyTop.y = -50;

	monkeyHead = new createjs.Bitmap("images/monkey/monkey-head.png");
	monkeyHead.x = 20;
	monkeyHead.y = 40;

	monkeyArm = new createjs.Bitmap("images/monkey/monkey-arm.png");
	monkeyArm.x = 108;
	monkeyArm.y = 65;

	stage.addChild(monkeyTail);
	stage.addChild(monkeyBody);
	stage.addChild(monkeyTop);
	stage.addChild(monkeyHead);
	stage.addChild(monkeyArm);
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", monkeyTick);
};

function handleSealLoad(){
	sealBody = new createjs.Bitmap("images/seal/seal-body.png");
	sealBody.x = -30;
	sealBody.y = 40;

	sealREar = new createjs.Bitmap("images/seal/seal-rear.png");
	sealREar.x = 125;
	sealREar.y = -15;

	sealLEar = new createjs.Bitmap("images/seal/seal-lear.png");
	sealLEar.x = 55;
	sealLEar.y = -15;

	sealFlippers = new createjs.Bitmap("images/seal/seal-flippers.png");
	sealFlippers.x = 110;
	sealFlippers.y = 170;

	sealTail = new createjs.Bitmap("images/seal/seal-tail.png");
	sealTail.x = -52;
	sealTail.y = 135;

	stage.addChild(sealREar);
	stage.addChild(sealLEar);
	stage.addChild(sealBody);
	stage.addChild(sealFlippers);
	stage.addChild(sealTail);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", sealTick);
};

function handleDogLoad(){
	dog = new createjs.Bitmap("images/dog.png");
	dog.x = 0;
	dog.y = 50;

	stage.addChild(dog);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", dogTick);
};

function handleBearLoad(){
	bear = new createjs.Bitmap("images/bear.png");
	bear.x = 0;
	bear.y = 50;

	stage.addChild(bear);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", bearTick);
};

function handleWolfLoad(){
	wolfLEar = new createjs.Bitmap("images/wolf/wolf-lear.png");
	wolfLEar.x = 0;
	wolfLEar.y = 10;

	wolfREar = new createjs.Bitmap("images/wolf/wolf-rear.png");
	wolfREar.x = 80;
	wolfREar.y = 10;

	wolfTail = new createjs.Bitmap("images/wolf/wolf-tail.png");
	wolfTail.x = 100;
	wolfTail.y = 210;

	wolfBody = new createjs.Bitmap("images/wolf/wolf-body.png");
	wolfBody.x = -40;
	wolfBody.y = 50;

	wolfNose = new createjs.Bitmap("images/wolf/wolf-nose.png");
	wolfNose.x = 45;
	wolfNose.y = 70;

	stage.addChild(wolfLEar);
	stage.addChild(wolfREar);
	stage.addChild(wolfTail);
	stage.addChild(wolfBody);
	stage.addChild(wolfNose);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.on("tick", wolfTick);
};

function dragonTick(event){

	dragonRWing.rotation += dragonRRotation;
	if (dragonRWing.rotation < -10) {
		dragonRRotation = .5;
	} else if (dragonRWing.rotation > 10) {
		dragonRRotation = -.5;
	};

	dragonLWing.rotation += dragonLRotation;
	if (dragonLWing.rotation < -10) {
		dragonLRotation = .5;
	} else if (dragonLWing.rotation > 10) {
		dragonLRotation = -.5;
	};

	stage.update(event);
};

function dinoTick(event){
	dinoWait ++;
	if(dinoWait < 65){
		dinoHead.y -= dinoBounce;
		dinoBody.y -= dinoBounce;
		dinoRArm.y -= dinoBounce;
		dinoLArm.y -= dinoBounce;
		dinoLLeg.y -= dinoBounce;
		dinoRLeg.y -= dinoBounce;
		if(dinoHead.y < 90){
			dinoBounce = -5;
		}else if(dinoHead.y > 120){
			dinoBounce = 5;
		};
	}else if(dinoWait >= 65 && dinoWait < 110){
		dinoHead.rotation -= dinoHeadRotation;
		if (dinoHead.rotation < -5) {
			dinoHeadRotation = -.5;
		} else if (dinoHead.rotation > 5) {
			dinoHeadRotation = .5;
		};
	}else if(dinoWait >= 100 && dinoWait < 250){
		dinoLArm.y = 20;
		dinoLLeg.y = 95;
		dinoBody.y = 30;
		dinoRLeg.y = 95;
		dinoRArm.y = 38;
		dinoHead.y = 120;
	}else{
		dinoWait = 0;
	};
	stage.update(event);
};

function monkeyTick(event){
	stage.update(event);
};

function sealTick(event){
	stage.update(event);
};

function dogTick(event){
	stage.update(event);
};

function bearTick(event){
	stage.update(event);
};

function wolfTick(event){
	stage.update(event);
};