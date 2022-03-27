import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBDropdownItem } from 'mdbreact';
import ganyu from '../../assets/ganyu.jpg';

class Navbar extends Component {
    /**
     * state
     * set collapsedID : ""
     * get username from local storage name
     * get usertype from local storage usertype
     */
    state = {
        collapseID: '',
        username: localStorage.getItem("name"),
    };
 
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    closeCollapse = collID => () => {
        const { collapseID } = this.state;
        window.scrollTo(0, 0);
        collapseID === collID && this.setState({ collapseID: '' });
    };
    render() {
        const { collapseID } = this.state;
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{ backgroundColor: 'blue' }}
                onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
        );
        return (
            <div>
                <MDBNavbar color='green' dark expand='md' fixed='top' scrolling>
                    <MDBNavbarBrand href='/home' className='py-0 font-weight-bold'>
                        <img src={ganyu} height="50" alt="50" className="rounded-circle" />
                        <strong className='align-middle'>CZ4013 Project</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        onClick={this.toggleCollapse('mainNavbarCollapse')}
                    />
                    <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink
                                    exact
                                    to='/home'
                                    onClick={this.closeCollapse('mainNavbarCollapse')}
                                >
                                    <strong>Home</strong>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" /> {localStorage.getItem('AccName')}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        {/* <MDBDropdownItem href="/studentprofile">Profile</MDBDropdownItem>
                                        <MDBDropdownItem href="https://seproj.s3-ap-southeast-1.amazonaws.com/ganyubuild.zip">Download Game</MDBDropdownItem> */}
                                        <MDBDropdownItem href='/logout'>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        )

    }
}
export default Navbar