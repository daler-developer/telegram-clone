import { createSlice } from "@reduxjs/toolkit"


const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [
      {
        id: 'id001',
        text: 'Hello World',
        photoURL: null,
        author: {
          displayName: 'Saidov Daler',
          uid: 'testid'
        },
        createdDate: {
          seconds: 12234434
        }
      },
      {
        id: 'id002',
        text: 'Aziz',
        photoURL: null,
        author: {
          displayName: 'Saidov Daler',
          uid: 'uidrandom'
        },
        createdDate: {
          seconds: 12234434
        }
      },
    ],
    isLoading: false
  },
  reducers: {
    setMessages(state, { payload }) {
      const { messages } = payload
      state.list = messages
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
