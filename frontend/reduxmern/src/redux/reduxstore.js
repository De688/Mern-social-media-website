import { configureStore } from "@reduxjs/toolkit";
import userReducer from './authSlice.js'
import articleReducer from './articleSlice.js'

const store = configureStore({
    reducer:{
        auth:userReducer,
        article:articleReducer
    }
    
})
 export default store