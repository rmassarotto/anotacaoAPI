const controller = {}
const { Usuario } = require('../models');
const usuario = require('../models/usuario');
// const database = require('../models');

controller.getUsuarios = async (id = null) => {
  let result = []

  if (id) {
    result = await Usuario.findByPk(id)
  } else {
    result = await Usuario.findAll()
  }

  return result
};

controller.save = async (usuario) => {
  return await Usuario.create(usuario);
};

controller.edit = async (id, usuario) => {
  await Usuario.update(usuario, {
    where: { id }
  })

  return await Usuario.getUsuarios(id)
}

controller.delete = async (id) => {
  return await Usuario.destroy({ where: { id } })
}

module.exports = controller;