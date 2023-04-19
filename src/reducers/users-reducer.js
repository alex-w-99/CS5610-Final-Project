import { createSlice } from "@reduxjs/toolkit";
import * as usersThunks from "../services/users-thunks";

import * as defaultUser from "./currentUser.json";
//const initialState = {
//    currentUser: defaultUser,  // currentUser: null,  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//    loading: false,
//    error: ""
//}

const usersReducer = createSlice({
    name: "users",
    initialState: { loading: false, users: [], currentUser: null, publicProfile: {}, error: null },
    reducers: {},
    extraReducers: {
        [usersThunks.createUserThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            },
        [usersThunks.registerThunk.pending]:
            (state) => {
                state.loading = true;
                state.currentUser = null;
            },
        [usersThunks.registerThunk.rejected]:
            (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.error = action.error.message;
            },
        [usersThunks.registerThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
                state.currentUser = action.payload;
            },
        [usersThunks.loginThunk.pending]:
            (state) => {
                state.loading = true;
                state.currentUser = null;
                state.error = null;
            },
        [usersThunks.loginThunk.rejected]:
            (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.error = action.payload;
            },
        [usersThunks.loginThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; // state.error = null;
            },
        [usersThunks.logoutThunk.fulfilled]:
            (state) => {
                state.loading = false;
                state.currentUser = null;
            },
        [usersThunks.profileThunk.rejected]:
            (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.error = action.payload;
            },
        [usersThunks.profileThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;  // state.error = "";
            },
        [usersThunks.findAllUsersThunk.pending]:
            (state) => {
                state.loading = true;
                state.users = [];
            },
        [usersThunks.findAllUsersThunk.rejected]:
            (state) => {
                state.loading = false;
            },
        [usersThunks.findAllUsersThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.users = action.payload;
            },
        [usersThunks.findUserByIdThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.publicProfile = action.payload;
            },
        [usersThunks.updateUserThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            },
        [usersThunks.deleteUserThunk.fulfilled]:
            (state, action) => {
                state.loading = false;
                state.users = state.users.filter(
                    (user) => user._id !== action.payload  // filter out user id matching payload
                );
            }
    }
});

export default usersReducer.reducer;
