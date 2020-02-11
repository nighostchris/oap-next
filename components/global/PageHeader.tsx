import React from 'react';
import RandomGradGen from './RandomGradGen';

interface PageHeaderProps {
  pretitle: string
  title: string
  avatar: JSX.Element
  tabTitle: Array<string>
  rootUrl: string
  active: number,
}

const PageHeader : React.SFC<PageHeaderProps> = ({
  pretitle, title, avatar, tabTitle, rootUrl, active,
}) => (
  <div className="header">
    <RandomGradGen />
    <div className="container-fluid">
      <div className="header-body mt-n5 mt-md-n6">
        <div className="row align-items-end">
          <div className="col-auto">
            <div className="avatar avatar-xxl header-avatar-top">
              <span className="avatar-title rounded-circle bg-dark text-primary">
                {avatar}
              </span>
            </div>
          </div>
          <div className="col mb-3 ml-n3 ml-md-n2">
            <h6 className="header-pretitle">{pretitle}</h6>
            <h1 className="header-title">{title}</h1>
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
              {
                tabTitle.map((t, index) => (
                  <li key={`tab-${index}`} className="nav-item">
                    <a
                      href={`${rootUrl}/${t.toLowerCase()}`}
                      className={`nav-link ${index === active && 'active'}`}
                    >
                      {t}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageHeader;
