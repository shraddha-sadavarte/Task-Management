import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth", //slice name
    initialState: {isLoggedIn: false}, //initial state
    reducers: {
        login(state) {
            state.isLoggedIn = true; //when log in action is dispatch, set loggedin to true
        },
        logout(state){
            state.isLoggedIn = false; //when logout option is dispatched , set loggedin to false
        },
    },
})

export const authActions = authSlice.actions; //export actions (login, logout)
export default authSlice.reducer;