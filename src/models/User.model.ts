import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, 'Please add a first name'],
    maxLength: [50, "Type can not be more than 50 charachters"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please add a passwoed'],
  },
  token: {
    type: String,
    required: [false, 'Please add a passwoed'],
  },
})

export const User = mongoose.model('User', UserSchema)
