Airbnb Website

Project Description:
This project is a React application inspired by the Airbnb homepage. The primary focus of this project is to replicate the core elements of the Airbnb homepage, building a responsive and interactive user interface. It includes functional components such as a navigation bar, search bar, horizontal category list, listing cards, and a footer. The app supports responsive design, making it look good on both desktop and mobile devices, and uses React hooks (`useState` and `useEffect`) for state management and handling side effects. The project is built using **React** and styled with **CSS** for simplicity, focusing on clean design and proper component structure.

Setup Instructions:
1. **Create the React App**
   First, initialized a new React project using Create React App by running the following command in the terminal:
   npx create-react-app airbnb-clone
   cd airbnb-clone
2. Install Dependencies
After creating the project, installed any additional dependencies as required:
npm install
3. Set Up Git Repository: Then, initialized a Git repository and pushed the project to GitHub.
4. Run the Application: To start the server:
npm run dev

Project Structure:
The project follows a clean structure to separate concerns, making it easier to maintain and scale.

•	src/ inside this folder, there are further 2 folders: components and css.

        1	components/
                =>	Navbar.jsx: Contains the navigation bar with links and user menu.
                =>	SearchBar.jsx: Includes the location input field and search button.
                =>	Categories.jsx: Displays a scrollable list of category buttons.
                =>	ListingCard.jsx: Shows property details including images, titles, and prices.
                =>	Footer.jsx: Contains footer links and social media icons.
        2	css/
                =>	App.css: Styles for the Desktop and media.
        3	App.jsx: The main file where all components are assembled into the homepage layout.


Assumptions and Design Decisions

Assumptions:
	The project does not include any backend functionality or real data fetching. Instead, mock data is used to simulate listings and categories.
	The application assumes basic Airbnb-like categories (e.g., Beachfront, Cabins) for the horizontal scrollable list.
	The navbar will collapse into a hamburger menu for mobile responsiveness at a screen width of 500px or less.

Design Decisions:
	The project uses functional components along with the useState and useEffect hooks to manage component state and lifecycle events.
	Styles are modularized and scoped to individual components to prevent style leakage and improve maintainability.
	The layout is fully responsive using CSS media queries, and transitions smoothly between desktop and mobile views.
	For simplicity, the project uses local state via useState, avoiding more complex state management libraries like Redux.
