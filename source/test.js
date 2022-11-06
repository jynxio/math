import * as math from "./math";

// calculateAngleBetweenVectorAndVector
console.log(
    math.calculateAngleBetweenVectorAndVector( [ 1, 0, 0 ], [ - 1, 0, 0 ] )
);

// calculateScalarProduct
console.log(
    math.calculateScalarProduct( [ 1, 0, 0 ], [ 0, 1, 0 ] )
);

// calculateCrossProduct
console.log(
    math.calculateCrossProduct( [ 1, 0, 0 ], [ 0, 1, 0 ] )
);

// calculateMixedProduct
console.log(
    math.calculateMixedProduct( [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] )
);

// calculateDistanceBetweenPointAndPoint
console.log(
    math.calculateDistanceBetweenPointAndPoint( new math.Point( [ 0, 0, 0 ] ), new math.Point( [ 1, 0, 0 ] ) )
);

// calculateProjectionOfPointOnLine
console.log(
    math.calculateProjectionOfPointOnLine(
        new math.Point( [ 1, 0, 0 ] ),
        new math.Line( [ 0, 0, 0 ], [ 0, 1, 0 ] ),
    )
);

// calculateDistanceBetweenPointAndLine
console.log(
    math.calculateDistanceBetweenPointAndLine(
        new math.Point( [ 1, 0, 0 ] ),
        new math.Line( [ 0, 0, 0 ], [ 0, 1, 0 ] ),
    ),
);

// calculateDistanceBetweenPointAndPlane
console.log(
    math.calculateDistanceBetweenPointAndPlane(
        new math.Point( [ 1, 1, 0 ] ),
        new math.Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] ),
    ),
);

// calculateDistanceBetweenLineAndPlane
console.log(
    math.calculateDistanceBetweenLineAndPlane(
        new math.Line( [ - 1, - 1, - 1 ], [ 1, 1, 1 ] ),
        new math.Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] ),
    ),
);

// calculateDistanceBetweenPlaneAndPlane
console.log(
    math.calculateDistanceBetweenPlaneAndPlane(
        new math.Plane( [ 3, 0, 0 ], [ 1, 0, 0 ] ),
        new math.Plane( [ 0, 10, 0 ], [ 0, 1, 0 ] ),
    ),
);

// calculateIntersectionOfLineAndPlane
console.log(
    math.calculateIntersectionOfLineAndPlane(
        new math.Line( [ 1, 1, 1 ], [ 2, 2, 2 ] ),
        new math.Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] ),
    )
);
