//REDUX
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '#4_reducers/1_index'

export const store = configureStore({
reducer: rootReducer,
devTools: true,
})