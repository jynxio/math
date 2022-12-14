// 几何体的类
// ======================================================================================================
/**
 * 点类。
 * @param { number[] } [ position = [0, 0, 0] ] - （可选）点的坐标，格式为[x, y, z]，默认值为[0, 0, 0]。
 * @returns { Object } - 点类的实例，拥有position属性，以及setPosition方法。
 * @example
 * new f( [ 0, 0, 0 ] ); // return { position: [ 0, 0, 0 ] }
 */
export function Point ( position = [ 0, 0, 0 ] ) {

    // position属性 - 存储了点的坐标
    this.position = [ ...position ];

    // setPosition方法
    this.setPosition = position => {

        this.position = [ ...position ];

        return this;

    };

}

/**
 * 直线类。
 * @param { number[] } [ position_start = [0, 0, 0] ] - （可选）起始点的坐标，格式为[x, y, z]，默认值为[0, 0, 0]。
 * @param { number[] } [ position_end = [0, 1, 0] ] - （可选）终止点的坐标，格式为[x, y, z]，默认值为[0, 1, 0]。
 * @returns { Object } - 线类的实例，拥有position、direction属性，以及setPosition、setDirection方法。
 * @example
 * new f( [ 0, 0, 0 ], [ 2, 0, 0 ] ); // return { position: [ 0, 0, 0 ], direction: [ 1, 0, 0 ] }
 */
export function Line ( position_start = [ 0, 0, 0 ], position_end = [ 0, 1, 0 ] ) {

    // position属性 - 存储了点的坐标
    this.position = [ ...position_start ];

    // direction属性 - 存储了该直线的单位方向向量，该直线的方向是point_start->point_end
    this.direction = calculateVector( position_start, position_end );
    this.direction = calculateUnitVector( this.direction );

    // setPosition方法
    this.setPosition = position => {

        this.position = [ ...position ];

        return this;

    };

    // setDirection方法
    this.setDirection = direction => {

        this.direction = [ ...direction ];

        return this;

    };

}

/**
 * 平面类。
 * @param { number[] } [ position = [0, 0, 0] ] - 平面上任意一点的坐标，格式为[x, y, z]，默认值为[0, 0, 0]。
 * @param { number[] } [ normal_vector = [0, 1, 0] ] - 平面的法向量，格式为[x, y, z]，默认值为[0, 1, 0]。
 * @returns { Object } - 平面类的实例，拥有position、normalVector属性，以及setPosition、setNormalVector方法。
 * @example
 * new f( [ 0, 0, 0 ], [ 0, 2, 0 ] ); // return { position: [ 0, 0, 0 ], normalVector: [ 0, 1, 0 ] }
 */
export function Plane ( position = [ 0, 0, 0 ], normal_vector = [ 0, 1, 0 ] ) {

    // position属性 - 存储了点的坐标
    this.position = [ ...position ];

    // normalVector属性 - 存储了该平面的单位法向量。
    this.normalVector = calculateUnitVector( normal_vector );

    // setPosition方法
    this.setPosition = position => {

        this.position = [ ...position ];

        return this;

    };

    // setNormalVector方法
    this.setNormalVector = normal_vector => {

        this.normalVector = [ ...normal_vector ];

        return this;

    };

}

// 基础的算术
// ======================================================================================================
/**
 * 判断两个数字值是否相等。
 * @param { number } number_a - 数字值a。
 * @param { number } number_b - 数字值b。
 * @returns { boolean } - 若相等，则返回true，否则返回false。
 * @example
 * f( 0.1 + 0.2, 0.3 ); // return true
 */
export function isNumberEqual ( number_a, number_b ) {

    return Math.abs( number_a - number_b ) < Number.EPSILON;

}

/**
 * 判断两个向量是否相等。
 * @param { number[] } vector_a - 向量a。
 * @param { number[] } vector_b - 向量b。
 * @returns { boolean } - 若相等，则返回true，否则返回false。
 * @example
 * f( [ 1, 0, 0 ], [ 1, 0, 0 ] ); // return true
 */
export function isVectorEqual ( vector_a, vector_b ) {

    return isNumberEqual( vector_a[ 0 ], vector_b[ 0 ] )
        && isNumberEqual( vector_a[ 1 ], vector_b[ 1 ] )
        && isNumberEqual( vector_a[ 2 ], vector_b[ 2 ] );

}

