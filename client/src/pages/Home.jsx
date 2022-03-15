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
        //Deposit Money
        let sendingData = {
            AccountNo: "1",
            AccName: "toby",
            Password: "123",
            Currency: "SGD",
            Amount: 20,
            //Mode is 0,1,2 [Must send]
            Mode: 1
        }
        //Must do this
        let marshallData = Marshalling(sendingData)
        socket.emit('deposit', marshallData)
        //Do timeout at this portion


        socket.on('deposit-reply', (data) => {
            data = UnMarshalling(data)
            //Do what ever you want
            socket.emit('deposit-ack', marshallData)

            console.log(data)
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
                    <h3>Menu</h3>
                    <hr />
                    You have 100 Dollar
                    <MDBBtn onClick={this.MarshallingExample}>Marshalling Example</MDBBtn>
                    <MDBBtn onClick={() => this.props.history.push('/transfer')}>Transfer</MDBBtn>
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

export default (Home)
