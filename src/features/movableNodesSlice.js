import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    linePoints: {
        x1: 300,
        y1: 250,
        x: 500,
        y: 250,
        x2: 700,
        y2: 250,
    },
    ratio: 1,
    ratios: {
        m1: 2,
        m2: 2
    },
    angle: 0,
    temporaryXCordinateOfMovableNodes: '',
    temporaryYCordinateOfMovableNodes: '',
    conditionVariable: true,
    difference: 0,
    differenceOne: 0
}

const movableNodesSlice = createSlice({
    name: 'movableNodes',
    initialState,
    reducers: {
        setXYCordinatesOfNodeA: (state, action) => {
            state.linePoints.x1 = parseInt(action.payload.xPos)
            state.linePoints.y1 = parseInt(action.payload.yPos)
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
        },
        setXYCordinatesOfNodeB: (state, action) => {
            state.linePoints.x = parseInt(action.payload.xPos)
            state.linePoints.y = parseInt(action.payload.yPos)
        },
        setXYCordinatesOfNodeC: (state, action) => {
            state.linePoints.x2 = parseInt(action.payload.xPos)
            state.linePoints.y2 = parseInt(action.payload.yPos)
        },
        setXYCordinatesOfNodeBAgain: (state, action) => {
            // console.log( 'action.payload.inXCoOfMvNode  action.payload.inYCoOfMvNode', action.payload.inXCoOfMvNode, action.payload.inYCoOfMvNode )
            if (state.conditionVariable == true) {
                // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
                state.temporaryXCordinateOfMovableNodes = parseInt(state.linePoints.x)
                state.temporaryYCordinateOfMovableNodes = parseInt(state.linePoints.y)
                state.difference = parseInt(state.temporaryXCordinateOfMovableNodes - action.payload.xPointsOfMovableNodes)
                state.differenceOne = parseInt(state.temporaryYCordinateOfMovableNodes - action.payload.yPointsOfMovableNodes)
                state.conditionVariable = action.payload.conditionVariable
                console.log(' difference, differenceOne', state.difference, state.differenceOne)
                console.log('I am running...!')
            }
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
            // state.linePoints.x = action.payload.xPointsOfMovableNodes
            // state.linePoints.y = action.payload.yPointsOfMovableNodes
            // const difference = Math.abs(state.temporaryXCordinateOfMovableNodes - action.payload.xPointsOfMovableNodes)
            // const differenceOne = Math.abs(state.temporaryYCordinateOfMovableNodes - action.payload.yPointsOfMovableNodes)
            // console.log(' difference, differenceOne', difference, differenceOne)
            // console.log('state.linePoints.x state.linePoints.y', state.linePoints.x, state.linePoints.y)
            state.linePoints.x = parseInt(action.payload.xPointsOfMovableNodes)
            state.linePoints.y = parseInt(action.payload.yPointsOfMovableNodes)
        },
        // setXYCordinatesOfNodeBAgainAfterJerk: (state, action) => {
        //     if (action.payload.xDifference != undefined && action.payload.xDifference != undefined) {
        //         state.linePoints.x = state.linePoints.x + action.payload.xDifference
        //         state.linePoints.y = state.linePoints.y + action.payload.yDifference
        //     }

        // },
        setRatios: (state, action) => {
            state.ratios.m1 = action.payload.m1;
            state.ratios.m2 = action.payload.m2;
            state.ratio = action.payload.ratio;
            state.angle = action.payload.angle;
        },
        setConditioningVariable: (state, action) => {
            state.conditionVariable = action.payload.conditionVariable
        }
    }
});

export const { setXYCordinatesOfNodeA, setXYCordinatesOfNodeB, setXYCordinatesOfNodeC, setRatios, setRatio, setXYCordinatesOfNodeBBasedOnOffset, setYcordinateOfMovableNode, setRatioInReduxAction, setConditioningVariable, setXYCordinatesOfNodeBAgain, setXYCordinatesOfNodeBAgainAfterJerk } = movableNodesSlice.actions
export const getLinePoints = state => state.movableNodesSlice.linePoints
export const getMovableNodeRatio = state => state.movableNodesSlice.ratios
export const getMovableNodeRatioForButtonC = state => state.movableNodesSlice.ratio
export const getAngle = state => state.movableNodesSlice.angle
export const getDifference = state => state.movableNodesSlice.difference
export const getDifferenceOne = state => state.movableNodesSlice.differenceOne
export const getTemporaryXCordinateOfMovableNodes = state => state.movableNodesSlice.temporaryXCordinateOfMovableNodes
export const getTemporaryYCordinateOfMovableNodes = state => state.movableNodesSlice.temporaryYCordinateOfMovableNodes

// export const getRatios = state => state.movableNodesSlice.ratios
export default movableNodesSlice.reducer