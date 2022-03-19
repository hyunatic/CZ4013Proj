import React, { Component } from 'react'
import Footer from '../components/share/Footer'
import GuestNavbar from '../components/share/GuestNavBar'
import LoginForm from '../components/loginpage/LoginForm'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'

//Always instantiate this


class Login extends Component {
    Navigate = (val) => {
        this.props.history.push(val)
    }
    sendLogin = (sendingData) => {
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        var marshallData = Marshalling(sendingData)
        socket.emit('login', marshallData)

        socket.on('login-reply', (data) => {
            data = UnMarshalling(data)
            if(data['Server-Response'] === "Account Doesn't Exist"){
                alert(data['Server-Response'])
                return
            }
            data = data['Server-Response'][0]
            localStorage.setItem('AccountNo', data.AccountNo)
            localStorage.setItem('AccName', data.AccName)
            localStorage.setItem('Password', data.Password)
            localStorage.setItem('Currency', data.Currency)
            this.props.history.push('/home')
        })
    }

    render() {
        return (
            <div>
                <GuestNavbar />
                <LoginForm Navigate={this.Navigate} Login={this.sendLogin} />
                <Footer />
            </div>
        )
    }
}
export default Login