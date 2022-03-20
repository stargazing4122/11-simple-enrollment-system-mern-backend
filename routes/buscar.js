const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/:coleccion/:termino', [
  validarCampos,
], login);

module.exports = router;