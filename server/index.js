const express = require('express')
const app = express()
const cors = require('cors')

// Allow following external request to the server:
app.use(cors({
  origin: 'http://localhost:3000',
}));


app.get("/", (req, res) => {
  res.status(201).send("Listening on port 4000")
})

const postRouter = require("./routes/posts")
const claimRouter = require("./routes/claims")

app.use("/posts", postRouter)
app.use("/claims", claimRouter)

app.listen(4000, () => {
  console.log("Listen to port 4000");
});