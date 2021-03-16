const { Router } = require('express');
const router = Router()
const defaultController = require('../controller/default');
const { Nota } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const nota = await defaultController.get(id, Nota)
  res.send(nota || [])
});

router.post('/', async (req, res) => {
  try {
    const { body } = req

    const nota = await defaultController.save(body, Nota);

    res.send(nota)
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params

    const nota = await defaultController.edit(id, body, Nota)

    res.send(nota);
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await defaultController.delete(id, Nota);

    res.send(id)
  } catch (error) {
    res.status(500).send({ error })
  }
});

module.exports = router