import {createSlice} from "@reduxjs/toolkit";
import {profileThunk} from "../services/users-thunks";



import * as defaultUser from "../reducers/currentUser.json";
const initialState = {
    currentUser: defaultUser,  // currentUser: null,  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    loading: false,
    error: ""
}

const usersReducer = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [profileThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = "";
        },
        [profileThunk.rejected]: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default usersReducer.reducer;
