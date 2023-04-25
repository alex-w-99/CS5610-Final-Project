import { createSlice } from '@reduxjs/toolkit';
import { findRatingThunk, createRatingThunk, updateRatingThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  rating: {},
  loading: true
}

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  extraReducers: {
    [updateRatingThunk.fulfilled]:
       (state, { meta }) => {
          const payload = meta.arg;
          state.loading = false;
          state.rating = payload;
    },
    [findRatingThunk.pending]:
      (state) => {
        state.loading = true;
        state.rating = {};
    },
    [findRatingThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        if (payload == '[]') {
          state.rating = {};
        } else {
            state.rating = payload;
        }
      },
    [findRatingThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
      },
    [createRatingThunk.fulfilled]:
      (state, { payload } ) => {
        state.rating = payload;
        state.loading = false;
      },
  }
});
export default ratingSlice.reducer