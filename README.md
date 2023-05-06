# Chews-Wisely-React-Web-App

This repository contains the React.js front-end code for a Yelp-like social media and restaurant reviews web application. The web application with 6 distinct screens: Login/Register, Home, Profile, Search/results, Details. The corresponding back-end code can be found at the GitHub repository [linked here](https://github.com/alex-w-99/final-project-node-server-app/).

Please see a demo video of this web application [linked here](https://youtu.be/ZXjzzTKO9wc).

Please see a visual overview of the project's overarching structure below:

<p align="center">
  <img src="https://github.com/alex-w-99/final-project-react-web-app/blob/main/public/images/Overarching_Project_Structure.png" width="800">
</p>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, running `npm start` will run the app in development mode on `http://localhost:3000`, viewable in a browser. The page will reload when changes are made, and you may also see lint errors printed to the console.

## Pages

### Home page
The landing page of the web application, the home page, is the first page when visiting the website. It displays generic content for anonymous users and specific content for the logged-in user. The content is dynamic and based on the latest data entered by the user. The home page looks polished and finished and is mapped to either the root context `/` or `/home`.

### Profile page
The profile page is accessible to all users and displays personal information, links to related content, and groups similar data into distinguishable categories. The profile page allows users to change their personal information if they are logged in, but hides sensitive information from others visiting the profile. The profile page is mapped to `/profile` for displaying the profile of the currently logged-in user and to `/profile/{profileId}` for displaying someone else's profile.

### Search/Search Results page
The web application provides users the capability to search content from a remote service and display a summary of the results. The search and results page includes a form to search a remote API and a summarized list of results matching the search criteria. The results come from the remote API and can be augmented with related data in the local databases. The search and results page is mapped to `/search` when no search has been executed and no results exist and to `/search/{search criteria}` or `/search?criteria={search criteria}` when a search has been executed and the corresponding results shown.

### Details page
The details page allows users to view a detailed view of the search result, including additional related data from the local database and links to related data/users. The details page is mapped to `/details/{unique identifier}` or `/details?identifier={unique identifier}`, where the unique identifier uniquely identifies the item being displayed.

### Login/Register page
The login and register page allow users to register with the website and then login later on. Users can choose a role when signing up or select an admin role later. The login and register page disallows access one web page (namely, `/profile`) unless logged in and adapts content based on whether the user is logged in or not. The login and register pages are mapped to `/login` and `/register` respectively.

## Netlify URL:
- https://starlit-gecko-3b4549.netlify.app/

## Acknowledgements

- Melanie Becker and Mohammed Amer, my partners for this project.
- Professor Jose Annunziato, my Web Development professor.
