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
      msg: 'matricula realizada',
      enrollment,
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'error en el servidor al crear la matricula'
    })
  }
}

module.exports = {
  crearMatricula,
}