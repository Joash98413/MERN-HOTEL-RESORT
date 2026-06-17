import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
        console.log('URI:', process.env.MONGO_URI);
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'hotel',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

export default connectDB;