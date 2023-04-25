import { createSlice } from '@reduxjs/toolkit';
import { updateRestaurantThunk, createRestaurantThunk, findRestaurantThunk, }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  restaurant: {},
  loading: true,
  status: 200
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
        state.status = 201;
    },
    [findRestaurantThunk.fulfilled]:
      (state, { payload }) => {
        console.log("RESTAURANT IS " + JSON.stringify(payload));
        if (payload !== undefined) {
            console.log("Wasn't undefined")
            state.loading = false;
            state.restaurant = payload;
            state.status = 200;
        }
      },
    [findRestaurantThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
          state.status = 404;
      },
    [createRestaurantThunk.fulfilled]:
      (state, { payload }) => {
        state.restaurant = payload;
        state.reviews = [];
        state.loading = false;
      },
    }
});
export default restaurantSlice.reducer