import { createSlice } from "@reduxjs/toolkit";

export const studentAuthorizationSlice = createSlice({
    name: "auth",
    initialState:{
        value: {
            authorized: false,
            studToken: localStorage.getItem("studToken")
        }
    },
    reducers: {
        setAuth: (state, actions) => {
            localStorage.setItem("studToken", actions.payload)
            state.value.authorized = true
        },
        unAuthorize: (state) => {
            state.value.authorized = false
        },
        setToken: (state) => {
            state.value.studToken = localStorage.getItem("studToken")
        },
        removeToken: (state) => {
            localStorage.removeItem("studToken")
            state.value.studToken = "0"
        }
    }  
})

export const {setAuth, unAuthorize, setToken, removeToken} = studentAuthorizationSlice.actions;

export default studentAuthorizationSlice.reducer;