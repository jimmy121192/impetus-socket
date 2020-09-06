const express = require("express");
const app = express();
const port = process.env.PORT || 8880;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://impetus.netlify.app:*");
    res.header('Access-Control-Request-Method', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });



var io = require("socket.io")(server)

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

const server = app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(port + " is open")
});
