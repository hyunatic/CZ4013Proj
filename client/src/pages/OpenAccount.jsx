import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'

//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class OpenAccount extends Component {
    componentDidMount() {
        socket.on('Connect-Establisment', (data) => console.log(data))
    }

    state = { 
        
        // AccName: localStorage.getItem("accname"),
        // Password: localStorage.getItem("password"),
        // Currency: localStorage.getItem("currency"),
        // Balance: localStorage.getItem("balance"),
        AccName: "",
        Password: "",
        Currency: "",
        Balance: "",
    }
    initiateOpen = () => {
        let sendingData = {
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Balance: parseFloat(this.state.Balance),
            //Mode is 0,1,2 [Must send]
            Mode: 1
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('open-account', marshallData)
        //Do timeout at this portion

        socket.on('open-account-reply', (data) => {
            data = UnMarshalling(data)
            var reply = data['Server-Response']
            console.log(reply)
            //Do what ever you want
            socket.emit('open-account-ack', marshallData)

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
                        <MDBIcon icon="user-check" /> Open Account:
                    </h3>
                    <hr className="hr-light" />
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
                        label="Balance"
                        icon="dollar-sign"
                        type="number"
                        id="Balance"
                        value={this.state.Balance}
                        onChange={this.handleChange}
                    />
                    
                    <div className="text-center mt-4 black-text">
                        <MDBBtn color="white" onClick={this.initiateOpen} > Open Account
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
export default connect(mapStateToProps,)(OpenAccount)