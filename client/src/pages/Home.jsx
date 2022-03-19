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
        accountAmount: 0,
        timeoutRetransmit: true,
    }
    componentDidMount() {
        this.interval = setInterval(() => (this.state.timeoutRetransmit) ? this.CheckBalance() : "", 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    CheckBalance = () => {
        console.log(this.state.timeoutRetransmit)
        const sendingData = {
            AccountNo: localStorage.getItem('AccountNo'),
            AccName: localStorage.getItem('AccName'),
            Password: localStorage.getItem('Password'),
            Currency: localStorage.getItem('Currency'),
            Mode: 1
        }
        const marshallData = Marshalling(sendingData)
        socket.emit('check-balance', marshallData)

        socket.on('check-balance-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]
            this.setState({ accountAmount: data.Balance, timeoutRetransmit: false })
        })
    }

    render() {
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <h3>Good day  </h3>
                    <h4>Your Account Number is: {localStorage.getItem('AccountNo')}</h4>
                    <h4>Choose a selection:</h4>
                    <hr />

                    You have {this.state.accountAmount} Dollar
                    <MDBBtn color="dark-green" onClick={() => this.props.history.push("/deposit")}>Deposit</MDBBtn>

                    <MDBBtn color="dark-green" onClick={() => this.props.history.push('/withdraw')}>Withdraw</MDBBtn>
                    <MDBBtn color="dark-green" onClick={() => this.props.history.push('/transfer')}>Transfer</MDBBtn>
                    <MDBBtn color="blue" onClick={() => this.props.history.push('/monitor')}>Monitor Update</MDBBtn>
                    <MDBBtn color="red" onClick={() => this.props.history.push('/closeaccount')}>Close Account</MDBBtn>
                    <br />
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

export default (Home)
