const http = require("http").createServer()
const io = require("socket.io")(http)   

io.on("connection", socket => {
    console.log("a user connected")
})

http.listen(2222, () => {
    console.log("listening on *:2222")
})