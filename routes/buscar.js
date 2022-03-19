const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/:coleccion/:campo', [
  validarCampos,
], login);

module.exports = router;