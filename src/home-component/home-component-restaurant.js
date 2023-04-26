import {useDispatch, useSelector} from "react-redux";
import CarouselImage from "../Components/carousel-image";
import RecentReviews from "./recent-reviews";
import { Container, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import React from "react";
import { useEffect } from "react";
import {
    findReviewsByUserThunk,
    findReviewsThunk
} from "../services/site-db-restaurants/site-restaurants-thunks";
import ReviewItem from "./recent-reviews/review-item";
import "../utils/loading-spinner.css";

const HomeComponentRestaurant = () => {
    const { currentUser } = useSelector(state => state.users);
    const { reviews, loading } = useSelector(state => state.reviews);

    const dispatch = useDispatch();

    // 1. get all restaurant objects
    // 2. filter for restaurant with restaurant.yelpId === currentUser.userTypeField
    // 3. pass that restaurant that passed the filter to dispatch(findReviewsThunk(...)...

    // ONLY SHOW THEIR MENU ***OR*** TELL THEM THAT THEY NEED TO ADD THEIR MENU

    useEffect(
        () => {
            dispatch(findReviewsThunk(currentUser.userTypeField));
            },
        [reviews]
    );

    let getLast = 8;
    if (reviews) {
        if (reviews.length < getLast) {
            getLast = reviews.length;
        }
    }

    const getReviewsContent = () => {



        // DETERMINE RETURN VALUE OF HELPER FUNCTION:
        if (getLast == 0) {
            return(
                <Container className="my-4">
                    <Row className="mx-auto" style={{width: "97.5%"}}>

                        <Col className="col-2"></Col>

                        <Col className="col-8">
                            <Card className="profile-card">
                                <Card.Body>

                                    <Card.Title>
                                        Recent Reviews of {currentUser.firstName} {currentUser.lastName}:
                                    </Card.Title>

                                    <ul className="list-group">
                                        {
                                            loading
                                            ?
                                            <div className="spinner">
                                            </div>
                                            :
                                            <li className="list-group-item">
                                                No reviews yet!
                                            </li>
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            let recentReviews = reviews.slice(getLast * -1);
            return(

            );
        }


    }

    //  RETURN VALUE:
    return(
        <div>

            { /* Welcome message */ }
            <h1 className="text-center display-4 py-4">
                Welcome Back, {currentUser.firstName} {currentUser.lastName}
            </h1>

            { /* Carousel image */ }
            <CarouselImage />

            { /* Reviews of your restaurant */ }
            <Container className="my-4">
                <Row className="mx-auto" style={{width: "97.5%"}}>

                    <Col className="col-2"></Col>

                    <Col className="col-8">
                        <Card className="profile-card">
                            <Card.Body>

                                <Card.Title>
                                    Welcome back {currentUser.firstName} {currentUser.lastName}!
                                </Card.Title>

                                {
                                    (currentUser && currentUser.menu !== "")
                                    ?
                                    <Card.Text>
                                        {currentUser.menu}
                                    </Card.Text>
                                    :
                                    <Card.Text className="alert alert-danger text-danger mt-3"
                                                role="alert">
                                        Please add a menu!
                                    </Card.Text>
                                }

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </div>
    );
};

export default HomeComponentRestaurant;
