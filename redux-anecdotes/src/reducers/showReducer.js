import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: 'show',
  initialState: {
    isVote: false,
    isShow: false,
    content: ''
  },
  reducers: {
    show(state, action) {
      state.isShow = true
      state.content = action.payload.content
      if (action.payload.vote) {
        state.isVote = true
      }
    },
    hide(state, action) {
      state.isShow = false
      state.content = ''
      state.isVote = false
    }
  }
})

export const {
  show,
  hide,
} = showSlice.actions
export default showSlice.reducer
