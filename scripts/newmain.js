// i'm gonna mess everything up

let ctx = "";
let shape = new Shape();

let WIDTH;
let HEIGHT;

TASKBAR_UP = true; //starts up

const MOUSE_BUTTONS = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	UNKNOWN: 3
}

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

function getMouseButton(e) {
	if(typeof e === 'object') {
		return e.button;
	}
}

function draw(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	shape.draw(ctx);
}

$(function(){
	console.log("init");
	
	canvas = $('#canvas')[0];

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
	ctx = canvas.getContext('2d');
	setInterval(draw, 16);
	
	window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, false);
    
    canvas.addEventListener('dblclick', function(e){        // add new point on double click
		e.preventDefault();

		if(!shape.selectPoint(e.clientX, e.clientY)) {
			shape.addPoint(e.clientX, e.clientY);
		}
    });

    canvas.addEventListener('mousedown', function(e) {		// select point on single click
		e.preventDefault();

		let mouseButton = getMouseButton(e);

		switch(mouseButton) {
			case MOUSE_BUTTONS.MIDDLE:
				// new edge
				break;
			default:
				shape.selectPoint(e.clientX, e.clientY);

		}
	});
	
	canvas.addEventListener('mousemove', function(e) {		// drag point
		e.preventDefault();
		shape.dragPoint(e.clientX, e.clientY);
	});

	canvas.addEventListener('mouseup', function(e) {		// deselect point
		e.preventDefault();
		shape.stopDraggingPoint();
	});

	canvas.addEventListener('contextmenu', function(e) {	// something..
		e.preventDefault();
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
