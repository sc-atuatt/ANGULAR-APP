import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import dotenv from 'dotenv';
import { dbConnect } from './configs/database.config';
import userAuth from "./middelware/middelware";// Corrected spelling of 'middleware'

const express = require('express');
const http = require('http');
import { Server } from "socket.io";
const cors = require('cors');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

dotenv.config();
dbConnect();

app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}));

const PORT = process.env.PORT || 6100;

// CORS middleware
// app.use(cors({
//   origin: 'http://localhost:4200', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'PATCH'], // Allow these HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   credentials: true // Allow sending cookies and authorization headers
// }));

// Middleware to handle JSON request body
app.use(express.json());

// Middleware to handle CORS headers for all routes
// app.use((req:any, res:any, next:any) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// Socket.IO connection handling
io.on('connection', (socket:any) => {
  console.log('A user connected');

  socket.on('message', (data:any) => {
    console.log('Message received:', data);
    socket.broadcast.emit('received', data); // Broadcast the message to all connected clients
  });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
});

// Routers
app.use("/api/foods", userAuth, foodRouter);
app.use("/api/users", userRouter);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
