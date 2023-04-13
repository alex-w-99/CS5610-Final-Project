import {createSlice} from "@reduxjs/toolkit";
import {findBusinessesThunk} from "../services/business-thunks";

const initialState = {
    businesses: [],
    loading: false,
}

const businessesSlice = createSlice({
 name: 'queryResults',
 initialState,
 extraReducers: {
    [findBusinessesThunk.fulfilled]:
      (state, { payload }) => {
        state.loading = false;
        state.businesses = payload;
      },
    [findBusinessesThunk.pending]:
       (state) => {
         state.loading = true;
         state.businesses = [];
       },
    [findBusinessesThunk.rejected]:
       (state, action) => {
          state.loading = false;
          state.error = action.error;
       }
 }
})
export default businessesSlice.reducer;