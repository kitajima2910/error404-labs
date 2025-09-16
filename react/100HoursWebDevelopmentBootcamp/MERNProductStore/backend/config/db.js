import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGO_URI = `${process.env.MONGO_HOST}${process.env.MONGO_USER}${process.env.MONGO_PASSWORD}${process.env.MONGO_DOMAIN}${process.env.MONGO_DATABASE_NAME}${process.env.MONGO_PARAMS}`;
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
