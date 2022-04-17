const mongoose = require('mongoose')

const ExersiceSchema = new mongoose.Schema({
  activity: {
    type: String,
    enum: ["Running", "Walking", "PushUp", "PullUp"],
    require: [true, 'Please add a name'],
    maxLength: [50, "Type can not be more than 50 charachters"],
  },
  description: {
    type: String,
    required: false,
    maxLength: [400, "Description can not be more than 400 charachters"],
  },
  distance: {
    type: Number,
    required: [false, 'Please add a number'],
  }
})

const Exercise = mongoose.model('Exercise', ExersiceSchema)
module.exports = Exercise;