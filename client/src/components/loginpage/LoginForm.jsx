import React from "react";
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
import "../css/index.css";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { emailLogin } from '../../Redux/Actions/AuthAction'

class LoginForm extends React.Component {
  /**
   * Set default state of email, userpassword, fbid, emailError, passwwordError to "", 
   * Set fblogin emaillogin, loeading, wrongauth to false,
   * Set exceedtry to 0
   */
  state = {
    username: '',
    userpassword: '',
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  /**
   * handleChange
   * @param {*} e  handle all the changes that were received
   */
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  EmailLogin = () => {
    const form = {
      username: this.state.username,
      password: this.state.userpassword
    }
    this.props.emailLogin(form)
  }
  componentWillReceiveProps(prevProps){
    if(prevProps.loginstatus){
      localStorage.setItem('name', this.state.username)
      this.props.Navigate('/home')
    }
  }

  render() {
    return (
      <div id="classicformpage">
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    This is just a test app
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Don't have an account? You need to be invited
                  </h6>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Login:
                        </h3>
                        <hr className="hr-light" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Enter Username"
                          icon="envelope"
                          id="username"
                          type="email"
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Enter Password"
                          icon="lock"
                          type="password"
                          id="userpassword"
                          value={this.state.userpassword}
                          onChange={this.handleChange}
                          onKeyPress={this.handleKeyPress}
                        />
                        <div className="text-center mt-4 black-text">
                          <MDBBtn color="white" onClick={this.EmailLogin} > Login
                          </MDBBtn>
                          <hr className="hr-light" />
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

LoginForm.propTypes = {
  emailLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  loginstatus: state.auth.login
});

export default connect(mapStateToProps, { emailLogin })(LoginForm);