'use strict';

var MotorCortex = require('@donkeyclip/motorcortex');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MotorCortex__default = /*#__PURE__*/_interopDefaultLegacy(MotorCortex);

var lib = {};

var interpolate$2 = {};

var interpolatePath$1 = {};

var renderPath$1 = {};

var constants = {};

Object.defineProperty(constants, "__esModule", {
  value: true
});

constants._ = undefined;

constants.SPACE = ' ';
constants.FILL = 'fill';
constants.NONE = 'none';
constants.DRAW_LINE_VERTICAL = 'V';
constants.DRAW_LINE_HORIZONTAL = 'H';
constants.DRAW_LINE = 'L';
constants.CLOSE_PATH = 'Z';
constants.MOVE_CURSOR = 'M';
constants.DRAW_CURVE_CUBIC_BEZIER = 'C';
constants.DRAW_CURVE_SMOOTH = 'S';
constants.DRAW_CURVE_QUADRATIC = 'Q';
constants.DRAW_CURVE_QUADRATIC_CONTINUATION = 'T';
constants.DRAW_ARC = 'A';

var inspect = {};

Object.defineProperty(inspect, "__esModule", {
  value: true
});

function isString(obj) {
  return typeof obj === 'string';
}

inspect.isString = isString;

var math = {};

(function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var math = Math;
  exports.abs = math.abs;
  exports.min = math.min;
  exports.max = math.max;
  exports.floor = math.floor;
  exports.round = math.round;
  exports.sqrt = math.sqrt;
  exports.pow = math.pow;
  exports.cos = math.cos;
  exports.asin = math.asin;
  exports.sin = math.sin;
  exports.tan = math.tan;
  exports.PI = math.PI;
  exports.QUADRATIC_RATIO = 2.0 / 3;
  exports.EPSILON = exports.pow(2, -52);
})(math);

Object.defineProperty(renderPath$1, "__esModule", {
  value: true
});
var constants_1$8 = constants;
var inspect_1 = inspect;
var math_1$8 = math;

function renderPath(ns, formatter) {
  if (formatter === void 0) {
    formatter = math_1$8.round;
  }

  if (inspect_1.isString(ns)) {
    return ns;
  }

  var result = [];

  for (var i = 0; i < ns.length; i++) {
    var n = ns[i];
    result.push(constants_1$8.MOVE_CURSOR, formatter(n[0]), formatter(n[1]), constants_1$8.DRAW_CURVE_CUBIC_BEZIER);
    var lastResult = void 0;

    for (var f = 2; f < n.length; f += 6) {
      var p0 = formatter(n[f]);
      var p1 = formatter(n[f + 1]);
      var p2 = formatter(n[f + 2]);
      var p3 = formatter(n[f + 3]);
      var dx = formatter(n[f + 4]);
      var dy = formatter(n[f + 5]);
      var isPoint = p0 == dx && p2 == dx && p1 == dy && p3 == dy;

      if (!isPoint || lastResult != (lastResult = '' + p0 + p1 + p2 + p3 + dx + dy)) {
        result.push(p0, p1, p2, p3, dx, dy);
      }
    }
  }

  return result.join(constants_1$8.SPACE);
}

renderPath$1.renderPath = renderPath;

var errors = {};

Object.defineProperty(errors, "__esModule", {
  value: true
});
var constants_1$7 = constants;

function raiseError() {
  throw new Error(Array.prototype.join.call(arguments, constants_1$7.SPACE));
}

errors.raiseError = raiseError;

var normalizePaths$1 = {};

var fillSegments$1 = {};

var createNumberArray$1 = {};

var browser = {};

Object.defineProperty(browser, "__esModule", {
  value: true
});
var userAgent = typeof window !== 'undefined' && window.navigator.userAgent;
browser.isEdge = /(MSIE |Trident\/|Edge\/)/i.test(userAgent);

