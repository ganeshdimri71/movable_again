import { configureStore } from '@reduxjs/toolkit'
import movableNodesSlice from './movableNodesSlice'

export const store = configureStore({
    reducer: {
        movableNodesSlice: movableNodesSlice
    },
})