const { request, response } = require('express');
const { Course, Enrollment } = require('../models');

const { ObjectId } = require('mongoose').Types;

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

const getCoursesStudentNoEnrollment = async( req = request, res = response ) => { 

  const {studentId} = req.params;

  try {

    // TODO: MEJORAR  
    // obtener todos los cursos y los cursos matriculados de un alumno
    const [ allCourses, studentEnrollmentCourses ] = await Promise.all([
      Course.find().populate('professor', 'name'),
      Enrollment.find({ student: studentId })
                  .populate('course', 'name')
    ])

    // obtener solo una lista de string de los cursos matriculados
    const coursesEnrollmetArray = studentEnrollmentCourses.map( course => {
      return course.course.name;
    })

    // filtrando los cursos en los que el alumno no esta matriculado
    const notEnrollmentCourses = allCourses.filter( course => (
      !(coursesEnrollmetArray.includes(course.name))
    ));
  
    return res.status(200).json({
      msg: 'Cursos disponibles para este alumno',
      notEnrollmentCourses,
    })
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: 'error en el servidor al traer los cursos de este alumno'
    })
  }
}

const getCoursesStudentEnrollment = async( req = request, res = response ) => {

  const {studentId} = req.params;

  try {
    
    // TODO: MEJORAR  
    // obtener todos los cursos y los cursos matriculados de un alumno
    const [ allCourses, studentEnrollmentCourses ] = await Promise.all([
      Course.find().populate('professor', 'name'),
      Enrollment.find({ student: studentId })
                  .populate('course', 'name')
    ])

    // obtener solo una lista de string de los cursos matriculados
    const coursesEnrollmetArray = studentEnrollmentCourses.map( course => {
      return course.course.name;
    })

    // filtrando los cursos en los que el alumno no esta matriculado
    const enrollmentCourses = allCourses.filter( course => (
      coursesEnrollmetArray.includes(course.name)
    ));

    res.status(400).json({
      msg: 'cursos matriculados',
      enrollmentCourses,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Error de servidor al traer los cursos matriculados'
    })
  }

  res.status(200).json({
    msg: 'cursos matriculados',
  })

}

module.exports = {
  getCourses,
  agregarCurso,
  getCoursesStudentNoEnrollment,
  getCoursesStudentEnrollment,
}