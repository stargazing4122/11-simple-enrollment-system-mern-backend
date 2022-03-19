const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
  check('email', 'Este no es un email válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty({ min: 6 }),
  validarCampos,
], login);

module.exports = router;