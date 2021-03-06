import React, { Component } from 'react'

import {
  Container, Button, Alert,
  Card, CardText, Form, FormGroup, Input,
} from 'reactstrap'

import Navigation from '../Nav';
import Footer from '../Footer';

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faKey, faEnvelope, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import {connect} from 'react-redux';
import {login} from './../../redux/action/user';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      // logError:'',
      // isLogged:this.props.isLogged,
      isLogged: this.props.user.isLogged,
      isLoading: false,
      isError: false,
      data : {},
      message: '',
      
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  // handleSubmit = (event) => {
  //   const { email, password } = this.state;
  //   console.log(email)
  //   console.log(password)
  //   const data = {email, password}
  //   axios
  //     .post(
  //       'http://34.205.156.175:3001/auth/login', data, {"Content-Type": "application/x-www-form-urlencoded"}
  //     )
  //     .then(response => {
  //       console.log('Res from login ', response);
  //       localStorage.setItem('token', response.data.token);
  //       if(response.data.success === true){
  //         this.props.handleLogged(response.data)
  //         this.props.history.push('/')
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Login error ', err);
  //     })
  //   event.preventDefault();
  // }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    const data = {email, password}
    this.props.dispatch(login(data))
      .then(response => {
        console.log(response)
        if(response.action.payload.data.success === true){
          localStorage.setItem('token', response.action.payload.data.token);
          this.props.history.push('/')
        } else {
          this.setState({
            message: response.action.payload.data.message
          })
        }
      })
      .catch(err => {
        console.log('Login error ', err);
      })
    event.preventDefault();
  }

  logout =() => {
    localStorage.removeItem('token')
    this.setState({
      isLogged: false,
    })
  }
  
  getToken = async (keyToken) => {
    const resultToken = await localStorage.getItem(keyToken)
    return resultToken;
  }

  componentDidMount(){
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
    return (
      <React.Fragment>    
      <Navigation isLogged={this.state.isLogged}/>
      {(this.state.isLogged)&&(
        <Container>
          <br/>
          <Alert color="danger">
            You have logged in. Please <strong><Link onClick={()=>this.logout()}>sign out</Link></strong> first.
          </Alert>
        </Container>
      )}
      {(!this.state.isLogged) &&
        <Container>
          <br/>
          <Styled >
          <Card className='logForm'>
            <Form className='allCard' onSubmit={this.handleSubmit}><br/>
              <CardText className='h3'>Sign in</CardText> <br/>
              <Link to='#' className='btn btn-primary'><span><FontAwesomeIcon icon={faImage}/>&nbsp; Sign in with Facebook</span> </Link>{' '}
              <Link to='#' className='btn btn-danger'><span><FontAwesomeIcon icon={faImage}/> &nbsp; Sign in with Google+</span> </Link> <br/><br/>
              <CardText>OR</CardText>
              <CardText className='inputData'>
                <FormGroup className="mb-2 mb-sm-0 inputForm" >
                  <span className='input-group-prepend input-group-text iconIn'><FontAwesomeIcon icon={faEnvelope}/></span>
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    className='inputFil'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-2 mb-sm-0 inputForm" >
                  <span className='input-group-prepend input-group-text iconIn'><FontAwesomeIcon icon={faKey}/></span>
                  <Input 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  className='inputFil'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                </FormGroup><br/>
                <Button color='success' type='submit' block><span><FontAwesomeIcon icon={faSignInAlt}/>&nbsp;Sign in</span></Button><br/>
                <CardText className='messageLogin'>{this.state.message}</CardText>
                <Link to='/'>Reset your password</Link><br/><hr/>
                <Link to='/signup' className='btn btn-primary btn-block '><span><FontAwesomeIcon icon={faUserPlus}/>&nbsp;Sign up New Account</span> </Link>{' '}
              </CardText>
            </Form><br/>
          </Card>
          <br/>
          </Styled>
        </Container>
        }
      <Footer />
      </React.Fragment>
    
    )
  }
}

const Styled = styled.div`
  .messageLogin {
    color: #ff0000;
  }
  .logForm {
    text-align: center;
    width: 450px;
    margin: 0 auto;
    background-color: #f3f3f3;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
  .inputForm {
    display: flex;
    border: 1px solid #f3f3f3;
  }
  .inputData {
    padding: 0 10px;
  }
  .allCard {
    background-color: white;
  }
  .iconIn {
    width: 45px;
  }
`;

const mapStateProps = state => ({
  user: state.user
})

export default connect(mapStateProps)(Login);
