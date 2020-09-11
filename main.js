points = []
ctx = ""

WIDTH = 0;
HEIGHT = 0;

function Point(x, y){
	this.x = x;
	this.y = y;
	this.neighbours = [];
	this.fill = DEFAULT_FILL;
}

Point.prototype.draw = function(ctx){
	ctx.fillStyle = this.fill;
	ctx.beginPath();
	ctx.arc(this.x, this.y, 20, 0, 2*Math.PI);
	ctx.fill();
}

Point.prototype.drawEdges = function(ctx){
	ctx.strokeStyle = '#FFFFFF';
	for(var i = 0; i < this.neighbours.length; i++){
		neighbour = points[this.neighbours[i]]
		ctx.beginPath()
		ctx.moveTo(this.x, this.y)
		ctx.lineTo(neighbour.x, neighbour.y);
		ctx.stroke()
	}
}

Point.prototype.contains = function(mouseX, mouseY){
	xDif = this.x - mouseX;
	yDif = this.y - mouseY;

	if(xDif*xDif + yDif*yDif <= 400){
		return true;
  }
  else{
    return false;
  }
}

function addNewPoint(mouseX, mouseY){
	console.log("Added new point", mouseX, mouseY);
	points.push(new Point(mouseX, mouseY));
	console.log(points);
}

function draw(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	for(var i = 0; i < points.length; i++){
		points[i].draw(ctx);
	}

	for(var i = 0; i < points.length; i++){
		points[i].drawEdges(ctx); //need to draw edges AFTER drawing points
	}
}

function addNeighbour(point2){
	if(!points[selectedPoint].neighbours.includes(point2) && !points[point2].neighbours.includes(selectedPoint)){
		points[selectedPoint].neighbours.push(point2);
	}	
	points[selectedPoint].fill = DEFAULT_FILL;
	selectedPoint = -1;
}

selectedPoint = -1;

DEFAULT_FILL = '#C00000';
SELECTED_FILL = '#0000C0';

$(function(){
	console.log("init");

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas = $('#canvas')[0];

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	ctx = canvas.getContext('2d');
	setInterval(draw, 16);

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
		for(var i = 0; i < points.length; i++){
			if(selectedPoint != i & points[i].contains(e.clientX, e.clientY)){
				if(selectedPoint == -1){
					selectedPoint = i;
					points[i].fill = SELECTED_FILL;
				}
				else{
					addNeighbour(i)
				}
				break;
			}
		}
	});	

});