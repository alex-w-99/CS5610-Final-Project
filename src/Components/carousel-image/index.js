import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const CarouselImage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Array of images to display
    const images = [
        {
            src:
                '../images/background-1.jpg',
            alt: 'First slide',
        },
        {
            src:
                '../images/background-2.jpg',
            alt: 'Second slide',
        },
        {
            src:
                '../images/background-3.jpg',
            alt: 'Third slide',
        },
    ];

    // Set timer to automatically advance to next slide
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [images.length]);

    // Handle button clicks to change active index
    const handlePrevClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {images.map((_, index) => (
                    <li
                        key={index}
                        data-target="#carouselExampleIndicators"
                        data-slide-to={index}
                        className={activeIndex === index ? 'active' : ''}
                    />
                ))}
            </ol>
            <div className="carousel-inner">

                {images.map((image, index) => (
                    <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
                        <img className="container-fluid" src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={handlePrevClick}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={handleNextClick}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default CarouselImage;
