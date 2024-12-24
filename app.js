const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app)

const { Server } = require('socket.io');

const io = new Server(server);

// Socket Requests (Websocket) is going to be handled here. 

io.on('connection', (socket) => {
    console.log(`Connected with Socket ID : ${socket.id}`);
    socket.on("user-message", (message) => {
        console.log(`Message form client one is ${message}`)
        
        // In order to only implement this we have the websocket so that the connection remains on the server so that the server can send further message to the client.
        io.emit("send-message",message)
    });
    // socket.on("user2-message", (message) => {
    //     console.log(message)
    // })
})


// All the HTTP request is going to be handle as it is as usally handling. 

let port = 3000;

app.use(express.static('./public'))

server.listen(port, () => (console.log(`Listen on ${port}`)))

app.get("/", (req, res) => {
    console.log("Home Request")
    return res.sendFile("./public/index.html")
});

