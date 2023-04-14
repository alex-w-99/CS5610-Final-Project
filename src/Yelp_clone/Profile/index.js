import React from 'react'
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile">
        <Container className="my-5">
            <Row>
                <Col md={3}>
                    <Card className="profile-card">
                        <Card.Body className="text-center">
                            <Image
                                src="https://via.placeholder.com/150"
                                roundedCircle
                                className="mb-3"
                            />
                            <Card.Title className="profile-title">John Doe</Card.Title>
                            <Card.Text className="text-muted profile-subtitle">
                                San Francisco, CA
                            </Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="profile-nav-item">
                                Reviews
                            </ListGroup.Item>
                            <ListGroup.Item className="profile-nav-item">
                                Bookmarks
                            </ListGroup.Item>
                            <ListGroup.Item className="profile-nav-item">
                                Friends
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={9}>
                    <Card className="profile-card">
                        <Card.Body>
                            <Card.Title className="profile-title">Recent Activity</Card.Title>
                            <Card.Text className="profile-text">No recent activity to show</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="my-4">
                        <Card.Body>
                            <Card.Title>About Me</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue enim
                                sapien, vel commodo sapien luctus eu. Pellentesque habitant morbi tristique
                                senectus et netus et malesuada fames ac turpis egestas. Suspendisse rutrum
                                molestie eros, in rutrum erat venenatis eget. Vestibulum blandit lectus eget
                                justo maximus, ut rutrum eros commodo. Vestibulum vel massa eget ante gravida
                                auctor. Vestibulum at ultrices quam, ut suscipit mauris. Donec elementum
                                turpis eget ante bibendum porttitor.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Photos</Card.Title>
                            <Card.Text>No photos to show</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default Profile;
