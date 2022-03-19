const { Router } = require('express');
const { check } = require('express-validator');
const { getCourses, agregarCurso } = require('../controllers/courses');
const { existeProfesorPorId, existeCursoPorNombre } = require('../helpers/validate-person');
const {validarJWT, tieneRole, validarCampos} = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
], getCourses);

router.post('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('name').custom( existeCursoPorNombre ),
  check('professor', 'No es un id de mongo').isMongoId(),
  validarCampos,
  check('professor').custom( existeProfesorPorId ),
  validarCampos,
], agregarCurso );



module.exports = router;