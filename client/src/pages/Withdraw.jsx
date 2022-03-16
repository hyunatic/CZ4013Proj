import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'

//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class Withdraw extends Component {
    componentDidMount() {
        socket.on('Connect-Establisment', (data) => console.log(data))
    }

    state = { 
        AccountNo: '',
        AccName: '',
        Password: '',
        Currency: '',
        Amount: '',
    }
    initiateTransfer = () => {
        let sendingData = {
            AccountNo: this.state.AccountNo,
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Amount: this.state.Amount,
            //Mode is 0,1,2 [Must send]
            Mode: 1
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('withdraw', marshallData)
        //Do timeout at this portion

        socket.on('withdraw-reply', (data) => {
            data = UnMarshalling(data)
            //Do what ever you want
            socket.emit('withdraw-ack', marshallData)

            console.log(data)
        })
    }
    CallbackFunction = () => {
        socket.on('monitor-updates', (data) => {
            data = UnMarshalling(data)
            //Do what ever you want
            console.log(data)
        })
    }

    back = () => {
        this.props.history.push('/home')
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
  render() {
    return (
        <div>
        <Navbar /><br />
        <MDBContainer>
            <MDBCard id="classic-card">
                <MDBCardBody className="black-text">
                    <h3 className="text-center">
                        <MDBIcon icon="user" /> Withdraw:
                    </h3>
                    <hr className="hr-light" />
                    <MDBInput
                        className="black-text"
                        iconClass="black-text"
                        label="Account No"
                        icon="envelope"
                        id="AccountNo"
                        type="number"
                        value={this.state.AccountNo}
                        onChange={this.handleChange}
                    />
                     <MDBInput
                        className="black-text"
                        iconClass="black-text"
                        label="Account Name"
                        icon="user"
                        id="AccName"
                        type="text"
                        value={this.state.AccName}
                        onChange={this.handleChange}
                    />
                     <MDBInput
                        className="black-text"
                        iconClass="black-text"
                        label="Password"
                        icon="lock"
                        id="Password"
                        type="password"
                        value={this.state.Password}
                        onChange={this.handleChange}
                    />
                     <MDBInput
                        className="black-text"
                        iconClass="black-text"
                        label="SGD/MYR/KRW"
                        icon="money-bill"
                        id="Currency"
                        type="text"
                        value={this.state.Currency}
                        onChange={this.handleChange}
                    />
                    <MDBInput
                        className="black-text"
                        iconClass="black-text"
                        label="Withdraw Amount"
                        icon="dollar-sign"
                        type="number"
                        id="Amount"
                        value={this.state.Amount}
                        onChange={this.handleChange}
                    />
                    
                    <div className="text-center mt-4 black-text">
                        <MDBBtn color="dark-green" onClick={this.initiateTransfer} > Withdraw
                        </MDBBtn>
                        <MDBBtn color="white" onClick={this.back} > Back
                        </MDBBtn>
                        <hr className="hr-light" />
                    </div>
                   
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    </div>
    )
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps,)(Withdraw)