const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  }
});

exports.Review = mongoose.model('Review', reviewSchema);