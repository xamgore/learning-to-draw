var imageCanvas = $canvas;

// initialise the state of the turtle
var turtle = undefined;

function initialise() {
   turtle = { pos: { x: 0, y: 0 },
              angle: 0,      // angle in degrees in turtle space
              penDown: true, // is the turtle pen down (or up)?
              width: 1,      // width of the line drawn by the turtle
              wrap: false,    // do we wrap the turtle on the boundaries of the canvas?
              // colour of the line drawn by the turtle
              colour: {r: 0, g: 0, b: 0, a: 1},
              step: 1
            };

   ctx.lineWidth = turtle.width;
   ctx.strokeStyle = "black";
   ctx.globalAlpha = 1;
   ctx.textAlign = "center";
   ctx.textBaseline = "middle";
}

function updateCtx() {
    let {r, g, b, a} = turtle.colour;
    ctx.strokeStyle = "rgba(" + (r|0) + "," + (g|0) + "," + (b|0) + "," + a + ")";
    ctx.lineWidth = turtle.width;
}

function centerCoords() {
   ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
   ctx.transform(1, 0, 0, -1, 0, 0);
}

function clear() {
   ctx.save();
   ctx.setTransform(1,0,0,1,0,0);
   ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
   ctx.restore();
}

function reset() {
   initialise();
   clear();
   // draw();
}

function forward(distance) {
   ctx.save();
   centerCoords();
   ctx.beginPath();

   var maxX = ctx.canvas.width / 2;
   var minX = -ctx.canvas.width / 2;
   var maxY = height / 2;
   var minY = -height / 2;
   var x = turtle.pos.x;
   var y = turtle.pos.y;

   while (distance > 0) {
      ctx.moveTo(x, y);

      var cosAngle = Math.cos(turtle.angle);
      var sinAngle = Math.sin(turtle.angle)
      var newX = x + sinAngle  * distance;
      var newY = y + cosAngle * distance;

      function xWrap(cutBound, otherBound) {
         var distanceToEdge = Math.abs((cutBound - x) / sinAngle);
         var edgeY = cosAngle * distanceToEdge + y;
         ctx.lineTo(cutBound, edgeY);
         distance -= distanceToEdge;
         x = otherBound;
         y = edgeY;
      }

      function yWrap(cutBound, otherBound) {
         var distanceToEdge = Math.abs((cutBound - y) / cosAngle);
         var edgeX = sinAngle * distanceToEdge + x;
         ctx.lineTo(edgeX, cutBound);
         distance -= distanceToEdge;
         x = edgeX;
         y = otherBound;
      }

      function noWrap() {
         ctx.lineTo(newX, newY);
         turtle.pos.x = newX;
         turtle.pos.y = newY;
         distance = 0;
      }

      if (turtle.wrap) {
         if (insideCanvas(newX,newY,minX,maxX,minY,maxY)) {
            noWrap();
         }
         else if (point = intersect(x,y,newX,newY,maxX,maxY,maxX,minY))
            xWrap(maxX, minX);
         else if (point = intersect(x,y,newX,newY,minX,maxY,minX,minY))
            xWrap(minX, maxX);
         else if (point = intersect(x,y,newX,newY,minX,maxY,maxX,maxY))
            yWrap(maxY, minY);
         else if (point = intersect(x,y,newX,newY,minX,minY,maxX,minY))
            yWrap(minY, maxY);
    /*
          if (turtle.wrap) {
             if (newX > maxX)
                xWrap(maxX, minX);
             else if (newX < minX)
                xWrap(minX, maxX);
             else if (newY > maxY)
                 yWrap(maxY, minY);
             else if (newY < minY)
                yWrap(minY, maxY);
    */
         else
            // No wrapping to to, new turtle position is within the canvas.
            noWrap();
      }
      // Wrap is not on.
      else {
         noWrap();
      }
   }
   // only draw if the pen is currently down.
   if (turtle.penDown) {
      ctx.stroke();
   }
   ctx.restore();
}

function insideCanvas(x,y,minX,maxX,minY,maxY) {
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
}

function intersect(x1,y1,x2,y2,x3,y3,x4,y4) {
   var d = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
   var ua = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / d;
   var ub = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / d;

   if (d == 0) {
       // lines are parallel
       return undefined;
   }
   else if (ua < 0.01 || ua > 0.99 || ub < 0 || ub > 1) {
       return undefined;
   }
   else {
      return {x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) }
   }
}

// Turn edge wrapping on/off.
// function wrap(bool) {
//    turtle.wrap = bool;
// }


// Lift up the pen (don't draw).
function setPenUp() { turtle.penDown = false; }
// Put the pen down (do draw).
function setPenDown() { turtle.penDown = true; }

// Turn right by an angle in degrees.
function turnRight(angle) {
   turtle.angle += degToRad(angle);
}

// Turn left by an angle in degrees.
function turnLeft(angle) {
   turtle.angle -= degToRad(angle);
}

// Move the turtle to a particular coordinate (don't draw on the way there).

// XXX We should wrap the turtle here

function goto(x,y) {
   if (turtle.wrap) {
      turtle.pos.x = ((x + 150) % 300) - 150;
      turtle.pos.y = ((y + 150) % 300) - 150;
   }
   else {
      turtle.pos.x = x;
      turtle.pos.y = y;
   }
}

/*
function goto(x,y) {
   turtle.pos.x = x;
   turtle.pos.y = y;
}
*/

// Set the angle of the turtle in degrees.
function setAngle(angle) {
   turtle.angle = degToRad(angle);
}

// Convert degrees to radians.
function degToRad(deg) {
   return deg / 180 * Math.PI;
}

// Convert radians to degrees.
function radToDeg(deg) {
   return deg * 180 / Math.PI;
}

// Set the width of the line.
function setWidth(w) {
   turtle.width = w;
   ctx.lineWidth = w;
}

// Set the colour of the line using RGB values in the range [0,255], and
// an alpha value in the range [0,1].
function setColour (r,g,b,a) {
   ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
   turtle.colour.r = r;
   turtle.colour.g = g;
   turtle.colour.b = b;
   turtle.colour.a = a;
}

// Generate a random integer between low and hi.
function random(low, hi) {
   return Math.floor(Math.random() * (hi - low + 1) + low);
}

// Repeat an action N times.
function repeat(n, action) {
   for (var count = 1; count <= n; count++)
      action();
}

// Animate an action by calling it every MS milliseconds.
// function animate(action, ms) {
//    return setInterval(action, ms);
// }

// Set the font used in text written in the image ctx.
function setFont(font) {
   ctx.font = font;
}

// Reset the whole system when the page is first loaded.
reset();
