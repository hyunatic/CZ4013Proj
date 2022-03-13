const express = require('express')
const http = require("http")
const socketIo = require("socket.io")

const app = express()

app.get('/',(req,res) => res.send("Hello World"))
const server = http.Server(app)
server.listen(2222, () => console.log("Server Started"))

const io = socketIo(server)

//socket.on is listening for something
//socket.emit is sending something to everyone
//io.to(socket.id).emit() is sending to a specific client

io.on('connection', socket => {
    console.info(`Client connected [id=${socket.id}]`);
    
    socket.emit('hello',{
        greeting: 'Hello NTU Team'
    })
    
    socket.on('bye', (data) => {
        console.log(data)
        io.to(socket.id).emit('bye-response', "Ok bye bye client")
    })
})


// const BankAccount = require("./BankAccount")
// let Bank = new BankAccount()