// do not question the section titles

let ctx = "";
let shape = new Shape();

const MOUSE_BUTTONS = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
	UNKNOWN: 3
}

const USER_STATES = {	// what the fuck is the user doing
	DEFAULT: 0,
	SELECT: 1,
	MULTISELECT: 2,
	MULTIDRAG: 3
}

function getMouseButton(e) {
	if(typeof e === 'object') {
		return e.button;
	}
}

function draw(ctx, toDraw){
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	
	for(let ob of toDraw) {
		ob.draw(ctx);
	}
	//shape.draw(ctx);
	// console.log(shape.selectedPoint.dragging);
}

$(function() {
	/*======================================
	<(￣︶￣)> | INITIALIZATION! | <(￣︶￣)>
	======================================*/
	console.log("init");

	let canvas = $('#canvas')[0];

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;						// initial width/height
	
	let ctx = canvas.getContext('2d');

	let toDraw = [shape];

	setInterval(function() {								// canvas render rate
		draw(ctx, toDraw);
	}, 16);
	
	window.addEventListener('resize', function() {			// dynamically resize canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
	}, false);

	let userState = USER_STATES.DEFAULT;
	let userObj = null;
	
	/*======================================
	===( ╹▽╹ ) | INTERACTION! | ( ╹▽╹ )====
	======================================*/

	canvas.addEventListener('dblclick', function(e){        // add new point on double click
		e.preventDefault();

		if(userState == USER_STATES.DEFAULT && !userObj) {
			shape.addPoint(e.clientX, e.clientY);
		}
	});

	canvas.addEventListener('contextmenu', function(e) {	// remove context menu
		e.preventDefault();
	});
	
	canvas.addEventListener('mousedown', function(e) {		// single click
		e.preventDefault();
		let mBtn = getMouseButton(e);

		switch(mBtn) {
			case MOUSE_BUTTONS.LEFT:
				break;
			case MOUSE_BUTTONS.MIDDLE:
				break;
			case MOUSE_BUTTONS.RIGHT:
				// select points

				if(userState == USER_STATES.DEFAULT && !userObj) {
					userObj = shape.selectPoint(e.clientX, e.clientY);	// return a point or null.
					if(!userObj) {										// if nothing returns, you're in a void. click+drag selection applies.
						userState = USER_STATES.MULTISELECT;
						userObj = new BoundingBox({x: e.clientX, y: e.clientY}, {x: e.clientX, y: e.clientY});
						toDraw.push(userObj);
					} else {
						userState = USER_STATES.SELECT;
					}

				} else if (userState == USER_STATES.MULTIDRAG) {
				
				// uhhhhhhhh...
				
				} else {
					//userObj.deselect();									// watch out for this nonsense later
					userObj = null;
				}

				console.log("OBJ: ", userObj, "STATE: ", userState);
				break;
			default:
				break;
		}

		canvas.addEventListener('mousemove', function(e) {		// drag
			e.preventDefault();


			if(userState == USER_STATES.SELECT) {
				if(!userObj) {
					return;
				}

				userObj.move(e.clientX, e.clientY);						// more nonsense

			} else if (userState == USER_STATES.MULTISELECT) {
				userObj.move(e.clientX, e.clientY);						// oo this is a bad idea

			} else if (userState == USER_STATES.MULTIDRAG) {
				for(const point of userObj) {
					point.move(e.clientX, e.clientY);
				}
			}

			
			//shape.dragPoint(e.clientX, e.clientY);
		});
	
		canvas.addEventListener('mouseup', function(e) {		// deselect point
			e.preventDefault();

			if(userState == USER_STATES.SELECT) {
				if(!userObj) {
					return;
				}

				userState = USER_STATES.DEFAULT;
				userObj.deselect();
				userObj = null;

			} else if (userState == USER_STATES.MULTISELECT) {

				let selection = [];
				for(let point of shape.points) {
					if(userObj.contains(point)) {
						point.select();
						selection.push(point);
					}
				}

				if(selection == []) {
					toDraw.splice(toDraw.indexOf(userObj), 1);
					userObj = null;
					userState = USER_STATES.DEFAULT;
				} else {
					userObj = selection;
					userState = USER_STATES.MULTIDRAG;
				}
			}

			//shape.stopDraggingPoint(e.clientX, e.clientY);
		});
	});


	/*
    

    canvas.addEventListener('mousedown', function(e) {		// select point on single click
		e.preventDefault();
		shape.selectPoint(e.clientX, e.clientY);
	});
	
	canvas.addEventListener('mousemove', function(e) {		// drag point
		e.preventDefault();
		shape.dragPoint(e.clientX, e.clientY);
	});

	canvas.addEventListener('mouseup', function(e) {		// deselect point
		e.preventDefault();
		shape.stopDraggingPoint(e.clientX, e.clientY);
	});

	
	*/
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
