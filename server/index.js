const express = require('express');

const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on('connection',(socket) => {
    //check user socket id
    console.log(`User connected: ${socket.id}`)

    //join a room (users who are in the same room can communicate)
    socket.on("join_room", (data)=>{
        socket.join(data);
    })

    //catch the message from the front end (from specific user)
    socket.on("send_message", (data)=>{
        //pass the message again to the frontend (all users)
       socket.to(data.room).emit("receive_message", data);
    })
})

server.listen(3001, ()=>{
    console.log('SERVER IS RUNNING');
});