const { Router } = require('express');
const { check } = require('express-validator');
const { login, validateAuth } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', [
  check('email', 'Este no es un email válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty({ min: 6 }),
  validarCampos,
], login);

router.get('/renew',[
  validarJWT,
], validateAuth);

module.exports = router;