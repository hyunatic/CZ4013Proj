import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
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
        logger: []
    }
    componentDidMount() {
        this.interval = setInterval(() => this.CheckUpdate(), 5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    CheckUpdate = () => {
        socket.on('monitor-updates',(data) => {
            data = UnMarshalling(data)
            data = data['Server-Response']
            //This part needs filtering
            console.log(data)
            this.setState({ logger: [...this.state.logger, ...data]})
        })
    }

    render() {
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <h3>Monitoring Update: </h3>
                    {this.state.logger && this.state.logger.map(x => <p>{x.AccountNo} / {x.AccName}</p>)}
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

export default (MonitorUpdate)
