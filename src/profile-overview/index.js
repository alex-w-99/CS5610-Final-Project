import React, { useEffect } from 'react'
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../profile/Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { findAllUsersThunk } from "../services/users-thunks";
import PageNotFound from "../page-not-found";
import "../utils/loading-spinner.css";
import { findFollowersThunk, findFollowingThunk } from "../services/follow-thunks";

// Public profile page
const ProfileOverview = () => {
    const { uid } = useParams();
    const { currentUser } = useSelector((state) => state.users);

    const { publicUser } = useSelector((state) => state.users);

    const { following, followers } = useSelector((state) => state.follow);

    const { loading } = useSelector((state) => state.users);
    //const { users, loading } = useSelector((state) => state.users);
    //const publicUser = users.find( (u) => u._id === uid );

    console.log("PROFILE OVERVIEW: ");
    console.log("\t" + currentUser);

    const nav = useNavigate();
    const dispatch = useDispatch();
    useEffect(
        () => {
            if (currentUser !== null && uid === currentUser._id) {
                nav("/profile");
            }
            else {
                dispatch(findFollowersThunk(publicUser._id))
                dispatch(findFollowingThunk(publicUser._id))
            }
        },
        [dispatch, currentUser, uid, nav]
    );

    dispatch(findFollowersThunk(publicUser._id))
    dispatch(findFollowingThunk(publicUser._id))

    //if (currentUser && currentUser._id === uid) { nav("/profile"); }

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
                             } }
                        >
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

                                        x

                                    </Card.Body>
                                    <ListGroup variant="flush">

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
                                            <Link to={"/profile/#"}
                                                  style={ { color: 'inherit', textDecoration: 'none' } }>
                                                Follow
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