Object.defineProperty(createNumberArray$1, "__esModule", {
  value: true
});
var browser_1 = browser;
var arrayConstructor = browser_1.isEdge ? Array : Float32Array;

function createNumberArray(n) {
  return new arrayConstructor(n);
}

createNumberArray$1.createNumberArray = createNumberArray;

var computeAbsoluteOrigin$1 = {};

Object.defineProperty(computeAbsoluteOrigin$1, "__esModule", {
  value: true
});
var math_1$7 = math;

function computeDimensions(points) {
  var xmin = points[0];
  var ymin = points[1];
  var ymax = ymin;
  var xmax = xmin;

  for (var i = 2; i < points.length; i += 6) {
    var x = points[i + 4];
    var y = points[i + 5];
    xmin = math_1$7.min(xmin, x);
    xmax = math_1$7.max(xmax, x);
    ymin = math_1$7.min(ymin, y);
    ymax = math_1$7.max(ymax, y);
  }

  return {
    x: xmin,
    w: xmax - xmin,
    y: ymin,
    h: ymax - ymin
  };
}

function computeAbsoluteOrigin(relativeX, relativeY, points) {
  var dimensions = computeDimensions(points);
  return {
    x: dimensions.x + dimensions.w * relativeX,
    y: dimensions.y + dimensions.h * relativeY
  };
}

computeAbsoluteOrigin$1.computeAbsoluteOrigin = computeAbsoluteOrigin;

Object.defineProperty(fillSegments$1, "__esModule", {
  value: true
});
var createNumberArray_1$3 = createNumberArray$1;
var computeAbsoluteOrigin_1$1 = computeAbsoluteOrigin$1;

function fillSegments(larger, smaller, origin) {
  var largeLen = larger.length;
  var smallLen = smaller.length;

  if (largeLen < smallLen) {
    return fillSegments(smaller, larger, origin);
  }

  smaller.length = largeLen;

  for (var i = smallLen; i < largeLen; i++) {
    var l = larger[i];
    var originX = origin.x;
    var originY = origin.y;

    if (!origin.absolute) {
      var absoluteOrigin = computeAbsoluteOrigin_1$1.computeAbsoluteOrigin(originX, originY, l);
      originX = absoluteOrigin.x;
      originY = absoluteOrigin.y;
    }

    var d = createNumberArray_1$3.createNumberArray(l.length);

    for (var k = 0; k < l.length; k += 2) {
      d[k] = originX;
      d[k + 1] = originY;
    }

    smaller[i] = d;
  }
}

fillSegments$1.fillSegments = fillSegments;

var normalizePoints$1 = {};

var rotatePoints$1 = {};

Object.defineProperty(rotatePoints$1, "__esModule", {
  value: true
});
var createNumberArray_1$2 = createNumberArray$1;

function rotatePoints(ns, count) {
  var len = ns.length;
  var rightLen = len - count;
  var buffer = createNumberArray_1$2.createNumberArray(count);
  var i;

  for (i = 0; i < count; i++) {
    buffer[i] = ns[i];
  }

  for (i = count; i < len; i++) {
    ns[i - count] = ns[i];
  }

  for (i = 0; i < count; i++) {
    ns[rightLen + i] = buffer[i];
  }
}

rotatePoints$1.rotatePoints = rotatePoints;

var distance$1 = {};

Object.defineProperty(distance$1, "__esModule", {
  value: true
});
var math_1$6 = math;

