// Yes, I'm going to be pedantic. Shush.
const FILLS = {
	DEFAULT_FILL: '#C00000',
	SELECTED_FILL: '#0000C0'	
};

const DEADZONE = 10;

class Point {

    constructor(x, y, neighbours = []) {
        this.x = x;
        this.y = y;

        this.moved = false;
        this.dragging = false;

		this.neighbours = neighbours;

    }

    draw(ctx) {	//old functions VVV
		ctx.fillStyle = this.fill;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
		ctx.fill();
		
		ctx.fillStyle = '#FFFFFF';
	}


	contains(mouseX, mouseY) {
		let xDif = this.x - mouseX;
		let yDif = this.y - mouseY;
	
		if(xDif*xDif + yDif*yDif <= 100){
			return true;
		}
		else{
			return false;
		}
	}
}

class NormalisedPoint extends Point {

}

class Witness extends Point {

}

class Edge {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}

	draw(ctx) {
		ctx.strokeStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.stroke();
	}
}

class WingedEdge {

}

class Shape {
	constructor() {
		this.points = [];
		this.edges = [];

		this.selectedPoint = null;
	}

	draw(ctx) {
		for(const point of this.points) {
			point.draw(ctx);
			//ctx.font = "16pt Courier-New";
			//ctx.fillText(this.points.indexOf(point), point.x + 15, point.y - 15);
		}

		for(const edge of this.edges) {
			edge.draw(ctx);
		}
	}

	addPoint(x, y) {
		this.points.push(new Point(x, y));
		console.log("Added new point", x, y);
		console.log(this.points);
	}

	addEdge(p1, p2) {
		this.edges.push(new Edge(p1, p2));
		console.log("Added new edge between (", p1.x, ", ", p1.y, ") and (", p2.x, ", ", p2.y, ")");
		console.log(this.edges);
	}

	selectPoint(x, y) {
		for(const point of this.points) {
			if(point.contains(x, y)) {
				if(!this.selectedPoint) {
					this.selectedPoint = point;
					point.fill = FILLS.SELECTED_FILL;
					point.dragging = true;
				} else if (point == this.selectedPoint) {
					this.selectedPoint = null;
					point.fill = FILLS.DEFAULT_FILL;
					point.dragging = false;
				}
				return true;
			}
		}
		
		if(this.selectedPoint) {
			this.selectedPoint.fill = FILLS.DEFAULT_FILL;
			this.selectedPoint.dragging = false;
			this.selectedPoint = null;
		}
		
		return false;
	}

	dragPoint(x, y) {
		if(this.selectedPoint && this.selectedPoint.dragging) {
			if(!this.selectedPoint.moved) {
				let xDif = this.selectedPoint.x - x;
				let yDif = this.selectedPoint.y - y;

				if(xDif*xDif + yDif*yDif >= DEADZONE * DEADZONE){
					this.selectedPoint.moved = true;
				}
			}

			if(this.selectedPoint.moved) {
				this.selectedPoint.x = x;
				this.selectedPoint.y = y;
			}
		}
	}

	stopDraggingPoint() {
		if(this.selectedPoint) {
			this.selectedPoint.dragging = false;
			if(this.selectedPoint.moved) {
				this.selectedPoint.fill = FILLS.DEFAULT_FILL;
				this.selectedPoint.moved = false;
				this.selectedPoint = null;
			}
		}
		
	}
}

/*
	canvas.addEventListener('mouseup', function(e){
		e.preventDefault();
		if(selectedPoint != -1){
			points[selectedPoint].dragging = false;
			if(points[selectedPoint].moved){
				points[selectedPoint].fill = DEFAULT_FILL;
				points[selectedPoint].moved = false;
				selectedPoint = -1;
			}
		}
	});
    */

/*
function Point(x, y, neighbours = []){
	this.x = x;
	this.y = y;
	this.neighbours = neighbours;
	this.fill = DEFAULT_FILL;
	this.moved = false;
	this.dragging = false;
}

function NormalisedPoint(point){
	this.x = point.x/WIDTH;
	this.y = point.y/HEIGHT;
	this.neighbours = point.neighbours;
}


Point.prototype.draw = function(ctx){
	
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

	if(xDif*xDif + yDif*yDif <= 100){
		return true;
  }
  else{
    return false;
  }
}*/