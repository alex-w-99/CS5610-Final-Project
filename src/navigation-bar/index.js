import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../services/users-thunks";

const NavigationBar = () => {
    const {currentUser} = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const nav = useNavigate();
    const logoutHandler = () => {
        dispatch(logoutThunk());
        nav("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="/images/chews-wisely.png"
                            width="50"
                            height="50"
                            className="d-inline-block rounded-3"
                            alt="Chews Wisely logo"
                        />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto justify-content-between w-100">
                        <li className="nav-item col-lg">
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item col-md">
                            <Link className="nav-link" to="/search/food">
                                Restaurants
                            </Link>
                        </li>
                        <li className="nav-item col-lg">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        {currentUser ? (
                            <>
                                <li className="nav-item col-md">
                                    <Link className="nav-link" to="/profile">
                                        <img
                                            src={currentUser.profilePicture}
                                            alt="profile"
                                            height="25px"
                                            width="25px"
                                            style={{borderRadius: "50%"}}
                                        />
                                        &nbsp;
                                        {currentUser.username}
                                    </Link>
                                </li>

                                <li className="nav-item col-lg">
                                    <Link className="nav-link" to="/" onClick={logoutHandler}>
                                        Log Out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item  col-md">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>

                                <li className="nav-item  col-md">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}

                        <li className="nav-item col-lg">
                            <button className="btn btn-dark btn-sm mt-1" type="submit">
                                Write a Review
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile View */}
                <div className="container-fluid d-lg-none">
                    <ul className="navbar-nav ms-auto justify-content-between w-100">
                        <li className="nav-item col-12 mt-2">
                            <button className="btn btn-dark btn-sm w-100" type="submit">
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
