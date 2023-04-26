import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./index.css"

const CategoryActivitiesSelection = ({activities}) => {
    const categories = [...new Set(activities.map(activity => activity.category))];
    const nav = useNavigate();
    const NavToSearch = (activity) => {
        nav(`/search/${activity}`, true);
    }
    const ResToSearch = (activity) => {
        nav(`/details/${activity}`, true);
    }


    return (
        <div className="container">
            <h2 className="text-center my-4">Recent Activities</h2>
            <div className="row">
                {activities.map((activity) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={activity.title}>
                        <div className="card h-100">
                            <img className="card-img-top img-fluid" src={activity.imageUrl}
                                 alt="Card cap"/>
                            <div className="card-body">
                                <h4 className="card-title">{activity.title}</h4>
                                <p className="card-text">{activity.description}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <i className="bi bi-geo-alt"></i> Distance: {(activity.distance / 1609.344).toFixed(2)} mi
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <i className="bi bi-cash"></i> Price Range: {activity.price}
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <i className="bi bi-star-fill"></i> Rating: {activity.rating}
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <i className="bi bi-people"></i> Review
                                        Count: {activity.review_count}
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="card-footer d-flex justify-content-between align-items-center">
                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => ResToSearch(activity.id)}>
                                    <i className="bi bi-search"></i> View
                                </button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <h2 className="text-center my-4">Activity Categories</h2>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={category}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h4 className="card-title">{category}</h4>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Phasellus blandit arcu in erat tincidunt, nec
                                    rutrum risus sagittis. Nunc accumsan massa sed nisi tincidunt
                                    consequat.</p>
                            </div>
                            <div
                                className="card-footer d-flex justify-content-between align-items-center">
                                <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => NavToSearch(category)}>View Activities
                                </button>
                                <small
                                    className="text-muted">{activities.filter(activity => activity.category === category).length} Activities</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryActivitiesSelection;
