import { createSlice } from "@reduxjs/toolkit";
import { findBusinessThunk } from "../services/yelp/business-thunks";

const initialState = {
    business: {},
    loading: false,
    status: 200
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
           state.status = 200;
         },
       [findBusinessThunk.pending]:
          (state) => {
            state.loading = true;
            state.business = {};
            state.status = 201;
          },
       [findBusinessThunk.rejected]:
          (state, action) => {
             state.loading = false;
             state.error = action.error;
             state.status = 404;
        },
    }
})
export default businessSlice.reducer;