function distance(x1, y1, x2, y2) {
  return math_1$6.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

distance$1.distance = distance;

Object.defineProperty(normalizePoints$1, "__esModule", {
  value: true
});
var rotatePoints_1 = rotatePoints$1;
var constants_1$6 = constants;
var distance_1$1 = distance$1;
var computeAbsoluteOrigin_1 = computeAbsoluteOrigin$1;

function normalizePoints(absolute, originX, originY, ns) {
  var len = ns.length;

  if (ns[len - 2] !== ns[0] || ns[len - 1] !== ns[1]) {
    return;
  }

  if (!absolute) {
    var relativeOrigin = computeAbsoluteOrigin_1.computeAbsoluteOrigin(originX, originY, ns);
    originX = relativeOrigin.x;
    originY = relativeOrigin.y;
  }

  var buffer = ns.slice(2);
  len = buffer.length;
  var index, minAmount;

  for (var i = 0; i < len; i += 6) {
    var next = distance_1$1.distance(originX, originX, buffer[i], buffer[i + 1]);

    if (minAmount === constants_1$6._ || next < minAmount) {
      minAmount = next;
      index = i;
    }
  }

  rotatePoints_1.rotatePoints(buffer, index);
  ns[0] = buffer[len - 2];
  ns[1] = buffer[len - 1];

  for (var i = 0; i < buffer.length; i++) {
    ns[i + 2] = buffer[i];
  }
}

normalizePoints$1.normalizePoints = normalizePoints;

var fillPoints$1 = {};

Object.defineProperty(fillPoints$1, "__esModule", {
  value: true
});
var math_1$5 = math;
var createNumberArray_1$1 = createNumberArray$1;

function fillPoints(matrix, addPoints) {
  var ilen = matrix[0].length;

  for (var i = 0; i < ilen; i++) {
    var left = matrix[0][i];
    var right = matrix[1][i];
    var totalLength = math_1$5.max(left.length + addPoints, right.length + addPoints);
    matrix[0][i] = fillSubpath(left, totalLength);
    matrix[1][i] = fillSubpath(right, totalLength);
  }
}

fillPoints$1.fillPoints = fillPoints;

function fillSubpath(ns, totalLength) {
  var totalNeeded = totalLength - ns.length;
  var ratio = Math.ceil(totalLength / ns.length);
  var result = createNumberArray_1$1.createNumberArray(totalLength);
  result[0] = ns[0];
  result[1] = ns[1];
  var k = 1,
      j = 1;

  while (j < totalLength - 1) {
    result[++j] = ns[++k];
    result[++j] = ns[++k];
    result[++j] = ns[++k];
    result[++j] = ns[++k];
    var dx = result[++j] = ns[++k];
    var dy = result[++j] = ns[++k];

    if (totalNeeded) {
      for (var f = 0; f < ratio && totalNeeded; f++) {
        result[j + 5] = result[j + 3] = result[j + 1] = dx;
        result[j + 6] = result[j + 4] = result[j + 2] = dy;
        j += 6;
        totalNeeded -= 6;
      }
    }
  }

  return result;
}

fillPoints$1.fillSubpath = fillSubpath;

var getSortedSegments$1 = {};

var perimeterPoints$1 = {};

Object.defineProperty(perimeterPoints$1, "__esModule", {
  value: true
});
var math_1$4 = math;
var distance_1 = distance$1;

function perimeterPoints(pts) {
  var n = pts.length;
  var x2 = pts[n - 2];
  var y2 = pts[n - 1];
  var p = 0;

  for (var i = 0; i < n; i += 6) {
    p += distance_1.distance(pts[i], pts[i + 1], x2, y2);
    x2 = pts[i];
    y2 = pts[i + 1];
  }

  return math_1$4.floor(p);
}

perimeterPoints$1.perimeterPoints = perimeterPoints;

Object.defineProperty(getSortedSegments$1, "__esModule", {
  value: true
});
var perimeterPoints_1 = perimeterPoints$1;

function getSortedSegments(pathSegments) {
  return pathSegments.map(function (points) {
    return {
      points: points,
      perimeter: perimeterPoints_1.perimeterPoints(points)
    };
  }).sort(function (a, b) {
    return b.perimeter - a.perimeter;
  }).map(function (a) {
    return a.points;
  });
}

getSortedSegments$1.getSortedSegments = getSortedSegments;

Object.defineProperty(normalizePaths$1, "__esModule", {
  value: true
});
var fillSegments_1 = fillSegments$1;
var normalizePoints_1 = normalizePoints$1;
var fillPoints_1 = fillPoints$1;
var constants_1$5 = constants;
var errors_1$3 = errors;
var getSortedSegments_1 = getSortedSegments$1;

function normalizePaths(left, right, options) {
  if (options.optimize === constants_1$5.FILL) {
    left = getSortedSegments_1.getSortedSegments(left);
    right = getSortedSegments_1.getSortedSegments(right);
  }

  if (left.length !== right.length) {
    if (options.optimize === constants_1$5.FILL) {
      fillSegments_1.fillSegments(left, right, options.origin);
    } else {
      errors_1$3.raiseError('optimize:none requires equal lengths');
    }
  }

  var matrix = Array(2);
  matrix[0] = left;
  matrix[1] = right;

  if (options.optimize === constants_1$5.FILL) {
    var _a = options.origin,
        x = _a.x,
        y = _a.y,
        absolute = _a.absolute;

    for (var i = 0; i < left.length; i++) {
      normalizePoints_1.normalizePoints(absolute, x, y, matrix[0][i]);
      normalizePoints_1.normalizePoints(absolute, x, y, matrix[1][i]);
    }

    fillPoints_1.fillPoints(matrix, options.addPoints * 6);
  }

  return matrix;
}

normalizePaths$1.normalizePaths = normalizePaths;

var objects = {};

Object.defineProperty(objects, "__esModule", {
  value: true
});

function fillObject(dest, src) {
  for (var key in src) {
    if (!dest.hasOwnProperty(key)) {
      dest[key] = src[key];
    }
  }

  return dest;
}

objects.fillObject = fillObject;

Object.defineProperty(interpolatePath$1, "__esModule", {
  value: true
});
var renderPath_1 = renderPath$1;
var math_1$3 = math;
var errors_1$2 = errors;
var normalizePaths_1 = normalizePaths$1;
var objects_1 = objects;
var createNumberArray_1 = createNumberArray$1;
var constants_1$4 = constants;
var defaultOptions = {
  addPoints: 0,
  optimize: constants_1$4.FILL,
  origin: {
    x: 0,
    y: 0
  },
  precision: 0
};

function interpolatePath(paths, options) {
  options = objects_1.fillObject(options, defaultOptions);

  if (!paths || paths.length < 2) {
    errors_1$2.raiseError('invalid arguments');
  }

  var hlen = paths.length - 1;
  var items = Array(hlen);

  for (var h = 0; h < hlen; h++) {
    items[h] = getPathInterpolator(paths[h], paths[h + 1], options);
  }

  var formatter = !options.precision ? constants_1$4._ : function (n) {
    return n.toFixed(options.precision);
  };
  return function (offset) {
    var d = hlen * offset;
    var flr = math_1$3.min(math_1$3.floor(d), hlen - 1);
    return renderPath_1.renderPath(items[flr]((d - flr) / (flr + 1)), formatter);
  };
}

interpolatePath$1.interpolatePath = interpolatePath;

function getPathInterpolator(left, right, options) {
  var matrix = normalizePaths_1.normalizePaths(left.getData(), right.getData(), options);
  var n = matrix[0].length;
  return function (offset) {
    if (math_1$3.abs(offset - 0) < math_1$3.EPSILON) {
      return left.getStringData();
    }

    if (math_1$3.abs(offset - 1) < math_1$3.EPSILON) {
      return right.getStringData();
    }

    var results = Array(n);

    for (var h = 0; h < n; h++) {
      results[h] = mixPoints(matrix[0][h], matrix[1][h], offset);
    }

    return results;
  };
}

function mixPoints(a, b, o) {
  var alen = a.length;
  var results = createNumberArray_1.createNumberArray(alen);

  for (var i = 0; i < alen; i++) {
    results[i] = a[i] + (b[i] - a[i]) * o;
  }

  return results;
}

interpolatePath$1.mixPoints = mixPoints;

var path = {};

var getPath = {};

var parsePoints$1 = {};

var coalesce$1 = {};

Object.defineProperty(coalesce$1, "__esModule", {
  value: true
});
var constants_1$3 = constants;

function coalesce(current, fallback) {
  return current === constants_1$3._ ? fallback : current;
}

coalesce$1.coalesce = coalesce;

var arcToCurve$1 = {};

Object.defineProperty(arcToCurve$1, "__esModule", {
  value: true
});
var math_1$2 = math;

var _120 = math_1$2.PI * 120 / 180;

var PI2 = math_1$2.PI * 2;

function arcToCurve(x1, y1, rx, ry, angle, large, sweep, dx, dy, f1, f2, cx, cy) {
  if (rx <= 0 || ry <= 0) {
    return [x1, y1, dx, dy, dx, dy];
  }

  var rad = math_1$2.PI / 180 * (+angle || 0);
  var cosrad = math_1$2.cos(rad);
  var sinrad = math_1$2.sin(rad);
  var recursive = !!f1;

  if (!recursive) {
    var x1old = x1;
    var dxold = dx;
    x1 = x1old * cosrad - y1 * -sinrad;
    y1 = x1old * -sinrad + y1 * cosrad;
    dx = dxold * cosrad - dy * -sinrad;
    dy = dxold * -sinrad + dy * cosrad;
    var x = (x1 - dx) / 2;
    var y = (y1 - dy) / 2;
    var h = x * x / (rx * rx) + y * y / (ry * ry);

    if (h > 1) {
      h = math_1$2.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }

    var k = (large === sweep ? -1 : 1) * math_1$2.sqrt(math_1$2.abs((rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)));
    cx = k * rx * y / ry + (x1 + dx) / 2;
    cy = k * -ry * x / rx + (y1 + dy) / 2;
    f1 = math_1$2.asin((y1 - cy) / ry);
    f2 = math_1$2.asin((dy - cy) / ry);

    if (x1 < cx) {
      f1 = math_1$2.PI - f1;
    }

    if (dx < cx) {
      f2 = math_1$2.PI - f2;
    }

    if (f1 < 0) {
      f1 += PI2;
    }

    if (f2 < 0) {
      f2 += PI2;
    }

    if (sweep && f1 > f2) {
      f1 -= PI2;
    }

    if (!sweep && f2 > f1) {
      f2 -= PI2;
    }
  }

  var res;

  if (math_1$2.abs(f2 - f1) > _120) {
    var f2old = f2;
    var x2old = dx;
    var y2old = dy;
    f2 = f1 + _120 * (sweep && f2 > f1 ? 1 : -1);
    dx = cx + rx * math_1$2.cos(f2);
    dy = cy + ry * math_1$2.sin(f2);
    res = arcToCurve(dx, dy, rx, ry, angle, 0, sweep, x2old, y2old, f2, f2old, cx, cy);
  } else {
    res = [];
  }

  var t = 4 / 3 * math_1$2.tan((f2 - f1) / 4);
  res.splice(0, 0, 2 * x1 - (x1 + t * rx * math_1$2.sin(f1)), 2 * y1 - (y1 - t * ry * math_1$2.cos(f1)), dx + t * rx * math_1$2.sin(f2), dy - t * ry * math_1$2.cos(f2), dx, dy);

  if (!recursive) {
    for (var i = 0, ilen = res.length; i < ilen; i += 2) {
      var xt = res[i],
          yt = res[i + 1];
      res[i] = xt * cosrad - yt * sinrad;
      res[i + 1] = xt * sinrad + yt * cosrad;
    }
  }

  return res;
}

arcToCurve$1.arcToCurve = arcToCurve;

Object.defineProperty(parsePoints$1, "__esModule", {
  value: true
});
var constants_1$2 = constants;
var coalesce_1 = coalesce$1;
var errors_1$1 = errors;
var math_1$1 = math;
var arcToCurve_1 = arcToCurve$1;
var argLengths = {
  M: 2,
  H: 1,
  V: 1,
  L: 2,
  Z: 0,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7
};

function addCurve(ctx, x1, y1, x2, y2, dx, dy) {
  var x = ctx.x;
  var y = ctx.y;
  ctx.x = coalesce_1.coalesce(dx, x);
  ctx.y = coalesce_1.coalesce(dy, y);
  ctx.current.push(coalesce_1.coalesce(x1, x), y1 = coalesce_1.coalesce(y1, y), x2 = coalesce_1.coalesce(x2, x), y2 = coalesce_1.coalesce(y2, y), ctx.x, ctx.y);
  ctx.lc = ctx.c;
}

function convertToAbsolute(ctx) {
  var c = ctx.c;
  var t = ctx.t;
  var x = ctx.x;
  var y = ctx.y;

  if (c === constants_1$2.DRAW_LINE_VERTICAL) {
    t[0] += y;
  } else if (c === constants_1$2.DRAW_LINE_HORIZONTAL) {
    t[0] += x;
  } else if (c === constants_1$2.DRAW_ARC) {
    t[5] += x;
    t[6] += y;
  } else {
    for (var j = 0; j < t.length; j += 2) {
      t[j] += x;
      t[j + 1] += y;
    }
  }
}

function parseSegments(d) {
  return d.replace(/[\^\s]*([mhvlzcsqta]|\-?\d*\.?\d+)[,\$\s]*/gi, ' $1').replace(/([mhvlzcsqta])/gi, ' $1').trim().split('  ').map(parseSegment);
}

function parseSegment(s2) {
  return s2.split(constants_1$2.SPACE).map(parseCommand);
}

function parseCommand(str, i) {
  return i === 0 ? str : +str;
}

function parsePoints(d) {
  var ctx = {
    x: 0,
    y: 0,
    segments: []
  };
  var segments = parseSegments(d);

  for (var i = 0; i < segments.length; i++) {
    var terms = segments[i];
    var commandLetter = terms[0];
    var command = commandLetter.toUpperCase();
    var isRelative = command !== constants_1$2.CLOSE_PATH && command !== commandLetter;
    ctx.c = command;
    var maxLength = argLengths[command];
    var t2 = terms;
    var k = 1;

    do {
      ctx.t = t2.length === 1 ? t2 : t2.slice(k, k + maxLength);

      if (isRelative) {
        convertToAbsolute(ctx);
      }

      var n = ctx.t;
      var x = ctx.x;
      var y = ctx.y;
      var x1 = void 0,
          y1 = void 0,
          dx = void 0,
          dy = void 0,
          x2 = void 0,
          y2 = void 0;

      if (command === constants_1$2.MOVE_CURSOR) {
        ctx.segments.push(ctx.current = [ctx.x = n[0], ctx.y = n[1]]);
      } else if (command === constants_1$2.DRAW_LINE_HORIZONTAL) {
        addCurve(ctx, constants_1$2._, constants_1$2._, constants_1$2._, constants_1$2._, n[0], constants_1$2._);
      } else if (command === constants_1$2.DRAW_LINE_VERTICAL) {
        addCurve(ctx, constants_1$2._, constants_1$2._, constants_1$2._, constants_1$2._, constants_1$2._, n[0]);
      } else if (command === constants_1$2.DRAW_LINE) {
        addCurve(ctx, constants_1$2._, constants_1$2._, constants_1$2._, constants_1$2._, n[0], n[1]);
      } else if (command === constants_1$2.CLOSE_PATH) {
        addCurve(ctx, constants_1$2._, constants_1$2._, constants_1$2._, constants_1$2._, ctx.current[0], ctx.current[1]);
      } else if (command === constants_1$2.DRAW_CURVE_CUBIC_BEZIER) {
        addCurve(ctx, n[0], n[1], n[2], n[3], n[4], n[5]);
        ctx.cx = n[2];
        ctx.cy = n[3];
      } else if (command === constants_1$2.DRAW_CURVE_SMOOTH) {
        var isInitialCurve = ctx.lc !== constants_1$2.DRAW_CURVE_SMOOTH && ctx.lc !== constants_1$2.DRAW_CURVE_CUBIC_BEZIER;
        x1 = isInitialCurve ? constants_1$2._ : x * 2 - ctx.cx;
        y1 = isInitialCurve ? constants_1$2._ : y * 2 - ctx.cy;
        addCurve(ctx, x1, y1, n[0], n[1], n[2], n[3]);
        ctx.cx = n[0];
        ctx.cy = n[1];
      } else if (command === constants_1$2.DRAW_CURVE_QUADRATIC) {
        var cx1 = n[0];
        var cy1 = n[1];
        dx = n[2];
        dy = n[3];
        addCurve(ctx, x + (cx1 - x) * math_1$1.QUADRATIC_RATIO, y + (cy1 - y) * math_1$1.QUADRATIC_RATIO, dx + (cx1 - dx) * math_1$1.QUADRATIC_RATIO, dy + (cy1 - dy) * math_1$1.QUADRATIC_RATIO, dx, dy);
        ctx.cx = cx1;
        ctx.cy = cy1;
      } else if (command === constants_1$2.DRAW_CURVE_QUADRATIC_CONTINUATION) {
        dx = n[0];
        dy = n[1];

        if (ctx.lc === constants_1$2.DRAW_CURVE_QUADRATIC || ctx.lc === constants_1$2.DRAW_CURVE_QUADRATIC_CONTINUATION) {
          x1 = x + (x * 2 - ctx.cx - x) * math_1$1.QUADRATIC_RATIO;
          y1 = y + (y * 2 - ctx.cy - y) * math_1$1.QUADRATIC_RATIO;
          x2 = dx + (x * 2 - ctx.cx - dx) * math_1$1.QUADRATIC_RATIO;
          y2 = dy + (y * 2 - ctx.cy - dy) * math_1$1.QUADRATIC_RATIO;
        } else {
          x1 = x2 = x;
          y1 = y2 = y;
        }

        addCurve(ctx, x1, y1, x2, y2, dx, dy);
        ctx.cx = x2;
        ctx.cy = y2;
      } else if (command === constants_1$2.DRAW_ARC) {
        var beziers = arcToCurve_1.arcToCurve(x, y, n[0], n[1], n[2], n[3], n[4], n[5], n[6]);

        for (var j = 0; j < beziers.length; j += 6) {
          addCurve(ctx, beziers[j], beziers[j + 1], beziers[j + 2], beziers[j + 3], beziers[j + 4], beziers[j + 5]);
        }
      } else {
        errors_1$1.raiseError(ctx.c, ' is not supported');
      }

      k += maxLength;
    } while (k < t2.length);
  }

  return ctx.segments;
}

parsePoints$1.parsePoints = parsePoints;

Object.defineProperty(getPath, "__esModule", {
  value: true
});
var errors_1 = errors;
var parsePoints_1 = parsePoints$1;
var constants_1$1 = constants;
var selectorRegex = /^([#|\.]|path)/i;

function convertToPathData(pathSource) {
  if (Array.isArray(pathSource)) {
    return {
      data: pathSource,
      stringData: constants_1$1._
    };
  }

  var stringData;

  if (typeof pathSource === 'string' && selectorRegex.test(pathSource)) {
    pathSource = document.querySelector(pathSource);
  } else {
    stringData = pathSource;
  }

  if (typeof pathSource === 'string') {
    return {
      data: parsePoints_1.parsePoints(pathSource),
      stringData: stringData
    };
  }

  var pathElement = pathSource;

  if (pathElement.tagName.toUpperCase() === 'PATH') {
    stringData = pathElement.getAttribute('d');
    return {
      data: parsePoints_1.parsePoints(stringData),
      stringData: stringData
    };
  }

  return errors_1.raiseError('Unsupported element ', pathElement.tagName);
}

getPath.convertToPathData = convertToPathData;

Object.defineProperty(path, "__esModule", {
  value: true
});
var getPath_1 = getPath;
var math_1 = math;
var constants_1 = constants;

var Path = function () {
  function Path(pathSelectorOrElement) {
    var _a = getPath_1.convertToPathData(pathSelectorOrElement),
        data = _a.data,
        stringData = _a.stringData;

    this.data = data;
    this.stringData = stringData;
  }

  Path.prototype.getData = function () {
    return this.data;
  };

  Path.prototype.getStringData = function () {
    return this.stringData || (this.stringData = this.render());
  };

  Path.prototype.render = function (formatter) {
    if (formatter === void 0) {
      formatter = math_1.round;
    }

    var pathData = this.data;
    var result = [];

    for (var i = 0; i < pathData.length; i++) {
      var n = pathData[i];
      result.push(constants_1.MOVE_CURSOR, formatter(n[0]), formatter(n[1]), constants_1.DRAW_CURVE_CUBIC_BEZIER);
      var lastResult = void 0;

      for (var f = 2; f < n.length; f += 6) {
        var p0 = formatter(n[f]);
        var p1 = formatter(n[f + 1]);
        var p2 = formatter(n[f + 2]);
        var p3 = formatter(n[f + 3]);
        var dx = formatter(n[f + 4]);
        var dy = formatter(n[f + 5]);
        var isPoint = p0 == dx && p2 == dx && p1 == dy && p3 == dy;

        if (!isPoint || lastResult != (lastResult = '' + p0 + p1 + p2 + p3 + dx + dy)) {
          result.push(p0, p1, p2, p3, dx, dy);
        }
      }
    }

    return result.join(constants_1.SPACE);
  };

  return Path;
}();

path.Path = Path;

Object.defineProperty(interpolate$2, "__esModule", {
  value: true
});
var interpolatePath_1 = interpolatePath$1;
var path_1$1 = path;

function interpolate$1(paths, options) {
  return interpolatePath_1.interpolatePath(paths.map(function (path) {
    return new path_1$1.Path(path);
  }), options || {});
}

interpolate$2.interpolate = interpolate$1;

Object.defineProperty(lib, "__esModule", {
  value: true
});
var interpolate_1 = interpolate$2;
var interpolate = lib.interpolate = interpolate_1.interpolate;
var path_1 = path;
lib.Path = path_1.Path;

class MyEffect extends MotorCortex__default["default"].Effect {
  onGetContext() {
    this.interpolator = interpolate([this.initialValue, this.animAttributes.d], {
      addPoints: this.attrs.addPoints || 0,
      origin: {
        x: this.attrs.originX || 0,
        y: this.attrs.originY || 0
      },
      precision: this.attrs.precision || "fill"
    });
  }

  getScratchValue() {
    return this.element.getAttribute("d");
  }

  onProgress(ms) {
    this.element.setAttribute("d", this.interpolator(this.getFraction(ms)));
  }

}

var name = "@donkeyclip/motorcortex-polymorph";
var version = "2.2.0";

var index = {
  npm_name: name,
  // don't touch this
  version: version,
  // don't touch this
  incidents: [{
    exportable: MyEffect,
    name: "Polymorph",
    attributesValidationRules: {
      animatedAttrs: {
        type: "object",
        props: {
          d: {
            optional: false,
            type: "string"
          }
        }
      },
      addPoints: {
        optional: true,
        type: "number",
        min: 0
      },
      originX: {
        optional: true,
        type: "number",
        min: 0,
        max: 1
      },
      originY: {
        optional: true,
        type: "number",
        min: 0,
        max: 1
      },
      precision: {
        optional: true,
        type: "number",
        min: 0,
        max: 100
      }
    }
  }]
};

module.exports = index;
