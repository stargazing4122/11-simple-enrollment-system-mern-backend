const { Router } = require('express');
const { check } = require('express-validator');

const { registerPerson, getPeople, getEstudiantesPorCurso } = require('../controllers/persons');
const { existeRolPorId, existeEmail, existeCoursePorId } = require('../helpers/validate-person');
const { validarCampos, validarJWT, tieneRole, esElProfesor } = require('../middlewares');


const router = Router();

router.get('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
], getPeople );

router.get('/courses/:courseId', [
  validarJWT,
  tieneRole('ADMIN_ROLE', 'PROFESSOR_ROLE'),
  check('courseId', 'este no es un id de mongo').isMongoId(),
  validarCampos,
  check('courseId').custom( existeCoursePorId ),
  validarCampos,
  esElProfesor,
], getEstudiantesPorCurso )

router.post('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('role', 'No es un id de mongo').isMongoId(),
  check('role').custom( existeRolPorId ),
  check('email', 'El email es obligatorio').notEmpty(),
  check('email').custom( existeEmail ),
  check('password', 'El password es almenos de 6 caracteres').isLength({min: 6}),
  validarCampos,
], registerPerson );


module.exports = router;