import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn, MDBView } from "mdbreact"
import { connect } from 'react-redux'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'
import "../components/css/index.css"

//Always instantiate this


class Home extends Component {

    state = {
        accountAmount: 0,
        timeoutRetransmit: true,
        Mode: 2
    }
    componentDidMount() {
        this.interval = setInterval(() => (this.state.timeoutRetransmit) ? this.CheckBalance() : "", 5000);
    }
    componentWillUnmount() {

        clearInterval(this.interval);
    }
    CheckBalance = () => {
        const socket = io('http://localhost:2222/', { transports: ['websocket'] })
        const sendingData = {
            AccountNo: localStorage.getItem('AccountNo'),
            AccName: localStorage.getItem('AccName'),
            Password: localStorage.getItem('Password'),
            Currency: localStorage.getItem('Currency'),
            Mode: this.state.Mode
        }
        const marshallData = Marshalling(sendingData)
        console.log("Retrieving Balance....")
        socket.emit('check-balance', marshallData)

        socket.on('check-balance-reply', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]
            this.setState({ accountAmount: data.Balance, timeoutRetransmit: false })
            console.log("Retrieve Balance Successful")
            socket.close()
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div id="innerpagedesign">
               
                <Navbar />
                <MDBView>
                <MDBContainer>
                
                    <h3><br />Good day  </h3>
                    <h4>Your Account Number is: {localStorage.getItem('AccountNo')}</h4>
                    <h4>Choose a selection:</h4>
                    <hr />

                    <h4>You have {this.state.accountAmount} Dollar </h4>
                    <select id="Mode" onChange={this.handleChange} value={this.state.Mode} className="browser-default custom-select">
                        <option value="0">No Ack</option>
                        <option value="1">At least once</option>
                        <option value="2">At most once</option>
                    </select>

                    <br/><br/>
                    <MDBBtn color="dark-green" onClick={this.CheckBalance}>Check Balance</MDBBtn>
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
                </MDBView>
            </div>
        )
    }
}

export default (Home)
