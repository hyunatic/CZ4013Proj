import React, { Component } from 'react'
import Footer from '../components/share/Footer'
import GuestNavbar from '../components/share/GuestNavBar'
import Depositform from '../components/deposit/depositform'
import Navbar from '../components/share/Navbar'


class Deposit extends Component {

  render() {
    return (
      <div>
         
        <Navbar/>
       <br/>
       <Depositform/>
         
          <Footer/>
          </div>

          
    )
  }
}
export default Deposit