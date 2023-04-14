import React from 'react';

const CategoryActivitiesSelection = () => {
    return (
        <div>
            <!-- Catalog of Recent Activities -->
            <div className="container">
                <h2>Recent Activities</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" src="https://via.placeholder.com/350x200?text=Activity+1" alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text">Activity 1 description goes here</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">Category 1</small>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Category Selection -->
            <div className="container">
                <h2>Select a Category</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" src="https://via.placeholder.com/350x200?text=Category+1" alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text">Category 1 description goes here</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryActivitiesSelection;