import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useState} from "react";
import {updateUserThunk} from "../services/users-thunks";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

const EditProfile = () => {
    const {currentUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [location, setLocation] = useState(currentUser.location);
    const [email, setEmail] = useState(currentUser.email);
    const [website, setWebsite] = useState(currentUser.website);
    const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
    const [bannerPicture, setBannerPicture] = useState(currentUser.bannerPicture);
    const [aboutMe, setAboutMe] = useState(currentUser.aboutMe);

    const saveUpdateHandler = () => {
        const modifiedUser = {
            ...currentUser,
            firstName,
            lastName,
            location,
            email,
            website,
            profilePicture,
            bannerPicture,
            aboutMe,
        }
        dispatch(updateUserThunk(modifiedUser))
        nav("/profile")
    };

    return(
        <div className="profile">
            <Container className="my-2">

                { /* Banner */ }
                {
                    currentUser
                    &&
                    currentUser.bannerPicture
                    &&
                    <Row>
                        <Image
                            src={`${currentUser && currentUser.bannerPicture}`}
                            height="225px" width="100%"
                            style={ {
                                borderRadius: "20px",
                                objectFit: "cover",
                                objectPosition: "center 10%"
                            } }
                        />
                    </Row>
                }

                { /* Rest of profile */ }
                <Row className="mx-auto"
                     style={ {
                         width: "97.5%",
                         marginTop: currentUser.bannerPicture ? "-20px" : "0px"
                     } }
                >
                    { /* First column */ }
                    <Col md={3}>
                        <Card className="profile-card">
                            <Card.Body className="text-center">
                                <Image
                                    src={`${currentUser && currentUser.profilePicture}`}
                                    roundedCircle
                                    height="150px" width="150px"
                                    className="mb-3"
                                />
                                <Card.Title className="profile-title">
                                    {currentUser && currentUser.firstName}
                                    &nbsp;
                                    {currentUser && currentUser.lastName}
                                </Card.Title>
                                <Card.Text className="text-muted profile-subtitle">
                                    <div>
                                        {currentUser && currentUser.username}
                                    </div>
                                    <div>
                                        {currentUser && currentUser.location}
                                    </div>
                                </Card.Text>

                                <hr style={{ borderTop: '1px solid grey', width: '80%', margin: '0 auto' }} />

                                <Card.Text className="mt-3 mb-2 text-muted">
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
                                </Card.Text>
                            </Card.Body>
                            <ListGroup variant="flush">

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/#"}
                                          style={ { color: 'inherit', textDecoration: 'none' } }>
                                        Reviews
                                    </Link>
                                </ListGroup.Item>

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/#"}
                                          style={ { color: 'inherit', textDecoration: 'none' } }>
                                        Bookmarks
                                    </Link>
                                </ListGroup.Item>

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/#"}
                                          style={ { color: 'inherit', textDecoration: 'none' } }>
                                        Friends
                                    </Link>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>

                    { /* Second column */ }
                    <Col md={9}>

                        { /* Save and cancel buttons */ }
                        <div className={'text-center row'}>

                            <div className="col-2">
                                <Link to="/profile">
                                    <button className={'btn btn-dark w-100'}>
                                        Cancel
                                    </button>
                                </Link>
                            </div>

                            <div className="col-2">
                                <button className={'btn btn-primary w-100'}
                                        onClick={saveUpdateHandler}>
                                    Save
                                </button>
                            </div>

                        </div>

                        { /* Edit profile text entry */ }
                        <Card className="profile-card my-4">
                            <Card.Body>

                                <Card.Title className="profile-title">
                                    Edit Profile:
                                </Card.Title>

                                { /* Edit firstName */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="firstName"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter your first name"
                                               value={firstName}
                                               onClick={setFirstName}
                                        />
                                        <label className="text-secondary" htmlFor="firstName">
                                            First Name
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit lastName */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="lastName"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter your last name"
                                               value={lastName}
                                               onClick={setLastName}
                                        />
                                        <label className="text-secondary" htmlFor="lastName">
                                            Last Name
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit location */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="location"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter your location"
                                               value={location}
                                               onClick={setLocation}
                                        />
                                        <label className="text-secondary" htmlFor="location">
                                            Location
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit email */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="email"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter your email"
                                               value={email}
                                               onClick={setEmail}
                                        />
                                        <label className="text-secondary" htmlFor="email">
                                            Email
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit website */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="website"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter your website URL"
                                               value={website}
                                               onClick={setWebsite}
                                        />
                                        <label className="text-secondary" htmlFor="website">
                                            Website
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit profilePicture URL */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="profilePicture"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter a URL for your profile picture"
                                               value={profilePicture}
                                               onClick={setProfilePicture}
                                        />
                                        <label className="text-secondary" htmlFor="profilePicture">
                                            Profile Picture URL
                                        </label>
                                    </form>
                                </Card.Text>

                                { /* Edit bannerPicture URL */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="bannerPicture"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter a URL for your banner picture"
                                               value={bannerPicture}
                                               onClick={setBannerPicture}
                                        />
                                        <label className="text-secondary" htmlFor="bannerPicture">
                                            Banner Picture URL
                                        </label>
                                    </form>
                                </Card.Text>


                                { /* Edit aboutMe */ }
                                <Card.Text>
                                    <form className="form-floating mt-4">
                                        <input id="aboutMe"
                                               type="text"
                                               className="form-control"
                                               placeholder="Enter a quick intro"
                                               value={aboutMe}
                                               onClick={setAboutMe}
                                        />
                                        <label className="text-secondary" htmlFor="aboutMe">
                                            About Me
                                        </label>
                                    </form>
                                </Card.Text>

                            </Card.Body>
                        </Card>



                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditProfile;
