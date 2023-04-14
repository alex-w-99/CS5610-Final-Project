import React from 'react';

const CategoryActivitiesSelection = () => {
    const activities = [
        {
            title: "Activity 1",
            description: "Activity 1 description goes here",
            category: "Category 1",
            imageUrl: "https://via.placeholder.com/350x200?text=Activity+1"
        }
    ];
    const categories = [
        {
            title: "Category 1",
            description: "Category 1 description goes here",
            imageUrl: "https://via.placeholder.com/350x200?text=Category+1"
        }
    ];
    return (
        <>
            <div className="container">
                <h2>Recent Activities</h2>
                <div className="row">
                    {activities.map((activity) => (
                        <div className="col-md-4" key={activity.title}>
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" src={activity.imageUrl} alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text">{activity.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">{activity.category}</small>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <h2>Select a Category</h2>
                <div className="row">
                    {categories.map((category) => (
                        <div className="col-md-4" key={category.title}>
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" src={category.imageUrl} alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text">{category.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryActivitiesSelection;
