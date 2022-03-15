import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'

//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class CloseAccount extends Component {
    componentDidMount() {
        socket.on('Connect-Establisment', (data) => console.log(data))
    }

    state = { 
        AccountNo: '',
        AccName: '',
        Password: '',
        
    }
    initiateClose = () => {
        let sendingData = {
            AccountNo: this.state.AccountNo,
            AccName: this.state.AccName,
            Password: this.state.Password,
            
            //Mode is 0,1,2 [Must send]
            Mode: 1
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('close-account', marshallData)
        //Do timeout at this portion

        socket.on('close-account-reply', (data) => {
            data = UnMarshalling(data)
            //Do what ever you want
            socket.emit('close-account-ack', marshallData)

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
                        <MDBIcon icon="window-close" /> Closed Account:
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
                   
                    
                    <div className="text-center mt-4 black-text">
                        <MDBBtn color="white" onClick={this.initiateClose} > Close Account
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
export default connect(mapStateToProps,)(CloseAccount)