const { Sequelize, DataTypes } = require('sequelize');
const { NODE_ENV } = process.env
const _Usuario = require('./usuario')
const _Nota = require('./nota')
const _Tag = require('./tag')
const _Checklist = require('./checklist')
let options = require('../config/database')
const database = {};

options = options[NODE_ENV];

const sequelize = new Sequelize(options);

sequelize.authenticate()
  .then(() => console.log(`CONNECTION SUCCESS: ${NODE_ENV} - ${options.host}`))
  .catch((error) => console.log(`CONNECTION ERROR: ${error}`))

let Usuario = _Usuario(sequelize, DataTypes);
let Nota = _Nota(sequelize, DataTypes);
let Tag = _Tag(sequelize, DataTypes);
let Checklist = _Checklist(sequelize, DataTypes);

database['Usuario'] = Usuario;
database['Nota'] = Nota;
database['Tag'] = Tag;
database['Checklist'] = Checklist;

// Usuario.findAll().then((result) => console.log(result))

database.sequelize = sequelize

module.exports = database