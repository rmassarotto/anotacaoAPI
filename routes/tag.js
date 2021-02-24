const express = require('express');
const router = express.Router()

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