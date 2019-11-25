/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import {
  NavItem
} from 'reactstrap'

import{ Link } from 'react-router-dom'

export default class Menu extends Component {

  render() {
    return (
     <div>
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <Link to='/' className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
          <span className="brand-text font-weight-light">Admin</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <Link to='#' className="d-block">Alexander Pierce</Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library */}
              <NavItem className="nav-item">
                <Link to='/dashboard' className="nav-link">
                  <i className="nav-icon fas fa-briefcase" />
                  <p>
                    Job
                  </p>
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link to="/dashboardcompany" className="nav-link">
                  <i className="nav-icon fas fa-building" />
                  <p>
                    Company
                  </p>
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link to='/dashboardcategory' className="nav-link">
                  <i className="nav-icon fas fa-list-alt" />
                  <p>
                    Category
                  </p>
                </Link>
              </NavItem>
              <NavItem className="nav-item ">
                <Link to='/' className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>
                    Sign out
                  </p>
                </Link>
              </NavItem>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
    )
  }
}
