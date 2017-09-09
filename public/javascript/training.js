var sliderDirection = true;


function init() {
	var stage = new createjs.Stage("demoCanvas");
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 15);
	circle.x = 10;
	circle.y = 15;
	stage.addChild(circle);
	stage.update();

	createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
    	console.log(circle.x);
        if (circle.x <= 10) {
        	sliderDirection = true;
        }else if(circle.x >= stage.canvas.width) {
        	sliderDirection = false;
        }
        if(sliderDirection === true){
        	circle.x += 10;
        }else if(sliderDirection === false){
        	circle.x -=10;
        }
        stage.update();
    }  
}