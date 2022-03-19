const { Router } = require('express');
const { check } = require('express-validator');

const { registerPerson, getPeople } = require('../controllers/persons');
const { existeRolPorId, existeEmail } = require('../helpers/validate-person');
const validarCampos = require('../middlewares/validar-campos');


const router = Router();

router.post('/', [
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('role', 'No es un id de mongo').isMongoId(),
  check('role').custom( existeRolPorId ),
  check('email', 'El email es obligatorio').notEmpty(),
  check('email').custom( existeEmail ),
  check('password', 'El password es almenos de 6 caracteres').isLength({min: 6}),
  validarCampos,
], registerPerson );

router.get('/', getPeople );

module.exports = router;