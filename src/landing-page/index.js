/**
 * Landing page:
 *  Considered the initial page of the website.
 *  All users start here not logged in
 */

import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <div>

            <div>
                <h1>NAV BAR/TITLE BAR</h1>
                <span>CONTAINS: search feature / login option / our page icon and logo -- maybe we create one</span>
            </div>
            <div>
                <p>Container option main div holds the rows and utilize components to supplement the nav bar feature</p>
                <p>This is where the container for the card- bootstrap ref - comes in</p>
                <span>containing an image potentially scrolling and text underneath welcoming to the site</span>
            </div>
            <div>
                <p>
                    footnote - small container holding a similar functionality to the nav bar
                    - ideal concept is that it holds a small contact page where we can have a messaging service
                    - a meet the devs page where we can all have our small info for jobs etc.
                    - any ideas here ...

                </p>
            </div>

            <div>
                Profiles (links are dependent on MongoDB "users" collection object IDs):
                <ul>

                    <li>
                        <Link to="/profile/64455849bbae6627cae7c36e">
                            alex-w-99
                        </Link>
                    </li>

                    <li>
                        <Link to="/profile/6445594abbae6627cae7c371">
                            beckerMel
                        </Link>
                    </li>

                    <li>
                        <Link to="/profile/64455927bbae6627cae7c370">
                            mjamilamer
                        </Link>
                    </li>

                    <li>
                        <Link to="/profile/64458a12bbae6627cae7c376">
                            Amelia's Taqueria
                        </Link>
                    </li>

                </ul>
            </div>

        </div>
    )
}
export default LandingPage;