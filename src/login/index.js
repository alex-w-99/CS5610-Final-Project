import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import "../profile/Profile.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../services/users-thunks";

const Login = () => {
    const { currentUser, loading } = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const nav = useNavigate();

    // Login button onClick handler:
    const loginHandler = () => {
        setError(null);
        if (username === "" || password === "") {
            setError("Please enter a valid, non-empty username and password.");
        }
        else {
            dispatch(loginThunk( { username, password } ));

            if (currentUser) {  // i.e., if login is successful
                setError(null);
                nav("/home");
            }
            else {  // i.e., if login is unsuccessful
                setError("Bad login credentials. Please try again.");
            }
        }

    };

    // DETERMINING RETURN VALUE:
    if (currentUser) {  // i.e., if already logged in
        return(
            <Navigate to={"/profile"}/>
        );
    }
    else {  // i.e., not already logged in
        return(
            <div className="profile">
                <Container className="my-2">
                    <Row>

                        <div className="col-3"></div> { /* this <div> is just for padding */ }

                        <div className="col-6">
                            <Card>

                                { /* Login banner */ }
                                <Card.Title className="text-center mt-3">
                                    Welcome back!
                                </Card.Title>

                                { /* Credential input boxes */ }
                                <div className="d-flex justify-content-center">
                                    <div className="text-center mt-3 w-75">

                                        { /* Username input box */ }
                                        <form className="form-floating">
                                            <input id="userName"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter username"
                                                   onChange={(e) =>
                                                       setUsername(e.target.value)
                                                    }
                                            />
                                            <label className="text-secondary" htmlFor="userName">
                                                Username
                                            </label>
                                        </form>

                                        { /* Password input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="password"
                                                   type="password"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter password"
                                                   onChange={(e) =>
                                                       setPassword(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="password">
                                                Password
                                            </label>
                                        </form>

                                    </div>
                                </div>

                                { /* Print error if bad login credentials (and not loading) */ }
                                {
                                    error && !loading
                                    &&
                                    <div className="text-center text-danger mt-2">
                                        {error}
                                    </div>
                                }

                                { /* Login button */ }
                                <div className="text-center mt-4 mb-5">
                                    <button className="btn btn-dark rounded-pill mt-2 w-75"
                                            id="login-button"
                                            type="button"
                                            onClick={loginHandler}>
                                        Login
                                    </button>
                                </div>

                                { /* Sign-up link */ }
                                <div className="text-center mb-3 mt-5">
                                    Don't have an account? <Link to="/register">Sign up.</Link>
                                </div>

                            </Card>
                        </div>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
