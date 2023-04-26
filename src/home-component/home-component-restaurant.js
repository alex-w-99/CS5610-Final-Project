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
    useEffect(
        () => {
            dispatch(findReviewsThunk(currentUser.userTypeField));
            },
        []
    );

    let getLast = 8;
    if (reviews) {
        if (reviews.length < getLast) {
            getLast = reviews.length;
        }
    }




    const getReviewsContent = () => {
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
                                                {
                                                    recentReviews
                                                        .reverse()
                                                        .map(
                                                            (r) =>
                                                                <div key={r._id} className="mt-1 mb-1">
                                                                    <ReviewItem review={r}/>
                                                                </div>
                                                        )
                                                }
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
            {getReviewsContent()}

        </div>
    );
};

export default HomeComponentRestaurant;
