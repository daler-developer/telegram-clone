import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import commonReducer from "./reducers/commonReducer"
import uiReducer from "./reducers/uiReducer"


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    common: commonReducer
  }
})

export default store
