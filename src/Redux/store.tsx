import {  configureStore } from "@reduxjs/toolkit";
import rootreducer from "./rootreducer";

export const store = configureStore({
    reducer: rootreducer 
})

export default store;