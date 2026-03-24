import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error(
                'Missing MONGO_URI. Create backend/.env and set MONGO_URI to your MongoDB connection string.'
            );
        }

        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
