const { Router } = require('express');
const router = Router();
const { register } = require('../controller/usuario');

router.post('/', async (req, res) => {
  try {
    const registro = await register(req.body);

    if (registro == 302) {
      res.status(302).send({ error: 'Usuario já cadastrado' });
    } else {
      res.status(201).send()
    }
  } catch (error) {
    res.status(500).send({ error });
  }
})

module.exports = router