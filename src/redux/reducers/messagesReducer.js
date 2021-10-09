import { createSlice } from "@reduxjs/toolkit"


const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: []
  },
  reducers: {
    setMessages(state, { payload }) {
      const { messages } = payload
      state.list = messages
    }
  }
})

export const messagesActions = messagesSlice.actions

export const selectMessages = (state) => {
  return state.messages.list
}

export default messagesSlice.reducer
