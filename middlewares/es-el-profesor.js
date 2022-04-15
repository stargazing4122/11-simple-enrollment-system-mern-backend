const { request } = require("express");
const { Course } = require("../models");

const { ObjectId } = require('mongoose').Types;

const esElProfesor = async(req = request, res = response, next ) => {

  const { role } = req.person;
  const { courseId } = req.params;

  // if rol docente
  if(role.equals(ObjectId('623561bdeaa47188e4c77821')) ) {
    
    const course = await Course.findOne({ _id: ObjectId(courseId), professor: req.person._id  });
    console.log({course})
    if( !course ) {
      return res.status(401).json({
        ok: false,
        msg: 'Este curso no es de este docente',
      })
    }
  } 
    

  next();
}
module.exports = esElProfesor;