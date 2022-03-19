const { Router } = require('express');
const { check } = require('express-validator');

const { crearMatricula } = require('../controllers/enrollment');
const { existeCoursePorId } = require('../helpers/validate-person');
const { validarJWT, tieneRole, alumnoNoInscritoEnCurso, validarCampos } = require('../middlewares');


const router = Router();

router.post('/', [
  validarJWT,
  tieneRole('STUDENT_ROLE'),
  check('course', 'No es un id de mongo').isMongoId(),
  validarCampos,
  check('course').custom( existeCoursePorId ),
  validarCampos,
  alumnoNoInscritoEnCurso,
], crearMatricula);

module.exports = router;