import { createSlice } from '@reduxjs/toolkit'

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    inputResult: false,
    currentLevel: 0,
  },
  reducers: {
    inputSuccess: (state) => {
      state.inputResult = true
      state.currentLevel += 1
    },
    inputFailure: (state) => {
      state.inputResult = false
      state.currentLevel += 0
    },
    resetInput: (state) => {
      state.inputResult = false
      state.currentLevel = 0
    },
  },
})

export const { inputSuccess, inputFailure, resetInput } = inputSlice.actions

export default inputSlice.reducer
