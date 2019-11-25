/* eslint-disable no-unused-expressions */
import React from 'react'
import {Jumbotron as Jumbo, Container} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import jumboImage from '../../assets/jumboBackground2.png'

const Styles = styled.div`
.jumbo {
  background: url(${jumboImage}) no-repeat;
  background-size: cover;
  color: #1f1f1e;
  height: 375px;
  z-index: -2;
  text-decoration: none
}
.linkJumbo:hover {
  color: white;
  text-decoration: none
}`;

const Jumbotron = () => (
<Styles>
  <Jumbo fluid className='jumbo'>
      <Container>
        <br/>
        <h2>Find a job you love with our job site</h2><br/>
        <p className="lead">Your next role could be with one of these leading companies.</p>
        <p className="lead">Apply today.</p>
        <p className="lead">
          <Link to="/signup" className='btn btn-outline-secondary'>Free Sign Up</Link>
          <span>&nbsp;</span>
          <Link to="/job" className='btn btn-outline-secondary'>Search Job</Link>
        </p>
      </Container>
  </Jumbo>
</Styles>
)

export default Jumbotron