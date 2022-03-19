const bcryptjs = require('bcryptjs');
const { request, response } = require("express");
const { Person } = require('../models');

const registerPerson = async( req = request, res = response ) => {

  const { name, role, email, password } = req.body;

  const salt = bcryptjs.genSaltSync();
  const data = {
    name,
    role,
    email,
    password: bcryptjs.hashSync( password, salt ),
  }

  try {

    const person = new Person( data );
    await person.save();

    return res.json({
      msg: 'persona registrada',
      person,
    })
    
  } catch (err) {
    return res.status(500).json({
      msg: 'Error de servidor al crear el usuario'
    })
  }

}

module.exports = {
  registerPerson,
}