const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  weekNumber: { type: Number, required: true },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'absent',
  },
  markedAt:  { type: Date, default: null },
  location: {
    latitude:  { type: Number },
    longitude: { type: Number },
  },
  distanceFromClass: { type: Number },
  isWithinGeofence:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);