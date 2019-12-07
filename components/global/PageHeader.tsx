import React from 'react';
import RandomGradGen from './RandomGradGen';

interface PageHeaderProps {
}

const PageHeader : React.SFC<PageHeaderProps> = ({
  
}) => (
  <div className="header">
    <RandomGradGen />
    <div className="container-fluid">
      <div className="header-body mt-n5 mt-md-n6">
        <div className="row align-items-end">
          <div className="col-auto">
            <div className="avatar avatar-xxl header-avatar-top">
              <img
                alt=""
                src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                className="avatar-img rounded-circle border border-4 border-card"
              />
            </div>
          </div>
          <div className="col mb-3 ml-n3 ml-md-n2">
            <h6 className="header-pretitle">COMP 1021</h6>
            <h1 className="header-title">Assignment 1 - Tic Tac Toe</h1>
          </div>
          <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">
            <div className="btn btn-primary d-block d-md-inline-block">
              Subscribe
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <ul className="nav nav-tabs nav-overflow header-tabs">
              <li className="nav-item">
                <a href="profile-posts.html" className="nav-link">Tab 1</a>
              </li>
              <li className="nav-item">
                <a href="profile-groups.html" className="nav-link active">Tab 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageHeader;
