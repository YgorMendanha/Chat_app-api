const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server (server,{
    cors:{
        origin:"https://ygormendanha.github.io"
    }
})

io.on('connection', async (socket)=>{
    console.log(`User Connect: ${socket.id}`)

    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} Connect: ${data}`)
    })
    socket.on('send_Message', (data)=>{
        socket.to(data.room).emit('receive_Message', data)
    })


    socket.on('disconnect', ()=>{
        console.log('User Disconect', socket.id)
    })
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});