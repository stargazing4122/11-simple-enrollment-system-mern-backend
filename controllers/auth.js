const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = require('../helpers/generar-jwt');
const { Person } = require('../models');


const login = async( req = request, res = response ) => {

  const {email, password } = req.body;

  
  try {

    // verificar por el correo la persona existe
    const person = await Person.findOne({ email });
    if( !person ) {
      return res.status(401).json({
        msg: 'Usuario no existe en base de datos',
      });
    }
    // verficar el match de contraseñas
    const contraseñaValida = bcryptjs.compareSync(password, person.password);

    if( !contraseñaValida ){
      return res.status(401).json({
        msg: 'Contraseña incorrecta',
      })
    }
    // generar jwt
    const token = await generarJWT( person._id );
    
    res.status(200).json({
      msg: 'login ok',
      person,
      token,
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msg: 'error al generar el token'
    })
  }

}

module.exports = {
  login,
}