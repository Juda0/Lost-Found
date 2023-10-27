const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

// Allow external requests
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json()); // Enable JSON parsing for incoming requests

// Import and use your routers
const postRouter = require('./routes/postRoutes');
app.use('/posts', postRouter);

const UserRouter = require('./routes/UserRoutes');
app.use('/user', UserRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});