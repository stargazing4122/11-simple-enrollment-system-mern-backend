const { request, response } = require('express');

const getCourses = ( req = request, res = response ) => {

  res.status(200).json({
    msg: 'get courses ok',
  })
}

module.exports = {
  getCourses,
}