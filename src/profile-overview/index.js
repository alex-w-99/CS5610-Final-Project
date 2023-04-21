import React, { useEffect } from 'react'
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../profile/Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import {findAllUsersThunk, findUserByIdThunk} from "../services/users-thunks";
import PageNotFound from "../page-not-found";
import "../utils/loading-spinner.css";
import { useState } from "react";
import {findFollowersThunk, findFollowIdThunk, findFollowingThunk} from "../services/follow-thunks";
import { listFollowing, listFollower } from "../utils/list-follow";


// Public profile page
const ProfileOverview = () => {
    const { uid } = useParams();
    const { currentUser } = useSelector((state) => state.users);
    const { users, loading } = useSelector((state) => state.users);
    const publicUser = users.find( (u) => u._id === uid );

    const { following, followers } = useSelector((state) => state.follow);

    const nav = useNavigate();
    const dispatch = useDispatch();
    useEffect(
        () => {
            if (currentUser && currentUser._id === uid) {
                nav("/profile");
            }
            (async function() {
                await dispatch(findUserByIdThunk(uid))
                await dispatch(findFollowersThunk(uid))
                await dispatch(findFollowingThunk(uid))
                //await dispatch(findFollowIdThunk(uid))
            })()
            dispatch(findAllUsersThunk())
        },
        [dispatch, currentUser, nav, uid]
    );



    //if (currentUser && currentUser._id === uid) { nav("/profile"); }


    // Setting up for showing and hiding following/follower information:
    const [showFollowingInfo, setShowFollowingInfo] = useState(false);
    const toggleShowFollowingInfo = () => { setShowFollowingInfo(prevValue => !prevValue); }
    const [showFollowerInfo, setShowFollowerInfo] = useState(false);
    const toggleShowFollowerInfo = () => { setShowFollowerInfo(prevValue => !prevValue); }

    return(
        <div className="profile">
            <Container className="my-2">

                {
                    publicUser
                    ?
                    <div>
                        { /* Banner */ }
                        {
                            publicUser
                            &&
                            publicUser.bannerPicture
                            &&
                            <Row>
                                <Image
                                    src={`${publicUser && publicUser.bannerPicture}`}
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
                             } }>
                            { /* First column */ }
                            <Col md={3}>
                                <Card className="profile-card">
                                    <Card.Body className="text-center">

                                        { /* Public information */ }
                                        <Image
                                            src={`${publicUser && publicUser.profilePicture}`}
                                            roundedCircle
                                            height="150px" width="150px"
                                            className="mb-3"
                                        />

                                        <Card.Title className="profile-title">
                                            {publicUser && publicUser.firstName}
                                            &nbsp;
                                            {publicUser && publicUser.lastName}
                                        </Card.Title>

                                        <div className="text-muted profile-subtitle">

                                            { /* Printing if user is CRITIC */ }
                                            <div>
                                                {
                                                    publicUser.userType === "CRITIC"
                                                    &&
                                                    <div className="text-primary mb-1"
                                                         title="This user is a trusted Chews Wisely critic.">
                                                        Critic&nbsp;
                                                        <i className="bi bi-patch-check-fill"/>
                                                    </div>
                                                }
                                            </div>

                                            <div>
                                                {publicUser && publicUser.username}
                                            </div>

                                            <div>
                                                {publicUser && publicUser.location}
                                            </div>

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

                                            { /* Follow button */ }
                                            <button type="button"
                                                    className="btn btn-primary rounded-pill mt-2"
                                                    style={ { width: "175px" } }>
                                                Follow
                                            </button>

                                        </div>

                                    </Card.Body>

                                    <ListGroup variant="flush">

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
                                                            following
                                                                .filter(f => f.followee !== null).length > 0
                                                            ?
                                                            (
                                                                following.
                                                                filter(f => f.followee !== null)
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
                                                            followers &&
                                                            followers
                                                                .filter(f => f.follower !== null).length > 0
                                                            ?
                                                            (
                                                                followers.
                                                                filter(f => f.follower !== null)
                                                                    .map(
                                                                        follow => (
                                                                            listFollowing(follow)
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
                    :
                    (
                        loading
                        ?
                        <div className="spinner">
                        </div>
                        :
                        <PageNotFound/>
                    )
                }

            </Container>
        </div>
    );
}

export default ProfileOverview;