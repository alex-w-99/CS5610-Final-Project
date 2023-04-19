import React from "react";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import "../profile/Profile.css";
import {Link} from "react-router-dom";

// MUST PLACE A REFERENCE TO SIGN UP HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Login = () => {
    return(
        <div className="profile">
            <Container className="my-2">
                <Row>
                    <div className="col-3"></div> { /* this <div> is effectively just padding */ }

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
                                        />
                                        <label className="text-secondary" htmlFor="userName">
                                            Username
                                        </label>
                                    </form>

                                    { /* Password input box */ }
                                    <form className="form-floating mt-3">
                                        <input id="userName"
                                               type="text"
                                               className="form-control rounded-pill"
                                               placeholder="Enter username"
                                        />
                                        <label className="text-secondary" htmlFor="userName">
                                            Password
                                        </label>
                                    </form>

                                </div>
                            </div>

                            { /* Login button */ }
                            <div className="text-center mt-4 mb-5">
                                <button className="btn btn-dark rounded-pill mt-2 w-75"
                                    id="login-button"
                                    type="button">
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

export default Login;
