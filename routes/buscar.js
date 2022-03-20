const { Router } = require('express');
const { check } = require('express-validator');
const buscar = require('../controllers/buscar');
const tieneRole = require('../middlewares/tiene-rol');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:coleccion/:termino', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
], buscar );

module.exports = router;