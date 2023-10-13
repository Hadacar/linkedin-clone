import { configureStore,applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import userSlice from './userSlice';
import articleSlice from './articleSlice';

export const store = configureStore({
  reducer: {user:userSlice,article:articleSlice},
  middleware: [thunk], // Apply the redux-thunk middleware

})

