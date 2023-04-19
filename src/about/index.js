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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nisl eu enim feugiat malesuada cursus et nisl. Vivamus fringilla sapien et est egestas, at ullamcorper tellus ornare. Phasellus maximus, purus eu convallis scelerisque, velit nisi vehicula libero, sit amet euismod enim libero sit amet sapien. Morbi sodales iaculis turpis ut gravida. Proin a leo orci. Fusce commodo turpis a suscipit tincidunt. Ut varius scelerisque tellus eget efficitur. Pellentesque et ante quis arcu blandit venenatis in vitae dolor. Nulla facilisi.
                                </div>
                            </div>

                            <div className="d-flex justify-content-center mb-5">
                                <div className="text-center mt-3 w-75">
                                    In hac habitasse platea dictumst. Mauris interdum dolor nulla, et semper metus iaculis sit amet. Integer molestie est est. Praesent volutpat porta odio nec tempus. Duis ante lacus, consequat ac diam sed, vulputate pulvinar enim. Donec velit velit, commodo at nisi id, varius pellentesque neque. In varius libero accumsan varius feugiat. Fusce aliquet ante eget purus placerat volutpat. Integer lacinia ipsum nec auctor facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec imperdiet, urna ac commodo cursus, orci purus semper augue, vitae aliquet turpis quam consectetur diam. Pellentesque a neque ligula. Morbi ac lacus odio. Phasellus pretium, nisi quis molestie euismod, nibh lectus tempor nunc, in auctor turpis ex nec lacus.
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
