const controller = {}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/security')
const { Usuario } = require('../models');

controller.login = async (email, senha) => {
  try {
    const usuario = await Usuario.scope('login').findOne({ where: { email } });
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return false;
    // if (senha != usuario.senha) return false;

    return jwt.sign({ id: usuario.id }, secret, {
      expiresIn: '24h',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

controller.register = async (novoUsuario) => {
  try {
    const usuario = await Usuario.findOne({ where: { email: novoUsuario.email } });

    if (usuario) return 302;

    return Usuario.create(novoUsuario);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

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