/**
 * 判断两个坐标是否相等（该方法是isVectorEqual的别名）。
 * @param { number[] } position_a - 坐标a。
 * @param { number[] } position_b - 坐标b。
 * @returns { boolean } - 若相等，则返回true，则返回false。
 * @example
 * f( [ 1, 0, 0 ], [ 1, 0, 0 ] ); // return true
 */
export function isPositionEqual ( position_a, position_b ) {

    return isVectorEqual( position_a, position_b );

}

/**
 * 计算并返回向量ab。
 * @param { number[] } position_a - 点a的坐标，格式为[x, y, z]。
 * @param { number[] } position_b - 点b的坐标，格式为[x, y, z]。
 * @returns { number[] } - 向量ab，格式为[x, y, z]。
 * @example
 * f( [ 0, 0, 0 ], [ 1, 0, 0 ] ); // return [ 1, 0, 0 ]
 */
export function calculateVector ( position_a, position_b ) {

    return ( [
        position_b[ 0 ] - position_a[ 0 ],
        position_b[ 1 ] - position_a[ 1 ],
        position_b[ 2 ] - position_a[ 2 ],
    ] );

}

/**
 * 计算并返回向量的模。
 * @param { number[] } vector - 向量，格式为[x, y, z]。
 * @returns { number } - 向量的模。
 * @example
 * f( [ 2, 0, 0 ] ); // return 2
 */
export function calculateNorm ( vector ) {

    return Math.hypot( ...vector );

}

/**
 * 计算并返回一个向量的单位向量，该方法不会改变原向量。
 * @param { number[] } vector - 向量，格式为[x, y, z]。
 * @returns { number[] } - 单位向量。
 * @example
 * f( [ 2, 0, 0 ] ); // return [ 1, 0, 0 ]
 */
export function calculateUnitVector ( vector ) {

    const norm = calculateNorm( vector );

    return ( [
        vector[ 0 ] / norm,
        vector[ 1 ] / norm,
        vector[ 2 ] / norm,
    ] );

}

/**
 * 计算并返回2个向量的夹角，夹角属于[0, π]，夹角的单位为弧度。
 * @param { number[] } vector_a - 向量a，格式为[x, y, z]。
 * @param { number[] } vector_b - 向量b，格式为[x, y, z]。
 * @returns { number } - 向量的夹角。
 * @example
 * f( [ 1, 0, 0 ], [ - 1, 0, 0 ] ); // return 0
 */
export function calculateAngleBetweenVectorAndVector ( vector_a, vector_b ) {

    const norm_a = calculateNorm( vector_a );
    const norm_b = calculateNorm( vector_b );

    if ( isNumberEqual( norm_a, 0 ) || isNumberEqual( norm_b, 0 ) ) {

        console.warn( "执行中断：因为该方法无法处理零向量" );

        return;

    }

    const cross_product = calculateCrossProduct( vector_a, vector_b );
    const scalar_product = calculateScalarProduct( vector_a, vector_b );

    const sin = calculateNorm( cross_product ) / norm_a / norm_b;
    const cos = scalar_product / norm_a / norm_b;
    const tan = sin / cos;

    const angle_1 = Math.atan( tan ); // 值域为[-π/2, π/2]

    if ( angle_1 > 0 ) return angle_1;
    if ( angle_1 < 0 ) return angle_1 + Math.PI;
    if ( Object.is( angle_1, 0 ) ) return 0;
    if ( Object.is( angle_1, - 0 ) ) return Math.PI;

    console.warn( "执行错误：发生了意外的情况" );

}

/**
 * 计算并返回2个向量的点积。
 * @param { number[] } vector_a - 向量a，格式为[x, y, z]。
 * @param { number[] } vector_b - 向量b，格式为[x, y, z]。
 * @returns { number } - 点积，是一个标量。
 * @example
 * f( [ 1, 0, 0 ], [ 0, 1, 0 ] ); // return 1
 */
export function calculateScalarProduct( vector_a, vector_b ) {

    const scalar_product
        = vector_a[ 0 ] * vector_b[ 0 ]
        + vector_a[ 1 ] * vector_b[ 1 ]
        + vector_a[ 2 ] * vector_b[ 2 ];

    return scalar_product;

}

