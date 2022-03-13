import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const BlockCard = ({ details, validChain, Navigate }) => {
  return (
    <MDBCol>
      <MDBCard key={details.hash} style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.webp" waves />
        <MDBCardBody>
          <MDBCardTitle>GanyuCoin</MDBCardTitle>
          <MDBCardText>
            Current Hash: {details.hash}  <br />
            Previous Hash: {details.previousHash} <br />
            Time: {details.timestamp} <br />
            <b>Validity: {validChain.toString()} </b>
          </MDBCardText>
          <MDBBtn onClick={() =>Navigate(details.hash)}>Tamper</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}
export default BlockCard