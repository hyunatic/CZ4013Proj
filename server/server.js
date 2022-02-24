const http = require("http").createServer()
const io = require("socket.io")(http)

const BankAccount = require("./BankAccount")

io.on("connection", socket => {
    console.log("a user connected")

})

http.listen(2222, () => {
    let Bank = new BankAccount()
    var response = Bank.OpenNewAccount("iskandar", "123", "SGD", 12)
    console.log(response)
})