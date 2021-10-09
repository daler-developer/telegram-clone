import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import chatsReducer from "./reducers/chatsReducer"
import commonReducer from "./reducers/commonReducer"
import messagesReducer from "./reducers/messagesReducer"
import uiReducer from "./reducers/uiReducer"


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    common: commonReducer,
    chats: chatsReducer,
    messages: messagesReducer
  }
})

export default store
