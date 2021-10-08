import { createSlice } from "@reduxjs/toolkit"


const commonReducer = createSlice({
  name: 'common',
  initialState: {
    searchChatInputValue: '',
    searchMessageInputValue: ''
  },
  reducers: {
    // -----------
    setSearchChatInputValue(state, { payload }) {
      const { to } = payload
      state.searchChatInputValue = to
    },
    // -----------
    setSearchMessageInputValue(state, { payload }) {
      const { to } = payload
      state.searchMessageInputValue = to
    },
    // ----------
  }
})

const commonActions = commonReducer.actions


export { commonActions }


export const selectSearchChatInputValue = (state) => {
  return state.common.searchChatInputValue
}

export const selectSearchMessageInputValue = (state) => {
  return state.common.searchMessageInputValue
}

export default commonReducer.reducer