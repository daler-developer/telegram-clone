import { createSlice } from '@reduxjs/toolkit'


const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    list: [],
    selectedChatId: null
  },
  reducers: {
    setChats(state, { payload }) {
      const { chats } = payload
      state.list = chats
    },
    setSelectedChatId(state, { payload }) {
      const { to } = payload
      state.selectedChatId = to
    }
  }
})

export const chatsActions = chatsSlice.actions

export const selectChats = (state) => {
  return state.chats.list
}

export const selectSelectedChatId = (state) => {
  return state.chats.selectedChatId
}

export default chatsSlice.reducer
