import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import React, { Component } from 'react'
import Navbar from '../components/share/Navbar'
import { connect } from 'react-redux'

class Transfer extends Component {
    state = {
        receipient: '',
        amount: '',
    }
    initiateTransfer = () => {
        this.props.history.push('/home')
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    render() {
        return (
            <div>
                <Navbar /><br />
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
                                label="Receipient Address"
                                icon="envelope"
                                id="receipient"
                                type="text"
                                value={this.state.receipient}
                                onChange={this.handleChange}
                            />
                            <MDBInput
                                className="black-text"
                                iconClass="black-text"
                                label="Transfer Amount"
                                icon="lock"
                                type="number"
                                id="amount"
                                value={this.state.amount}
                                onChange={this.handleChange}
                            />
                            <div className="text-center mt-4 black-text">
                                <MDBBtn color="white" onClick={this.initiateTransfer} > Transfer
                                </MDBBtn>
                                <hr className="hr-light" />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps,)(Transfer)
