
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
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
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
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/protected', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Protected data', user: decoded });
    } catch {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
});

const AdminPropertySchema = new mongoose.Schema({
    title: String,
    type: String,
    price: String,
    image: String,
    guests: Number,
    bedrooms: Number,
    bathrooms: Number,
    description: String,
});

const AdminProperty = mongoose.model('AdminProperty', AdminPropertySchema);

app.get('/api/admin/listings', async (req, res) => {
    try {
        const properties = await Property.find(); 
        const adminProperties = [];
        for (let property of properties) {
            const existingProperty = await AdminProperty.findOne({ title: property.title });
            if (!existingProperty) {
                adminProperties.push({
                    title: property.title,
                    type: property.type,
                    price: property.price,
                    image: property.image,
                    guests: property.guests,
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    description: property.description
                });
            }
        }

        if (adminProperties.length > 0) {
            await AdminProperty.insertMany(adminProperties);
        }
        res.status(200).json(adminProperties);
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).json({ message: 'Failed to fetch listings for admin' });
    }
});

app.get('/api/admin/listings', async (req, res) => {
    try {
        const adminProperties = await AdminProperty.find();
        res.status(200).json(adminProperties);
    } catch (err) {
        console.error('Error fetching admin listings:', err);
        res.status(500).json({ message: 'Failed to fetch admin listings' });
    }
});

app.post('/api/admin/listings', async (req, res) => {
    try {
        const { title, type, price, image, guests, bedrooms, bathrooms, description } = req.body;
        const newAdminProperty = new AdminProperty({ title, type, price, image, guests, bedrooms, bathrooms, description });
        await newAdminProperty.save();
        const adminProperties = await AdminProperty.find();
        res.status(201).json(adminProperties);  // Return the full list
    } catch (err) {
        console.error('Error adding admin listing:', err);
        res.status(500).json({ message: 'Failed to add admin listing' });
    }
});
app.delete('/api/admin/listings/:id', async (req, res) => {
    try {
        const adminProperty = await AdminProperty.findByIdAndDelete(req.params.id);
        if (!adminProperty) {
            return res.status(404).json({ message: 'Admin listing not found' });
        }
        res.status(200).json({ message: 'Admin listing deleted successfully' });
    } catch (err) {
        console.error('Error deleting admin listing:', err);
        res.status(500).json({ message: 'Failed to delete admin listing' });
    }
});
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
