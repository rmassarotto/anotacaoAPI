const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3005

const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const tag = require('./routes/tag');
const checklist = require('./routes/checklist');

app.use(bodyParser.json());

app.use('/usuario', usuario)
app.use('/nota', nota)
app.use('/tag', tag)
app.use('/checklist', checklist)

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
})