/**
 * 计算并返回2个向量的叉积。
 * @param { number[] } vector_a - 向量a，格式为[x, y, z]。
 * @param { number[] } vector_b - 向量b，格式为[x, y, z]。
 * @returns { number } - 叉积，是一个向量，该向量将会垂直于由vectorA和vectorB所组成的平面，不过如果该向量的模为0，则代表vectorA和vectorB共线了。
 * @example
 * f( [ 1, 0, 0 ], [ 0, 1, 0 ] ); // return [ 0, 0, 1 ]
 */
export function calculateCrossProduct ( vector_a, vector_b ) {

    const cross_product = [
        vector_a[ 1 ] * vector_b[ 2 ] - vector_b[ 1 ] * vector_a[ 2 ],
        vector_b[ 0 ] * vector_a[ 2 ] - vector_a[ 0 ] * vector_b[ 2 ],
        vector_a[ 0 ] * vector_b[ 1 ] - vector_b[ 0 ] * vector_a[ 1 ],
    ];

    return cross_product;

}

/**
 * 计算并返回3个向量的混合积。
 * @param { number[] } vector_a - 向量a，格式为[x, y, z]。
 * @param { number[] } vector_b - 向量b，格式为[x, y, z]。
 * @param { number[] } vector_c - 向量c，格式为[x, y, z]。
 * @returns { number } - 混合积，是一个标量。
 * @example
 * f( [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ); // return 2
 */
export function calculateMixedProduct( vector_a, vector_b, vector_c ) {

    const cross_product = calculateCrossProduct( vector_a, vector_b );
    const scalar_product = calculateScalarProduct( cross_product, vector_c );

    return scalar_product;

}

// 几何的算术
// ======================================================================================================
/**
 * 计算并返回点和点之间的距离，以及距离线段的两个端点。
 * @param { Object } point_a - 点a，是Point类的实例，返回值中的point_start的坐标就等于该点的position。
 * @param { Object } point_b - 点b，是Point类的实例，返回值中的point_end的坐标就等于该点的position。
 * @returns { Object } - 一个拥有distance、points的普通对象。
 * @example
 * const p_a = new Point( [ 0, 0, 0 ] );
 * const p_b = new Point( [ 1, 0, 0 ] );
 * f( p_a, p_b ); // return { distance: 1, points: [ point_start, point_end ] }
 */
export function calculateDistanceBetweenPointAndPoint ( point_a, point_b ) {

    const position_a = [ ...point_a.position ];
    const position_b = [ ...point_b.position ];

    const distance = Math.hypot(
        position_a[ 0 ] - position_b[ 0 ],
        position_a[ 1 ] - position_b[ 1 ],
        position_a[ 2 ] - position_b[ 2 ],
    );

    const point_start = new Point( position_a );
    const point_end = new Point( position_b );

    const result = { distance, points: [ point_start, point_end ] };

    return result;

}

/**
 * 计算并返回点和直线之间的距离，以及距离线段的两个端点。
 * @param { Object } point - 点，是Point类的实例，返回值中的point_start的坐标就等于该点的position。
 * @param { Object } line - 直线，是Line类的实例，返回值中的point_end的坐标就等于point在line上的投影。
 * @returns { Object } - 一个拥有distance、points的普通对象。
 * @example
 * const p = new Point( [ 0, 0, 0 ] );
 * const l = new Line( [ 1, 0, 0 ], [ 0, 1, 0 ] );
 * f( p, l ); // return { distance: 1, points: [ point_start, point_end ] }
 */
export function calculateDistanceBetweenPointAndLine ( point, line ) {

    const point_start = new Point( [ ...point.position ] );
    const point_end = calculateProjectionOfPointOnLine( point, line );

    return calculateDistanceBetweenPointAndPoint( point_start, point_end );

}

/**
 * 计算并返回点和平面之间的距离，以及距离线段的两个端点。
 * @param { Object } point - 点，是Point类的实例，返回值中的point_start的坐标就等于该点的position。
 * @param { Object } plane - 面，是Plane类的实例，返回值中的point_end的坐标就等于point在plane上的投影。
 * @returns { Object } - 一个拥有distance、points的普通对象。
 * @example
 * const point = new Point( [ 0, 1, 0 ] );
 * const plane = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( point, plane ); // return { distance: 1, points: [ point_start, point_end ] }
 */
export function calculateDistanceBetweenPointAndPlane ( point, plane ) {

    const point_start = new Point( [ ...point.position ] );
    const point_end = calculateProjectionOfPointOnPlane( point, plane );

    return calculateDistanceBetweenPointAndPoint( point_start, point_end );

}

