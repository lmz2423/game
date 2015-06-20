

function getPolygonPointClosestToCircle(polygon, circle) {
    var min = 10000,
        length,
        testPoint,
        closestPoint;

    for (var i=0; i < polygon.points.length; ++i) {
        testPoint = polygon.points[i];
        length = Math.sqrt(Math.pow(testPoint.x - circle.x, 2),
            Math.pow(testPoint.y - circle.y, 2));
        if (length < min) {
            min = length;
            closestPoint = testPoint;
        }
    }

    return closestPoint;
};

function polygonCollidesWithCircle (polygon, circle) {
    var min=10000, v1, v2,
        edge, perpendicular,
        axes = polygon.getAxes(),
        closestPoint = getPolygonPointClosestToCircle(polygon, circle);

    v1 = new Vector(new Point(circle.x, circle.y));
    v2 = new Vector(new Point(closestPoint.x, closestPoint.y));

    axes.push(v1.subtract(v2).normalize());

    return !polygon.separationOnAxes(axes, circle);
};

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

var Shape = function () {
    this.x = undefined;
    this.y = undefined;
    this.strokeStyle = 'rgba(255, 253, 208, 0.9)';
    this.fillStyle = 'rgba(147, 197, 114, 0.8)';
};

Shape.prototype = {

    collidesWith: function (shape) {
        var axes = this.getAxes().concat(shape.getAxes());
        return !this.separationOnAxes(axes, shape);
    },

    separationOnAxes: function (axes, shape) {
        for (var i=0; i < axes.length; ++i) {
            axis = axes[i];
            projection1 = shape.project(axis);
            projection2 = this.project(axis);

            if (! projection1.overlaps(projection2)) {
                return true; // don't have to test remaining axes
            }
        }
        return false;
    },

    move: function (dx, dy) {
        throw 'move(dx, dy) not implemented';
    },

    createPath: function (context) {
        throw 'createPath(context) not implemented';
    },

    getAxes: function () {
        throw 'getAxes() not implemented';
    },

    project: function (axis) {
        throw 'project(axis) not implemented';
    },

    fill: function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.createPath(context);
        context.fill();
        context.restore();
    },

    stroke: function (context) {
        context.save();
        context.strokeStyle = this.strokeStyle;
        this.createPath(context);
        context.stroke();
        context.restore();
    },

    isPointInPath: function (context, x, y) {
        this.createPath(context);
        return context.isPointInPath(x, y);
    },
};

var Projection = function (min, max) {
    this.min = min;
    this.max = max;
};

Projection.prototype = {
    overlaps: function (projection) {
        return this.max > projection.min && projection.max > this.min;
    }
};

var Vector = function(point) {
    if (point === undefined) {
        this.x = 0;
        this.y = 0;
    }
    else {
        this.x = point.x;
        this.y = point.y;
    }
};

Vector.prototype = {
    getMagnitude: function () {
        return Math.sqrt(Math.pow(this.x, 2) +
            Math.pow(this.y, 2));
    },

    dotProduct: function (vector) {
        return this.x * vector.x +
            this.y * vector.y;
    },

    add: function (vector) {
        var v = new Vector();
        v.x = this.x + vector.x;
        v.y = this.y + vector.y;
        return v;
    },

    subtract: function (vector) {
        var v = new Vector();
        v.x = this.x - vector.x;
        v.y = this.y - vector.y;
        return v;
    },

    normalize: function () {
        var v = new Vector(0, 0),
            m = this.getMagnitude();

        if (m != 0) {
            v.x = this.x / m;
            v.y = this.y / m;
        }
        return v;
    },

    perpendicular: function () {
        var v = new Vector();
        v.x = this.y;
        v.y = 0-this.x;
        return v;
    },

    edge: function (vector) {
        return this.subtract(vector);
    },

    normal: function () {
        var p = this.perpendicular();
        return p.normalize();
    }
};

var Polygon = function () {
    this.points = [];
    this.strokeStyle = 'blue';
    this.fillStyle = 'white';
};

Polygon.prototype = new Shape();

Polygon.prototype.collidesWith = function (shape) {
    var axes = shape.getAxes();

    if (axes === undefined) {
        return polygonCollidesWithCircle(this, shape);
    }
    else {
        axes.concat(this.getAxes());
        return !this.separationOnAxes(axes, shape);
    }
};

Polygon.prototype.getAxes = function () {
    var v1, v2, edge, perpendicular, normal, axes = [];

    for (var i=0; i < this.points.length-1; i++) {
        v1 = new Vector(this.points[i]);
        v2 = new Vector(this.points[i+1]);
        axes.push(v1.edge(v2).normal());
    }

    v1 = new Vector(this.points[this.points.length-1]);
    v2 = new Vector(this.points[0]);
    axes.push(v1.edge(v2).normal());

    return axes;
};

Polygon.prototype.project = function (axis) {
    var scalars = [];

    this.points.forEach( function (point) {
        scalars.push(new Vector(point).dotProduct(axis));
    });

    return new Projection(Math.min.apply(Math, scalars),
        Math.max.apply(Math, scalars));
};

Polygon.prototype.addPoint = function (x, y) {
    this.points.push(new Point(x,y));
};

Polygon.prototype.createPath = function (context) {
    if (this.points.length === 0)
        return;

    context.beginPath();
    context.moveTo(this.points[0].x,
        this.points[0].y);

    for (var i=0; i < this.points.length; ++i) {
        context.lineTo(this.points[i].x,
            this.points[i].y);
    }

    context.closePath();
};


