var Vertex = function(x, y, z) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.z = parseFloat(z);
};


var Vertex2D = function(x, y) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};


var Cube = function(center, side) {
    this.color  = 'rgba(255, 0, 150, 0.3)';
	var d = side / 2;

    this.vertices = [
        [-1, -1, 1], [-1, -1, -1], [ 1, -1, -1], [1, -1, 1],
        [ 1,  1, 1], [ 1,  1, -1], [-1,  1, -1], [-1, 1, 1], [0, 0, 0],
    ].getVertices(d, center);

    this.faces = [
        [0, 1, 2, 3], [3, 2, 5, 4], [4, 5, 6, 7], [7, 6, 1, 0], [7, 0, 3, 4], [1, 6, 5, 2]
    ].getFaces(this.vertices);

	this.center = _.last(this.vertices);

    this.apply = matrix => _.each(this.vertices, vtx => vtx.apply(matrix));
}


var Tetra = function(center, side) {
    this.color  = 'rgba(150, 255, 0, 0.3)';
    const d = side / 2;

    this.vertices = [ [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1], [0, 0, 0] ].getVertices(d, center);
    this.faces    = [ [0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3], ].getFaces(this.vertices);
	this.center = _.last(this.vertices);
}


var Octa = function(center, side) {
    this.color  = 'rgba(0, 255, 150, 0.3)';
    const d = side / 1.2;

    this.vertices = [ [1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0],
                      [0, -1, 0], [0, 0, -1], [0, 0, 0] ].getVertices(d, center);

    this.faces    = [ [0, 1, 2], [0, 1, 5], [0, 4, 2], [0, 4, 5],
                      [3, 1, 2], [3, 1, 5], [3, 4, 2], [3, 4, 5] ].getFaces(this.vertices);

  	this.center = _.last(this.vertices);
}


var Dode = function(center, side) {
    this.color  = 'rgba(0, 150, 255, 0.3)';
    const d = side / 2;
    const p = 1.618;

    this.vertices = [ [ 1, 1, 1], [1 , 1, -1], [1,  -1, 1], [1,  -1, -1],          // 0-3
                      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],          // 4-7
                      [ 0, 1/p, p], [ 0, 1/p, -p], [ 0, -1/p, p], [ 0, -1/p, -p],  // 8-11   green
                      [ 1/p, p, 0], [ 1/p, -p, 0], [ -1/p, p, 0], [ -1/p, -p, 0],  // 12-15  blue
                      [ p, 0, 1/p], [ -p, 0, 1/p], [ p, 0, -1/p], [ -p, 0, -1/p],  // 16-19  pink
                      [0, 0, 0] ].getVertices(d, center);

    this.faces    = [ [1,  9, 11, 3, 18], [1, 9, 5, 14, 12], [1, 12, 0, 16, 18],
                      [16, 18, 3, 13, 2], [11, 3, 13, 15, 7], [9, 11, 7, 19, 5],
                      [4,  8, 10, 6, 17], [4, 14, 5, 19, 17], [4, 14, 12, 0, 8],
                      [0, 8, 10, 2, 16],  [10, 2, 13, 15, 6], [15, 6, 17, 19, 7]
                    ].getFaces(this.vertices);

	this.center = _.last(this.vertices);
}


var Icos = function(center, side) {
    this.color  = 'rgba(150, 0, 255, 0.3)';
    const d = side / 2;
    const p = 1.618;

    this.vertices = [ [p, 1, 0], [p, -1, 0], [-p, -1, 0], [-p, 1, 0],
                      [0, p, 1], [0, -p, 1], [0, -p, -1], [0, p, -1],
                      [1, 0, p], [1, 0, -p], [-1, 0, -p], [-1, 0, p],
                      [0, 0, 0] ].getVertices(d, center);

    this.faces    = [ [7, 0, 4],  [7, 4, 3],  [7, 3, 10], [7, 10, 9], [7, 9, 0],
                      [5, 8, 11], [5, 11, 2], [5, 2, 6],  [5, 6, 1],  [5, 1, 8],
                      [0, 8, 4],  [8, 4, 11], [4, 11, 3], [11, 3, 2], [3, 2, 10],
                      [2, 10, 6], [10, 6, 9], [6, 9, 1],  [9, 1, 0],  [1, 0, 8]
                    ].getFaces(this.vertices);

	this.center = _.last(this.vertices);
}
