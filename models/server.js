const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      courses: '/api/courses',
      enrollment: '/api/enrollment',
      buscar: '/api/buscar',
    }

    // db connection
    this.dbConnect();

    // middlewares
    this.middlewares();

    // routes
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.static( 'public' ));
    this.app.use( express.json() );
  }

  routes() {
    this.app.use( this.paths.auth, require('../routes/auth'));
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log(`Listening at port ${this.port}`);
    })
  }
}

module.exports = Server;