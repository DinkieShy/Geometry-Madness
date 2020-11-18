// Yes, I'm going to be pedantic. Shush.
const FILLS = {
	DEFAULT_FILL: '#C00000',
	SELECTED_FILL: '#0000C0'	
};

const DEADZONE = 10;

class Point {

	static count = 0;

    constructor(x, y, neighbours = []) {
        this.x = x;
        this.y = y;

        this.moved = false;
        this.dragging = false;

		this.neighbours = neighbours;
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

	static equals(p1, p2) {
		return (p1.x == p2.x) && (p1.y == p2.y);
	}
}

class NormalisedPoint extends Point {

}

class Witness extends Point {
	constructor(x, y, neighbours = []) {
		super(x, y, neighbours);
	}

	draw() {
		// need to draw witness point visibility

	}
}

class Edge {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
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
		let slope = (startPt.x - endPt.x)/(startPt.y - endPt.y);

		if(startPt.x - endPt.x > 0) {
			// start pt higher
		}
		
	}

	withinBound(point) {
		
	}
}

class Shape {
	constructor() {
		this.points = [];
		this.edges = [];


		this.selection = null;


		this.selectedPoint = null;
		this.drawingNewEdge = null;

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
				if(!this.selectedPoint) {		// select that point
					this.selectedPoint = point;
					point.fill = FILLS.SELECTED_FILL;
					point.dragging = true;

				} else if (point == this.selectedPoint) {	// or deselect same point
					this.selectedPoint = null;
					point.fill = FILLS.DEFAULT_FILL;
					point.dragging = false;

				} else if (this.drawingNewEdge) {		// add an edge
					if(!point.neighbours.includes(this.drawingNewEdge.p1)) {
						this.drawingNewEdge.p2 = point;

						this.drawingNewEdge.p1.neighbours.push(point);
						point.neighbours.push(this.drawingNewEdge.p1);	// neighbor each other

						this.drawingNewEdge = null;	// drawing edge becomes actual edge
					} 
				}
				return true;
			}
		}
		
		if(this.selectedPoint) {		// deselect a point
			this.selectedPoint.fill = FILLS.DEFAULT_FILL;
			this.selectedPoint.dragging = false;
			this.selectedPoint = null;
		}

		if(this.drawingNewEdge) {		// remove the mouse - point edge
			this.edges.splice(this.edges.indexOf(this.drawingNewEdge), 1);
			this.drawingNewEdge = null;
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

		if(this.drawingNewEdge) {
			this.drawingNewEdge.p2 = {x: x, y: y};
		}
	}

	stopDraggingPoint(x, y) {
		if(this.selectedPoint) {
			this.selectedPoint.dragging = false;
			if(this.selectedPoint.moved) {
				this.selectedPoint.fill = FILLS.DEFAULT_FILL;
				this.selectedPoint.moved = false;
				this.selectedPoint = null;
			} else {
				if(!this.drawingNewEdge) {
					this.drawingNewEdge = this.addEdge(this.selectedPoint, {x: x, y: y});
				}
			}
		}
	}

	sortPoints() {

	}

	sortEdges() {

	}
}


/*

function NormalisedPoint(point){
	this.x = point.x/WIDTH;
	this.y = point.y/HEIGHT;
	this.neighbours = point.neighbours;
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
*/