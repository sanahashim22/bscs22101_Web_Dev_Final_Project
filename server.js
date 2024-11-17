

import express from 'express';
import mockListings from './src/components/mocklisting.js';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors({
    origin: 'http://localhost:5173',  // React frontend's port
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
  }));
  
app.use(express.json()); // For parsing application/json

// http://localhost:5000/api/listings
app.get('/api/listings', (req, res) => {
    const allListings = Object.values(mockListings).flat();
    res.json(allListings);
});

// http://localhost:5000/api/listings/1
app.get('/api/listings/:id', (req, res) => {
    const allListings = Object.values(mockListings).flat();
    const listing = allListings.find(item => item.id === parseInt(req.params.id));
    if (listing) {
        res.json(listing);
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
});
//http://localhost:5000/api/listings/name
app.get('/api/listings/:title', (req, res) => {
    const title = decodeURIComponent(req.params.title);
    const allListings = Object.values(mockListings).flat();
    const listing = allListings.find(item => item.title.toLowerCase().trim() === title.toLowerCase().trim());
    if (listing) {
        res.json(listing);
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
});


// Sample route for getting booking details by booking ID
app.get('/api/bookings/:id', (req, res) => {
    const bookingId = parseInt(req.params.id);
    console.log('Looking for booking with ID:', bookingId); // Log the booking ID

    const allListings = Object.values(mockListings).flat(); // Flatten the listings
    let foundBooking = null;

    allListings.forEach(listing => {
        if (listing.bookings) {
            console.log('Searching within listing:', listing.id); // Log listing info
            foundBooking = listing.bookings.find(b => b.id === bookingId);
        }
    });

    if (!foundBooking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(foundBooking);
});

// Mock route to create a booking
app.post('/api/bookings/:id', (req, res) => {
    const { checkIn, checkOut, bookingId } = req.body;
    const listingId = parseInt(req.params.id);
    
    const allListings = Object.values(mockListings).flat();
    const listing = allListings.find(item => item.id === listingId);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    // Mock booking logic: Here you could save the booking details to a database
    // Respond with success message
    res.status(201).json({
        message: 'Booking successful',
        bookingId,
        listingId,
        checkIn,
        checkOut,
        listingTitle: listing.title
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
