// i'm gonna mess everything up

let ctx = "";
let shape = new Shape();

let WIDTH;
let HEIGHT;

TASKBAR_UP = true; //starts up

function toggleTaskbar(){
	if(TASKBAR_UP){
		$('#cmdbar').animate({
			"bottom": "-75px"
		}, 750);
		$('#cmdbar-hider')[0].innerHTML = "/\\";
	}
	else{
		$('#cmdbar').animate({
			"bottom": "0px"
		}, 750);
		$('#cmdbar-hider')[0].innerHTML = "\\/";
	}
	TASKBAR_UP = !TASKBAR_UP;
}

function draw(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
	shape.draw(ctx);
}


$(function(){
	console.log("init");

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas = $('#canvas')[0];

	canvas.width = WIDTH;
    canvas.height = HEIGHT;
    

	ctx = canvas.getContext('2d');
    setInterval(draw, 16);
    

    canvas.addEventListener('dblclick', function(e){        // add new point on double click
		e.preventDefault();

		if(!shape.selectPoint(e.clientX, e.clientY)) {
			shape.addPoint(e.clientX, e.clientY);
		}
    });

    canvas.addEventListener('mousedown', function(e) {
		e.preventDefault();
		shape.selectPoint(e.clientX, e.clientY);
	});
	
	canvas.addEventListener('mousemove', function(e) {
		e.preventDefault();
		shape.dragPoint(e.clientX, e.clientY);
	});

	canvas.addEventListener('mouseup', function(e) {
		e.preventDefault();
		shape.stopDraggingPoint();
	});
});



    /*
	$('#downloadButton')[0].onclick = createShapeFile;

	$('#cmdbar-hider')[0].onclick = toggleTaskbar;

	$('#uploadButton')[0].onclick = function(){
		$('#fileInput').click();
    }
    */


/*

function addNeighbour(point2){
	if(!points[selectedPoint].neighbours.includes(point2) && !points[point2].neighbours.includes(selectedPoint) && selectedPoint != point2){
		points[selectedPoint].neighbours.push(point2);
	}
	else if(selectedPoint != point2 && points[selectedPoint].neighbours.includes(point2)){
		points[selectedPoint].neighbours.splice(points[selectedPoint].neighbours.indexOf(point2), 1);
	}
	else if(selectedPoint != point2 && points[point2].neighbours.includes(selectedPoint)){
		points[point2].neighbours.splice(points[point2].neighbours.indexOf(selectedPoint), 1);
	}
	points[selectedPoint].fill = DEFAULT_FILL;
	selectedPoint = -1;
}*/
/* worry bout this later
function createShapeFile(){
	normalisedPoints = []
	for(var i = 0; i < points.length; i++){
		normalisedPoints.push(new NormalisedPoint(points[i]));
	}
	dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(normalisedPoints));
	downloadElem = $('#downloadanchor')[0];
	downloadElem.href = dataStr;
	downloadElem.download = "shape.json";
	downloadElem.click();
}

function expandShapeFile(normalisedPoints){
	for(var i = 0; i < normalisedPoints.length; i++){
		points.push(new Point(normalisedPoints[i].x*WIDTH, normalisedPoints[i].y*HEIGHT, normalisedPoints[i].neighbours));
	}
}

function fileLoaded(event){
	points = [];
	expandShapeFile(JSON.parse(event.target.result));
}

function chooseFile(event) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = fileLoaded;
    fr.readAsText(file);
}
*/


/*
	canvas.addEventListener('dblclick', function(e){
		e.preventDefault();
		foundExisting = false;

		for(var i = 0; i < points.length; i++){
			if(points[i].contains(e.clientX, e.clientY)){
				foundExisting = true;
				if(selectedPoint != -1){
					addNeighbour(i)
				}
				return;
			}
		}
		
		if(selectedPoint == -1){
			addNewPoint(e.clientX, e.clientY);
		}
		else{
			points[selectedPoint].fill = DEFAULT_FILL;
			selectedPoint = -1;
		}
	});

	canvas.addEventListener('mousedown', function(e){
		e.preventDefault();
		foundExisting = false
		for(var i = 0; i < points.length; i++){
			if(points[i].contains(e.clientX, e.clientY)){
				foundExisting = true;
				if(selectedPoint == -1){
					selectedPoint = i;
					points[i].fill = SELECTED_FILL;
					points[i].dragging = true;
				}
				else{
					addNeighbour(i);
				}
				return;
			}
		}
		if(!foundExisting && selectedPoint != -1){
			points[selectedPoint].fill = DEFAULT_FILL;
			selectedPoint = -1;
		}
	});	

	canvas.addEventListener('mousemove', function(e){
		e.preventDefault();
		if(selectedPoint != -1 && points[selectedPoint].dragging){
			if(!points[selectedPoint].moved){
				xDif = points[selectedPoint].x - e.clientX;
				yDif = points[selectedPoint].y - e.clientY;

				if(xDif*xDif + yDif*yDif >= DEADZONE*DEADZONE){
					points[selectedPoint].moved = true;
				}
			}

			if(points[selectedPoint].moved){
				points[selectedPoint].x = e.clientX;
				points[selectedPoint].y = e.clientY;
			}
		}
	});
*/