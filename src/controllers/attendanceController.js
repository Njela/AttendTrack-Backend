const Attendance = require('../models/Attendance');
const Class      = require('../models/Class');
const { isWithinGeofence } = require('../utils/gpsUtils');

exports.markAttendance = async (req, res) => {
  try {
    const { latitude, longitude, weekNumber } = req.body;
    const studentId = req.student._id;

    // Find active class
    const activeClass = await Class.findOne({ weekNumber, isActive: true });
    if (!activeClass) {
      return res.status(404).json({ message: 'No active class found for this week' });
    }

    // Check geofence
    const { withinZone, distance } = isWithinGeofence(
      latitude, longitude,
      activeClass.location.latitude,
      activeClass.location.longitude
    );

    if (!withinZone) {
      return res.status(403).json({
        message: `You are ${distance}m away. Must be within ${process.env.GEOFENCE_RADIUS}m to mark attendance.`,
        distance,
        withinZone: false,
      });
    }

    // Check if already marked
    const existing = await Attendance.findOne({
      student: studentId,
      class: activeClass._id,
      weekNumber,
    });

    if (existing && existing.status === 'present') {
      return res.status(400).json({ message: 'Attendance already marked for this week' });
    }

    // Mark attendance
    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, class: activeClass._id, weekNumber },
      {
        status: 'present',
        markedAt: new Date(),
        location: { latitude, longitude },
        distanceFromClass: distance,
        isWithinGeofence: true,
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Attendance marked successfully',
      attendance,
      distance,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.student._id })
      .populate('class', 'name code room startTime endTime weekNumber')
      .sort({ weekNumber: 1 });

    res.json({ attendance: records });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};