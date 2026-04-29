const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  code:      { type: String, required: true },
  room:      { type: String, required: true },
  startTime: { type: String, required: true },
  endTime:   { type: String, required: true },
  weekNumber:{ type: Number, required: true },
  location: {
    latitude:  { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);