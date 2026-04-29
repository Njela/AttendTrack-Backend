const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Student = require('../models/Student');

exports.register = async (req, res) => {
  try {
    const { studentId, name, email, password, course } = req.body;

    const existing = await Student.findOne({ $or: [{ studentId }, { email }] });
    if (existing) {
      return res.status(400).json({ message: 'Student ID or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await Student.create({
      studentId, name, email,
      password: hashedPassword,
      course: course || 'Mobile Computing',
    });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: 'Registration successful',
      token,
      student: { id: student._id, studentId, name, email, course },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(401).json({ message: 'Invalid Student ID or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Student ID or password' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        course: student.course,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  res.json({ student: req.student });
};