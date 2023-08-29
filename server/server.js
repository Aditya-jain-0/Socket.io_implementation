const io = require("socket.io")(3000,{
    cors:{
        origin:['http://localhost:8080'],
    }
})

io.on('connection',socket=>{
    console.log(socket.id)
    socket.on('send-message',(message,room)=>{
        // console.log(message)
        if(room === ''){
            socket.broadcast.emit('receive-message',(message))  //broadcast to all connected sockets
        }else{
            socket.to(room).emit('receive-message',message)
        }
    })
    socket.on('join-room',(room,cb)=>{
        socket.join(room)
        cb(`joined ${room}`)
    })
    
})