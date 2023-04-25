import { createSlice } from "@reduxjs/toolkit";
import {
    followUserThunk, unfollowUserThunk, findFollowIdThunk, findFollowersThunk, findFollowingThunk
} from "../services/follow-thunks";


const followReducer = createSlice(
    {
        name: "follow",
        initialState: { following: [], followers: [], followId: null },
        reducers: { },
        extraReducers: {
            [followUserThunk.fulfilled]: (state, { payload }) => {
                state.following.push(payload)
            },
            [unfollowUserThunk.fulfilled]: (state, { payload }) => {
                state.following = state.following.filter(user => {
                    return user._id !== payload
                })
            },
            [findFollowIdThunk.fulfilled]: (state, { payload }) => {
                state.followId = payload._id ? payload._id : null;  // in case no such fid exists
            },
            [findFollowersThunk.fulfilled]: (state, { payload }) => {
                state.followers = payload
            },
            [findFollowingThunk.fulfilled]: (state, { payload }) => {
                state.following = payload
            }
        }
    }
);

export default followReducer.reducer;
