import { configureStore } from "@reduxjs/toolkit"
import authorizationReducer from "./slice"
import studentAuthorizationReducer from "./studentSlice";

export default configureStore({
    reducer: {
        authorizer: authorizationReducer,
        studentAuthorizer: studentAuthorizationReducer
    },
  })