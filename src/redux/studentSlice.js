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
        setStudentAuth: (state, actions) => {
            localStorage.setItem("studToken", actions.payload)
            state.value.authorized = true
        },
        unAuthorize: (state) => {
            state.value.authorized = false
        },
        setStudentToken: (state) => {
            state.value.studToken = localStorage.getItem("studToken")
        },
        removeStudentToken: (state) => {
            localStorage.removeItem("studToken")
            state.value.studToken = "0"
        }
    }  
})

export const {setStudentAuth, unAuthorize, setStudentToken, removeStudentToken} = studentAuthorizationSlice.actions;

export default studentAuthorizationSlice.reducer;