import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './pages/Nav'
import Footer from './pages/Footer';

import Job from './pages/Job'
import Login from './pages/Login'
import Register from './pages/Register'
import DetailJob from './pages/DetailJob'
import NoMatch from './pages/NoMatch'
import Home from './pages/Home'

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
            <Navigation />
            <Switch>
              <Route path = '/' component = { Home } exact />
              <Route path = '/job' component = { Job } />
              <Route path = '/login' component = { Login } exact />
              <Route path = '/register' component = { Register } exact />
              <Route path = '/detail/:id_job' component = { DetailJob } />
              <Route component = { NoMatch } />
            </Switch>
            <br/><br/>
            <Footer />
          </Router>
      </React.Fragment>
    )
  }
}
