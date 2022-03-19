const { Router } = require('express');
const { check } = require('express-validator');
const { getCourses, agregarCurso, getCoursesStudentNoEnrollment, getCoursesStudentEnrollment, getCoursesByProfessor } = require('../controllers/courses');
const { existeProfesorPorId, existeCursoPorNombre, existeAlumnoPorId } = require('../helpers/validate-person');
const {validarJWT, tieneRole, validarCampos} = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE', 'STUDENT_ROLE'),
], getCourses);

router.get('/no-enrollment/:studentId', [
  validarJWT,
  tieneRole('ADMIN_ROLE', 'STUDENT_ROLE'),
  check('studentId', 'No es un id de mongo').isMongoId(),
  validarCampos,
  check('studentId').custom( existeAlumnoPorId ),
  validarCampos,
], getCoursesStudentNoEnrollment );

router.get('/enrollment/:studentId', [
  validarJWT,
  tieneRole('ADMIN_ROLE', 'STUDENT_ROLE'),
  check('studentId', 'No es un id de mongo').isMongoId(),
  validarCampos,
  check('studentId').custom( existeAlumnoPorId ),
  validarCampos,
], getCoursesStudentEnrollment );

router.get('/professor/:professorId', [
  validarJWT,
  tieneRole('ADMIN_ROLE', 'PROFESSOR_ROLE'),
  check('professorId', 'No es un id de Mongo').isMongoId(),
  validarCampos,
  check('professorId').custom( existeProfesorPorId ),
  validarCampos,
], getCoursesByProfessor );

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