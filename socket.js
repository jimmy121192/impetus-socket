const express = require("express");
const app = express();
const port = process.env.PORT || 8880;

const server = http.createServer(app);


var io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
            "Access-Control-Allow-Origin": "https://impetus.netlify.app", //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

    var chatSpace = io.of("/chat")
    chatSpace.on("connection", (socket)=>{

    socket.on("join_room", (data)=>{
        socket.join(data.roomName);
    })
    console.log(socket.id+ " is connected");
    socket.on("send_msg", (data)=>{
        chatSpace.to(data.roomName).emit("incoming_msg", data)
    })
})
server.listen(port);