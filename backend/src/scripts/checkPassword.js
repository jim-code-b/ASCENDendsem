import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkPassword = async (email, password) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return;
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    // Show user details (excluding password)
    const userDetails = user.toObject();
    delete userDetails.password;
    console.log('User details:', userDetails);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Usage: node checkPassword.js <email> <password>
const [,, email, password] = process.argv;
if (!email || !password) {
  console.log('Please provide email and password');
  process.exit(1);
}

checkPassword(email, password); 