const { request, response } = require("express");
const { Enrollment } = require("../models");

const alumnoNoInscritoEnCurso = async( req = request, res = response, next ) => {

  // previa validacion del curso id valido con otro middleware superior
  const cursoId = req.body.course;
  const estudianteId = req.person._id;

  const existeEnrollment = await Enrollment.findOne({
    $and:[
      { student: estudianteId },
      { course: cursoId }
    ]
  })

  if( existeEnrollment ) {
    return res.status(400).json({
      msg: 'Estuadiante ya matriculado en este curso',
    })
  }

  next();
}

module.exports = alumnoNoInscritoEnCurso;
