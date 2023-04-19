import React, {useEffect} from 'react'
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../profile/Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatPhoneNumber from "../utils/format-phone-number";
import {useNavigate, useParams} from "react-router";

// Public profile page
const ProfileOverview = () => {
    const { uid } = useParams();
    const { currentUser } = useSelector(state => state.users);
    const { publicUser } = useSelector(state => state.users);

    console.log("profile-overview/index.js")
    console.log(uid)

    const nav = useNavigate();
    //useEffect(
    //    () => {
    //        if (currentUser && currentUser._id === uid) { nav("/profile") }
    //    }
    //);

    return(
        <div className="profile">
            <Container className="my-2">

                { /* Banner */ }
                {
                    publicUser
                    &&
                    publicUser.bannerPicture
                    &&
                    <Row>
                        <Image
                            src={`${currentUser && publicUser.bannerPicture}`}
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
                         marginTop: publicUser.bannerPicture ? "-20px" : "0px"
                     } }
                >
                    { /* First column */ }
                    <Col md={3}>
                        <Card className="profile-card">
                            <Card.Body className="text-center">

                                <Image
                                    src={`${currentUser && publicUser.profilePicture}`}
                                    roundedCircle
                                    height="150px" width="150px"
                                    className="mb-3"
                                />

                                <Card.Title className="profile-title">
                                    {currentUser && publicUser.firstName}
                                    &nbsp;
                                    {currentUser && publicUser.lastName}
                                </Card.Title>

                                <div className="text-muted profile-subtitle">
                                    <div>
                                        {publicUser && publicUser.username}
                                    </div>
                                    <div>
                                        {publicUser && publicUser.location}
                                    </div>
                                </div>

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
                                        Follow
                                    </Link>
                                </ListGroup.Item>

                                <ListGroup.Item className="profile-nav-item text-center">

                                    <div className="col-6">
                                        <Link to={"/profile/#"}
                                              style={ { color: 'inherit', textDecoration: 'none' } }>
                                            Following
                                        </Link>
                                    </div>

                                    <div className="col-6">
                                        <Link to={"/profile/#"}
                                              style={ { color: 'inherit', textDecoration: 'none' } }>
                                            Followers
                                        </Link>
                                    </div>

                                </ListGroup.Item>

                                <ListGroup.Item className="profile-nav-item text-center">
                                    <Link to={"/profile/edit-profile"}
                                          style={ { color: 'inherit', textDecoration: 'none' } }>
                                        Edit Profile
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
                                        publicUser && publicUser.aboutMe
                                        ?
                                        <span>
                                            {publicUser.aboutMe}
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
}

export default ProfileOverview;
