const { Schema, model } = require('mongoose');

const EnrollmentSchema = Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

EnrollmentSchema.methods.toJSON = function() {
  const {__v, _id, ...resto } = this.toObject();
  resto.id = _id;
  return resto;
}

module.exports = model('Enrollment', EnrollmentSchema);