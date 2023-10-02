const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.send("All claims")
})

router.post("/new", (req, res) => {
  res.send("New claim")
})

module.exports = router