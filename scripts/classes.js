// Yes, I'm going to be pedantic. Shush.
const FILLS = {
	DEFAULT_FILL: '#C00000',
	SELECTED_FILL: '#0000C0'	
};

const DEADZONE = 10;

class Point {

	static count = 0;	// tracks total points created

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.moved = false;
		this.dragging = false;

		this.fill = FILLS.DEFAULT_FILL;
		this.index = Point.count++;
    }

    draw(ctx) {		// render to canvas
		ctx.fillStyle = this.fill;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, 2*Math.PI);
		ctx.fill();

		ctx.fillStyle = '#FFFFFF';
		ctx.font = "16pt Courier-New";
		ctx.fillText(this.index, this.x + 15, this.y - 15);
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

	select() {
		this.fill = FILLS.SELECTED_FILL;
		this.dragging = true;
	}

	deselect() {
		this.fill = FILLS.DEFAULT_FILL;
		this.dragging = false;
		this.moved = false;
	}

	move(x, y, px, py) {
		if(this.dragging) {
			if(!this.moved) {
				let xDif = this.x - x;
				let yDif = this.y - y;

				if(xDif*xDif + yDif*yDif >= DEADZONE * DEADZONE){
					this.moved = true;
				} 
				
			} else {
				this.x += (x - px);
				this.y += (y - py);
			}
		}
	}

	static equals(p1, p2) {
		return (p1.x == p2.x) && (p1.y == p2.y);
	}
}

class NormalisedPoint {
	constructor(point, width, height) {
		this.x = point.x / width;
		this.y = point.y / height;
	}
}

class Witness extends Point {
	constructor(x, y) {
		super(x, y);
	}

	draw() {
		// need to draw witness point visibility
		// todo
	}
}

class Edge {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;

		this.weight = null;
	}

	draw(ctx) {
		ctx.strokeStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
	}
}

class WingedEdge {

}

class BoundingBox {
	constructor(startPt, endPt) {
		this.startPt = startPt;
		this.endPt = endPt;

		this.minPt;
		this.maxPt;
	}

	move(x, y) {
		this.endPt = {x: x, y: y};
	}

	makeRect() {
		this.minPt = {x: Math.min(this.startPt.x, this.endPt.x), y: Math.min(this.startPt.y, this.endPt.y)};
		this.maxPt = {x: Math.max(this.startPt.x, this.endPt.x), y: Math.max(this.startPt.y, this.endPt.y)};

		let width = this.maxPt.x - this.minPt.x;
		let height = this.maxPt.y - this.minPt.y;

		return [this.minPt.x, this.minPt.y, width, height];
	}

	contains(point) {
		return (point.x >= this.minPt.x && point.x <= this.maxPt.x &&
			point.y >= this.minPt.y && point.y <= this.maxPt.y);
	}

	draw(ctx) {
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = "#0000C0"
		ctx.fillRect(...this.makeRect());
		ctx.globalAlpha = 1.0;
	}
}

class Shape {
	constructor() {
		this.points = [];
		this.edges = [];
		// this is doing too much methinks.
	}

	draw(ctx) {
		for(const edge of this.edges) {
			edge.draw(ctx);
		}

		for(const point of this.points) {
			point.draw(ctx);
		}	
	}

	addPoint(x, y) {
		this.points.push(new Point(x, y));
		console.log("Added new point", x, y);
		console.log(this.points);
		return this.points[this.points.length - 1];
	}

	addEdge(p1, p2) {
		this.edges.push(new Edge(p1, p2));
		console.log("Added new edge between (", p1.x, ", ", p1.y, ") and (", p2.x, ", ", p2.y, ")");
		console.log(this.edges);
		return this.edges[this.edges.length - 1];
	}

	selectPoint(x, y) {
		for(const point of this.points) {	// go through all points
			if(point.contains(x, y)) {		// if mouse is within point
				return point;
			}
		}

		return null;
	}

	edgeInEdges(edge) {
		for(const edgy of this.edges) {
			if((Point.equals(edgy.p1, edge.p1) && Point.equals(edgy.p2, edge.p2)) 
				|| (Point.equals(edgy.p1, edge.p2) && Point.equals(edgy.p2, edge.p1))) {
				return true;
			}
		}

		return false;
	}
}


/*
function NormalisedPoint(point){
	this.x = point.x/WIDTH;
	this.y = point.y/HEIGHT;
	this.neighbours = point.neighbours;
}
*/