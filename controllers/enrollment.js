const { request, response  } = require("express")
const { Enrollment } = require("../models")

const crearMatricula = async( req = request, res = response ) => {

  const data = {
    student: req.person._id,
    course: req.body.course,
  }

  try {
    const enrollment = new Enrollment( data );
    await enrollment.save();

    res.status(201).json({
      ok: true,
      msg: 'matricula realizada',
      enrollment,
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'error en el servidor al crear la matricula'
    })
  }
}

const getAllEnrollments = async( req = request, res = response ) => {

  try {
    const matriculas = await Enrollment.find()
                                .populate('student', 'name')
                                .populate('course', 'name');
    
    res.status(200).json({
      ok: true,
      msg: 'All enrollments',
      matriculas,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'error de servidor al traer matriculas'
    })
  }

}

module.exports = {
  crearMatricula,
  getAllEnrollments,
}