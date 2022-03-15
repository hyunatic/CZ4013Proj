import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";


export default class Depositform extends Component {
  render() {
    return (
        <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Deposit</p>
              <div className="grey-text">
              <MDBInput label="Account No" icon="envelope" group type="text" validate error="wrong"
                  success="right" />
                <MDBInput label="Username" icon="user" group type="text" validate error="wrong"
                  success="right" />
                <MDBInput label="password" icon="lock" group type="password" validate />
                <MDBDropdown>
      <MDBDropdownToggle caret color="primary">
        This dropdown&apos;s menu is right-aligned
      </MDBDropdownToggle>
      <MDBDropdownMenu right basic>
        <MDBDropdownItem>Action</MDBDropdownItem>
        <MDBDropdownItem>Another Action</MDBDropdownItem>
        <MDBDropdownItem>Something else here</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>

               
                <MDBInput label="Username" icon="money-bill" group type="text" validate error="wrong"
                  success="right" />
                <MDBInput label="Balance" icon="dollar-sign" group type="text" validate error="wrong"
                  success="right" />
              </div>
              <div className="text-center">
                <MDBBtn>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}
