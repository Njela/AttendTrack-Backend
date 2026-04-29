const Attendance = require('../models/Attendance');

exports.getMyReport = async (req, res) => {
  try {
    const TOTAL_WEEKS = 14;
    const studentId = req.student._id;

    const records = await Attendance.find({ student: studentId })
      .populate('class', 'name code room startTime endTime weekNumber')
      .sort({ weekNumber: 1 });

    const present = records.filter(r => r.status === 'present').length;
    const absent  = TOTAL_WEEKS - present;
    const rate    = ((present / TOTAL_WEEKS) * 100).toFixed(1);

    const weeklyData = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
      const week = i + 1;
      const record = records.find(r => r.weekNumber === week);
      return {
        week,
        status:   record?.status || 'absent',
        markedAt: record?.markedAt || null,
        time:     record?.markedAt
          ? new Date(record.markedAt).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit'
            })
          : '—',
      };
    });

    res.json({
      summary: { present, absent, rate, totalWeeks: TOTAL_WEEKS },
      weeklyData,
      recentSessions: [...records].reverse().slice(0, 5),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};