/**
 * 计算并返回直线和直线之间的距离，以及距离线段的两个端点。
 * @param { Object } line_a - 直线a，是Line类的实例。
 * @param { Object } line_b - 直线b，是Line类的实例。
 * @returns { Object } - 一个拥有distance、points的普通对象。
 * @exmaple
 * const l_1 = new Line( [ 0, 0, 0 ], [ 1, 0, 0 ] );
 * const l_2 = new Line( [ 0, 1, 0 ], [ 1, 1, 0 ] );
 * const l_3 = new Line( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * const l_4 = new Line( [ 0, 1, 1 ], [ 0, 1, 0 ] );
 * f( l_1, l_2 ); // return { distance: 1, points: [ point_start, point_end ] }
 * f( l_1, l_3 ); // return { distance: 0, points: [ point_start, point_end ] }
 * f( l_1, l_4 ); // return { distance: 1, points: [ point_start, point_end ] }
 */
export function calculateDistanceBetweenLineAndLine ( line_a, line_b ) {

    const relation = calculateRelationBetweenLineAndLine( line_a, line_b );

    if ( relation === 0 ) { // 异面

        // TODO - 请完成异面的计算

    }

    if ( relation === 1 ) { // 平行

        const point = new Point( [ ...line_a.position ] );

        return calculateDistanceBetweenPointAndLine( point, line_b );

    }

    if ( relation === 2 ) { // 相交

        const point_start = calculateIntersectionOfLineAndLine( line_a, line_b );
        const point_end = new Point( point_start.position );

        return { distance: 0, points: [ point_start, point_end ] };

    }

    console.warn( "执行错误：该方法发生了意料之外的情况" );

}

/**
 * 计算并返回直线和平面之间的距离，以及距离线段的两个端点。
 * @param { Object } line - 直线，是Line类的实例。
 * @param { Object } plane - 平面，是Plane类的实例。
 * @returns { Object } - 一个拥有distance、points的普通对象。如果直线和平面会相交，那么返回值中的point_start和
 * point_end就等于交点。如果直线和平面会平行，那么line的position就是返回值中的position_start，line的position在
 * 平面上的投影点就是返回值中的position_end。
 * @example
 * const l = new Line( [ 0, 1, 0 ], [ 1, 1, 0 ] );
 * const p = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * l( l, p ); // return { distance: 1, points: [ point_start, point_end ] }
 */
export function calculateDistanceBetweenLineAndPlane ( line, plane ) {

    const relation = calculateRelationBetweenLineAndPlane( line, plane );

    if ( relation === 1 ) { // line和plane平行

        const point_start = new Point( [ ...line.position ] );
        const point_end = calculateProjectionOfPointOnPlane( point_start, plane );

        return calculateDistanceBetweenPointAndPoint( point_start, point_end );

    }

    if ( relation === 2 ) { // line和plane相交

        const point_a = new Point( [ ...line.position ] );                   // line的position点
        const point_b = calculateProjectionOfPointOnPlane( point_a, plane ); // point_a在plane上的投影点

        const position_a = point_a.position;
        const position_b = point_b.position;

        const vector_ab = calculateVector( position_a, position_b );
        const vector_ac = [ ...line.direction ];                     // line的方向向量

        const angle_bac = calculateAngleBetweenVectorAndVector( vector_ab, vector_ac );

        const distance_ab = calculateNorm( vector_ab );
        const distance_ac = distance_ab / Math.cos( angle_bac );

        const vector_ac_unit = calculateUnitVector( vector_ac );
        const position_c = [
            position_a[ 0 ] + distance_ac * vector_ac_unit[ 0 ],
            position_a[ 1 ] + distance_ac * vector_ac_unit[ 1 ],
            position_a[ 2 ] + distance_ac * vector_ac_unit[ 2 ],
        ];

        const point_start = new Point( position_c );
        const point_end = new Point( position_c );

        return { distance: 0, points: [ point_start, point_end ] };

    }

    console.warn( "执行错误：该方法发生了意料之外的情况" );

}

