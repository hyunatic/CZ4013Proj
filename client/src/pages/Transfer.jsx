import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn, MDBView } from 'mdbreact'
import React, { Component } from 'react'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import { compose } from 'redux'
import Footer from '../components/share/Footer'

//Always instantiate this


class Transfer extends Component {
    state = {
        AccountNo: '',
        AccName: '',
        Password: '',
        Currency: '',
        Amount: '',
        ReceipientName: '',
        ReceipientAccountNo: '',
        timeoutRetransmit: true,
        Mode: false,
        retry: false
    }
    componentWillUnmount() {
        this.setState({ timeoutRetransmit: true })
        clearTimeout()
    }
    TransferMoney = () => {
        console.log("Retrying Transfer")
        if (!this.state.timeoutRetransmit)
            return
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        let sendingData = {
            AccountNo: this.state.AccountNo,
            AccName: this.state.AccName,
            Password: this.state.Password,
            Currency: this.state.Currency,
            Amount: parseFloat(this.state.Amount),
            ReceipientName: this.state.ReceipientName,
            ReceipientAccountNo: this.state.ReceipientAccountNo,
            Mode: this.state.Mode
        }
        if (this.state.AccName == "" || this.state.AccountNo == ""|| this.state.Password == ""|| this.state.Currency== "" ||this.state.Amount == "" || this.state.ReceipientName== "" || this.state.ReceipientAccountNo == ""){
            alert( "Do not leave empty field ")
            return}
        let marshallData = Marshalling(sendingData)
        socket.emit('transfer-money', marshallData)

        socket.on('transfer-money-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]
            this.setState({ timeoutRetransmit: false})
            if (data === "I") {
                alert("Insufficient Balance")
                socket.close()
                this.Back()
            }
            else {
                alert("Your new Balance is: " + data.Balance)
                socket.emit('transfer-money-ack', marshallData)
                socket.close()
                this.Back()
            }
            return
        })
        this.setState({ timeoutRetransmit: true, retry: true  })
        setTimeout(() => this.TransferMoney(), 5000)
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
                                    <MDBIcon icon="user" /> Transfer:
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
                                    label="Transfer Amount"
                                    icon="dollar-sign"
                                    type="number"
                                    id="Amount"
                                    value={this.state.Amount}
                                    onChange={this.handleChange}
                                />
                                <MDBInput
                                    className="black-text"
                                    iconClass="black-text"
                                    label="Receipient Name"
                                    icon="user"
                                    type="text"
                                    id="ReceipientName"
                                    value={this.state.ReceipientName}
                                    onChange={this.handleChange}
                                />
                                <MDBInput
                                    className="black-text"
                                    iconClass="black-text"
                                    label="Receipient Account No"
                                    icon="envelope"
                                    type="number"
                                    id="ReceipientAccountNo"
                                    value={this.state.ReceipientAccountNo}
                                    onChange={this.handleChange}
                                />
                                <select id="Mode" onChange={this.handleChange} value={this.state.Mode} className="browser-default custom-select">
                                    <option value="0">No Ack</option>
                                    <option value="1">At least once</option>
                                    <option value="2">At most once</option>
                                </select>
                                {(this.state.retry) ? <p className='red-text'>Sending Failed. Retrying....</p> : <p></p>}

                                <div className="text-center mt-4 black-text">
                                    <MDBBtn color="dark-green" onClick={this.TransferMoney} > Transfer
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

export default connect(mapStateToProps,)(Transfer)
