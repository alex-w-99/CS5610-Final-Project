import {Card, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

const About = () => {

    return(
        <div className="profile">
            <Container className="my-2">
                <Row>
                    <div className="col-2"></div> { /* this <div> is effectively just padding */ }

                    <div className="col-8">
                        <Card className="mt-3">

                            <Card.Title className="text-center mt-3" style={{fontSize: "30px"}}>
                                About Chews Wisely
                            </Card.Title>

                            <Image src="https://d13b2ieg84qqce.cloudfront.net/fe66f26254caf6de36fea90af9c4849312e4cb64.jpg"
                                   height="225px" width="90%"
                                   className="mx-auto"
                                   style={ {
                                       borderRadius: "10px",
                                       objectFit: "cover",
                                       objectPosition: "center 10%"
                                   } }
                            />

                            <div className="d-flex justify-content-center">
                                <div className="text-center mt-3 w-75">
                                    Chews Wisely is a final project for Northeastern University Graduate Web Development, showcasing a platform that provides users with personalized food recommendations based on their dietary preferences and restrictions. Our mission is to help users make more informed food choices and live healthier lives.
                                </div>
                            </div>

                            <div className="d-flex justify-content-center mb-5">
                                <div className="text-center mt-3 w-75">
                                    Our site stands out thanks to its user-friendly interface, reliable food data sources, and robust recommendation engine. We use state-of-the-art machine learning algorithms to analyze and classify thousands of food products, taking into account multiple factors such as nutritional value, ingredients, allergens, and certifications. Our goal is to make it easy for users to find foods that match their criteria and meet their individual needs, whether they are looking for gluten-free snacks, low-carb meals, or vegan options. We believe that everyone deserves to enjoy good food that is also good for them, and we strive to make this vision a reality through Chews Wisely.
                                </div>
                            </div>

                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default About;
