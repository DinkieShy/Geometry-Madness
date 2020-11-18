
function selection(shape, selector, selection, single) {   // select one or more points from the canvas
    let selection = [];

    for(const point in shape.points) {
        // single point select (click)
        if(single) {
            if(point.contains(x, y)) {		// if mouse is within point
                selection.push(point);
                point.fill = FILLS.SELECTED_FILL;
                point.dragging = true;
            }
        }

        // multi point select (click + drag)
    }
}

function pointInBox(point, box) {
    //return ()
}

function selectInBox(shape, box) {
    let selection = [];

    for(const point in shape.points) {
        
    }
}

function generateKGon(k, canvas, shape) {

    let center = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    for(let i = 0; i < k; i++) {

    }
}