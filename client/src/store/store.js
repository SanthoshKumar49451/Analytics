
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/userSlice.js';
import urlReducer from '../redux/urlSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer
  },
});

export default store;
