import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../services/users-thunks";

const NavigationBar = () => {
    const { currentUser } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const nav = useNavigate();
    const logoutHandler = () => {
        dispatch( logoutThunk() );
        nav("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-3 mt-2">

                <Link to="/" className="navbar-brand fw-bold">
                    Chews Wisely
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto justify-content-evenly w-100">

                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="#">
                                Restaurants
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="#">
                                Search
                            </Link>
                        </li>

                        { /* If logged in, must display "logout"; else, display "login" */ }
                        {
                            currentUser
                            ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link"
                                          to="/profile">
                                        <img
                                            src={currentUser.profilePicture}
                                            alt="profile"
                                            height="25px" width="25px"
                                            style={ { borderRadius: "50%" } }
                                        />
                                        &nbsp;
                                        {currentUser.username}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link"
                                          to="/"
                                          onClick={logoutHandler}>
                                        Log Out
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link"
                                          to="/login">
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link className="nav-link"
                                          to="/login">
                                        Log In
                                    </Link>
                                </li>
                            </>
                        }

                        <li className="nav-item">
                            <button className="btn btn-dark btn-sm mt-1" type="submit">
                                Write a Review
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
