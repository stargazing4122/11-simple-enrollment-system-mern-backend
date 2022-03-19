const { Role, Person } = require("../models")

const existeRolPorId = async( rolId ) => {
  const existeRole = await Role.findById( rolId );

  if( !existeRole ) {
    throw new Error('Este id rol no existe en la base de datos');
  }
}


const existeEmail = async( email ) => {
  
  const emailEnDb = await Person.findOne({ email });

  if( emailEnDb ) {
    throw new Error('Este email ya existe');
  } 
}

module.exports = {
  existeRolPorId,
  existeEmail,
}