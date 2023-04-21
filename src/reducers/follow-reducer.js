import { createSlice } from "@reduxjs/toolkit";
import * as followThunks from "../services/follow-thunks";

const followReducer = createSlice(
    {
        name: "follow",
        initialState: {
            following: [],
            followers: [],
            followId: null
        },
        reducers: {},
        extraReducers: {
            [followThunks.followThunk.fulfilled]:
                (state, action) => {
                    state.following.push(action.payload);
                },
            [followThunks.unfollowThunk.fulfilled]:
                (state, action) => {
                    state.following = state.following.filter(
                        (u) => {
                            return u._id !== action.payload
                        }
                    );
                },
            [followThunks.findFollowIdThunk.fulfilled]:
                (state, action) => {
                    state.followId = action.payload._id;
                },
            [followThunks.findFollowersThunk.fulfilled]:
                (state, action) => {
                    state.followers = action.payload;
                },
            [followThunks.findFollowingThunk.fulfilled]:
                (state, action) => {
                    state.following = action.payload;
                }
        }
    }
);

export default followReducer.reducer;
