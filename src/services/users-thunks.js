 import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersService from "./users-service";

// when is it important for each to return or not?

export const createUserThunk = createAsyncThunk(
    "users/createUser",
    async (user) => await usersService.createUser(user)
);
export const registerThunk = createAsyncThunk(
    "users/register",
    async (user) => {
        return await usersService.register(user);
    }
);
export const loginThunk = createAsyncThunk(
    "user/login",
    async (credentials) => {
        return await usersService.login(credentials);
    }
);
export const logoutThunk = createAsyncThunk(
    "users/logout",
    async () => {
        return await usersService.logout();
    }
);
export const profileThunk = createAsyncThunk(
    "users/profile",
    async () => await usersService.profile()
);
export const findAllUsersThunk = createAsyncThunk(
    "users/findAllUsers",
    async () => await usersService.findAllUsers()
);
export const findUserByIdThunk = createAsyncThunk(
    "users/findUserById",
    async (uid) => await usersService.findUserById(uid)
);
export const updateUserThunk = createAsyncThunk(
    "users/updateUser",
    async (user) => {
        await usersService.updateUser(user);
        return user;
    }
);
export const deleteUserThunk = createAsyncThunk(
    "users/deleteUser",
    async (uid) => {
        await usersService.deleteUser(uid);
        return uid;
    }
);
