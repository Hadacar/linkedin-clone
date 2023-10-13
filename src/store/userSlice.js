import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
      },
  
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions; // Add an equal sign here
export default userSlice.reducer


