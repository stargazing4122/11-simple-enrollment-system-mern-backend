const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  }
});

CourseSchema.methods.toJSON = function() {
  const {__v, _id, ...resto } = this.toObject();
  resto.id = _id;
  return resto;
}

module.exports = model('Course', CourseSchema);