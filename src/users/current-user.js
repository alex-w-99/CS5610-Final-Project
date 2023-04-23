import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../services/users-thunks";

const CurrentUser = ( { children } ) => {
    const currentUser = useSelector((state) => state.currentUser);

    const dispatch = useDispatch();
    useEffect(() => { dispatch(profileThunk()); }, []);
    //useEffect(() => { if (currentUser) { dispatch(profileThunk()); } }, [dispatch, currentUser]);

    return(
        children
    );
};

export default CurrentUser;
