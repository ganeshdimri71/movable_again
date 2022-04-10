import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getLinePoints, getMovableNodeRatio, setRatio, setXYCordinatesOfNodeBasedOnCordinate, getMovableLineYCordinate, getMovableNodeRatioForButtonC, getTemporaryXCordinateOfMovableNodes, getTemporaryYCordinateOfMovableNodes, getDifference, getDifferenceOne } from '../features/movableNodesSlice'
import useGeometrics from "../customHooks/useGeometrics";

const ButtonComponent = () => {
    const linePoints = useSelector(getLinePoints)
    const ratios = useSelector(getMovableNodeRatioForButtonC);
    const difference = useSelector(getDifference)
    const differenceOne = useSelector(getDifferenceOne)
    const Xcordinate = useSelector(getTemporaryXCordinateOfMovableNodes)
    const Ycordinate = useSelector(getTemporaryYCordinateOfMovableNodes)
    // const { distanceBetween2Points, getLineAngle, getTranslatePoint } = useGeometrics();
    // const dispatch = useDispatch()
    // const linePoints = useSelector(getLinePoints);
    // const ratioBetweenTwoLines = useSelector( getMovableNodeRatio )
    // const getMovableLineYCordinateFromRedux = useSelector( getMovableLineYCordinate );
    // const a = distanceBetween2Points( [ linePoints.x1, linePoints.y1 ], [ linePoints.x1, linePoints.y ] ) / 15
    // const b = distanceBetween2Points( [ linePoints.x1, linePoints.y ], [ linePoints.x, linePoints.y ] ) / 15
    // const c = Math.sqrt( a * a + b * b )
    // const d = distanceBetween2Points( [ linePoints.x, linePoints.y ], [ linePoints.x, linePoints.y ] ) / 15
    // const e = distanceBetween2Points( [ linePoints.x, linePoints.y ], [ linePoints.x, linePoints.y ] ) / 15
    // const f = Math.sqrt( d * d + e * e )  
    let x1 = linePoints.x1;
    let y1 = linePoints.y1;
    let x = linePoints.x;
    let y = linePoints.y;
    let x2 = linePoints.x2;
    let y2 = linePoints.y2;
    let c = Math.abs(x1 - x)
    let f = Math.abs(x - x2)
    // console.log("k", c, f)
    return (
        <div
            style={{
                position: 'absolute',
                top: '0px'
            }}>
            <div className='d-flex flex-direction-row justify-content-between'>
                <Button className="ms-2 bg-danger">x1: {x1}</Button>
                <Button className="ms-2 bg-danger" > y1: {y1}</Button>
                <Button className="ms-2 bg-success">x: {x},{Xcordinate}</Button>
                <Button className="ms-2 bg-success">y: {y}, {Ycordinate}</Button>
                <Button className="ms-2 bg-dark">x2: {x2}</Button>
                <Button className="ms-2 bg-dark">y2: {y2}</Button>
                <Button className="ms-2">Ratio between Two lines is {ratios}</Button>
                <Button className="ms-2">m1 Value {c}</Button>
                <Button className="ms-2" >m2  Value {f}</Button>
                <Button className="ms-2" > xDiff {difference}</Button>
                <Button className="ms-2" >y Diff {differenceOne}</Button>
            </div>
        </div>

    )
}

export default ButtonComponent