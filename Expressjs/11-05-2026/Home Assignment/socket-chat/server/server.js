const express = require('express')
const cors = require('cors')
//because socket.io direct server nhi banata voh http ke server ke upar realtime layerr attach krta h
const http = require('http')
// destructure to get the Server class
const {Server} = require('socket.io')
const app = express()
//security mechanism 
app.use(cors())
//http server
const server = http.createServer(app);
//Server class new server nahi banati from scratch.
//Ye existing HTTP server ke upar realtime layer attach karti hai.
// Socket.io setup with CORS
const io = new Server(server,{
    cors:{
        origin : "http://localhost:5173",
        methods: ["GET","POST"]
    }
});
//online user in starting = 0
let onlineUsers = 0;

// User connect detect karte hain
//socket = ek single user ka private connection
//Client se data receive karte hain
//io.on server listener - Jab server kisi event ka wait karta hai
io.on('connection',(socket)=>{
    onlineUsers++;
    //server termial ke liye h bs yeh, for debugging
    console.log("user connected",socket.id);

    //Server se data send karte hain
    //io.emit ka messsage sab users ko show hoga
    io.emit("user_count",onlineUsers);

    //socket.emit only to current user

    //message will recieve to all the users except the current user
    socket.broadcast.emit("system_message","a new user joined");
    //Ye client events listen karta hai.Client ne kuch bheja?message, typing, join room, chat message. Tab ye run hota hai.
    
    //chat msg
    socket.on("chat_message",(data)=>{
        io.emit("chat_message",{
            id: socket.id.slice(0,6),
            text: data.text,
            timeStamp  : new Date().toLocaleString(),
        });
    });

    //typing indicator
    socket.on("typing",(isTyping)=>{
        socket.broadcast.emit("typing",{
            userId:socket.id.slice(0,6),
            isTyping,
        });
    });

    socket.on("disconnect",()=>{
        onlineUsers--;
        io.emit("user_count", onlineUsers);
        io.emit("system_message","a user left")
    })
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat server running → http://localhost:${PORT}`);
});