import { configureStore } from "@reduxjs/toolkit"
import authorizationReducer from "./slice"

export default configureStore({
    reducer: {
        authorizer: authorizationReducer
    },
  })