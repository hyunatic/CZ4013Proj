import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn ,MDBView} from 'mdbreact'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import Footer from '../components/share/Footer'

//Always instantiate this


class Withdraw extends Component {
    state = {
        timeoutRetransmit: true,
        AccountNo: "",
        AccName: "",
        Password: "",
        Currency: "",
        Amount: 0,
        Mode: 0
    }
    componentWillUnmount() {
        clearTimeout()
    }
    WithdrawalTransaction = () => {
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
        socket.emit('withdraw', marshallData)

        socket.on('withdraw-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]
            alert("Your new Balance is: " + data.Balance)
            this.setState({ timeoutRetransmit: false })
            socket.emit('withdraw-ack', marshallData)
            this.Back()
            return
        })
        setTimeout(() => this.WithdrawalTransaction(), 5000)
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
            <div  id="innerpagedesign">
                <Navbar /><br />
                <MDBView>
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
                            <select id="Mode" onChange={this.handleChange} value={this.state.Mode} className="browser-default custom-select">
                                <option value="0">No Ack</option>
                                <option value="1">At least once</option>
                                <option value="2">At most once</option>
                            </select>
                            <div className="text-center mt-4 black-text">
                                <MDBBtn color="dark-green" onClick={this.WithdrawalTransaction} > Withdraw
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
export default connect(mapStateToProps)(Withdraw)