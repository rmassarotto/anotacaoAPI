const controller = {}
const jwt = require('jsonwebtoken');
const { secret } = require('../config/security')
const { Usuario } = require('../models');
// const database = require('../models');

controller.login = async (email, senha) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario.senha != senha) return false;

    return jwt.sign({ id: usuario.id }, secret, { expiresIn: '24h' })

  } catch (error) {
    throw new Error(error);
  }
}

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