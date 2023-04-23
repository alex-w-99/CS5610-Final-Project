import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { profileThunk } from "../services/users-thunks";

const CurrentUser = ( { children } ) => {
    console.log("%current-user.js");

    const dispatch = useDispatch();
    useEffect(
        () => { dispatch(profileThunk()) },
        []
    );
    return(
        children
    );
};

export default CurrentUser;
