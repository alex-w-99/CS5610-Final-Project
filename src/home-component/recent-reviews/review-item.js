import React from 'react';
import '../index.css'
import {useNavigate} from 'react-router-dom';
import {Card} from "react-bootstrap";
import "./index.css"

const ReviewItem = ({
                        review = {
                            "text": "lorem ipsum",
                            "restaurantId": "123",
                            "restaurantName": "hello"
                        }
                    }) => {
    const navigate = useNavigate();
    if (!review.restaurantYelp) {
        return;
    }
    let print = review.text.slice(0, 500);
    if (review.text.length > 500) {
        print += '...';
    }
    let dateStr = new Date(review.createdAt);
    dateStr = dateStr.toLocaleDateString();
    console.log("the nav link would be " + `details/${review.restaurantId}`)
    return (
        <Card className="cw-review-item"
              onClick={() => navigate(`/details/${review.restaurantYelp}`)}>
            <Card.Body>
                <Card.Title className="fw-bold">
                    You reviewed {review.restaurantName} on{' '}
                    <span className="mb-1">{dateStr}</span>
                </Card.Title>
                <Card.Text>
                    <i className="bi bi-chat"></i> "{print}"
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default ReviewItem;