import { createSlice } from '@reduxjs/toolkit';
import { updateRestaurantThunk, createRestaurantThunk, findRestaurantThunk, }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  restaurant: {},
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
    }
});
export default restaurantSlice.reducer