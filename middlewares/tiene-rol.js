const { request, response } = require("express");
const { Role } = require("../models");

const tieneRole = ( ...roles ) => {
  return async( req = request, res = response, next ) => {
    const idRole = req.person.role;
    const { name } = await Role.findById( idRole );
    if( !roles.includes( name )) {
      return res.status(401).json({
        ok: false,
        msg: `Rol sin permiso para realizar esta accion - disponible solo para ${ roles }`,
      })
    }

    next();
  }
}

module.exports = tieneRole;