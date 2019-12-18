import * as React from 'react';
import SideNav from './SideNav';

const Root: React.FunctionComponent = ({ children }) => (
  <>
    <SideNav />
    <div className="main-content">
      {children}
    </div>
  </>
);

export default Root;
