import { createSlice } from "@reduxjs/toolkit";

export const authorizationSlice = createSlice({
    name: "auth",
    initialState:{
        value: {
            authorized: false,
            token: localStorage.getItem("token")
        }
    },
    reducers: {
        setAuth: (state, actions) => {
            localStorage.setItem("token", actions.payload)
            state.value.authorized = true
        },
        unAuthorize: (state) => {
            state.value.authorized = false
        },
        setToken: (state) => {
            state.value.token = localStorage.getItem("token")
        },
        removeToken: (state) => {
            localStorage.removeItem("token")
            state.value.token = "0"
        }
    }  
})

export const {setAuth, unAuthorize, setToken, removeToken} = authorizationSlice.actions;

export default authorizationSlice.reducer;