import { createSlice } from '@reduxjs/toolkit';
import { updateRestaurantThunk, createRestaurantThunk, findRestaurantThunk,
        findReviewsThunk, createReviewThunk, deleteReviewThunk, updateReviewThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  restaurant: null,
  reviews: [],
  loading: true
}

const restaurantSlice = createSlice({
  name: 'siteRestaurants',
  initialState,
  extraReducers: {
    [updateRestaurantThunk.fulfilled]:
       (state, {meta}) => {
          const payload = meta.arg;
          state.loading = false;
          state.restaurant = {
           ...state.restaurant,
           ...payload
          }
    },
    [findRestaurantThunk.pending]:
      (state) => {
        state.loading = true;
        state.restaurant = null;
    },
    [findRestaurantThunk.fulfilled]:
      (state, { payload }) => {
        console.log("RESTAURANT IS " + JSON.stringify(payload));
        if (payload != undefined) {
            console.log("Wasn't undefined")
            state.loading = false;
            state.restaurant = payload;
        }
      },
    [findRestaurantThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
      },
    [createRestaurantThunk.fulfilled]:
      (state, { payload }) => {
        state.restaurant = payload;
        state.reviews = [];
        state.loading = false;
      },
    [updateReviewThunk.fulfilled]:
       (state, {meta}) => {
          const payload = meta.arg;
          state.loading = false;
          state.review = {
           ...state.review,
           ...payload
          }
    },
    [findReviewsThunk.pending]:
      (state) => {
        state.loading = true;
        state.review = [];
    },
    [findReviewsThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        state.review = payload;
      },
    [findReviewsThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
      },
    [createReviewThunk.fulfilled]:
      (state, { payload }) => {
        state.review = payload;
        state.loading = false;
      },
    [deleteReviewThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        state.reviews = state.reviews
            .filter(r => r._id !== payload);
      },
  }
});
export default restaurantSlice.reducer