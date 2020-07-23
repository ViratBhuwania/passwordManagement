var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mongodbuser:jokerisback@cluster0.offol.mongodb.net/pms?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true })
var conn = mongoose.connection

var passcatSchema = new mongoose.Schema({
  password_category: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
})

var passCateModel = mongoose.model('password_categories', passcatSchema)

module.exports = passCateModel
