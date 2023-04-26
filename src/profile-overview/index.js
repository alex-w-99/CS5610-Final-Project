import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../profile/Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { findAllUsersThunk, findUserByIdThunk } from "../services/users-thunks";
import PageNotFound from "../page-not-found";
import "../utils/loading-spinner.css";
import { useState } from "react";
import {
    findFollowersThunk, findFollowIdThunk, findFollowingThunk, followUserThunk, unfollowUserThunk }
    from "../services/follow-thunks";
import { listFollowing, listFollower } from "../utils/list-follow";
import {findFollowers} from "../services/follow-service";

// Public profile page
const ProfileOverview = () => {
    const { uid } = useParams();
    const { currentUser, publicProfile, users, loading } = useSelector((state) => state.users);
    //const publicUser = users.find( (u) => u._id === uid );
    const { following, followers } = useSelector((state) => state.follow);
    const { followId } = useSelector((state) => state.follow);

    const [followsUser, setFollowsUser] = useState();

    const nav = useNavigate();
    const dispatch = useDispatch();

    // Follow/Unfollow button handlers:
    const followButtonHandler = async () => {
        if (!currentUser) {  // if not already logged in
            nav("/login");
        }
        else if (!followsUser) {  // can only follow if not currently following
            await dispatch(followUserThunk( { followee: uid } ));
            await setFollowsUser(true);
        }
    }
    const unfollowButtonHandler = async () => {
        if (followsUser) {  // can only unfollow if currently following
            await dispatch(unfollowUserThunk(followId));
            await setFollowsUser(false);
        }
    }

    useEffect(
        () => {
            if (currentUser && currentUser._id === uid) {  // i.e., if viewing own profile
                nav("/profile");
            }
            else if (currentUser === null) {  // i.e., if viewing public profile while not signed in
                (async function() {
                    await dispatch(findUserByIdThunk(uid))
                    await dispatch(findFollowersThunk(uid))
                    await dispatch(findFollowingThunk(uid))
                    await setFollowsUser(false)  // not logged in -> not following
                })()
                //dispatch(findAllUsersThunk())
            }
            else {  // i.e., if viewing public profile while signed in
                (async function() {
                    await dispatch(findUserByIdThunk(uid))
                    await dispatch(findFollowersThunk(uid))
                    await dispatch(findFollowingThunk(uid))
                    await dispatch(findFollowIdThunk(uid))
                    await setFollowsUser(followId !== null)
                })()
                //dispatch(findAllUsersThunk())
            }
        },
        [dispatch, currentUser, nav, uid, followsUser, followId]
    );

    // Setting up for showing and hiding following/follower information:
    const [showFollowingInfo, setShowFollowingInfo] = useState(false);
    const toggleShowFollowingInfo = () => { setShowFollowingInfo(prevValue => !prevValue); }
    const [showFollowerInfo, setShowFollowerInfo] = useState(false);
    const toggleShowFollowerInfo = () => { setShowFollowerInfo(prevValue => !prevValue); }

    return(
        <div className="profile">
            <Container className="my-1">

                {
                    !publicProfile
                    ?
                    (
                        loading
                        ?
                        <div className="spinner">
                        </div>
                        :
                        <PageNotFound/>
                    )
                    :
                    <div>
                        { /* Banner */ }
                        {
                            publicProfile
                            &&
                            publicProfile.bannerPicture
                            &&
                            <Row>
                                <Image
                                    src={`${publicProfile && publicProfile.bannerPicture}`}
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
                                 marginTop: publicProfile.bannerPicture ? "-20px" : "0px"
                             } }>
                            { /* First column */ }
                            <Col md={3}>
                                <Card className="profile-card">
                                    <Card.Body className="text-center">

                                        { /* Public information */ }
                                        <Image
                                            src={`${publicProfile && publicProfile.profilePicture}`}
                                            roundedCircle
                                            height="150px" width="150px"
                                            className="mx-auto mb-3"
                                        />

                                        <Card.Title className="profile-title">
                                            {publicProfile && publicProfile.firstName}
                                            &nbsp;
                                            {publicProfile && publicProfile.lastName}
                                        </Card.Title>

                                        <div className="text-muted profile-subtitle">

                                            { /* Printing if userType is CRITIC or RESTAURANT */ }
                                            <div>
                                                {
                                                    (publicProfile.userType && publicProfile.userType === "CRITIC")
                                                    ?
                                                    <div className="text-primary mb-1"
                                                         title="This user is a trusted Chews Wisely Critic.">
                                                        {
                                                            publicProfile.userType.charAt(0).toUpperCase()
                                                            +
                                                            publicProfile.userType.toLowerCase().slice(1)
                                                        }
                                                        &nbsp;
                                                        <i className="bi bi-patch-check-fill"/>
                                                    </div>
                                                    :
                                                    <></>
                                                }

                                                {
                                                    (publicProfile.userType && publicProfile.userType === "RESTAURANT")
                                                    ?
                                                    <div className="text-primary mb-1">
                                                        {
                                                            publicProfile.userType.charAt(0).toUpperCase()
                                                            +
                                                            publicProfile.userType.toLowerCase().slice(1)
                                                        }
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </div>

                                            <div>
                                                {publicProfile && publicProfile.username}
                                            </div>

                                            <div>
                                                {publicProfile && publicProfile.location}
                                            </div>

                                        </div>

                                        <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                        { /* Printing userTypeField */ }
                                        <div className="text-muted profile-subtitle mt-3">
                                            {
                                                publicProfile
                                                &&
                                                publicProfile.userType === "PERSONAL"
                                                &&
                                                <div>
                                                    Favorite Food: {publicProfile.userTypeField}
                                                </div>
                                            }
                                            {
                                                publicProfile
                                                &&
                                                publicProfile.userType === "CRITIC"
                                                &&
                                                <div>
                                                    Specialty Cuisine: {publicProfile.userTypeField}
                                                </div>
                                            }
                                            {
                                                publicProfile
                                                &&
                                                publicProfile.userType === "RESTAURANT"
                                                &&
                                                <div>
                                                    Restaurant ID: {publicProfile.userTypeField}
                                                </div>
                                            }
                                        </div>

                                        <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                        <div className="mt-3 mb-1">

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

                                            { /* Follow/Unfollow button */ }
                                            {
                                                followsUser
                                                ?
                                                <button type="button"
                                                        className="btn rounded-pill mt-2 btn-danger"
                                                        onClick={unfollowButtonHandler}
                                                        style={ { width: "175px" } }>
                                                    Unfollow
                                                </button>
                                                :
                                                <button type="button"
                                                        className="btn rounded-pill mt-2 btn-primary"
                                                        onClick={followButtonHandler}
                                                        style={ { width: "175px" } }>
                                                    Follow
                                                </button>
                                            }

                                        </div>

                                    </Card.Body>

                                    <hr style={ { borderTop: '1px solid grey', width: '80%', margin: '0 auto' } } />

                                    <ListGroup variant="flush" className="mt-2">

                                        <ListGroup.Item className="profile-nav-item text-center">
                                            <Link to={window.location.pathname}
                                                  style={ { color: 'inherit', textDecoration: 'none' } }>
                                                Bookmarks
                                            </Link>
                                        </ListGroup.Item>

                                        <ListGroup.Item className="profile-nav-item text-center">
                                            <Link to={window.location.pathname}
                                                  style={ { color: 'inherit', textDecoration: 'none' } }>
                                                Reviews
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
                                                            publicProfile && publicProfile.aboutMe
                                                            ?
                                                            <span>
                                                                {publicProfile.aboutMe}
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
                                                            following &&
                                                            following.filter(f => f.followee !== null).length > 0
                                                            ?
                                                            (
                                                                following.filter(f => f.followee !== null)
                                                                    .map(
                                                                        (follow, index) => (
                                                                            <div key={index}>
                                                                                {listFollower(follow)}
                                                                            </div>
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
                                                            followers &&
                                                            followers.filter(f => f.follower !== null).length > 0
                                                            ?
                                                            (
                                                                followers.filter(f => f.follower !== null)
                                                                    .map(
                                                                        (follow, index) => (
                                                                            <div key={index}>
                                                                                {listFollowing(follow)}
                                                                            </div>
                                                                        )
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
                    </div>
                }

            </Container>
        </div>
    );
}

export default ProfileOverview;