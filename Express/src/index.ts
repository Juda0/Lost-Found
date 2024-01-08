import express from 'express';
import cors from 'cors';
import postRouter from './routes/post_routes';
import userRouter from './routes/user_routes';
import path from 'path';
const app = express();
const port = process.env['PORT'] || 4000;

// Allow external requests
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json()); // Enable JSON parsing for incoming requests

// Serve the "uploads" folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use your routers
app.use('/posts', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app