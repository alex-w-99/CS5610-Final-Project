import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../services/users-thunks";

const CurrentUser = ( { children } ) => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(profileThunk()); }, []);

    //const currentUser = useSelector((state) => state.currentUser);
    //useEffect(() => { if (currentUser) { dispatch(profileThunk()); }}, [dispatch, currentUser]);

    return(
        children
    );
};

export default CurrentUser;
