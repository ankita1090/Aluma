import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {type: String , required: true, unique: true},
    password : {type: String , required: true},
    username: {type: String, default: ''},
    occupation: {type: String, default: ''},
    age: Number,
    createdAt: { type: Date, default: Date.now },
})

// export default mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
export default User;