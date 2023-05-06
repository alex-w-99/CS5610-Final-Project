import { createSlice } from "@reduxjs/toolkit";
import { findBusinessesThunk } from "../services/yelp/business-thunks";

const initialState = {
    businesses: [],
    loading: false,
    status: 200
}

const businessesSlice = createSlice({
 name: 'queryResults',
 initialState,
 extraReducers: {
    [findBusinessesThunk.fulfilled]:
      (state, action) => {
        state.loading = false;
        var payload = JSON.parse(JSON.parse(JSON.stringify(action)).payload);
        state.businesses = payload.businesses;
        state.status = 200;
      },
    [findBusinessesThunk.pending]:
       (state) => {
         state.loading = true;
         state.status = 201;
       },
    [findBusinessesThunk.rejected]:
       (state, action) => {
          state.loading = false;
          state.error = action.error;
          state.status = 404;
       }
 }
})
export default businessesSlice.reducer;