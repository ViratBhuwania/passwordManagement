var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mongodbuser:jokerisback@cluster0.offol.mongodb.net/pms?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true })
var conn = mongoose.connection

var passSchema = new mongoose.Schema({
  password_category: {
    type: String,
    required: true

  },
  password_name: {
    type: String,
    required: true
  },
  password_detail: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

var passModel = mongoose.model('password_details', passSchema)

module.exports = passModel
