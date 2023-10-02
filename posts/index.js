const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');

  posts[id] = {
    id, title
  };

  res.status(201).send(posts[id]);
  
});

app.listen(4000, () => {
  console.log("Listen to port 4000");
});