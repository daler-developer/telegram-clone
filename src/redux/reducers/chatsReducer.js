import { createSlice } from '@reduxjs/toolkit'


const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    list: [
      
    ],
    selectedChatIndex: null
  },
  reducers: {
    setChats(state, { payload }) {
      const { chats } = payload
      state.list = chats
    },
    setSelectedChatIndex(state, { payload }) {
      const { to } = payload
      state.selectedChatIndex = to
    }
  }
})

export const chatsActions = chatsSlice.actions

export const selectChats = (state) => {
  return state.chats.list
}

export const selectSelectedChatIndex = (state) => {
  return state.chats.selectedChatIndex
}

export default chatsSlice.reducer
