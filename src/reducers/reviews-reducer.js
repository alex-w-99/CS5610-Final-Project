import { createSlice } from '@reduxjs/toolkit';
import { findReviewsThunk, createReviewThunk, deleteReviewThunk, updateReviewThunk,
         findReviewsByUserThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  reviews: [],
  loading: true
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [updateReviewThunk.fulfilled]:
       (state, {meta}) => {
          const payload = meta.arg;
          state.loading = false;
          const reviewNdx = state.reviews
            .findIndex((r) => r._id === payload._id)
          state.reviews[reviewNdx] = {
            ...state.reviews[reviewNdx],
            ...payload
         }
    },
    [findReviewsThunk.pending]:
      (state) => {
        state.loading = true;
        state.reviews = [];
    },
    [findReviewsThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        state.reviews = payload;
      },
    [findReviewsThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
      },
    [findReviewsByUserThunk.pending]:
      (state) => {
        state.loading = true;
        state.reviews = [];
    },
    [findReviewsByUserThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        state.reviews = payload;
      },
    [findReviewsByUserThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
      },
    [createReviewThunk.fulfilled]:
      (state, {payload} ) => {
        state.reviews.push(payload);
        console.log("Reviews is now " + JSON.stringify(state.reviews));
        state.loading = false;
      },
    [deleteReviewThunk.fulfilled]:
      (state, { meta }) => {
        const payload = meta.arg;
        state.loading = false;
        state.reviews = state.reviews
            .filter(r => r._id !== payload);
      },
  }
});
export default reviewsSlice.reducer