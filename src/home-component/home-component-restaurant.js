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

const renderMenu = (text) => {
    return text.split('\\n').map((line, index) => (
        <li key={index} className="list-group-item">
            {line}
            <br />
        </li>
    ));
};

const HomeComponentRestaurant = () => {
    const { currentUser } = useSelector(state => state.users);

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

                                <Card.Title className="mt-5">
                                    Menu:
                                </Card.Title>

                                <div className="mt-2">
                                    {
                                        (currentUser && currentUser.menu !== "")
                                        ?
                                        <div>
                                            <ul className="list-group">
                                                {renderMenu(currentUser.menu)}
                                            </ul>
                                        </div>
                                        :
                                        <div className="alert alert-danger text-danger mt-3"
                                                    role="alert">
                                            Please add a menu!
                                        </div>
                                    }
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </div>
    );
};

export default HomeComponentRestaurant;
