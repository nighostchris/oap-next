import * as React from 'react';
import { BaseProvider } from 'baseui';
import SideNav from './SideNav';
// import MobileSideNav from './MobileSideNav';
// import HeaderBar from './HeaderBar';
import { lightTheme } from '../utils/theme';

// const RootContainer = styled('div', ({ $theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'row',
//   background: $theme.colors.primary500,
// }));

// const LeftContainer = styled('div', {
//   position: 'fixed',
//   transition: 'width 0.2s ease-in-out',
// });

// const RightContainer = styled('div', {
//   height: '100vh',
//   overflowY: 'hidden',
//   transition: 'width 0.2s ease-in-out',
//   '@media (min-width: 320px) and (max-width: 480px)': {
//     width: '100% !important',
//     marginLeft: '0 !important',
//   },
// });

const Layout: React.FunctionComponent = () => (
  <BaseProvider theme={lightTheme}>
    <SideNav />
  </BaseProvider>
);

export default Layout;
