const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const tieneRole = require('./tiene-rol');
const esElProfesor = require('./es-el-profesor');
const alumnoNoInscritoEnCurso = require('./alumno-no-incrito-en-curso');

module.exports = {
  validarCampos,
  validarJWT,
  tieneRole,
  alumnoNoInscritoEnCurso,
  esElProfesor,
}