/**
 * 计算并返回平面和平面之间的距离，以及相交线或距离线段的两个端点。
 * @param { Object } plane_a - 平面a，是Plane类的实例。
 * @param { Object } plane_b - 平面b，是Plane类的实例。
 * @returns { Object } - 一个拥有distance的普通对象。如果plane_a和plane_b会相交，那么还会额外返回一个lines属
 * 性，lines[0]是plane_a和plane_b的相交直线。如果plane_a和plane_b不会相交，那么还会额外返回一个points属性，其中
 * 的position_start就是plane_a的position，position_end就是position_start在plane_b上的投影点。
 * @example
 * const p_a = new Plane( [ 0, 2, 0 ], [ 0, 1, 0 ] );
 * const p_b = new Plane( [ 0, 1, 0 ], [ 0, 1, 0 ] );
 * const p_c = new Plane( [ 0, 1, 0 ], [ 0, 1, 1 ] );
 * f( p_a, p_b ); // return { distance: 1, points: [ point_start, point_end ] }
 * f( p_a, p_b ); // return { distance: 0, lines: [ line ] }
 */
export function calculateDistanceBetweenPlaneAndPlane ( plane_a, plane_b ) {

    const relation = calculateRelationBetweenPlaneAndPlane( plane_a, plane_b );

    if ( relation === 1 ) { // plane_a和plane_b平行

        const point = new Point( [ ...plane_a.position ] );

        return calculateDistanceBetweenPointAndPlane( point, plane_b );

    }

    if ( relation === 2 ) { // plane_a和plane_b相交

        const intersection_direction = calculateCrossProduct( plane_a.normalVector, plane_b.normalVector );
        const temp_direction = calculateCrossProduct( plane_a.normalVector, intersection_direction );
        const temp_line = new Line().setPosition( plane_a.position ).setDirection( temp_direction );
        const intersection_position = calculateIntersectionOfLineAndPlane( temp_line, plane_b ).position;
        const intersection_line = new Line().setPosition( intersection_position ).setDirection( intersection_direction );

        return { distance: 0, lines: [ intersection_line ] };

    }

    console.warn( "执行错误：该方法发生了意料之外的情况" );

}

/**
 * 计算并返回直线和直线之间的夹角，夹角属于[0, π]，夹角的单位为弧度。
 * @param { Object } line_a - 直线a，是Line类的实例。
 * @param { Object } line_b - 直线b，是Line类的实例。
 * @returns { number | undefined } 若两线异面，则返回undefined；若两线平行但不重合，则返回undefined；若两线相交或重合，则返回两线的夹角。
 * @example
 * const l_1 = new Line( [ 0, 0, 0 ], [ 1, 0, 0 ] );
 * const l_2 = new Line( [ 0, 0, 0 ], [ - 1, 0, 0 ] );
 * f( l_1, l_2 ); // return Math.PI
 */
export function calculateAngleBetweenLineAndLine ( line_a, line_b ) {

    const relation = calculateRelationBetweenLineAndLine( line_a, line_b );

    /* 如果两线异面，则返回undefined */
    if ( relation === 0 ) return;

    /* 如果两线平行但不重合，则返回undefined */
    if ( relation === 1 && calculateRelationBetweenPointAndLine( new Point( line_a.position ), line_b ) === 0 ) return;

    /* 如果两线重合或相交，则返回两线的夹角 */
    return calculateAngleBetweenVectorAndVector( line_a.direction, line_b.direction );

}

export function calculateAngleBetweenLineAndPlane ( line, plane ) {

    // TODO 我不知道甲方是需要[0, π]还是[0, π/2]值域的夹角，因此该函数的实现暂时搁置。

}

/**
 * 计算并返回平面和平面之间的夹角，夹角属于[0, π]，夹角的单位为弧度。
 * @param { Object } plane_a - 平面a，是Plane类的实例。
 * @param { Object } plane_b - 平面b，是Plane类的实例。
 * @returns { number | undefined } 若两面平行且不重合，则返回undefined；若两面重合或相交，则返回两面的夹角（当两面重合且法向量的方向相同时，两面的夹角为π，当两面重合且法向量的方向相反时，两面的夹角为0）。
 */
export function calculateAngleBetweenPlaneAndPlane ( plane_a, plane_b ) {

    const relation = calculateRelationBetweenPlaneAndPlane( plane_a, plane_b );

    /* 如果两面平行且补充和，则返回undefined */
    if ( relation === 1 && calculateRelationBetweenPointAndPlane( new Point( plane_a.position ), plane_b ) === 0 ) return;

    /* 如果两面重合或相交，则返回两面的夹角 */
    return Math.PI - calculateAngleBetweenVectorAndVector( plane_a.normalVector, plane_b.normalVector );

}

