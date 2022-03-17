import React, { Component } from 'react'
import Footer from '../components/share/Footer'
import GuestNavbar from '../components/share/GuestNavBar'
import LoginForm from '../components/loginpage/LoginForm'
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBAnimation,
    MDBNavLink
  } from "mdbreact";


class Login extends Component {
    Navigate = (val) => {
        this.props.history.push(val)
    }
    Createaccount = (val) => {
        this.props.history.push(val)
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <GuestNavbar />
                <LoginForm Navigate={this.Navigate} Createaccount = {this.Createaccount}/>
                <Footer />
                
            </div>
        )
    }
}
export default Login