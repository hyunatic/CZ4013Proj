import React, { Component } from 'react'
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead ,MDBView} from "mdbreact"
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput
} from 'mdbreact';
import { connect } from 'react-redux'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { io } from "socket.io-client"
import { Marshalling, UnMarshalling } from '../Redux/Actions/MarshalService'


//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class MonitorUpdate extends Component {

    state = {
        accountAmount: 0,
        timeoutRetransmit: true,
        logger: [],
        modal: false,
        time: ""
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.toggle()
        this.interval = setInterval(() => { (!this.state.modal) ? this.CheckUpdate() : "" }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    CheckUpdate = () => {
        socket.on('monitor-updates', (data) => {
            data = UnMarshalling(data)
            data = data['Server-Response'][0]

            var arr = this.state.logger
            var checkExists = arr.filter(x => x.AccountNo === data.AccountNo && x.AccName === data.AccName && x.Balance === data.Balance && x.Function === data.Function).length
            if (checkExists == 0) {
                arr.push(data)
                this.setState({ logger: arr })
            }
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    TimerSet = () => {
        this.toggle()
        setTimeout(() => this.BackToHome(), parseInt(this.state.time * 1000))
    }
    BackToHome = () => {
        this.props.history.push('/home')
    }

    render() {
        return (
            <div id="innerpagedesign">
                <Navbar /><br />
                <MDBView>
                <MDBContainer>
                    <h3>Monitoring Update: </h3>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Name</th>
                                <th>Balance</th>
                                <th>Function Used</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.state.logger && this.state.logger.map(x => {
                                return (
                                    <tr key={x.AccountNo}>
                                        <td>{x.AccountNo}</td>
                                        <td>{x.AccName}</td>
                                        <td>{x.Balance}</td>
                                        <td>{x.Function}</td>
                                    </tr>)
                            })}
                        </MDBTableBody>
                    </MDBTable>
                </MDBContainer>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader>Set Time Limit</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput onChange={this.handleChange} id="time" label="Input time (seconds)" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.TimerSet}>Set time</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <br />
                <br />
                <Footer />
                </MDBView>
                <Footer/>
            </div>
        )
    }
}

export default (MonitorUpdate)