/**
 * 计算并返回直线和直线的交点。
 * @param { Object } line_a - 直线a，是Line类的实例。
 * @param { Object } line_b - 直线b，是Line类的实例。
 * @returns { Object | undefined } - 如果两条直线会相交，那么就会返回交点，交点是Point类的实例。如果两条直线不会相交（异面或平行），那么就会返回undefined。
 * @example
 * const l_a = new Line( [ 0, 1, 0 ], [ 1, 0, 0 ] );
 * const l_b = new Line( [ 1, 0, 0 ], [ 0, 1, 0 ] );
 * f( l_a, l_b ); // return point
 */
export function calculateIntersectionOfLineAndLine ( line_a, line_b ) {

    const relation = calculateRelationBetweenLineAndLine( line_a, line_b );

    /* 异面或平行 */
    if ( relation === 0 || relation === 1 ) return undefined;

    /* 相交 */
    if ( isPositionEqual( line_a.position, line_b.position ) ) return new Point( line_a.position );

    const vector_ac = [ ...line_a.direction ];                             // 假设line_a的position为点a，假设line_a和line_b的交点为点c
    const vector_bc = [ ...line_b.direction ];                             // 假设line_b的position为点b，假设line_a和line_b的交点为点c
    const vector_ab = calculateVector( line_a.position, line_b.position ); //

    const sin_angle_a = Math.sin( calculateAngleBetweenVectorAndVector( vector_ab, vector_ac ) );
    const sin_angle_c = Math.sin( calculateAngleBetweenVectorAndVector( vector_ac, vector_bc ) );

    const distance_ab = calculateDistanceBetweenPointAndPoint( new Point( line_a.position ), new Point( line_b.position ) ).distance;
    const distance_bc = distance_ab * sin_angle_a / sin_angle_c;

    const unit_vector_bc = calculateUnitVector( vector_bc );

    const position_b = [ ...line_b.position ];
    const position_c = [
        position_b[ 0 ] + distance_bc * unit_vector_bc[ 0 ],
        position_b[ 1 ] + distance_bc * unit_vector_bc[ 1 ],
        position_b[ 2 ] + distance_bc * unit_vector_bc[ 2 ],
    ];

    return new Point( position_c );

}

/**
 * 计算并返回直线和平面的交点。
 * @param { Object } line - 直线，是Line类的实例。
 * @param { Object } plane - 平面，是Plane类的实例。
 * @returns { Object | undefined } - 如果直线和平面会相交，那么就会返回交点，交点是Point类的实例。如果平面和直线不会相交，那么就会返回undefined。
 * @example
 * const l_1 = new Line( [ 0, 1, 0 ], [ 1, 1, 0 ] );
 * const l_2 = new Line( [ 0, 1, 0 ], [ 0, 2, 0 ] );
 * const p = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( l_1, p ); // return undefined
 * f( l_2, p ); // return point
 */
export function calculateIntersectionOfLineAndPlane ( line, plane ) {

    const relation = calculateRelationBetweenLineAndPlane( line, plane );

    /* 平行 */
    if ( relation === 1 ) return undefined;

    /* 相交 */
    const point_a = new Point( [ ...line.position ] );                   // line的position点
    const point_b = calculateProjectionOfPointOnPlane( point_a, plane ); // point_a在plane上的投影点

    const position_a = point_a.position;
    const position_b = point_b.position;

    if ( isPositionEqual( position_a, position_b ) ) return point_a;

    const vector_ab = calculateVector( position_a, position_b );
    const vector_ab_norm = calculateNorm( vector_ab );
    const vector_ac = [ ...line.direction ];                     // line的方向向量
    const vector_ac_unit = calculateUnitVector( vector_ac );

    const angle = calculateAngleBetweenVectorAndVector( vector_ab, vector_ac );
    const distance = vector_ab_norm / Math.cos( angle );

    const position_intersection = [
        position_a[ 0 ] + distance * vector_ac_unit[ 0 ],
        position_a[ 1 ] + distance * vector_ac_unit[ 1 ],
        position_a[ 2 ] + distance * vector_ac_unit[ 2 ],
    ];
    const point_intersection = new Point( position_intersection );

    return point_intersection;

}

