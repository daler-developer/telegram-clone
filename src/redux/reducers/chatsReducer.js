import { createSlice } from '@reduxjs/toolkit'


const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    list: [
      { name: 'West', lastMessage: { text: 'Hello World', authorDisplayName: 'Saidov Daler' }, photoURL: 'https://avatars.dicebear.com/api/big-ears-neutral/:seed.svg', id: 'id001' },
      { name: 'West', lastMessage: { text: 'Hello World', authorDisplayName: 'Saidov Daler' }, photoURL: 'https://avatars.dicebear.com/api/female/:seed.svg', id: 'id002' },
      { name: 'West', lastMessage: { text: 'Hello World', authorDisplayName: 'Saidov Daler' }, photoURL: 'https://avatars.dicebear.com/api/jdenticon/:seed.svg', id: 'id003' },
    ],
    selectedChatId: 'id003',
    isLoading: false
  },
  reducers: {
    setChats(state, { payload }) {
      const { chats } = payload
      state.list = chats
    },
    setSelectedChatId(state, { payload }) {
      const { to } = payload
      state.selectedChatId = to
    },
    setIsLoading(state, { payload }) {
      const { to } = payload
      state.isLoading = to
    }
  }
})

export const chatsActions = chatsSlice.actions

export const selectChats = (state) => {
  return state.chats.list
}

export const selectChatById = (state, id) => {
  return state.chats.list.find((chat) => chat.id === id)
}

export const selectSelectedChatId = (state) => {
  return state.chats.selectedChatId
}

export const selectChatsByNameIncludes = (state, name) => {
  return state.chats.list.filter((chat) => chat.name.includes(name))
}

export const selectIsChatsLoading = (state) => {
  return state.chats.isLoading
}

export default chatsSlice.reducer
