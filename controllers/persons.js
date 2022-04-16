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

    return res.status(201).json({
      ok: true,
      msg: 'persona registrada',
      person,
    })
    
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Error de servidor al crear el usuario'
    })
  }

}

const getPeople = async( req = request, res = response ) => {
  const { limit=500, from=0} = req.query;

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
      ok: true,
      msg: 'get people',
      total,
      people,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
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
      ok: true,
      msg: 'matriculados por curso',
      alumnos,
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor',
    })
  }


}

module.exports = {
  registerPerson,
  getPeople,
  getEstudiantesPorCurso,
}