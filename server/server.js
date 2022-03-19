//Import Libraries
const express = require('express')
const http = require("http")
const socketIo = require("socket.io")

//Import other classes
const BankAccount = require("./BankAccount")
const Marshalling = require("./Marshalling")
const History = require("./History")
const Networking = require("./Networking")
const { CallTracker } = require('assert')

//Set-up simple Express service
const app = express()
//Return Empty Web Page Response when users access http://localhost:2222/
app.get('/', (req, res) => res.send("Team HongYing, Iskandar, Brendan CZ4013 Project"))

//Add http feature into express
//The socket.io requires to run on top of HTTP and its using TCP, we'll simulate the Request-Reply Feature
//Reason: Socket.IO cannot allow us to use any simple TCP socket (DataGramPacket, SocketService) from any programming language to communicate with socket.io
const server = http.Server(app)
//Set Server Listen to port 2222
server.listen(2222, () => console.log("Server Started"))
//Add Socket feature on the server
const io = socketIo(server)


//Instantiate App Features
let Bank = new BankAccount()
let MarshallingService = new Marshalling()
let HistoryService = new History()
let ReqReplyService = new Networking()

io.on('connection', socket => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.emit('Connect-Establisment', MarshallingService.Marshall("{ Server-Response: 'Server Connection Established' }"))

    socket.on('open-account', (receivingData, func = "open-account") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Add to History
        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = Bank.OpenNewAccount(request.AccName, request.Password, request.Currency, request.Balance)

        if (request.Transmit) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('open-account-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('close-account', (receivingData, func = "close-account") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Add to History
        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = Bank.CloseAccount(request.AccountNo, request.AccName, request.Password)

        if (request.Transmit) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('close-account-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('deposit', (receivingData, func = "deposit") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Add to History
        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = (request.Execute) ? Bank.DepositMoney(request.AccountNo, request.AccName, request.Password, request.Currency, request.Amount) : Bank.GetAccountDetails(request.AccountNo, request.AccName, request.Password, request.Currency)

        if (request.Transmit && ReqReplyService.TransmitingProbability()) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('deposit-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('withdraw', (receivingData, func = "withdraw") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Add to History
        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = (request.Execute) ? Bank.WithdrawMoney(request.AccountNo, request.AccName, request.Password, request.Currency, request.Amount) : Bank.GetAccountDetails(request.AccountNo, request.AccName, request.Password, request.Currency)

        if (request.Transmit && ReqReplyService.TransmitingProbability()) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('withdraw-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('transfer-money', (receivingData, func = "transfer-money") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Add to History
        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = Bank.TransferMoney(request.AccountNo, request.AccName, request.Password, request.Currency, request.Amount, request.ReceipientName, request.ReceipientAccountNo)

        if (request.Transmit && ReqReplyService.TransmitingProbability()) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('transfer-money-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('check-balance', (receivingData, func = "check-balance") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        if (!historyExists)
            HistoryService.addNewHistoryEntry(request, func)
        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = Bank.GetAccountDetails(request.AccountNo, request.AccName, request.Password, request.Currency)

        if (request.Transmit && ReqReplyService.TransmitingProbability()) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('check-balance-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('login', (receivingData, func = "login") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        let historyExists = HistoryService.checkHistory(request, func)

        //Selects Mode
        request = ReqReplyService.ModeSelector(request, historyExists)
        let data = Bank.Login(request.AccName, request.Password)

        if (request.Transmit) {
            let marshalledData = MarshallingService.Marshall(data)
            io.to(socket.id).emit('login-reply', marshalledData)
        }
        io.emit('monitor-updates', MarshallingService.Marshall(request))
    })

    socket.on('deposit-ack', (receivingData, func = "deposit") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        HistoryService.removeHistoryEntry(request,func)
    })
    socket.on('withdraw-ack', (receivingData, func = "withdraw") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        HistoryService.removeHistoryEntry(request,func)
    })
    socket.on('transfer-money-ack', (receivingData, func = "transfer-money") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        HistoryService.removeHistoryEntry(request,func)
    })
    socket.on('check-balance-ack', (receivingData, func = "check-balance") => {
        //Unmarshall
        let request = MarshallingService.Unmarshall(receivingData)
        HistoryService.removeHistoryEntry(request,func)
    })


})


