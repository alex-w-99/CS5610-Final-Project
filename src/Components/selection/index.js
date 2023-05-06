import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./index.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPizzaSlice,
    faFish,
    faCocktail,
    faWineBottle,
    faHamburger,
    faBeer,
    faDrumstickBite,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import {
    DinnerDining,
    LocalBar,
    LocalCafe,
    LocalDining,
    LocalPizza,
    SetMeal,
    Restaurant,
    TakeoutDining,
    RamenDining,
    Tapas,
    KebabDining,
    BrunchDining
} from '@mui/icons-material/';

const CategoryActivitiesSelection = ({activities}) => {
    const categories = [...new Set(activities.map(activity => activity.category))];
    const nav = useNavigate();
    const NavToSearch = (activity) => {
        nav(`/search/${activity}`, true);
    }
    const ResToSearch = (activity) => {
        nav(`/details/${activity}`, true);
    }
    const getIcon = (alias) => {
        switch (alias) {
            case 'Italian':
                return <LocalPizza/>;
            case 'Seafood':
                return <SetMeal/>;
            case 'Cocktail Bars':

                return <LocalBar/>;
            case 'Mediterranean':
            case 'Greek':
                return <KebabDining/>;
            case 'Tapas Bars':
            case 'Tapas/Small Plates':
            case 'Spanish':
                return <Tapas/>;
            case 'American (New)':
                return <Restaurant/>;
            case 'Japanese':
            case 'Sushi Bars':
            case 'Asian Fusion':
            case 'Korean':
                return <RamenDining/>;
            case 'Bars':
            case 'Pubs':
                return <LocalBar/>;
            case 'Southern':
                return <TakeoutDining/>;
            case 'Chinese':
                return <LocalDining/>;
            default:
                return <BrunchDining/>;

        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center display-4 py-4">Discover Local Food</h2>
                </div>
            </div>
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
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center display-4 py-4">Restaurant Categories</h2>
                </div>
            </div>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-lg-4 col-md-6 mb-4 " key={category}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h4 className="card-title">{getIcon(category)} {category}</h4>
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
