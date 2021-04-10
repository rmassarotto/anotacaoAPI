const { Router } = require('express');
const router = Router();
const defaultController = require('../controller/default');
const notaController = require('../controller/notas');
const { Nota } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const nota = await notaController.getById(id)
  res.send(nota || [])
});

router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { tag } = req.query;

  console.log(req.query);

  const notas = await notaController.getByUsuarioId(usuarioId, tag);

  res.send(notas || []);
})

router.post('/', async (req, res) => {
  try {
    const { body } = req

    const nota = await notaController.save(body);

    res.send(nota)
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/:usuarioId/:notaId', async (req, res) => {
  try {
    const { body } = req;
    const { usuarioId, notaId } = req.params

    const nota = await notaController.edit(usuarioId, notaId, body)

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