import { createSlice } from "@reduxjs/toolkit"


const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    isLoading: false
  },
  reducers: {
    setMessages(state, { payload }) {
      const { list } = payload
      state.list = list
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload.to
    }
  }
})

export const messagesActions = messagesSlice.actions

export const selectMessages = (state) => {
  return state.messages.list
}

export const selectIsMessagesLoading = (state) => {
  return state.messages.isLoading
}

export default messagesSlice.reducer
