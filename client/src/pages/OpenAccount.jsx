import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn,MDBView,MDBMask } from 'mdbreact'
import GuestNavbar from '../components/share/GuestNavBar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import Footer from '../components/share/Footer'
//Always instantiate this


class OpenAccount extends Component {
    state = { 
        AccName: "",
        Password: "",
        Currency: "",
        Balance: "",
        AccountNo: "",
    }
    OpenAccount = () => {
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        let sendingData = {
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Balance: parseFloat(this.state.Balance),
            Mode: 1
        }
        if (this.state.AccName == ""|| this.state.Password == ""|| this.state.Currency== ""  || this.state.Balance == ""){
            alert( "Do not leave empty field ")
            return}
        let marshallData = Marshalling(sendingData)
        socket.emit('open-account', marshallData)

        socket.on('open-account-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response']
            socket.emit('open-account-ack', marshallData)
            alert("Your Account Number is: " + data)
            this.Back()
        })
    }
    Back = () => {
        this.props.history.push('/')
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
  render() {
    return (
        <div id="classicformpage">
        <GuestNavbar />
        <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
        <MDBContainer>
            <MDBCard id="classic-card">
                <MDBCardBody className="white-text">
                    <h3 className="text-center">
                        <MDBIcon icon="user-check" /> Open Account:
                    </h3>
                    <hr className="hr-light" />
                     <MDBInput
                        className="white-text"
                        iconClass="white-text"
                        label="Account Name"
                        icon="user"
                        id="AccName"
                        type="text"
                        value={this.state.AccName}
                        onChange={this.handleChange}
                    />
                     <MDBInput
                        className="white-text"
                        iconClass="white-text"
                        label="Password"
                        icon="lock"
                        id="Password"
                        type="password"
                        value={this.state.Password}
                        onChange={this.handleChange}
                    />
                     <MDBInput
                        className="white-text"
                        iconClass="white-text"
                        label="SGD/MYR/KRW"
                        icon="money-bill"
                        id="Currency"
                        type="text"
                        value={this.state.Currency}
                        onChange={this.handleChange}
                    />
                    <MDBInput
                        className="white-text"
                        iconClass="white-text"
                        label="Balance"
                        icon="dollar-sign"
                        type="number"
                        id="Balance"
                        value={this.state.Balance}
                        onChange={this.handleChange}
                    />
                    
                    <div className="text-center mt-4 white-text">
                        <MDBBtn color="white" onClick={this.OpenAccount}  > Open Account
                        </MDBBtn>
                        <MDBBtn color="white" onClick={this.Back} > Back
                        </MDBBtn>
                        <hr className="hr-light" />
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
        </MDBMask>
        <Footer/>
        </MDBView>
    </div>
    )
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps,)(OpenAccount)