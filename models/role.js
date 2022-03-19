const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  name: {
    type: String,
    required: true,
    enum: ['STUDENT_ROLE', 'PROFESSOR_ROLE', 'ADMIN_ROLE'],
  },
});

RoleSchema.methods.toJSON = function() {
  const {__v, _id, ...resto } = this.toObject();
  resto.id = _id;
  return resto;
}

module.exports = model('Role', RoleSchema);