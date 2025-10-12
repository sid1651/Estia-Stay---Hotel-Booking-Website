import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database connected  yes yes '));
    mongoose.connection.on('error', (err) => console.log('Database connection error:', err));

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'hotel-booking',
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('DB connection failed:', error.message);
  }finally{
console.log("triinnnnnn")
  }
};

export default connectDB;
