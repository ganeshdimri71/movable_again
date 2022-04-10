import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
  ReactReduxContext,
  Provider,
} from "react-redux";
import { Stage, Layer, Group, Line, Circle } from "react-konva";
import {
  setXYCordinatesOfNodeA,
  setXYCordinatesOfNodeB,
  setXYCordinatesOfNodeC,
  getLinePoints, setXYCordinatesOfNodeBBasedOnOffset, setYcordinateOfMovableNode, setRatio, setXYCordinatesOfNodeBAgain, getMovableNodeRatio, setRatios, getAngle, setConditioningVariable, setXYCordinatesOfNodeBAgainAfterJerk, getTemporaryXCordinateOfMovableNodes, getTemporaryYCordinateOfMovableNodes, getDifference, getDifferenceOne
} from "../src/features/movableNodesSlice";
import ButtonComponent from './components/ButtonComponent'
import useGeometrics from "./customHooks/useGeometrics";
// import { transformVectorMaintainingProportions } from './customHooks/useMovableNodesPoints'

const App = () => {
  const geometric = require("geometric");
  const [inXCoOfMvNode, setInXCoOfMvNode] = useState()
  const [inYCoOfMvNode, setInYCoOfMvNode] = useState()
  const [initialRender, setInitialRender] = useState(0)
  const [initialRenderTwo, setInitialRenderTwo] = useState(0)
  const [arrayOfMovableNodes, setArrayOfMovableNodes] = useState([])
  const [dragStartPos, setDragStartPos] = useState([0, 0])
  const dispatch = useDispatch()
  const linePoints = useSelector(getLinePoints);
  const ratios = useSelector(getMovableNodeRatio);
  const angle = useSelector(getAngle);
  const Xcordinate = useSelector(getTemporaryXCordinateOfMovableNodes)
  const Ycordinate = useSelector(getTemporaryYCordinateOfMovableNodes)

  const difference = useSelector(getDifference)
  const differenceOne = useSelector(getDifferenceOne)
  const [getDifferenceValueFromRedux, setGetDifferenceValueFromRedux] = useState()
  const [getDifferenceValueFromReduxTwo, setGetDifferenceValueFromReduxTwo] = useState()
  const { distanceBetween2Points, getLineAngle, getTranslatePoint } = useGeometrics();

  const a = distanceBetween2Points([linePoints.x1, linePoints.y1], [linePoints.x1, linePoints.y]) / 15
  const b = distanceBetween2Points([linePoints.x1, linePoints.y], [linePoints.x, linePoints.y]) / 15
  const c = Math.sqrt(a * a + b * b)
  const d = distanceBetween2Points([linePoints.x2, linePoints.y2], [linePoints.x2, linePoints.y]) / 15
  const e = distanceBetween2Points([linePoints.x, linePoints.y], [linePoints.x2, linePoints.y]) / 15
  const f = Math.sqrt(d * d + e * e)
  function calcangle(x00, y00, x01, y01, x10, y10, x11, y11) {
    var dx0 = x01 - x00;
    var dy0 = y01 - y00;
    var dx1 = x11 - x10;
    var dy1 = y11 - y10;
    var angle = Math.atan2(dx0 * dy1 - dx1 * dy0, dx0 * dx1 + dy0 * dy1);
    var angleInDegree = Math.abs(angle * 180 / 3.1415926);
    // console.log( 'angleInDegree', angleInDegree )
    return angleInDegree
  }
  function section(x1, x2, y1, y2, m, n) {
    // Applying section formula
    let x = ((n * x1) + (m * x2)) /
      (m + n);
    let y = ((n * y1) + (m * y2)) /
      (m + n);
    return [x, y]


    // Printing result
    document.write("(" + x + ", " + y + ")");
  }
  const getAngleOfLine = (line) => {
    let angle = geometric.lineAngle(line);
    if (angle < 0)
      angle += 360;
    return angle;
  }

  // const secondXcordinate = linePoints.x + Xcordinate
  // const secondYcordinate = linePoints.y + Ycordinate
  // console.log('secondXcordinate secondYcordinate', secondXcordinate, secondYcordinate)
  const transformVectorMaintainingProportions = (movedVector, toTransformVector, endVector, offset) => {
    const diffVector = [movedVector[0] - endVector[0], movedVector[1] - endVector[1]];
    let diffMovableVector = [toTransformVector[0] - endVector[0], toTransformVector[1] - endVector[1]];

    const newDiffVector = [diffVector[0] + offset[0], diffVector[1] + offset[1]];
    const angle = getAngleOfLine([newDiffVector, [0, 0]]) - getAngleOfLine([diffVector, [0, 0]]);

    const diffVectorRotated = geometric.pointRotate(diffVector, angle);
    const scale = geometric.lineLength([newDiffVector, [0, 0]]) / geometric.lineLength([diffVectorRotated, [0, 0]]);

    diffMovableVector = geometric.pointRotate(diffMovableVector, angle);
    diffMovableVector = [diffMovableVector[0] * scale, diffMovableVector[1] * scale];
    return [diffMovableVector[0] + endVector[0], diffMovableVector[1] + endVector[1]];
  }
  // console.log( ' inXCoOfMvNode: inXCoOfMvNode, inYCoOfMvNode: inYCoOfMvNode', inXCoOfMvNode, inYCoOfMvNode )
  const nodeDragStart = (e, color) => {
    const x = e.target.x();
    const y = e.target.y();
    setDragStartPos([x, y])
    if (color == 'red') {
      dispatch(setXYCordinatesOfNodeA({ xPos: x, yPos: y, }));
      dispatch(setXYCordinatesOfNodeB({ xPos: linePoints.x, yPos: linePoints.y }))
      dispatch(setConditioningVariable({ conditionVariable: true }))
    }
    else if (color == 'black') dispatch(setXYCordinatesOfNodeC({ xPos: x, yPos: y, }))
  };

  const nodeDragMove = (e, color) => {
    // setArrayOfMovableNodes( [ ...arrayOfMovableNodes, { x: linePoints.x, y: linePoints.y } ] )
    // console.log( 'arrayOfMovableNodes', arrayOfMovableNodes )
    const x = e.target.x();
    const y = e.target.y();
    const offset_y = (y - dragStartPos[1])
    const offset_x = (x - dragStartPos[0])
    if (color == 'red') {
      if (difference !== 0 || difference !== -1 || difference !== -2 || difference !== -3 || difference !== -4) {
        setGetDifferenceValueFromRedux(difference)
      }
      if (difference !== 0 || difference !== 1 || difference !== 2 || difference !== 3 || difference !== 4) {
        setGetDifferenceValueFromRedux(difference)
      }
      if (differenceOne !== 0 || differenceOne !== -1 || differenceOne !== -2 || differenceOne !== -3 || differenceOne !== -4) {
        setGetDifferenceValueFromReduxTwo(differenceOne)
      }
      if (differenceOne !== 0 || differenceOne !== 1 || differenceOne !== 2 || differenceOne !== 3 || differenceOne !== 4) {
        setGetDifferenceValueFromReduxTwo(differenceOne)
      }
      // const XandYCordinatesOfMovableNodes = transformVectorMaintainingProportions( [ linePoints.x1, linePoints.y1 ], [ linePoints.x, linePoints.y ], [ linePoints.x2, linePoints.y2 ], [ offset_x, offset_y ] )
      // console.log( 'XandYCordinatesOfMovableNodes', XandYCordinatesOfMovableNodes )
      // console.log('angle', angle)
      // console.log( 'm1,m2', ratios.m1, ratios.m2 )
      dispatch(setXYCordinatesOfNodeA({ xPos: x, yPos: y, }))
      // dispatch( setXYCordinatesOfNodeBAgain( { xPointsOfMovableNodes: XandYCordinatesOfMovableNodes[ 0 ], yPointsOfMovableNodes: XandYCordinatesOfMovableNodes[ 1 ], inXCoOfMvNode: 0, inYCoOfMvNode: 0 } ) );
      // console.log( 'linePoints.x,linePoints.y', linePoints.x, linePoints.y )
      const xCoOfMoNode = (linePoints.x2 * ratios.m1 + linePoints.x1 * ratios.m2) / (ratios.m1 + ratios.m2)
      const yCoOfMoNode = (linePoints.y2 * ratios.m1 + linePoints.y1 * ratios.m2) / (ratios.m1 + ratios.m2)
      // // const jerkPoints = section( linePoints.x1, linePoints.x2, linePoints.y1, linePoints.y2, ratios.m1, ratios.m2 )
      const pointsRotation = geometric.pointRotate([xCoOfMoNode, yCoOfMoNode], angle, [linePoints.x1, linePoints.y1])
      // dispatch( setXYCordinatesOfNodeBAgain( { xPointsOfMovableNodes: pointsRotation[ 0 ], yPointsOfMovableNodes: pointsRotation[ 1 ] } ) )
      if (initialRender == 0) {
        dispatch(setXYCordinatesOfNodeBAgain({
          xPointsOfMovableNodes: pointsRotation[0], yPointsOfMovableNodes: pointsRotation[1], inXCoOfMvNode: 0, inYCoOfMvNode: 0
        }))
        setInXCoOfMvNode(linePoints.x)
        setInYCoOfMvNode(linePoints.y)
      }
      else dispatch(setXYCordinatesOfNodeBAgain({ xPointsOfMovableNodes: pointsRotation[0], yPointsOfMovableNodes: pointsRotation[1], inXCoOfMvNode: 0, inYCoOfMvNode: 0, conditionVariable: false }));
      // console.log('linePoints.x,linePoints.y', linePoints.x, linePoints.y)
      // dispatch( setXYCordinatesOfNodeBAgain( { xPointsOfMovableNodes: XandYCordinatesOfMovableNodes[ 0 ], yPointsOfMovableNodes: XandYCordinatesOfMovableNodes[ 1 ], inXCoOfMvNode: 0, inYCoOfMvNode: 0 } ) );
      setInitialRender(prevState => prevState + 1)
      // dispatch( setXYCordinatesOfNodeBBasedOnOffset() );
    } else if (color == 'black') {
      dispatch(setXYCordinatesOfNodeC({ xPos: x, yPos: y, }));
      const xCoOfMoNode = (linePoints.x2 * ratios.m1 + linePoints.x1 * ratios.m2) / (ratios.m1 + ratios.m2)
      const yCoOfMoNode = (linePoints.y2 * ratios.m1 + linePoints.y1 * ratios.m2) / (ratios.m1 + ratios.m2)
      const pointsRotation = geometric.pointRotate([xCoOfMoNode, yCoOfMoNode], angle, [linePoints.x1, linePoints.y1])
      dispatch(setXYCordinatesOfNodeBAgain({ xPointsOfMovableNodes: pointsRotation[0], yPointsOfMovableNodes: pointsRotation[1] }));
      // dispatch( setXYCordinatesOfNodeBBasedOnOffset() );
    }
  };

  const nodeDragEnd = (e, color) => {
    const x = e.target.x();
    const y = e.target.y();
    if (color === 'red') dispatch(setXYCordinatesOfNodeA({ xPos: x, yPos: y, }));
    else if (color == 'black') dispatch(setXYCordinatesOfNodeC({ xPos: x, yPos: y, }));
  }

  const nodeStartMoveEnd = (e, position) => {
    const x = e.target.x();
    const y = e.target.y();
    dispatch(
      setXYCordinatesOfNodeB({
        xPos: x,
        yPos: y,
      })
    );
    if (position === 'move') {
      let m1 = Math.abs(linePoints.x1 - linePoints.x)
      let m2 = Math.abs(linePoints.x - linePoints.x2)
      // console.log( 'm1,m2', m1, m2 )
      const angle = calcangle(linePoints.x1, linePoints.y1, linePoints.x, linePoints.y, linePoints.x, linePoints.y, linePoints.x2, linePoints.y2)
      // const angle = calcangle(linePoints.x1, linePoints.y1, Xcordinate, Ycordinate, Xcordinate, Ycordinate, linePoints.x2, linePoints.y2)
      const ratio = Math.abs(m1 / m2)
      dispatch(setRatios({ m1: m1, m2: m2, ratio: ratio, angle: angle }))
    }
  };


  // const functionToCalculateJerk = () => {
  //   // if (initialRenderTwo == 0) {
  //     console.log('linePoints.x,linePoints.y', linePoints.x, linePoints.y)
  //     let xDifference = inXCoOfMvNode - linePoints.x
  //     let yDifference = inYCoOfMvNode - linePoints.y
  //     // setInXCoOfMvNode(inXCoOfMvNode - linePoints.x)
  //     // setInYCoOfMvNode(inYCoOfMvNode - linePoints.y)
  //   console.log('xDifference', xDifference)
  //   console.log('yDifference', yDifference)
  //   // }
  //   dispatch(setXYCordinatesOfNodeBAgainAfterJerk({
  //     xDifference: xDifference, yDifference: yDifference
  //   }))
  //   // setInitialRenderTwo(prevState => prevState + 1)

  // }





  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            style={{ backgroundColor: "#f7e5e5" }}
            height={window.innerHeight}
            width={window.innerWidth}
          >
            <Provider store={store}>
              <Layer>
                <Group>
                  <Line
                    points={[
                      linePoints.x1,
                      linePoints.y1,
                      linePoints.x,
                      linePoints.y
                      // ( linePoints.x2 * ratios.m1 + linePoints.x1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 ),
                      // ( linePoints.y2 * ratios.m1 + linePoints.y1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 )
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Line
                    points={[
                      linePoints.x,
                      linePoints.y,
                      // ( linePoints.x2 * ratios.m1 + linePoints.x1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 ),
                      // ( linePoints.y2 * ratios.m1 + linePoints.y1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 ),
                      linePoints.x2,
                      linePoints.y2,
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Line
                    points={[linePoints.x1, linePoints.y1, linePoints.x + getDifferenceValueFromRedux, linePoints.y + getDifferenceValueFromReduxTwo]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Line
                    points={[linePoints.x + getDifferenceValueFromRedux, linePoints.y + getDifferenceValueFromReduxTwo, linePoints.x2, linePoints.y2]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Circle
                    x={linePoints.x1}
                    y={linePoints.y1}
                    radius={10}
                    fill="red"
                    draggable
                    onDragStart={(e) => nodeDragStart(e, 'red')}
                    onDragMove={(e) => {
                      nodeDragMove(e, 'red')
                      // functionToCalculateJerk()
                    }}
                    onDragEnd={(e) => nodeDragEnd(e, 'red')}
                  />
                  <Circle
                    x={linePoints.x + getDifferenceValueFromRedux}
                    y={linePoints.y + getDifferenceValueFromReduxTwo}
                    radius={10}
                    fill="yellow"
                  // draggable
                  // onDragStart={(e) => nodeStartMoveEnd(e)}
                  // onDragMove={(e) => nodeStartMoveEnd(e, 'move')}
                  // onDragEnd={(e) => nodeStartMoveEnd(e)}
                  />
                  <Circle
                    // x={ ( linePoints.x2 * ratios.m1 + linePoints.x1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 ) }
                    // y={ ( linePoints.y2 * ratios.m1 + linePoints.y1 * ratios.m2 ) / ( ratios.m1 + ratios.m2 ) }
                    x={linePoints.x}
                    y={linePoints.y}
                    radius={10}
                    fill="green"
                    draggable
                    onDragStart={(e) => nodeStartMoveEnd(e)}
                    onDragMove={(e) => nodeStartMoveEnd(e, 'move')}
                    onDragEnd={(e) => nodeStartMoveEnd(e)}
                  />

                  <Circle
                    x={linePoints.x2}
                    y={linePoints.y2}
                    radius={10}
                    fill="black"
                    draggable
                    onDragStart={(e) => nodeDragStart(e, 'black')}
                    onDragMove={(e) => nodeDragMove(e, 'black')}
                    onDragEnd={(e) => nodeDragEnd(e, 'black')}
                  />



                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <ButtonComponent />
    </>
  );
};

export default App;