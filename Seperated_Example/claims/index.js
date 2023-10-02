const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const claimsByPostId = { };

app.get("/posts/:id/claims", (req, res) => {
  res.send(claimsByPostId[req.params.id] || [])
});

app.post("/posts/:id/claims", (req, res) => {
  const claimId = randomBytes(4).toString("hex");
  const { message } = req.body;

  const claims = claimsByPostId[req.params.id] || [];
  claims.push({ id: claimId, message });
  
  claimsByPostId[req.params.id] = claims;

  res.status(201).send(claims);
});

app.listen(4001, () => {
  console.log("Listen to port 4001");
});