import React, { Component } from 'react'
import Menu from './Menu'
import Header from './Header'
import Footer from './Footer'

import ContentCategory from './contentCategory'

import {
  Alert
} from 'reactstrap'

import { Link } from 'react-router-dom'


export default class Category extends Component {
  constructor(props){
    super(props)
    this.state ={
      isLogged: this.props.isLogged
    }
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
  render() {
    return(
    <div>
      {!this.state.isLogged&&(
        <React.Fragment>
          <Alert color='danger'>
            <strong>Unauthorized</strong>. You must <Link to='/signin'>sign in</Link> first.
          </Alert>
        </React.Fragment>
      )}
      {this.state.isLogged&&(
      <>
        <Header/>
        <Menu/>
        <ContentCategory/>
      </>
      )}
    </div>
    )
  }
}
