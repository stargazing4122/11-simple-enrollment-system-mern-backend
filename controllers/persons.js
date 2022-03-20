const bcryptjs = require('bcryptjs');
const { request, response } = require("express");
const { Person, Enrollment } = require('../models');
const { ObjectId}  = require('mongoose').Types;

const registerPerson = async( req = request, res = response ) => {

  const { name, role, email, password } = req.body;

  const salt = bcryptjs.genSaltSync();
  const data = {
    name,
    role,
    email,
    password: bcryptjs.hashSync( password, salt ),
  }

  try {

    const person = new Person( data );
    await person.save();

    return res.json({
      msg: 'persona registrada',
      person,
    })
    
  } catch (err) {
    return res.status(500).json({
      msg: 'Error de servidor al crear el usuario'
    })
  }

}

const getPeople = async( req = request, res = response ) => {
  const { limit=5, from=0} = req.query;

  try {
    const [ total, people ] = await Promise.all([
      Person.countDocuments()
        .limit( Number(limit ))
        .skip( Number(from)),
      Person.find()
        .limit( Number(limit ))
        .skip( Number(from))
        .populate('role')
    ]);

    res.status(200).json({
      msg: 'get people ok',
      total,
      people,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error de servidor al traer people'
    })
  }

}

const getEstudiantesPorCurso = async( req = request, res = response ) => {

  const { courseId} = req.params;

  try {
    const alumnos = await Enrollment.find({ course: ObjectId(courseId) })
                                        .populate({ 
                                          path:'student', 
                                          select: ['_id', 'name', 'email']
                                        });

    res.status(200).json({
      msg: 'matriculados por curso',
      alumnos,
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Error del servidor',
    })
  }


}

module.exports = {
  registerPerson,
  getPeople,
  getEstudiantesPorCurso,
}