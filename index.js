const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server (server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on('connection', async (socket)=>{
    console.log(`User Connect: ${socket.id}`)

    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} Connect: ${data}`)
    })
    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('receive_message', data)
    })


    socket.on('disconnect', ()=>{
        console.log('User Disconect', socket.id)
    })
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});