import { createSlice } from "@reduxjs/toolkit";
import { findBusinessThunk } from "../services/yelp/business-thunks";

const initialState = {
    business: {},
    loading: false,
}

const businessSlice = createSlice({
 name: 'queryResults',
 initialState,
 extraReducers: {
   [findBusinessThunk.fulfilled]:
         (state, action) => {
           var payload = JSON.parse(JSON.parse(JSON.stringify(action)).payload);
           console.log("REDUCER: Business is now " + JSON.stringify(payload));
           state.business = payload.business;
           state.loading = false;
         },
       [findBusinessThunk.pending]:
          (state) => {
            state.loading = true;
            state.business = {};
          },
       [findBusinessThunk.rejected]:
          (state, action) => {
             state.loading = false;
             state.error = action.error;
        },
    }
})
export default businessSlice.reducer;