const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

PersonSchema.methods.toJSON = function() {
  const {__v, password, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
}

module.exports = model('Person', PersonSchema);