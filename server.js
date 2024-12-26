
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
//When a server generates a JWT (e.g., during user login), it uses the JWT_SECRET to create a unique signature for the token. which is in .env file
//Later, when the server verifies the JWT sent by the client, it uses the same JWT_SECRET to confirm that the token was not tampered with.
// The token will expire after 1 hour (expiresIn: '1h'). yeh mein ne use kiya hai in login jwt line
// Once expired, the token is no longer valid for authentication, but it remains 
// in localStorage or sessionStorage unless explicitly removed.
if (!JWT_SECRET) {
    console.error("Error: JWT_SECRET is not set in the .env file.");
    process.exit(1);
  }

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/listingsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['host', 'guest'], required: true } // Role field added
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role input
        if (!['host', 'guest'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/api/verify-host', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (user.role === 'host') {
        res.status(200).json({ isHost: true });
      } else {
        res.status(400).json({ message: 'You are not a host' });
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



const HostPropertySchema = new mongoose.Schema({
    id: Number,
    title: String,
    type: String,
    price: String,
    image: String,
    category: String,
    guests: Number,
    bedrooms: Number,
    bathrooms: Number,
    rating: Number,
    description: String,
});

const HostProperty = mongoose.model('HostProperty', HostPropertySchema);

app.get('/api/host/listings', async (req, res) => {
    try {
        const listings = await HostProperty.find();
        res.status(200).json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ message: 'Error fetching listings' });
    }
});

app.post('/api/host/listings', async (req, res) => {
    try {
        const nextId = await getNextId('propertyId');
        const {title, type, price, image, category, guests, bedrooms, bathrooms, rating, description } = req.body;
        const newHostListing = new HostProperty({
            id: nextId,
            title,
            type,
            price,
            image,
            category,
            guests,
            bedrooms,
            bathrooms,
            rating,
            description,
        });
        await newHostListing.save();

        const newProperty = new Property({
            id: nextId,
            title,
            type,
            price,
            image,
            category,
            guests,
            bedrooms,
            bathrooms,
            rating,
            description,
        });
        await newProperty.save();

        res.status(201).json({
            message: 'Listing added successfully to both Host and Property collections',
            hostListing: newHostListing,
            propertyListing: newProperty,
        });
    } catch (error) {
        console.error('Error adding new listing:', error);
        res.status(500).json({ message: 'Error adding new listing' });
    }
});

app.delete('/api/host/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Delete from HostProperty
        const deletedHostListing = await HostProperty.findByIdAndDelete(id);

        if (deletedHostListing) {
            // Delete from Property using a shared field like id
            await Property.findOneAndDelete({ id: deletedHostListing.id });

            return res.status(200).json({ 
                message: 'Listing deleted successfully from both Host and Property collections' 
            });
        } else {
            res.status(404).json({ message: 'Host listing not found' });
        }
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ message: 'Error deleting listing' });
    }
});















const counterSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
});

const Counter = mongoose.model('Counter', counterSchema);


async function initializeCounter() {
    const existingCounter = await Counter.findOne({ key: 'propertyId' });
    if (!existingCounter) {
        await Counter.create({ key: 'propertyId', value: 102 });
        console.log('Counter initialized.');
    }
}

initializeCounter();


async function getNextId(key) {
    const counter = await Counter.findOneAndUpdate(
        { key },
        { $inc: { value: 1 } }, 
        { new: true, upsert: true } 
    );
    return counter.value;
}





const propertySchema = new mongoose.Schema({
    id: Number,
    title: String,
    type: String,
    price: String,
    image: String,
    category: String,
    guests: Number,
    bedrooms: Number,
    bathrooms: Number,
    rating: Number,
    description: String,
});

const Property = mongoose.model('Property', propertySchema);
export { Property };

// http://localhost:5000/api/admin/listings
app.get('/api/admin/listings', async (req, res) => {
    try {
        const properties = await Property.find(); 
        res.json(properties); 
    } catch {
        res.status(500).json({ message: 'Failed to fetch listings' });
    }
});
//http://localhost:5000/api/admin/listings
app.post('/api/admin/listings', async (req, res) => {
    try {
        const nextId = await getNextId('propertyId');
        const { title, type, price, image, category, guests, bedrooms, bathrooms, rating, description } = req.body;
        const newProperty = new Property({ 
            id: nextId,
            title, 
            type, 
            price, 
            image, 
            category,
            guests, 
            bedrooms, 
            bathrooms, 
            rating,
            description 
        });

        await newProperty.save();
        const properties = await Property.find();
        res.status(201).json(properties);
    } catch (err) {
        console.error('Error adding admin listing:', err);
        res.status(500).json({ message: 'Failed to add admin listing' });
    }
});


