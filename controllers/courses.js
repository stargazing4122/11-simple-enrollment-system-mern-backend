const { request, response } = require('express');
const { Course } = require('../models');

const getCourses = async( req = request, res = response ) => {

  const { limit = 5, from = 0} = req.query;

  try {

    const [ total, courses ] = await Promise.all([
      Course.countDocuments().skip( Number(from) ).limit( Number(limit) ),
      Course.find().skip( Number(from) ).limit( Number(limit) )
        .populate('professor', 'name')
    ]);

    res.status(200).json({
      msg: 'get courses ok',
      total,
      courses,
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error de servidor - no se pudo obtener los cursos.'
    })
  }

}

const agregarCurso = async( req = request, res = response ) => {

  const { name, professor } = req.body;
  const data = {
    name: name.toUpperCase(),
    professor,
  }

  try {
    const course = new Course(data);
    await course.save();
  
    res.status(200).json({
      msg: 'curso agregado',
      course,
    })
    
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'ha ocurrido un error al crear el curso'
    })
  }

}

module.exports = {
  getCourses,
  agregarCurso,
}