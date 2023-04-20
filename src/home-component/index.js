import HomeComponent from "./home-component";

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
 *          * unsure however we can imp a design
 */
function HomeScreen() {
    return (

       <HomeComponent/>
    )
}

export default HomeScreen;