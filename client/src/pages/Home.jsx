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
    
    state = {
        accountAmount: 0
    }
    //socket.on is listening for something
    //socket.emit is sending something to server
    componentDidMount() {
        socket.on('Connect-Establisment', (data) => console.log(data))
    }
    MarshallingExample = () => {
        let sendingData = {
            AccountNo: "1",
            AccName: "toby",
            Password: "123",
            Currency: "SGD",
            Mode: 1,
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('check-balance', marshallData)

        socket.on('check-balance-reply', (data) => {
            data = UnMarshalling(data)
            this.setState({ accountAmount : data['Server-Response'][0].Balance })
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
                    You have {this.state.accountAmount} Dollar
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
