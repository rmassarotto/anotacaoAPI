const { Router } = require('express');
const router = Router()
const defaultController = require('../controller/default');
const { Checklist } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const checklist = await defaultController.get(id, Checklist)
  res.send(checklist || [])
});

router.post('/', async (req, res) => {
  try {
    const { body } = req

    const checklist = await defaultController.save(body, Checklist);

    res.send(checklist)
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params

    const checklist = await defaultController.edit(id, body, Checklist)

    res.send(checklist);
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await defaultController.delete(id, Checklist);

    res.send(id)
  } catch (error) {
    res.status(500).send({ error })
  }
});

module.exports = router