import { createSlice } from '@reduxjs/toolkit';
import { findRatingThunk, createRatingThunk, updateRatingThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  rating: {},
  updating: false
}

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  extraReducers: {
    [updateRatingThunk.fulfilled]:
       (state, { meta }) => {
          console.log("RATING THUNK GOT THIS " + JSON.stringify(meta));
          const payload = meta.arg;
          state.updating = false;
          state.rating = payload;
    },
    [updateRatingThunk.pending]:
       (state) => {
          state.updating = true;
    },
    [findRatingThunk.pending]:
      (state) => {
        state.updating = true;
        state.rating = {};
    },
    [findRatingThunk.fulfilled]:
      (state, { payload }) => {
        state.updating = false;
        if (payload == null) {
          state.rating = {};
        } else {
            state.rating = payload;
        }
      },
    [findRatingThunk.rejected]:
       (state, action) => {
          console.log("rating thunk, REJECTED");
          state.updating = false
          state.error = action.error
      },
    [createRatingThunk.fulfilled]:
      (state, { payload } ) => {
        state.rating = payload;
        state.updating = false;
      },
    [createRatingThunk.pending]:
      (state) => {
        state.updating = true;
      },
  }
});
export default ratingSlice.reducer