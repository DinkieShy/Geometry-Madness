// Yes, I'm going to be pedantic. Shush.

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
	}
}

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