import express from 'express';
import cors from 'cors';
import http from 'http'; // Import the HTTP module
import { Server } from 'socket.io'; // Import Socket.IO

import postRouter from './routes/post_routes';
import userRouter from './routes/user_routes';
import claimRouter from './routes/claim_routes';
import databaseRouter from './routes/database_routes';
import path from 'path';

const app = express();
const server = http.createServer(app); // Create an HTTP server instance
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
}); // Attach Socket.IO to the server with CORS options

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
app.use('/claims', claimRouter);
app.use('/database', databaseRouter);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected ' + socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected ' + socket.id);
  });

  socket.on('send-post', (post) => {
    console.log("Socket received: " + JSON.stringify(post));
    io.emit('new-post', { post });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
