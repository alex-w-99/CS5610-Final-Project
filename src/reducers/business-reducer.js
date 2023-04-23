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
//        const businesses = payload.businesses;
//        console.log("BUSINESSES ARE: " + JSON.stringify(businesses));
        console.log("PAYLOAD BUSINESSES:" + JSON.stringify(payload.businesses));
//        console.log("STATE IS " + JSON.stringify(state));
        state.businesses = payload.businesses;
        state.status = 200;
      },
    [findBusinessesThunk.pending]:
       (state) => {
         state.loading = true;
         state.businesses = [];
         state.status = 201;
       },
    [findBusinessesThunk.rejected]:
       (state, action) => {
          console.log("Rejected!");
          state.loading = false;
          state.error = action.error;
          console.log("State.error looks like " + JSON.stringify(state.error))
          state.status = 404;
       }
 }
})
export default businessesSlice.reducer;