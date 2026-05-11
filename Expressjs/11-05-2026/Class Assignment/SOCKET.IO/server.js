const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the frontend HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Track online users
let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  console.log(`User connected: ${socket.id} | Online: ${onlineUsers}`);

  // Broadcast updated user count to all clients
  io.emit("user_count", onlineUsers);

  // Broadcast join notification
  socket.broadcast.emit("system_message", "A new user joined the chat");

  // Listen for incoming chat messages
  socket.on("chat_message", (data) => {
    console.log(`Message from ${socket.id}: ${data.text}`);

    // Broadcast to all clients (including sender)
    io.emit("chat_message", {
      id: socket.id.slice(0, 6),      // Short user ID
      text: data.text,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Listen for typing events
  socket.on("typing", (isTyping) => {
    socket.broadcast.emit("typing", {
      userId: socket.id.slice(0, 6),
      isTyping,
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    onlineUsers--;
    console.log(`User disconnected: ${socket.id} | Online: ${onlineUsers}`);
    io.emit("user_count", onlineUsers);
    io.emit("system_message", "A user left the chat");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat server running → http://localhost:${PORT}`);
});