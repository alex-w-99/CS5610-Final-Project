import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useState} from "react";
import {deleteUserThunk, logoutThunk, updateUserThunk} from "../services/users-thunks";
import {Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import formatPhoneNumber from "../utils/format-phone-number";

const EditProfile = () => {
    const {currentUser} = useSelector(state => state.users);
    const {following, followers} = useSelector(state => state.follow);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [location, setLocation] = useState(currentUser.location);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [website, setWebsite] = useState(currentUser.website);
    const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
    const [bannerPicture, setBannerPicture] = useState(currentUser.bannerPicture);
    const [aboutMe, setAboutMe] = useState(currentUser.aboutMe);
    const [userTypeField, setUserTypeField] = useState(currentUser.userTypeField);
    const [menu, setMenu] = useState(currentUser.menu);

    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const changeLastName = (event) => {
        setLastName(event.target.value);
    }
    const changeLocation = (event) => {
        setLocation(event.target.value);
    }
    const changeEmail = (event) => {
        setEmail(event.target.value);
    }
    const changePhone = (event) => {
        setPhone(event.target.value);
    }
    const changeWebsite = (event) => {
        setWebsite(event.target.value);
    }
    const changeProfilePicture = (event) => {
        setProfilePicture(event.target.value);
    }
    const changeBannerPicture = (event) => {
        setBannerPicture(event.target.value);
    }
    const changeAboutMe = (event) => {
        setAboutMe(event.target.value);
    }
    const changeUserTypeField = (event) => {
        setUserTypeField(event.target.value);
    }
    const changeMenu = (event) => {
        setMenu(event.target.value);
    }

    const [error, setError] = useState("");

    // Handle "Save" button click:
    const saveUpdateHandler = () => {
        setError(null);
        if (firstName === "" || lastName === "" || email === "" || userTypeField === "") {
            setError("First name, last name, email, and user type field cannot be empty.");
        } else {
            const updatedUser = {
                ...currentUser,
                firstName,
                lastName,
                location,
                email,
                website,
                profilePicture,
                bannerPicture,
                aboutMe,
                phone,
                userTypeField,
                menu
            }
            dispatch(updateUserThunk(updatedUser));
            nav("/profile")
        }
    };

    // Handle "Delete Profile" button click:
    const deleteProfileHandler = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
        if (confirmDelete) {
            dispatch(deleteUserThunk(currentUser._id));
            dispatch(logoutThunk());
            nav("/login");
        }
    };

    // In case "Following"/"Followers" is clicked, just navigate back to "/profile":
    const handleEditPageFollowClick = () => {
        nav("/profile")
    }

    return (
        <div className="profile">
            <Container className="my-2">

                { /* Banner */}
                {
                    currentUser
                    &&
                    currentUser.bannerPicture
                    &&
                    <Row>
                        <Image
                            src={`${currentUser && currentUser.bannerPicture}`}
                            height="225px" width="100%"
                            style={{
                                borderRadius: "20px",
                                objectFit: "cover",
                                objectPosition: "center 10%"
                            }}
                        />
                    </Row>
                }

                { /* Rest of profile */}
                <Row className="mx-auto"
                     style={{
                         width: "97.5%",
                         marginTop: currentUser.bannerPicture ? "-20px" : "0px"
                     }}>
                    { /* First column */}
                    <Col md={3}>
                        <Card className="profile-card">
                            <Card.Body className="text-center">

                                <Image
                                    src={`${currentUser && currentUser.profilePicture}`}
                                    roundedCircle
                                    height="150px" width="150px"
                                    className="mx-auto mb-3"
                                />

                                <Card.Title className="profile-title">
                                    {currentUser && currentUser.firstName}
                                    &nbsp;
                                    {currentUser && currentUser.lastName}
                                </Card.Title>

                                <div className="text-muted profile-subtitle">

                                    { /* Printing if userType is CRITIC or RESTAURANT */}
                                    <div>
                                        {
                                            (currentUser.userType && currentUser.userType === "CRITIC")
                                                ?
                                                <div className="text-primary mb-1"
                                                     title="This user is a trusted Chews Wisely Critic.">
                                                    {
                                                        currentUser.userType.charAt(0).toUpperCase()
                                                        +
                                                        currentUser.userType.toLowerCase().slice(1)
                                                    }
                                                    &nbsp;
                                                    <i className="bi bi-patch-check-fill"/>
                                                </div>
                                                :
                                                <></>
                                        }

                                        {
                                            (currentUser.userType && currentUser.userType === "RESTAURANT")
                                                ?
                                                <div className="text-primary mb-1">
                                                    {
                                                        currentUser.userType.charAt(0).toUpperCase()
                                                        +
                                                        currentUser.userType.toLowerCase().slice(1)
                                                    }
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>

                                    <div>
                                        {currentUser && currentUser.username}
                                    </div>

                                    <div>
                                        {currentUser && currentUser.location}
                                    </div>

                                </div>

                                <hr style={{
                                    borderTop: '1px solid grey',
                                    width: '80%',
                                    margin: '0 auto'
                                }}/>

                                { /* Printing userTypeField */}
                                <div className="text-muted profile-subtitle mt-3">
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "PERSONAL"
                                        &&
                                        <div>
                                            Favorite Food: {currentUser.userTypeField}
                                        </div>
                                    }
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "CRITIC"
                                        &&
                                        <div>
                                            Specialty Cuisine: {currentUser.userTypeField}
                                        </div>
                                    }
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "RESTAURANT"
                                        &&
                                        <div>
                                            <div>
                                                Restaurant ID:
                                            </div>

                                            <Link to={`/details/${currentUser.userTypeField}`}>
                                                {currentUser.userTypeField}
                                            </Link>
                                        </div>
                                    }
                                </div>

                                <hr style={{
                                    borderTop: '1px solid grey',
                                    width: '80%',
                                    margin: '0 auto'
                                }}/>

                                <div className="mt-3 mb-3">

                                    { /* Following */}
                                    <div onClick={handleEditPageFollowClick}
                                         style={{cursor: 'pointer', border: 'none'}}>
                                            <span className="fw-bold">
                                                {
                                                    following && following.length
                                                }
                                            </span>
                                        &nbsp;
                                        <span className="text-muted">
                                                Following
                                            </span>
                                    </div>

                                    { /* Followers */}
                                    <div onClick={handleEditPageFollowClick}
                                         style={{cursor: 'pointer', border: 'none'}}
                                         className="mt-1">
                                            <span className="fw-bold">
                                                {
                                                    followers && followers.length
                                                }
                                            </span>
                                        &nbsp;
                                        <span className="text-muted">
                                                Followers
                                            </span>
                                    </div>

                                </div>

                                <hr style={{
                                    borderTop: '1px solid grey',
                                    width: '80%',
                                    margin: '0 auto'
                                }}/>

                                <div className="mt-3 mb-1 text-muted"
                                     style={{fontSize: "0.925rem"}}>

                                    <div>
                                        {currentUser && currentUser.email}
                                    </div>

                                    <div>
                                        {
                                            currentUser
                                            &&
                                            <Link to={currentUser.website}>
                                                {currentUser.website}
                                            </Link>
                                        }
                                    </div>

                                    <div>
                                        {currentUser && formatPhoneNumber(currentUser.phone)}
                                    </div>

                                </div>

                            </Card.Body>

                            <hr style={{
                                borderTop: '1px solid grey',
                                width: '80%',
                                margin: '0 auto'
                            }}/>

                            <ListGroup variant="flush" className="mt-2">

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/#"}
                                          style={{color: 'inherit', textDecoration: 'none'}}>
                                        Bookmarks
                                    </Link>
                                </ListGroup.Item>

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/#"}
                                          style={{color: 'inherit', textDecoration: 'none'}}>
                                        Reviews
                                    </Link>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>

                    { /* Second column */}
                    <Col md={9}>

                        { /* Save and cancel buttons */}
                        <div className={'text-center row'}>

                            <div className="col-sm-2 mb-3 mb-sm-0">
                                <Link to="/profile">
                                    <button className={'btn btn-dark rounded-pill  text-wrap'}>
                                        Cancel
                                    </button>
                                </Link>
                            </div>

                            <div className="col-sm-2 mb-3 mb-sm-0">
                                <button className={'btn btn-primary rounded-pill w-100'}
                                        onClick={saveUpdateHandler}>
                                    Save
                                </button>
                            </div>

                            <div className="col-8 d-flex justify-content-end">
                                <button className={'btn btn-danger rounded-pill w-50'}
                                        onClick={deleteProfileHandler}>
                                    Delete Profile
                                </button>
                            </div>

                        </div>

                        { /* Printing error upon error */}
                        <div>
                            {
                                error
                                &&
                                (
                                    <div className="alert alert-danger text-danger mt-3"
                                         role="alert">
                                        {error}
                                    </div>
                                )
                            }
                        </div>

                        { /* Edit profile text entry */}
                        <Card className="profile-card my-4">
                            <Card.Body>

                                <Card.Title className="profile-title">
                                    Edit Profile:
                                </Card.Title>

                                { /* Edit firstName */}
                                <form className="form-floating mt-4">
                                    <input id="firstName"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your first name"
                                           value={firstName}
                                           onChange={changeFirstName}
                                    />
                                    <label className="text-secondary" htmlFor="firstName">
                                        First Name*
                                    </label>
                                </form>

                                { /* Edit lastName */}
                                <form className="form-floating mt-4">
                                    <input id="lastName"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your last name"
                                           value={lastName}
                                           onChange={changeLastName}
                                    />
                                    <label className="text-secondary" htmlFor="lastName">
                                        Last Name*
                                    </label>
                                </form>

                                { /* Edit location */}
                                <form className="form-floating mt-4">
                                    <input id="location"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your location"
                                           value={location}
                                           onChange={changeLocation}
                                    />
                                    <label className="text-secondary" htmlFor="location">
                                        Location
                                    </label>
                                </form>

                                { /* Edit email */}
                                <form className="form-floating mt-4">
                                    <input id="email"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your email"
                                           value={email}
                                           onChange={changeEmail}
                                    />
                                    <label className="text-secondary" htmlFor="email">
                                        Email*
                                    </label>
                                </form>

                                { /* Edit phone */}
                                <form className="form-floating mt-4">
                                    <input id="phone"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your phone number (10 digits)"
                                           value={phone}
                                           onChange={changePhone}
                                    />
                                    <label className="text-secondary" htmlFor="phone">
                                        Phone
                                    </label>
                                </form>

                                { /* Edit website */}
                                <form className="form-floating mt-4">
                                    <input id="website"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter your website URL"
                                           value={website}
                                           onChange={changeWebsite}
                                    />
                                    <label className="text-secondary" htmlFor="website">
                                        Website
                                    </label>
                                </form>

                                { /* Edit profilePicture URL */}
                                <form className="form-floating mt-4">
                                    <input id="profilePicture"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter a URL for your profile picture"
                                           value={profilePicture}
                                           onChange={changeProfilePicture}
                                    />
                                    <label className="text-secondary" htmlFor="profilePicture">
                                        Profile Picture URL
                                    </label>
                                </form>

                                { /* Edit bannerPicture URL */}
                                <form className="form-floating mt-4">
                                    <input id="bannerPicture"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter a URL for your banner picture"
                                           value={bannerPicture}
                                           onChange={changeBannerPicture}
                                    />
                                    <label className="text-secondary" htmlFor="bannerPicture">
                                        Banner Picture URL
                                    </label>
                                </form>

                                { /* Edit aboutMe */}
                                <form className="form-floating mt-4">
                                    <input id="aboutMe"
                                           type="text"
                                           className="form-control"
                                           placeholder="Enter a quick intro"
                                           value={aboutMe}
                                           onChange={changeAboutMe}
                                    />
                                    <label className="text-secondary" htmlFor="aboutMe">
                                        About
                                    </label>
                                </form>

                                { /* Edit userTypeField */}
                                <form className="form-floating mt-4">
                                    <input id="userTypeField"
                                           type="text"
                                           className="form-control"
                                           value={userTypeField}
                                           onChange={changeUserTypeField}
                                    />
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "PERSONAL"
                                        &&
                                        <label className="text-secondary" htmlFor="userTypeField">
                                            Favorite Food (User Type Field)*
                                        </label>
                                    }
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "CRITIC"
                                        &&
                                        <label className="text-secondary" htmlFor="userTypeField">
                                            Specialty Cuisine (User Type Field)*
                                        </label>
                                    }
                                    {
                                        currentUser
                                        &&
                                        currentUser.userType === "RESTAURANT"
                                        &&
                                        <label className="text-secondary" htmlFor="userTypeField">
                                            Restaurant ID (User Type Field)*
                                        </label>
                                    }
                                </form>

                                { /* Edit menu (if restaurant) */}
                                {
                                    currentUser && currentUser.userType === "RESTAURANT"
                                        ?
                                        <form className="form-floating mt-4">
                                            <input id="menu"
                                                   type="text"
                                                   className="form-control"
                                                   placeholder="Enter menu"
                                                   value={menu}
                                                   onChange={changeMenu}
                                            />
                                            <label className="text-secondary" htmlFor="menu">
                                                Menu
                                            </label>
                                        </form>
                                        :
                                        <></>
                                }

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditProfile;
