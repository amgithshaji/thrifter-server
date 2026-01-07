const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true
  },
  clothId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clothes',
    required: true
  }
})

module.exports = mongoose.model('wishlists', wishlistSchema)

