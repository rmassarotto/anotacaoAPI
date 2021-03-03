const controller = {}
const database = require('../models');

controller.getUsuarios = () => {
  return [
    {
      'nome': 'rodrigo'
    }
  ]
}

module.exports = controller;