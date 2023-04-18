import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./users-service";

export const profileThunk = createAsyncThunk(
    "users/profile",
    async () => await service.profile()
);

export const updateUserThunk = createAsyncThunk(
    "users/updateUser",
    async (user) => await service.updateUser(user)
);
