const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a new student
router.post('/', async (req, res) => {
  const student = new Student({
    roleNumber: req.body.roleNumber,
    name: req.body.name,
    marks: req.body.marks,
    total: parseInt(req.body.marks.english) + parseInt(req.body.marks.tamil) + parseInt(req.body.marks.maths) + parseInt(req.body.marks.social) + parseInt(req.body.marks.science),
    status: 'Pass',
  });

  // Check if any subject has marks less than 35
  for (const subject in req.body.marks) {
    if (req.body.marks[subject] < 35) {
      student.status = 'Fail';
      break;
    }
  }

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
