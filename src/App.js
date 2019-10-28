import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import DetailJob from './pages/detailJob'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
        <Switch>
          <Route path = '/' component = { Home } exact/>
          <Route path = '/login' component = { Login } exact/>
          <Route path = '/register' component = { Register } exact/>
          <Route path = '/job/:id' component = { DetailJob } />
        </Switch>
      </BrowserRouter>
    )
  }
}
