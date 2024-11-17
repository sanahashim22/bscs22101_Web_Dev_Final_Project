

import express from 'express';
import mockListings from './src/components/mocklisting.js';
import cors from 'cors';
import fs from 'fs';
//import path from 'path';

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

//http://localhost:5000/api/bookings/
app.get('/api/bookings', (req, res) => {
    const filePath = './bookings.json';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading bookings.json:', err);
            return res.status(500).json({ message: 'Failed to retrieve bookings.' });
        }

        try {
            const bookings = JSON.parse(data);
            res.status(200).json(bookings);
        } catch (parseError) {
            console.error('Error parsing bookings.json:', parseError);
            res.status(500).json({ message: 'Failed to parse bookings.' });
        }
    });
});

//http://localhost:5000/api/bookings/88
app.get('/api/bookings/:id', (req, res) => {
    const bookingId = parseInt(req.params.id); // Convert ID to a number
    const filePath = './bookings.json';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading bookings.json:', err);
            return res.status(500).json({ message: 'Failed to retrieve booking.' });
        }

        try {
            const bookings = JSON.parse(data);
            const booking = bookings.find(b => b.bookingId === bookingId); // Match booking ID

            if (booking) {
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: `Booking with ID ${bookingId} not found.` });
            }
        } catch (parseError) {
            console.error('Error parsing bookings.json:', parseError);
            res.status(500).json({ message: 'Failed to parse bookings.' });
        }
    });
});

app.post('/api/bookings/:id', (req, res) => {
    const booking = req.body;
    const filePath = './bookings.json';

    fs.readFile(filePath, (err, data) => {
        let bookings = [];
        if (!err && data) {
            try {
                bookings = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing bookings.json:', parseError);
            }
        }

        bookings.push(booking);

        fs.writeFile(filePath, JSON.stringify(bookings, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving booking:', writeErr);
                return res.status(500).json({ message: 'Failed to save booking.' });
            }
            res.status(200).json({ message: 'Booking saved successfully!' });
        });
    });
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
