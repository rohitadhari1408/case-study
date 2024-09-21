import { configureStore } from '@reduxjs/toolkit'
import casereducer from '../case/caseslice'


export const store = configureStore({
  reducer: {
    Newcase: casereducer, // Add the case reducer
  },
});