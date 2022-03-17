import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
import { connect } from 'react-redux'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'

//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class Home extends Component {
    
    //socket.on is listening for something
    //socket.emit is sending something to server
    componentDidMount() {
        socket.on('Connect-Establisment', (data) => console.log(data))
    }
    MarshallingExample = () => {
        let sendingData = {
            AccountNo: localStorage.getItem('AccountNo'),
            AccName: localStorage.getItem('AccName'),
            Password: localStorage.getItem('Password'),
            Currency: localStorage.getItem('Currency'),
            Mode: 1,
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('check-balance', marshallData)
<<<<<<< HEAD
       
        console.log(data)
        //Do timeout at this portion


        socket.on('check-balance-reply', (data) => {
            data = UnMarshalling(data)
            console.log(data)
            //Do what ever you want
=======

        socket.on('check-balance-reply', (data) => {
            data = UnMarshalling(data)
>>>>>>> 9330a2f7b90d7b30e7f68e4382280add4fea9fa5
            socket.emit('check-balance-ack', marshallData)
        })
    }

    // live ?
    CallbackFunction = () => {
        socket.on('monitor-updates', (data) => {
            data = UnMarshalling(data)
            //Do what ever you want
            console.log(data)
        })
    }


    render() {
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <h3>Good day </h3>
                    <h4>Choose a selection:</h4>
                    <hr />
                    You have 100 Dollar
                    <MDBBtn onClick={this.MarshallingExample}>Marshalling Example</MDBBtn>
                    <MDBBtn color="dark-green" onClick={() => this.props.history.push('/deposit')}>Deposit</MDBBtn>
                    <MDBBtn color="dark-green" onClick={() => this.props.history.push('/withdraw')}>Withdraw</MDBBtn>
                    <MDBBtn color="dark-green" onClick={() => this.props.history.push('/transfer')}>Transfer</MDBBtn>
                    <MDBBtn color="red" onClick={() => this.props.history.push('/closeaccount')}>Close Account</MDBBtn>
                    <br/>
                    <p className="text-center">balance</p>
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

export default (Home)