/**
 * 计算并返回点在直线上的投影点。
 * @param { Object } point - 点，是Point类的实例。
 * @param { Object } line - 直线，是Line类的实例。
 * @returns { Object } - 投影点，是Point类的实例。
 * @example
 * const p = new Point( [ 1, 0, 0 ] );
 * const l = new Line( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( p, l ); // return pointProjection
 */
export function calculateProjectionOfPointOnLine ( point, line ) {

    const position_line = [ ...line.position ];
    const position_point = [ ...point.position ];

    if ( isPositionEqual( position_line, position_point ) ) return new Point( position_point );

    const vector_line_to_poine = calculateVector( position_line, position_point );
    const vector_line_direction = [ ...line.direction ];
    const norm_vector_line_direction = calculateNorm( vector_line_direction );
    const unit_vector_line_direction = calculateUnitVector( vector_line_direction );

    const projected_distance = calculateScalarProduct( vector_line_direction, vector_line_to_poine ) / norm_vector_line_direction; // 向量vector_line_to_poine在向量vector_line_direction上的有向投影长度
    const projected_position = [
        position_line[ 0 ] + projected_distance * unit_vector_line_direction[ 0 ],
        position_line[ 1 ] + projected_distance * unit_vector_line_direction[ 1 ],
        position_line[ 2 ] + projected_distance * unit_vector_line_direction[ 2 ],
    ];

    return new Point( projected_position );

}

/**
 * 计算并返回点在平面上的投影点。
 * @param { Object } point - 点，是Point类的实例。
 * @param { Object } plane - 面，是Plane类的实例。
 * @returns { Object } - 投影点，是Point类的实例。
 * @example
 * const point = new Point( [ 1, 0, 0 ] );
 * const plane = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( point, plane ); // return pointProjection
 */
export function calculateProjectionOfPointOnPlane ( point, plane ) {

    const position_point = [ ...point.position ];
    const position_plane = [ ...plane.position ];

    if ( isPositionEqual( position_point, position_plane ) ) return new Point( position_point );

    const vector_plane_to_point = calculateVector( position_plane, position_point );
    const vector_plane_normal = [ ...plane.normalVector ];
    const norm_vector_plane_normal = calculateNorm( vector_plane_normal );
    const unit_vector_plane_normal = calculateUnitVector( vector_plane_normal );
    const reverse_unit_vector_plane_normal = unit_vector_plane_normal.map( item => - item );

    const projected_distance = calculateScalarProduct( vector_plane_normal, vector_plane_to_point ) / norm_vector_plane_normal; // 向量vector_plane_to_poine在向量vector_plane_normal上的有向投影长度
    const projected_position = [
        position_point[ 0 ] + projected_distance * reverse_unit_vector_plane_normal[ 0 ],
        position_point[ 1 ] + projected_distance * reverse_unit_vector_plane_normal[ 1 ],
        position_point[ 2 ] + projected_distance * reverse_unit_vector_plane_normal[ 2 ],
    ];

    return new Point( projected_position );

}

/**
 * 计算并返回点和直线之间的空间关系。
 * @param { Object } point - 点，是Point类的实例。
 * @param { Line } line - 直线，是Line类的实例。
 * @returns { number } - 若返回0，则代表点不在直线上；若返回1，则代表点在直线上。
 * @example
 * const p_1 = new Point( [ 0, 1, 0 ] );
 * const p_2 = new Point( [ 0, 0, 0 ] );
 * const l = new Line( [ 0, 0, 0 ], [ 1, 0, 0 ] );
 * f( p_1, l ); // return 0
 * f( p_2, l ); // return 1
 */
export function calculateRelationBetweenPointAndLine ( point, line ) {

    let real_ratio;

    point.position.forEach( ( item, index ) => {

        const ratio = ( item - line.position[ index ] ) / line.direction[ index ]

        if ( !Object.is( NaN, ratio ) ) real_ratio = ratio;

    } );

    return +point.position.every( ( item, index ) => {

        return isNumberEqual( item, line.position[ index ] + real_ratio * line.direction[ index ] );

    } );

}

/**
 * 计算并返回点和平面之间的空间关系。
 * @param { Object } point - 点，是Point类的实例。
 * @param { Object } plane - 平面，是Plane类的实例。
 * @returns { number } - 若返回0，则代表点不在平面上；若返回1，则代表点在平面上。
 * @example
 * const point = new Point( 0, 1, 0 );
 * const plane = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( point, plane ); // return 0;
 */
