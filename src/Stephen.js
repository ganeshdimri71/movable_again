
export const transformVectorMaintainingProportions = ( movedVector, toTransformVector, endVector, offset ) => {
    const diffVector = [ movedVector[ 0 ] - endVector[ 0 ], movedVector[ 1 ] - endVector[ 1 ] ];
    let diffMovableVector = [ toTransformVector[ 0 ] - endVector[ 0 ], toTransformVector[ 1 ] - endVector[ 1 ] ];

    const newDiffVector = [ diffVector[ 0 ] + offset[ 0 ], diffVector[ 1 ] + offset[ 1 ] ];
    const angle = getAngleOfLine( [ newDiffVector, [ 0, 0 ] ] ) - getAngleOfLine( [ diffVector, [ 0, 0 ] ] );

    const diffVectorRotated = geometric.pointRotate( diffVector, angle );
    const scale = geometric.lineLength( [ newDiffVector, [ 0, 0 ] ] ) / geometric.lineLength( [ diffVectorRotated, [ 0, 0 ] ] );

    diffMovableVector = geometric.pointRotate( diffMovableVector, angle );
    diffMovableVector = [ diffMovableVector[ 0 ]  scale, diffMovableVector[ 1 ]  scale ];
    return [ diffMovableVector[ 0 ] + endVector[ 0 ], diffMovableVector[ 1 ] + endVector[ 1 ] ];


}