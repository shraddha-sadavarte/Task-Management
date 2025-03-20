import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;

//configureStore() is a function from Redux Toolkit that creates and configures the Redux store.
//The store contains a reducer object, where auth is the state slice, and it is managed by authReducer.