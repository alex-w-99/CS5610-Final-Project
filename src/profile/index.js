import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import "./Profile.css";
import "../utils/close-button.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import formatPhoneNumber from "../utils/format-phone-number";
import { findFollowersThunk, findFollowingThunk } from "../services/follow-thunks";
import { listFollowing, listFollower } from "../utils/list-follow";

// Profile page
const Profile = () => {
    const { currentUser } = useSelector(state => state.users);
    const { following, followers } = useSelector(state => state.follow);

    const dispatch = useDispatch();
    useEffect(
        () => {
            if (currentUser) {  // defensive coding, in case currentUser is nul
                dispatch(findFollowersThunk(currentUser._id))
                dispatch(findFollowingThunk(currentUser._id))
            }
        },
        [dispatch, currentUser]
    );

    // Setting up for showing and hiding following/follower information:
    const [showFollowingInfo, setShowFollowingInfo] = useState(false);
    const toggleShowFollowingInfo = () => { setShowFollowingInfo(prevValue => !prevValue); }
    const [showFollowerInfo, setShowFollowerInfo] = useState(false);
    const toggleShowFollowerInfo = () => { setShowFollowerInfo(prevValue => !prevValue); }

    // Determining return value:
    if (!currentUser) {  // i.e., if not logged in
        return(
            <Navigate to={"/login"}/>
        );
    }
    else {  // i.e., if logged in
        return (
            <div className="profile">
                <Container className="my-1">

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
                         } }>
                        { /* First column */ }
                        <Col md={3}>
                            <Card className="profile-card">
                                <Card.Body className="text-center">

                                    { /* Public information */ }
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

                                    <div className="text-muted profile-subtitle">

                                        { /* Printing if userType is CRITIC or RESTAURANT */ }
                                        <div>
                                            {
                                                (
                                                    currentUser.userType
                                                    &&
                                                    currentUser.userType === "CRITIC"
                                                )
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
                                                (
                                                    currentUser.userType
                                                    &&
                                                    currentUser.userType === "RESTAURANT"
                                                )
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

                                    <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                    <div className="mt-3 mb-3">

                                        { /* Following */ }
                                        <div style={{ cursor: 'pointer', border: 'none' }}
                                             onClick={toggleShowFollowingInfo}>

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

                                        { /* Followers */ }
                                        <div style={ { cursor: 'pointer', border: 'none' } }
                                             className="mt-1"
                                             onClick={toggleShowFollowerInfo}>

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

                                    <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                    { /* Private information */ }
                                    <div className="mt-3 mb-1 text-muted"
                                         style={ { fontSize: "0.925rem" } }>

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
                                            {
                                                currentUser && currentUser.phone
                                                ?
                                                formatPhoneNumber(currentUser.phone)
                                                :
                                                <></>
                                            }
                                        </div>
                                    </div>

                                </Card.Body>

                                <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                <ListGroup variant="flush" className="mt-2">

                                    <ListGroup.Item className="profile-nav-item text-center">
                                        <Link to={"/profile/#"}
                                              style={ { color: 'inherit', textDecoration: 'none' } }>
                                            Bookmarks
                                        </Link>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="profile-nav-item text-center">
                                        <Link to={"/profile/#"}
                                              style={ { color: 'inherit', textDecoration: 'none' } }>
                                            Reviews
                                        </Link>
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
                            {
                                !showFollowingInfo && !showFollowerInfo &&
                                (
                                    <div>
                                        { /* About Me card */ }
                                        <Card className="profile-card">
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

                                        { /* Recent Activity card */ }
                                        <Card className="mt-4 profile-card">
                                            <Card.Body>
                                                <Card.Title className="profile-title">
                                                    Recent Activity
                                                </Card.Title>
                                                <Card.Text className="profile-text text-muted">
                                                    No recent activity to show
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                        { /* Photos card */ }
                                        <Card className="mt-4 profile-card">
                                            <Card.Body>
                                                <Card.Title>
                                                    Photos
                                                </Card.Title>
                                                <Card.Text className="text-muted">
                                                    No photos to show
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            }
                            {
                                showFollowingInfo &&
                                (
                                    <div className="mb-4">
                                        <Card className="profile-card">
                                            <div className="close-button" onClick={toggleShowFollowingInfo}>
                                                <i className="bi-x-lg"/>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>
                                                    Following:
                                                </Card.Title>
                                                <ul className="list-group">
                                                    {
                                                        following
                                                        &&
                                                        following.filter(f => f.followee !== null).length > 0
                                                        ?
                                                        (
                                                            following.filter(f => f.followee !== null)
                                                                .map(
                                                                    follow => (
                                                                        listFollower(follow)
                                                                    )
                                                                )
                                                        )
                                                        :
                                                        (
                                                            <li className="list-group-item">
                                                                Not following anyone yet!
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            }
                            {
                                showFollowerInfo &&
                                (
                                    <div className="mb-4">
                                        <Card className="profile-card">
                                            <div className="close-button" onClick={toggleShowFollowerInfo}>
                                                <i className="bi-x-lg"/>
                                            </div>
                                            <Card.Body>
                                                <Card.Title>
                                                    Followers:
                                                </Card.Title>
                                                <ul className="list-group">
                                                    {
                                                        followers
                                                        &&
                                                        followers.filter(f => f.follower !== null).length > 0
                                                        ?
                                                        (
                                                            followers
                                                                .filter(f => f.follower !== null)
                                                                .map(
                                                                    follow => listFollowing(follow)
                                                                )
                                                        )
                                                        :
                                                        (
                                                            <li className="list-group-item">
                                                                No followers yet!
                                                            </li>
                                                        )
                                                    }
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default Profile;
