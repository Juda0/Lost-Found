import express from 'express';
import cors from 'cors';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 4000;

// Allow external requests
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json()); // Enable JSON parsing for incoming requests

// Use your routers
app.use('/posts', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});