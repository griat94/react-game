import { configureStore } from '@reduxjs/toolkit'
import inputReducer from './input'

export default configureStore({
  reducer: {
    input: inputReducer,
  },
})
