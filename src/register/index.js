import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import "../profile/Profile.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../services/users-thunks";

const Register = () => {
    const { currentUser, loading } = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    // Register button onClick handler:
    const registerHandler = () => {
        setError(null);
        if (!username || !password || !confirmPassword) {
            setError("Please enter a valid, non-empty username, password and confirm password.");
        } else if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
        } else {
            dispatch(registerThunk( { username, password } ));

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

                                { /* Register banner */ }
                                <Card.Title className="text-center mt-3">
                                    Create an account
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

                                        { /* Confirm Password input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="confirmPassword"
                                                   type="password"
                                                   className="form-control rounded-pill"
                                                   placeholder="Confirm password"
                                                   onChange={(e) =>
                                                       setPassword(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="confirmPassword">
                                                Confirm Password
                                            </label>
                                            {error && (
                                                <div className="alert alert-danger mt-3" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                        </form>


                                        { /* Register button */ }
                                        <button
                                            className="btn btn-primary mt-3 rounded-pill"
                                            onClick={registerHandler}
                                        >
                                            Register
                                        </button>

                                        { /* Login redirect link */ }
                                        <div className="mt-3">
                                            <Link to="/login" className="text-decoration-none">
                                                Already have an account? Login here.
                                            </Link>
                                        </div>

                                    </div>
                                </div>

                            </Card>
                        </div>

                        <div className="col-3"></div> { /* this <div> is just for padding */ }

                    </Row>
                </Container>
            </div>
        );
    }
};
export default Register;




