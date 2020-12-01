// do not question the section titles
// no this isn't a mess thank you very much

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
	DRAG: 3,
	EDGE: 4
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

	let selectBox = null;
	let userSelection = [];
	let oldMouse = null;									// store mouse coordinates for multi drag
	
	/*======================================
	===( ╹▽╹ ) | INTERACTION! | ( ╹▽╹ )====
	======================================*/

	canvas.addEventListener('contextmenu', function(e) {	// remove context menu from canvas
		e.preventDefault();
	});
	
	canvas.addEventListener('dblclick', function(e){        // add new point on double click
		e.preventDefault();
		let mBtn = getMouseButton(e);

		switch(mBtn) {
			case MOUSE_BUTTONS.LEFT:
				if(userState == USER_STATES.DEFAULT) {
					shape.addPoint(e.clientX, e.clientY);
				}
				break;
			case MOUSE_BUTTONS.MIDDLE:
				break;
			case MOUSE_BUTTONS.RIGHT:
				break;
			default:
				break;
		}
		
	});
	
	canvas.addEventListener('mousedown', function(e) {		// single click
		e.preventDefault();
		let mBtn = getMouseButton(e);
		let pointTest = shape.selectPoint(e.clientX, e.clientY);

		switch(mBtn) {
			case MOUSE_BUTTONS.LEFT:
				if(userSelection != [] && !pointTest) {
					userState = USER_STATES.DRAG;
				}

				if(pointTest) {
					// make a new edge!
					userState = USER_STATES.EDGE;
					//pointTest.fill = "#00C000";
					
					shape.addEdge(pointTest, {x: e.clientX, y: e.clientY});
				}
				break;
			case MOUSE_BUTTONS.MIDDLE:

				break;
			case MOUSE_BUTTONS.RIGHT:
				// select points
				if(userState == USER_STATES.DEFAULT) {

					if(pointTest) {
						if(!userSelection.includes(pointTest)) {
							pointTest.select();
							userSelection.push(pointTest);
						} else {
							pointTest.deselect();
							userSelection.splice(userSelection.indexOf(pointTest), 1);
						}
					} else {
						userState = USER_STATES.MULTISELECT;
						selectBox = new BoundingBox({x: e.clientX, y: e.clientY}, {x: e.clientX, y: e.clientY});
						toDraw.push(selectBox);
					}
				}

				console.log("STATE: ", userState);
				break;
			default:
				break;
		}

		canvas.addEventListener('mousemove', function(e) {		// drag
			e.preventDefault();


			if(userState == USER_STATES.MULTISELECT) {
				selectBox.move(e.clientX, e.clientY);

			} else if (userState == USER_STATES.DRAG) {
				// move all selected points relative to their current positions
				if(!oldMouse) {
					oldMouse = {x: e.clientX, y: e.clientY};
				}

				for(const point of userSelection) {
					point.move(e.clientX, e.clientY, oldMouse.x, oldMouse.y);
				}

				oldMouse = {x: e.clientX, y: e.clientY};

			} else if (userState == USER_STATES.EDGE) {
				shape.edges[shape.edges.length - 1].p2 = {x: e.clientX, y: e.clientY};
			}
		});
	
		canvas.addEventListener('mouseup', function(e) {		// deselect point
			e.preventDefault();

			if (userState == USER_STATES.MULTISELECT) {

				let added = 0;

				for (const point of shape.points) {
					if(selectBox.contains(point) && !userSelection.includes(point)) {
						point.select();
						userSelection.push(point);
						added++;
					}
				}

				console.log("Selected ", userSelection.length, " points: ", userSelection);

				toDraw.splice(toDraw.indexOf(selectBox), 1);
				selectBox = null;

				if(added == 0) {
					for (const point of userSelection) {
						point.deselect();
					}
					
					userSelection = [];
				}
			
			} else if (userState == USER_STATES.DRAG) {
				oldMouse = null;

			} else if (userState == USER_STATES.EDGE) {
				let pointTest = shape.selectPoint(e.clientX, e.clientY);
				let edge = shape.edges.pop();

				if(pointTest) {
					edge.p2 = pointTest;
					if(!shape.edgeInEdges(edge)) {
						shape.edges.push(edge);
					}
				}
			}

			userState = USER_STATES.DEFAULT;
		});
	});
});



    /*
	$('#downloadButton')[0].onclick = createShapeFile;

	$('#cmdbar-hider')[0].onclick = toggleTaskbar;

	$('#uploadButton')[0].onclick = function(){
		$('#fileInput').click();
    }
    */



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
