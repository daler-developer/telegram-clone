import { createSlice } from "@reduxjs/toolkit"


const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    createChatWindowVisibility: false
  },
  reducers: {
    // -----------
    toggleCreateChatWindowVisibility(state, { payload }) {
      state.createChatWindowVisibility = !state.createChatWindowVisibility
    },
    // -----------
  }
})

const uiActions  = uiReducer.actions


export { uiActions }

export const selectCreateChatWindowVisibility = (state) => {
  return state.ui.createChatWindowVisibility
}

export default uiReducer.reducer