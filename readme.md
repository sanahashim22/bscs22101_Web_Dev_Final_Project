Airbnb-inspired Backend Project

Project Description
This project aims to enhance an Airbnb-inspired application by integrating a Node.js and Express.js backend. The primary objective is to provide a rich user experience by allowing users to view property details, interact with booking pages, and access property listings through API routes. The backend serves static data for listings and booking functionality, and is designed to handle basic API requests for retrieving and posting data.

The backend is connected to a React frontend that displays property listings and allows users to interact with detailed property pages and booking forms.

Features:
1: Static Property Listings: Predefined property data displayed on the homepage.
2: Listing Details: View detailed information about a property by clicking on it.
3: Search Functionality: A basic search feature to filter listings based on location.
4: Booking Page: A page for booking properties with form validation and booking confirmation.


Instructions for Running the Frontend and Backend Servers
Backend Setup (Node.js and Express.js)

o Clone the repository:
git clone <repository_url>
cd <repository_folder>


o Install dependencies: Navigate to the backend directory and install required packages using npm:
npm install

o Start the backend server: In the backend folder, run:
node server.js

o Run the React application: To start the frontend server, use:
npm run dev

This will start the React application on http://localhost:5173

Frontend Routes (Using React Router)
1 Homepage ("/"): Displays the list of property listings.
2 Listing Details Page ("/listings/
"): Displays the detailed page of a specific listing, fetched by its ID.
3 Booking Page ("/booking/
"): Displays the booking form for a selected listing, allowing users to input booking details.

Frontend Components and Pages
1 ListingCard Component: Displays basic information about the listing such as the title, type, guests, and price.
2 Listing Details Page: Shows detailed property information and a "Book Now" button to navigate to the booking page.
3 Booking Page: Contains a booking form where users input their check-in and check-out dates. After submission, a mock confirmation is shown with the total price.



Assumptions and Design Decisions

Assumptions:
The backend serves static data as mock listings.
The backend does not connect to a real database; data is hardcoded in JSON files.
The frontend and backend are connected locally.


Design Decisions:
React Router is used for routing between the homepage, listing details, and booking pages.
State management uses React's useState and useEffect hooks to manage form states and data fetching.



