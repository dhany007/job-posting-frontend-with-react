/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Job from './pages/Job';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import DetailJob from './pages/DetailJob.js';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';

import Dashboard from './pages/admin/Job';
import DashboardCompany from './pages/admin/Company';
import DashboardCategory from './pages/admin/Category';

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
              <Switch>
                <Route
                path = '/'
                render = { props => (
                <Home {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />

                <Route
                path = '/job'
                render = { props => (
                <Job {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />

                <Route
                path = '/signin'
                render = { props => (
                <SignIn {...props}
                handleLogged= {this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />

                <Route
                path = '/signup'
                render = { props => (
                <SignUp {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                exact />
                
                <Route
                path = '/detail/:id_job' 
                render = { props => (
                <DetailJob {...props}
                handleLogged={this.handleLogged}
                isLogged= {this.state.isLogged} />)}
                />

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
          </Router>
      </React.Fragment>
    )
  }
}
