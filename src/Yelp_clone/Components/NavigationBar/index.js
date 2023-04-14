import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/yelp/landingpage" className="navbar-brand">Yelp Clone</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto justify-content-evenly w-100">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Restaurants</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/yelp/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Auto Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">More</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Sign Up</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Business</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/yelp/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log In</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary btn-sm my-2 my-sm-0" type="submit">Write a Review</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
