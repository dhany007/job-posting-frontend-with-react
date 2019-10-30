/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>About Job Posting</h4>
              <ul className="list-unstyled">
                <li>The Company</li>
                <li>In the News</li>
                <li>Work with Us</li>
                <li>Contact Us</li>
                <li>Site Map</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="col-md-3 col-sm-6">
              <h4>JobSeekers</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Jobs by Specialization</Link>
                </li>
                <li>
                  <Link to='#'>Jobs by Company Name</Link>
                </li>
                <li>
                  <Link to='#'>Terms of Use</Link>
                </li>
                <li>
                  <Link to='#'>Privacy Policy</Link>
                </li>
                <li>
                  <Link to='#'>Safe Job Search Guide</Link>
                </li>
                <li>
                  <Link to='#'>Career Resources</Link>
                </li>
                <li>
                  <Link to='#'>Testimonials</Link>
                </li>
                <li>
                  <Link to='#'>Help</Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="col-md-3 col-sm-6">
              <h4>Employers</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Post a Job Ad</Link>
                </li>
                <li>
                  <Link to='#'>Search for Resumes</Link>
                </li>
                <li>
                  <Link to='#'>Recruitment Products</Link>
                </li>
                <li>
                  <Link to='#'>Terms of Use</Link>
                </li>
              </ul>
            </div>
            {/* Column 4 */}
            <div className="col-md-3 col-sm-6">
              <h4>Mobile & Social Media</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Mobile Apps</Link>
                </li>
                <li>
                  <Link to='#'>Facebook</Link>
                </li>
                <li>
                  <Link to='#'>Twitter</Link>
                </li>
                <li>
                  <Link to='#'>Instagram</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Job Posting - All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}
export default Footer;

const FooterContainer = styled.footer`
  .footer-middle {
    background-color: white;
    padding-top: 3rem;
  }
  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  ul li a {
    color: #697882;
  }
  ul li a:hover {
    color: #428bca;
  }
`;