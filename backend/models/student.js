const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  roleNumber: { type: Number, required: true },
  name: { type: String, required: true },
  marks: {
    english: { type: Number, required: true },
    tamil: { type: Number, required: true },
    maths: { type: Number, required: true },
    social: { type: Number, required: true },
    science: { type: Number, required: true },
  },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'Pass' },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
