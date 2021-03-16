const { Router } = require('express');
const router = Router()
const defaultController = require('../controller/default');
const { Tag } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const tag = await defaultController.get(id, Tag)
  res.send(tag || [])
});

router.post('/', async (req, res) => {
  try {
    const { body } = req

    const tag = await defaultController.save(body, Tag);

    res.send(tag)
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params

    const tag = await defaultController.edit(id, body, Tag)

    res.send(tag);
  } catch (error) {
    res.status(500).send({ error })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await defaultController.delete(id, Tag);

    res.send(id)
  } catch (error) {
    res.status(500).send({ error })
  }
});

module.exports = router