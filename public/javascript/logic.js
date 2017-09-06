// Global Variables

//EaselJS animation variables
var canvas;
var stage;
var rRotation = -.5;
var lRotation = .5;
var dragonHead = 1;
var resourcesLoaded = 0;
var totalResources = 4;
var images = {};

//Game variables
var hungryTime;
var currentTime;
var spicyDragon = new SpiritAnimal(150, 100, 100, 6, 15);
var mangoMonkey = new SpiritAnimal(120, 100, 100, 5, 15);
var apple = new foodItem(50, "juicy");
var carrot = new foodItem(40, "crunchy");
var cupcake = new foodItem(80, "sweet");
var steak = new foodItem(100, "chewy");
var username = "test";

moment().format();

// Game Logic
function checkHungry() {
	if(spicyDragon.hunger > 0){
		spicyDragon.hunger -= 1;
		adjustHungerMeter();
	}else{}
	if(spicyDragon.hunger <= 140){
		$("#animalThoughtBubble").text("I'm hungry, feeed meeeee!");
	}
	setTimeout("checkHungry()", 1000);
}
checkHungry();

function checkBored() {
	if(spicyDragon.sleep > 0){
		spicyDragon.sleep -= 1;
	} else{}
	if(spicyDragon.sleep === 0){
		$("#")
	}
}

function clearThoughtBubble() {
	setTimeout(function(){
		$("#animalThoughtBubble").text(" ");
	}, 5000);
}

function adjustHungerMeter() {
	var percentage = ((spicyDragon.hunger/150) * 100);
	if(percentage < 100){
		$("#hungerMeterFill").css("width", percentage + "%");
	} else{
		$("#hungerMeterFill").css("width", "100%");
	}
}

// Game Buttons

$("#food").click(function(){
	//spicyDragon.feed();
	$("#itemSlotRow").show();
	for(i=0; i < 5; i++){
		$("#itemSlot" + i).empty();
	}
	$.get("api/" + username + "/items", function(data) {
		for(i=0; i < data.length; i++){
			console.log(i);
			console.log(data[i].item);
			var div = $("<div>");
			div.append("<img class='itemIcon' src='/images/" + data[i].item + ".png' alt='Responsive image'>");
			div.append("<span>" + data[i].quantity + "</span>");
			$("#itemSlot" + i).append(div);
		}
	});
});

// Spirit Animal constructor

function SpiritAnimal(hunger, sleep, bored, intelligence, happiness){
	this.hunger = hunger;
	this.sleep = sleep;
	this.bored = bored;
	this.intelligence = intelligence;

	this.feed = function(){
		if(this.hunger < 140){
			this.hunger += 100;
			console.log(" Delicious! New hunger level: " + this.hunger);
			$("#animalThoughtBubble").text("Thank you!");
			clearThoughtBubble();
			adjustHungerMeter();
		}else if(this.hunger >= 140){
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

var canvas;
var stage;
var rRotation = -.5;
var lRotation = .5;
var dragonHead = 1;
var resourcesLoaded = 0;
var totalResources = 4;
var images = {};
canvas = document.getElementById("canvasDiv");

function init() {
	stage = new createjs.Stage(canvas);
	loadImage("dragon-rwing4");
	loadImage("dragon-lwing4");
	loadImage("dragon-body4");
	loadImage("dragon-head4");
}

function loadImage(name) {
	console.log("loaded");
	images[name] = new Image();
	images[name].onload = function() {
		resourceLoaded();
	}
	images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {
	resourcesLoaded += 1;
	console.log(resourcesLoaded);
	if(resourcesLoaded === totalResources) {
		console.log("all loaded!");
		handleImageLoad();
	}
}

function handleImageLoad() {
	console.log(images["dragon-rwing4"]);
	dragonRWing = new createjs.Bitmap("images/dragon-rwing4.png");
	dragonRWing.x = 160;
	dragonRWing.y = 220;
	dragonRWing.regX = images["dragon-rwing4"].width/2;
	dragonRWing.regY = images["dragon-rwing4"].height/2;

	dragonBody = new createjs.Bitmap("images/dragon-body4.png");
	dragonBody.x = 10;
	dragonBody.y = 170;

	dragonLWing = new createjs.Bitmap("images/dragon-lwing4.png");
	dragonLWing.x = 100;
	dragonLWing.y = 210;
	dragonLWing.regX = images["dragon-lwing4"].width/2;
	dragonLWing.regY = images["dragon-lwing4"].height/2;

	dragonHead = new createjs.Bitmap("images/dragon-head4.png");
	dragonHead.x = 30;
	dragonHead.y = 20;

	stage.addChild(dragonLWing);
	stage.addChild(dragonRWing);
	stage.addChild(dragonBody);
	stage.addChild(dragonHead);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.on("tick", tick);
}

function tick(event){
	dragonRWing.rotation += rRotation;
	if (dragonRWing.rotation < -10) {
		rRotation = .5;
	} else if (dragonRWing.rotation > 10) {
		rRotation = -.5;
	}

	dragonLWing.rotation += lRotation;
	if (dragonLWing.rotation < -10) {
		lRotation = .5;
	} else if (dragonLWing.rotation > 10) {
		lRotation = -.5;
	}

	stage.update(event);
}