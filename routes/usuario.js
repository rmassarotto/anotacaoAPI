const { Router } = require('express');
const defaultController = require('../controller/default');
const { Usuario } = require('../models');
const router = Router()

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  console.log(Usuario);
  const usuarios = await defaultController.get(id, Usuario)
  res.send(usuarios || [])
});

router.post('/', async (req, res) => {
  try {
    const { body } = req

    const usuario = await defaultController.save(body, Usuario);

    res.send(usuario)
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params

    const usuario = await defaultController.edit(id, body, Usuario)

    res.send(usuario);
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await defaultController.delete(id, Usuario);

    res.send(id)
  } catch (error) {
    res.status(500).send({ error })
  }
});

module.exports = router