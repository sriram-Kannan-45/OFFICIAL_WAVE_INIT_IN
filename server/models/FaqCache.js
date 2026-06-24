const mongoose = require('mongoose');

const faqCacheSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
  },
  suggestions: [{
    type: String,
  }],
  hitCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FaqCache', faqCacheSchema);
