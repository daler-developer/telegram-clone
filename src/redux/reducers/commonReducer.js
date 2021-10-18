import { createSlice } from "@reduxjs/toolkit"


const commonReducer = createSlice({
  name: 'common',
  initialState: {
    searchMessageInputValue: '',
    searchChatInputValue: ''
  },
  reducers: {
    setSearchMessageInputValue(state, { payload }) {
      const { to } = payload
      state.searchMessageInputValue = to
    },
    setSearchChatInputValue(state, { payload }) {
      const { to } = payload
      state.searchChatInputValue = to
    }
  }
})

export const commonActions = commonReducer.actions

export const selectSearchMessageInputValue = (state) => {
  return state.common.searchMessageInputValue
}

export const selectSearchChatInputValue = (state) => {
  return state.common.searchChatInputValue
}

export default commonReducer.reducer