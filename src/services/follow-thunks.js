import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followService from "./follow-service";

export const followUserThunk = createAsyncThunk(
    "followUser",
    async (follow) => await followService.followUser(follow)
);
export const unfollowUserThunk = createAsyncThunk(
    "unfollowUser",
    async (fid) => await followService.unfollowUser(fid)
);
export const findFollowIdThunk = createAsyncThunk(
    "findFollowId",
    async (uid2) => await followService.findFollowId(uid2)
);
export const findFollowersThunk = createAsyncThunk(
    "findFollowers",
    async (uid) => await followService.findFollowers(uid)
);
export const findFollowingThunk = createAsyncThunk(
    "findFollowing",
    async (uid) => await followService.findFollowing(uid)
);
