import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followService from "./follow-service";

export const followThunk = createAsyncThunk(
    "follow",
    async (follow) => await followService.follow(follow)
);
export const unfollowThunk = createAsyncThunk(
    "unfollow",
    async (fid) => await followService.unfollow(fid)
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
