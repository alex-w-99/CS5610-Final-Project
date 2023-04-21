import { Link } from "react-router-dom";
import React from "react";

// create and return a <li> for each account user is following
export const listFollowing = (follow) => {
    return(
        <li key={follow.follower._id} className="list-group-item">
            <Link to={`/profile/${follow.follower._id}`}
                  style={ { color: 'inherit', textDecoration: 'none' } }>
                <div className="row">
                    <div className="col-1">
                        <img
                            src={follow.follower.profilePicture}
                            alt="profile"
                            height="45px" width="45px"
                            style={ { borderRadius: "50%" } }
                        />
                    </div>
                    <div className="col-11">
                        <div className="fw-bold">
                            {follow.follower.firstName} {follow.follower.lastName}
                        </div>
                        <div className="text-muted">
                            {follow.follower.username}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

// create and return a <li> for each account following user
export const listFollower = (follow) => {
    return(
        <li key={follow.followee._id} className="list-group-item">
            <Link to={`/profile/${follow.followee._id}`}
                  style={ { color: 'inherit', textDecoration: 'none' } }>
                <div className="row">
                    <div className="col-1">
                        <img
                            src={follow.followee.profilePicture}
                            alt="profile"
                            height="45px" width="45px"
                            style={ { borderRadius: "50%" } }
                        />
                    </div>
                    <div className="col-11">
                        <div className="fw-bold">
                            {follow.followee.firstName} {follow.followee.lastName}
                        </div>
                        <div className="text-muted">
                            {follow.followee.username}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
