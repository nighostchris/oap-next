import * as React from 'react';
import { BaseProvider } from 'baseui';
import SideNav from './SideNav';
import { lightTheme } from '../../utils/theme';

const Layout: React.FunctionComponent = ({ children }) => (
  <BaseProvider theme={lightTheme}>
    <SideNav />
    <div className="main-content">
      {children}
    </div>
  </BaseProvider>
);

export default Layout;
