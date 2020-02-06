import * as React from 'react';
import SideNav from './SideNav';
import withApollo from '../../lib/apollo';

const Root: React.FunctionComponent = ({ children }) => (
  <>
    <SideNav />
    <div className="main-content">
      {children}
    </div>
  </>
);

export default withApollo(Root);
