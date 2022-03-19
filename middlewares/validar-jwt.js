const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Person } = require("../models");

const validarJWT = async( req = request, res = response, next ) => {

  // validar si se envio un token
  const token = req.header('x-token');
  if( !token ) {
    return res.status(401).json({
      msg: 'No se envio un token de auth'
    })
  }


  try {
    // validar si el token es valido
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  
    // validar si el person del token existe 
    const person = await Person.findById( uid );
    if( !person ) {
      return res.status(401).json({
        msg: 'El usuario de este token no existe'
      })
    }

    // injectar el person al request y next
    req.person = person;
    next();
    
  } catch (err) {
    return res.status(401).json({
      msg: 'Este token no es valido',
    })
  }
}

module.exports = validarJWT;