export function calculateRelationBetweenPointAndPlane ( point, plane ) {

    if ( isPositionEqual( point.position, plane.position ) ) return 1;

    const vector_1 = calculateVector( plane.position, point.position );
    const vector_2 = [ ...plane.normalVector ];

    const scalar_product = calculateScalarProduct( vector_1, vector_2 );

    if ( isNumberEqual( scalar_product, 0 ) ) return 1;

    return 0;

}

/**
 * 计算并返回直线与直线之间的空间关系。
 * @param { number[] } line_a - 直线a，是Line类的实例。
 * @param { number[] } line_b - 直线b，是Line类的实例。
 * @returns { number } - 若返回0，则代表两直线异面；若返回1，则代表两直线平行；若返回2，则代表两直线相交。
 * @example
 * const l_a = new Line( [ 0, 1, 0 ], [ 1, 1, 0 ] );
 * const l_b = new Line( [ 0, 0, 0 ], [ 1, 0, 0 ] );
 * f( l_a, l_b ); // return 1
 */
export function calculateRelationBetweenLineAndLine ( line_a, line_b ) {

    // ---------------------------------------- 思路 ----------------------------------------
    // # 若混合积不等于0，则代表两条直线异面
    // # 若混合积等于0，且叉积的模等于0，则代表两条直线平行
    // # 若混合积等于0，且叉积的模不等于0，则代表两条直线相交
    // ---------------------------------------- 思路 ----------------------------------------

    const position_a = [ ...line_a.position ];
    const position_b = [ ...line_b.position ];
    const vector_direction_a = [ ...line_a.direction ];
    const vector_direction_b = [ ...line_b.direction ];

    if ( isPositionEqual( position_a, position_b ) ) return 2;

    const vector_position_a_to_b = calculateVector( position_a, position_b );

    const cross_product = calculateCrossProduct( vector_direction_a, vector_direction_b );
    const cross_product_norm = calculateNorm( cross_product );
    const mixed_product = calculateMixedProduct( vector_direction_a, vector_direction_b, vector_position_a_to_b );

    const is_cross_product_norm_equal_to_zero = isNumberEqual( cross_product_norm, 0 );
    const is_mixed_product_equal_to_zero = isNumberEqual( mixed_product, 0 );

    if ( !is_mixed_product_equal_to_zero ) return 0;
    if ( is_cross_product_norm_equal_to_zero ) return 1;
    if ( !is_cross_product_norm_equal_to_zero ) return 2;

    console.warn( "执行错误：该方法发生了意料之外的情况" );

}

/**
 * 计算并返回直线与平面之间的空间关系。
 * @param { Object } line - 直线，是Line类的实例。
 * @param { Object } plane - 平面，是Plane类的实例。
 * @returns { number } - 若返回1，则代表两者平行；若返回2，则代表两者相交。
 * @example
 * const l = new Line( [ 0, 1, 0 ], [ 1, 1, 0 ] );
 * const p = new Plane( [ 0, 0, 0 ], [ 0, 1, 0 ] );
 * f( l, p ); // return 1
 */
export function calculateRelationBetweenLineAndPlane ( line, plane ) {

    const vector_direction_line = [ ...line.direction ];
    const vector_direction_plane = [ ...plane.normalVector ];

    const scalar_product = calculateScalarProduct( vector_direction_line, vector_direction_plane );

    return isNumberEqual( scalar_product, 0 ) ? 1 : 2;

}

/**
 * 计算并返回平面和平面之间的空间关系。
 * @param { Object } plane_a - 平面a，是Plane类的实例。
 * @param { Object } plane_b - 平面b，是Plane类的实例。
 * @returns { number } - 若返回1，则代表两者平行；若返回2，则代表两者相交。
 * @example
 * const p_a = new Plane( [ 0, 1, 0 ], [ 0, - 1, 0 ] );
 * const p_b = new Plane( [ 0, - 1, 0 ], [ 0, 1, 0 ] );
 * f( p_a, p_b ); // return 1
 */
export function calculateRelationBetweenPlaneAndPlane ( plane_a, plane_b ) {

    const normal_vector_a = [ ...plane_a.normalVector ];
    const normal_vector_b = [ ...plane_b.normalVector ];

    const cross_product = calculateCrossProduct( normal_vector_a, normal_vector_b );
    const norm_cross_product = calculateNorm( cross_product );

    if ( isNumberEqual( norm_cross_product, 0 ) ) return 1;

    return 2;

}
