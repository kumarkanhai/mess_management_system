const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'staff'], 
    default: 'student' 
  },
  studentId: { type: String }, // Optional
  profileImage: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
