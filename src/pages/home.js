import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron'
import CardHome from '../components/CardHome'


export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Jumbotron />
        <br/>
        <CardHome />
      </React.Fragment>
    )
  }
}