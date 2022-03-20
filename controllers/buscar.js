const { request, response } = require('express');
const { Person, Course } = require('../models');

const colecciones =  ['people', 'courses'];

// funciones de busquedas segun colleciones

const buscarPeople = async( termino='', res = request ) => {

  const regExp = new RegExp( termino, 'i');
  try {
    const people = await Person.find({ name: regExp }).populate('role', 'name');

    return res.status(200).json({
      msg: 'buscar en people',
      results: people,
    })
    
  } catch (err) {
    return res.status(500).json({
      msg: 'error de servidor al realizar la busqueda'
    })
  }

}
const buscarCourses = async( termino='', res = request ) => {

  const regExp = new RegExp( termino, 'i');
  try {
    const courses = await Course.find({ name: regExp }).populate('professor', 'name');

    return res.status(200).json({
      msg: 'buscar en courses',
      results: courses,
    })
    
  } catch (err) {
    return res.status(500).json({
      msg: 'error de servidor al realizar la busqueda'
    })
  }

}

const buscar = async( req = request, res = response ) => {
  const { coleccion, termino } = req.params;

  if( !colecciones.includes(coleccion)) {
    return res.status(400).json({
      msg: 'coleccion no valida',
    })
  }

  switch (coleccion) {
    case 'people':
      buscarPeople( termino, res );
      break;

    case 'courses':
      buscarCourses( termino, res );
      break;
  
    default:
      res.status(500).json({
        msg: 'error de servidor - busqueda por esta coleccion en desarrollo'
      })
      break;
  }

  // res.json({
  //   msg: 'buscar ok'
  // })
  

}

module.exports = buscar;