app.delete('/api/admin/listings/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('Error deleting listing:', err);
        res.status(500).json({ message: 'Failed to delete listing' });
    }
});

const AdminBookingSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    email: { type: String, required: true },
    bookingId: { type: String, required: true },
  });
  
  const AdminBooking = mongoose.model('AdminBooking', AdminBookingSchema);
// http://localhost:5000/api/admin/bookings
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        
        for (let booking of bookings) {
            const existingBooking = await AdminBooking.findOne({ bookingId: booking.bookingId });
            if (!existingBooking) {
                const newAdminBooking = new AdminBooking({
                    propertyId: booking.propertyId,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalPrice: booking.totalPrice,
                    email: booking.email,
                    bookingId: booking.bookingId
                });
                await newAdminBooking.save();
            }
        }
        const adminBookings = await AdminBooking.find();
        res.status(200).json(adminBookings);
    } catch (err) {
        console.error('Error copying bookings:', err);
        res.status(500).json({ message: 'Failed to copy bookings' });
    }
});

app.get('/api/host/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        
        for (let booking of bookings) {
            const existingBooking = await AdminBooking.findOne({ bookingId: booking.bookingId });
            if (!existingBooking) {
                const newAdminBooking = new AdminBooking({
                    propertyId: booking.propertyId,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalPrice: booking.totalPrice,
                    email: booking.email,
                    bookingId: booking.bookingId
                });
                await newAdminBooking.save();
            }
        }
        const adminBookings = await AdminBooking.find();
        res.status(200).json(adminBookings);
    } catch (err) {
        console.error('Error copying bookings:', err);
        res.status(500).json({ message: 'Failed to copy bookings' });
    }
});


const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

// http://localhost:5000/api/admin/users
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find();
        for (let user of users) {
            const existingUser = await AdminUser.findOne({ email: user.email });
            if (!existingUser) {
                const newAdminUser = new AdminUser({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                await newAdminUser.save();
            }
        }
        const adminUsers = await AdminUser.find();
        res.status(200).json(adminUsers);
    } catch (err) {
        console.error('Error fetching admin users:', err);
        res.status(500).json({ message: 'Failed to fetch admin users' });
    }
});



app.post('/api/verify-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ passwordVerified: true });
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const BookingSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    email: { type: String, required: true },
    bookingId: { type: String, required: true },
});

const Booking = mongoose.model('Booking', BookingSchema);
// http://localhost:5000/api/bookings
app.post('/api/bookings', async (req, res) => {
    try {
        const { propertyId, checkIn, checkOut, totalPrice, bookingId, email } = req.body;

        if (!propertyId || !checkIn || !checkOut || !totalPrice || !bookingId || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newBooking = new Booking({
            propertyId,
            checkIn,
            checkOut,
            totalPrice,
            bookingId,
            email,
        });

        await newBooking.save(); 
        res.status(201).json({ bookingId: newBooking.bookingId, message: 'Booking created successfully' });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ message: 'Server error while creating booking' });
    }
});


// http://localhost:5000/api/listings
app.get('/api/listings', async (req, res) => {
    try {
        const properties = await Property.find(); 
        res.json(properties); 
    } catch {
        res.status(500).json({ message: 'Failed to fetch listings' });
    }
});



// for past bookings of user
app.get('/api/bookings/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userBookings = await Booking.find({ email });
        if (!userBookings.length) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }
        res.status(200).json(userBookings);
    } catch (err) {
        console.error('Error fetching user bookings:', err);
        res.status(500).json({ message: 'Failed to fetch user bookings' });
    }
});






 // http://localhost:5000/api/listings/1
app.get('/api/listings/:id', async (req, res) => {
    try {
        const property = await Property.findOne({ id: parseInt(req.params.id) });
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch {
        res.status(500).json({ message: 'Error retrieving property' });
    }
});

app.get('/api/properties/:id', async (req, res) => {
    const propertyId = req.params.id;

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Error fetching property details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

