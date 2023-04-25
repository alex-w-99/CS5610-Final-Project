import { createSlice } from "@reduxjs/toolkit";

const activeUser = {
    username: "user123",
    firstName: "First",
    lastName: "Last",
    location: "Boston",
    profilePicture: "",
    bannerPicture: "",
    aboutMe: "About me 123",
    website: "www.bing.com",
    email: "student-123@northeastern.edu",
    password: "pw123",
    phone: "12223334444",
    userType: "PERSONAL",
    userTypeField: ""
};

const profileReducer = createSlice(
    {
        name: "user",
        initialState: activeUser,
        reducers: {
            updateProfile(state, action) {
                const updatedProfile = action.payload;
                const username = updatedProfile.username;
                const firstName = updatedProfile.firstName;
                const lastName = updatedProfile.lastName;
                const location = updatedProfile.location;
                const profilePicture = updatedProfile.profilePicture;
                const bannerPicture = updatedProfile.bannerPicture;
                const aboutMe = updatedProfile.aboutMe;
                const website = updatedProfile.website;
                const email = updatedProfile.email;
                const phone = updatedProfile.phone;
                const userTypeField = updatedProfile.userTypeField;
                return {
                    ...state,
                    username,
                    firstName, lastName,
                    location,
                    profilePicture, bannerPicture,
                    aboutMe,
                    website,
                    email,
                    phone,
                    userTypeField
                }
            }
        },
        extraReducers: {}
    }
);

export const { updateProfile } = profileReducer.actions;
export default profileReducer.reducer;
