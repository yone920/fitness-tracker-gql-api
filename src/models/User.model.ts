import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, 'Please add a first name'],
    maxLength: [50, "Type can not be more than 50 charachters"],
  },
  lastName: {
    type: String,
    require: [true, 'Please add a last name'],
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
  }
})

export const User = mongoose.model('User', UserSchema)
