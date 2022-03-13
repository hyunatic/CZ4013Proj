import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
import { connect } from 'react-redux'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { io } from "socket.io-client";
import utf8 from 'utf8'

//Always instantiate this
const socket = io('http://localhost:2222/', { transports: ['websocket'] })

class Home extends Component {
    //socket.on is listening for something
    //socket.emit is sending something to everyone
    componentDidMount() {
        socket.on('hello', (data) => console.log(data))
    }
    ServerSayByeBye = () => {
        socket.emit('bye', "Client Say Bye Bye")
        socket.on('bye-response', data => console.log(data))
    }
    MarshallingExmaple = () => {
        var bufArr = new ArrayBuffer(4);
        var bufView = new Uint8Array(bufArr);
        bufView[0]=6;
        bufView[1]=7;
        bufView[2]=8;
        bufView[3]=9;
        alert(bufArr)
    }
    render() {
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <h3>Menu</h3>
                    <hr />
                    You have 100 Dollar
                    <MDBBtn onClick={this.MarshallingExmaple}>Marshalling Example</MDBBtn>
                    <MDBBtn onClick={this.ServerSayByeBye}>Bye</MDBBtn>
                    <MDBBtn onClick={() => this.props.history.push('/transfer')}>Transfer</MDBBtn>
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Home)
