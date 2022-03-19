const { Router } = require('express');
const { check } = require('express-validator');
const { getCourses } = require('../controllers/courses');
const {validarJWT, tieneRole, validarCampos} = require('../middlewares');

const router = Router();

router.get('/', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  validarCampos,
], getCourses);

module.exports = router;