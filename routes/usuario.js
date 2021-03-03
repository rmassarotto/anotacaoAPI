const { Router } = require('express');
const usuario = require('../controller/usuario')
// const database = require('../models')
const router = Router()

router.get('/', (req, res) => {
  res.send('GET')
});

router.post('/', (req, res) => {
  res.send('POST')
});

router.put('/', (req, res) => {
  res.send('PUT')
});

router.delete('/', (req, res) => {
  res.send('DELETE')
});

module.exports = router