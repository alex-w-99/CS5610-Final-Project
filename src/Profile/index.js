import React from 'react'
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import './Profile.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

// Profile page
const Profile = () => {
    const {currentUser} = useSelector(state => state.users);
    const dispatch = useDispatch();
    // useEffect( ... );

    if (currentUser) {console.log("currentuser")} else {console.log("no current user!")}

    return (
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
                                    <Link to={"/profile/edit-profile"}
                                          style={ { color: 'inherit', textDecoration: 'none' } }>
                                        Edit Profile
                                    </Link>
                                </ListGroup.Item>

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

                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title className="profile-title">
                                    Recent Activity
                                </Card.Title>
                                <Card.Text className="profile-text text-muted">
                                    No recent activity to show
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className="my-4">
                            <Card.Body>
                                <Card.Title>
                                    About Me
                                </Card.Title>
                                <Card.Text>
                                    {
                                        currentUser && currentUser.aboutMe
                                        ?
                                        <span>
                                            {currentUser.aboutMe}
                                        </span>
                                        :
                                        <span className="text-muted">
                                            This section is empty
                                        </span>
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Photos
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    No photos to show
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
