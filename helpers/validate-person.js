const { Role, Person, Course } = require("../models")

//* VALIDATIONS PERSON
const existeRolPorId = async( rolId ) => {
  const existeRole = await Role.findById( rolId );

  if( !existeRole ) {
    throw new Error('Este id rol no existe en la base de datos');
  }
}


const existeEmail = async( email ) => {
  
  const emailEnDb = await Person.findOne({ email });

  if( emailEnDb ) {
    throw new Error('Este email ya existe');
  } 
}

//* VALIDATIONS COURSES

const existeProfesorPorId = async( professorId ) => {
  const profesor = await Person.findById( professorId ).populate('role', 'name');
  if( !profesor ) {
    throw new Error('Este usuario no existe');
  } else {
    if( profesor.role.name !== 'PROFESSOR_ROLE') {
      throw new Error('Este usuario no es profesor')
    }
  }
}

const existeAlumnoPorId = async( studentId ) => {
  const student = await Person.findById( studentId ).populate('role', 'name');
  if( !student ) {
    throw new Error('Este usuario no existe');
  } else {
    if( student.role.name !== 'STUDENT_ROLE') {
      throw new Error('Este usuario no es un estudiante')
    }
  }
}

const existeCursoPorNombre = async( courseName ) => {
  const curso = await Course.findOne({name: courseName.toUpperCase(), });
  if( curso ) {
    throw new Error('Este curso ya existe')
  }
}

// * ENROLLMENT 
const existeCoursePorId = async( courseId ) => {
  const course = await Course.findById( courseId );

  if( !course ) {
    throw new Error('Este curso no existe');
  }
}

module.exports = {
  existeRolPorId,
  existeEmail,
  existeProfesorPorId,
  existeCursoPorNombre,
  existeCoursePorId,
  existeAlumnoPorId,
}