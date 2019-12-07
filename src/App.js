/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Job from './pages/Job';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import NoMatch from './pages/NoMatch';
import Home from './pages/home';
import DetailJob from './pages/detailJob';

import Dashboard from './pages/admin/Job';
import DashboardCompany from './pages/admin/Company';
import DashboardCategory from './pages/admin/Category';

import {Provider} from 'react-redux';
import store from './redux/store';

export default class App extends Component {
  constructor(){
    super();
    this.state= {
      isLogged: false,
      user: {}
    }

    this.handleLogged = this.handleLogged.bind(this);
  }
  
  handleLogged(data){ 
    this.setState({
      isLogged: true,
      user: data
    })
  }


  
  render() {
    return (
      <React.Fragment>
          <Router>
            <Provider store={store}>
              <Switch>
                <Route
                path = '/'
                render = { props => (
                <Home {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />

                {/* <Route
                path = '/job'
                render = { props => (
                <Job {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact /> */}

                <Route path = '/job' component = {Job} />

                {/* <Route
                path = '/signin'
                render = { props => (
                <SignIn {...props}
                handleLogged= {this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact /> */}
                <Route path = '/signin' component = {SignIn}/>

                <Route
                path = '/signup'
                render = { props => (
                <SignUp {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />
{/*                 
                <Route
                path = '/detail/:id_job' 
                render = { props => (
                <DetailJob {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                /> */}

                <Route path = '/detail/:id_job' component={DetailJob} />

                <Route path = '/dashboard'
                render = { props => (
                <Dashboard {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                />
                
                <Route path = '/dashboardcompany'
                render = { props => (
                <DashboardCompany {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                />

                <Route path = '/dashboardcategory'
                render = { props => (
                <DashboardCategory {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                />
                
                <Route component = { NoMatch } />
              </Switch>
              <br/>
            </Provider>
          </Router>
      </React.Fragment>
    )
  }
}
