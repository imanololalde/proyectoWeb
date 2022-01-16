import mongoose from 'mongoose';

const userSchema = {
    firstName: String,
    lastName: String,
    password: String,
    age: Number,
}

export default mongoose.model('User', userSchema);