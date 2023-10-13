import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles:[],
  loading:false, 
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
        state.loading = action.payload;
      },
      setArticles: (state, action) => {
        state.articles = action.payload;
      },

  
  },
})

// Action creators are generated for each case reducer function
export const { setLoadingStatus,setArticles } = articleSlice.actions; // Add an equal sign here
export default articleSlice.reducer


