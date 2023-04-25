import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import "../profile/Profile.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../services/users-thunks";

const Register = () => {
    const { currentUser } = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [profilePicture, setProfilePicture] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");
    const [bannerPicture, setBannerPicture] = useState("https://d2s0jlb9tovn77.cloudfront.net/colonnadehotel.com-696924584/cms/cache/v2/548c8aa107ab6.jpg/1600x720/fit/80/852befd37245e1fd09023ce9386a9914.jpg");
    const [aboutMe, setAboutMe] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState("");
    const [userTypeField, setUserTypeField] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Register button onClick handler:
    const dispatch = useDispatch();
    const nav = useNavigate();
    const registerHandler = () => {
        setError(null);
        if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Username, first name, last name, email, password, and confirm password are all required.");
        }
        else if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
        }
        else if (phone.length !== 10 && phone !== "") {
            setError("Phone number must be 10 digits.");
        }
        else if (userType === "") {
            setError("Please select a valid user type: PERSONAL, CRITIC, or RESTAURANT.");
        }
        else if (userTypeField === "") {
            setError("User Type Field cannot be blank.");
        }
        else {
            setError(null);
            const newUser = {
                username,
                firstName, lastName,
                location,
                profilePicture, bannerPicture,
                aboutMe,
                website,
                email,
                password,
                phone,
                "userType": userType,
                userTypeField
            }
            dispatch(registerThunk(newUser));
            nav("/profile");
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

                                        { /* username input box (required) */ }
                                        <form className="form-floating">
                                            <input id="username"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter username"
                                                   onChange={(e) =>
                                                       setUsername(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="username">
                                                Username*
                                            </label>
                                        </form>

                                        { /* firstName input box (required) */ }
                                        <form className="form-floating mt-3">
                                            <input id="firstName"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter first name"
                                                   onChange={(e) =>
                                                       setFirstName(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="firstName">
                                                First Name*
                                            </label>
                                        </form>

                                        { /* lastName input box (required) */ }
                                        <form className="form-floating mt-3">
                                            <input id="lastName"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter last name"
                                                   onChange={(e) =>
                                                       setLastName(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="lastName">
                                                Last Name*
                                            </label>
                                        </form>

                                        { /* location input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="location"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter location"
                                                   onChange={(e) =>
                                                       setLocation(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="location">
                                                Location
                                            </label>
                                        </form>

                                        { /* profilePicture input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="profilePicture"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter Profile Picture URL"
                                                   onChange={(e) =>
                                                       setProfilePicture(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="profilePicture">
                                                Profile Picture URL
                                            </label>
                                        </form>

                                        { /* bannerPicture input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="bannerPicture"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter Banner Picture URL"
                                                   onChange={(e) =>
                                                       setBannerPicture(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="bannerPicture">
                                                Banner Picture URL
                                            </label>
                                        </form>

                                        { /* aboutMe input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="aboutMe"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter About Me"
                                                   onChange={(e) =>
                                                       setAboutMe(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="aboutMe">
                                                About Me
                                            </label>
                                        </form>

                                        { /* website input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="website"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter Website"
                                                   onChange={(e) =>
                                                       setWebsite(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="website">
                                                Website
                                            </label>
                                        </form>

                                        { /* email input box (required) */ }
                                        <form className="form-floating mt-3">
                                            <input id="email"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter Email"
                                                   onChange={(e) =>
                                                       setEmail(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="email">
                                                Email*
                                            </label>
                                        </form>

                                        { /* phone input box */ }
                                        <form className="form-floating mt-3">
                                            <input id="phone"
                                                   type="text"
                                                   className="form-control rounded-pill"
                                                   placeholder="Enter Phone"
                                                   onChange={(e) =>
                                                       setPhone(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="phone">
                                                Phone Number
                                            </label>
                                        </form>

                                        { /* password input box (required) */ }
                                        <form className="form-floating mt-3">
                                            <input id="password"
                                                   type="password"
                                                   className="form-control rounded-pill"
                                                   placeholder="Password"
                                                   onChange={(e) =>
                                                       setPassword(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="password">
                                                Password*
                                            </label>
                                        </form>

                                        { /* confirmPassword input box (required) */ }
                                        <form className="form-floating mt-3">
                                            <input id="confirmPassword"
                                                   type="password"
                                                   className="form-control rounded-pill"
                                                   placeholder="Confirm password"
                                                   onChange={(e) =>
                                                       setConfirmPassword(e.target.value)
                                                   }
                                            />
                                            <label className="text-secondary" htmlFor="confirmPassword">
                                                Confirm Password*
                                            </label>
                                        </form>


                                        { /* userType input box (required) */ }
                                        <form className="form-floating mt-2">
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <label className="col-form-label fw-bold"
                                                       htmlFor="userType">
                                                    User Type*
                                                </label>
                                                <select
                                                    id="userType"
                                                    className="form-select rounded-pill"
                                                    defaultValue=""
                                                    onChange={(e) =>
                                                        setUserType(e.target.value)}>
                                                    <option value="" disabled>
                                                        Select a User Type
                                                    </option>
                                                    <option value="PERSONAL">PERSONAL</option>
                                                    <option value="CRITIC">CRITIC</option>
                                                    <option value="RESTAURANT">RESTAURANT</option>
                                                </select>
                                            </div>
                                        </form>

                                        { /* userTypeField (required) */ }
                                        {
                                            userType === "PERSONAL"
                                            &&
                                            (
                                                <form className="form-floating mt-3">
                                                    <input id="userTypeField"
                                                           type="text"
                                                           className="form-control rounded-pill"
                                                           placeholder="Enter user type field"
                                                           onChange={(e) =>
                                                               setUserTypeField(e.target.value)
                                                           }
                                                    />
                                                    <label className="text-secondary" htmlFor="userTypeField">
                                                        Favorite Food (User Type Field)*
                                                    </label>
                                                </form>
                                            )
                                        }
                                        {
                                            userType === "CRITIC"
                                            &&
                                            (
                                                <form className="form-floating mt-3">
                                                    <input id="userTypeField"
                                                           type="text"
                                                           className="form-control rounded-pill"
                                                           placeholder="Enter user type field"
                                                           onChange={(e) =>
                                                               setUserTypeField(e.target.value)
                                                           }
                                                    />
                                                    <label className="text-secondary" htmlFor="userTypeField">
                                                        Specialty Cuisine (User Type Field)*
                                                    </label>
                                                </form>
                                            )
                                        }
                                        {
                                            userType === "RESTAURANT"
                                            &&
                                            (
                                                <form className="form-floating mt-3">
                                                    <input id="userTypeField"
                                                           type="text"
                                                           className="form-control rounded-pill"
                                                           placeholder="Enter user type field"
                                                           onChange={(e) =>
                                                               setUserTypeField(e.target.value)
                                                           }
                                                    />
                                                    <label className="text-secondary" htmlFor="userTypeField">
                                                        Restaurant ID (User Type Field)*
                                                    </label>
                                                </form>
                                            )
                                        }

                                        { /* Printing error upon error */ }
                                        <div>
                                            {
                                                error &&
                                                (
                                                    <div className="alert alert-danger text-danger mt-3"
                                                         role="alert">
                                                        {error}
                                                    </div>
                                                )
                                            }
                                        </div>

                                        { /* Register button */ }
                                        <button
                                            className="btn btn-primary mt-4 rounded-pill w-50"
                                            onClick={registerHandler}>
                                            Create Account
                                        </button>

                                        { /* Login redirect link */ }
                                        <div className="mt-5 mb-4">
                                            Already have an account? <Link to="/login" className="text-decoration-none">
                                                 Login here.
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




