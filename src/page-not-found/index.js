import {Card, Col, Container, Image, Row} from "react-bootstrap";
import React from "react";

const PageNotFound = () => {
    return(
        <div className="not-found">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col md={6} className="text-center">
                        <Image fluid
                               className="mb-2 mt-2"
                               alt="404 Page Not Found image"
                               src={process.env.PUBLIC_URL + "/images/PageNotFound.jpg"}/>
                        <Card>
                            <Card.Body>
                                <h1 className="display-1">404</h1>
                                <p className="lead">Page Not Found</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PageNotFound;
