const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 3005;
const portHttps = 4443;
const cors = require('cors');

const login = require('./routes/login');
const register = require('./routes/register');
const usuario = require('./routes/usuario');
const nota = require('./routes/nota');
const tag = require('./routes/tag');
const checklist = require('./routes/checklist');
const auth = require('./middleware/auth')

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use(bodyParser.json());

app.use('/login', login)
app.use('/register', register)
// app.use(auth)
app.use('/usuario', usuario)
app.use('/nota', nota)
app.use('/tag', tag)
app.use('/checklist', checklist)

const key = fs.readFileSync('certs/localhost-key.pem');
const cert = fs.readFileSync('certs/localhost.pem');

const credentials = { key, cert }

httpsServer = https.createServer(credentials, app);

// httpsServer.listen(portHttps, () => {
//   console.log(`Running in https://localhost:${portHttps}`);
// })

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
})