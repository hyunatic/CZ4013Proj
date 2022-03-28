import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn,MDBView} from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import Footer from '../components/share/Footer'


class CloseAccount extends Component {
    state = {
        AccountNo: '',
        AccName: '',
        Password: '',
        Currency: ''
    }
    componentWillUnmount() {
        clearTimeout()
    }
    CloseBankAccount = () => {
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        let sendingData = {
            AccountNo: this.state.AccountNo,
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Mode: 1
        }
        if (this.state.AccName == "" || this.state.AccountNo == ""|| this.state.Password == ""|| this.state.Currency== "" ){
            alert( "Do not leave empty field ")
            return}
        let marshallData = Marshalling(sendingData)
        socket.emit('close-account', marshallData)

        socket.on('close-account-reply', (data) => {
            data = UnMarshalling(data)
            if(data['Server-Response'] === 'Account Removed'){
                alert(data['Server-Response'])
                this.props.history.push('/logout')
            }
         
        })
    }
    Back = () => {
        this.props.history.push('/home')
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
  render() {
    return (
        <div id="innerpagedesign">
        <Navbar /><br />
        <MDBView>
        <MDBContainer>
            <MDBCard id="classic-card">
                <MDBCardBody className="black-text">
                    <h3 className="text-center">
                        <MDBIcon icon="window-close" /> Close Account:
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
                   
                    
                    <div className="text-center mt-4 black-text">
                        <MDBBtn color="white" onClick={this.CloseBankAccount} > Close Account
                        </MDBBtn>
                        <MDBBtn color="white" onClick={this.Back} > Back
                        </MDBBtn>
                        <hr className="hr-light" />
                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
        <Footer />
        </MDBView>
    </div>
    )
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps,)(CloseAccount)