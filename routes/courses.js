const { Router } = require('express');
const { check } = require('express-validator');
const { getCourses } = require('../controllers/courses');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.get('/', [
  validarCampos,
], getCourses);

module.exports = router;