const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userMail: {
    type: String,
    required: true
  },
  clothId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clothes',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('carts', cartSchema)
