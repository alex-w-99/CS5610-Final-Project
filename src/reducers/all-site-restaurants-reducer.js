import { createSlice } from '@reduxjs/toolkit';
import { findAllRestaurantsThunk }
    from '../services/site-db-restaurants/site-restaurants-thunks.js';

const initialState = {
  restaurants: [],
  loading: true,
}

const allRestaurantSlice = createSlice({
  name: 'allSiteRestaurants',
  initialState,
  extraReducers: {
    [findAllRestaurantsThunk.pending]:
      (state) => {
        state.loading = true;
        state.status = 201;
    },
    [findAllRestaurantsThunk.fulfilled]:
      (state, { payload }) => {
        console.log("PAYLOAD IS " + JSON.stringify(payload));
        state.loading = false;
        state.restaurants = payload;
        state.status = 200;
      },
    [findAllRestaurantsThunk.rejected]:
       (state, action) => {
          state.loading = false
          state.error = action.error
          state.status = 404;
      },
    }
});
export default allRestaurantSlice.reducer