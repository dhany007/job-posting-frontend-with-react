import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: this.props.isLogged,
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    console.log(this.state.isLogged)
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  logout =() => {
    localStorage.removeItem('token')
  }
  
  getToken = async (keyToken) => {
    const resultToken = localStorage.getItem(keyToken)
    console.log(resultToken);
    return resultToken;
  }

  componentWillMount(){
    this.getToken('token')
    .then(res => {
      if(res!==null){
      console.log('Masuk kesini kalau punya token')
      this.setState({
        isLogged: true
      })
    }
    })
  }
  render(){
    return (
      <div>
        <NavigationBar >
        <Navbar color="light" light expand="md">
          <NavbarBrand> <Link to="/" className='navBar'><strong>Job Posting</strong></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.dropdownOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.state.isLogged &&(      
              <NavItem>
                <NavLink><Link to="/dashboard" className='navBar'>My Dashboard</Link></NavLink>
              </NavItem>
              )}
              <NavItem>
                <NavLink><Link to="/job" className='navBar'>Job</Link></NavLink>
              </NavItem>
              {this.state.isLogged &&(
              <NavItem>
                <NavLink>
                  <Link  to='/signin' onClick={() => this.logout()} className='navBar'>Sign out</Link></NavLink>
              </NavItem> 
              )}
              {!this.state.isLogged &&(
              <React.Fragment>
                <NavItem>
                  <NavLink> <Link to="/signup" className='navBar'>Sign up</Link></NavLink>
                </NavItem>  
                <NavItem>
                  <NavLink> <Link to="/signin" className='navBar'>Sign in</Link></NavLink>
                </NavItem>  
              </React.Fragment>
              )}
               
          </Nav>
          </Collapse>
        </Navbar>
        </NavigationBar>
      </div>
    );
  }
}

export default Navigation;

const NavigationBar = styled.div`
  .navBar {
    color: #1f1f1e;
  }
`;