import React, { useState } from 'react';
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

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <NavigationBar >
      <Navbar color="light" light expand="md">
        <NavbarBrand> <Link to="/" className='navBar'><strong>Job Posting</strong></Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/Job" className='navBar'>Job</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink> <Link to="/Register" className='navBar'>Register</Link></NavLink>
            </NavItem>  
            <NavItem>
              <NavLink> <Link to="/Login" className='navBar'>Login</Link></NavLink>
            </NavItem>   
         </Nav>
        </Collapse>
      </Navbar>
      </NavigationBar>
    </div>
  );
}

export default Navigation;

const NavigationBar = styled.div`
  .navBar {
    color: #1f1f1e;
  }
`;