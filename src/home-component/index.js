import HomeComponent from "./home-component";
import { useSelector } from 'react-redux';
import CarouselImage from "../Components/carousel-image";
import HomeComponentRestaurant from "./home-component-restaurant";

/**
 * *******POST LOGIN*******
 * Most likely needing conditional statements to determine who logged in -
 * unsure if handled here or elsewhere by login feature. most likely going to have separate landing pages for users
 *
 * Idea of layout --
 *  - nav bar 8 px spanning entire top of screen
 *  - underneath container
 *      - 2 column left
 *          * some feature for quick navigation or filtering
 *      - 8 column mid
 *          * MAIN CONTENT
 *              containing gps info etc. DEPENDENT ON LOGIN
 *      - 2 column right
 *          * unsure however we can implement a design
 */
function HomeScreen() {
    const { currentUser } = useSelector(state => state.users);

    if (!currentUser) {
        return(
            <HomeComponent/>
        );
    }
    else if (currentUser.userType === "RESTAURANT") {
        return(
            <HomeComponentRestaurant/>
        );
    }
    else {  // i.e., CRITIC or PERSONAL user
        return (
            <HomeComponent/>
        );
    }
}

export default HomeScreen;