const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = require('../helpers/generar-jwt');
const { Person } = require('../models');

// /login
const login = async( req = request, res = response ) => {

  const {email, password } = req.body;

  
  try {

    // verificar por el correo la persona existe
    const person = await Person.findOne({ email }).populate('role');
    if( !person ) {
      return res.status(401).json({
        ok: false,
        msg: 'Usuario no existe en base de datos',
      });
    }
    // verficar el match de contraseñas
    const contraseñaValida = bcryptjs.compareSync(password, person.password);

    if( !contraseñaValida ){
      return res.status(401).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      })
    }
    // generar jwt
    const token = await generarJWT( person._id );
    
    res.status(200).json({
      ok: true,
      msg: 'login ok',
      person,
      token,
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ok: false,
      msg: 'error al generar el token'
    })
  }

}


// revalidar sesion

const validateAuth = async( req = request, res = response ) => {

  const uid = req.person._id.toString();
  try {
    // get usuario para res
    const person = await Person.findById( uid ).populate('role');
    // nuevo token
    const newToken = await generarJWT( uid );

    // respuesta
    res.status(201).json({
      ok: true,
      msg: 'auth revalidado',
      person,
      token: newToken,

    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'problemas de servidor',
    })
  }
}

module.exports = {
  login,
  validateAuth,
}