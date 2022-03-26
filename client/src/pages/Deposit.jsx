import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn,MDBView } from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import Footer from '../components/share/Footer'


class Deposit extends Component {
    state = {
        timeoutRetransmit: true,
        AccountNo: "",
        AccName: "",
        Password: "",
        Currency: "",
        Amount: 0,
        Mode: 0,
        retry: false
    }
    componentWillUnmount() {
        clearTimeout()
    }
    DepositTransaction = () => {
        if (!this.state.timeoutRetransmit)
            return
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        let sendingData = {
            AccountNo: this.state.AccountNo,
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Amount: parseFloat(this.state.Amount),
            Mode: this.state.Mode
        }
        let marshallData = Marshalling(sendingData)
        socket.emit('deposit', marshallData)

        socket.on('deposit-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]
            alert("Your new Balance is: " + data.Balance)
            this.setState({ timeoutRetransmit: false, retry: false })
            socket.emit('deposit-ack', marshallData)
            this.Back()
            return
        })
        this.setState({retry : true})
        setTimeout(() => this.DepositTransaction(), 5000)


        let nameError = "";
        if (!this.state.name) {
            nameError = "name cannot be empty";
          }

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
                                <MDBIcon icon="user" /> Deposit:
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
                                label="Deposit Amount"
                                icon="dollar-sign"
                                type="number"
                                id="Amount"
                                value={this.state.Amount}
                                onChange={this.handleChange}
                            />
                         
                            <select id="Mode" onChange={this.handleChange} value={this.state.Mode} className="browser-default custom-select">
                                <option value="0">No Ack</option>
                                <option value="1">At least once</option>
                                <option value="2">At most once</option>
                            </select>
                            {(this.state.retry) ? <p className='red-text'>Sending Failed. Retrying....</p> : <p></p>}
                            <div className="text-center mt-4 black-text">
                                <MDBBtn color="dark-green" onClick={this.DepositTransaction}> Deposit
                                </MDBBtn>

                                <MDBBtn color="white" onClick={this.Back} > Back
                                </MDBBtn>
                                <hr className="hr-light" />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
                <Footer/>
                </MDBView>
            </div>
        )
    }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps,)(Deposit)