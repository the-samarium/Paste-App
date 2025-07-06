import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './slices/Appslice'
export const store = configureStore({
  reducer: {
    paste:pasteReducer
  },
})