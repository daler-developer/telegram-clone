import { createSlice } from "@reduxjs/toolkit"


const commonReducer = createSlice({
  name: 'common',
  initialState: {
    searchMessageInputValue: ''
  },
  reducers: {
    setSearchMessageInputValue(state, { payload }) {
      const { to } = payload
      state.searchMessageInputValue = to
    },
  }
})

export const commonActions = commonReducer.actions


export const selectSearchMessageInputValue = (state) => {
  return state.common.searchMessageInputValue
}

export default commonReducer.reducer