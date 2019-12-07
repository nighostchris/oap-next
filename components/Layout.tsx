import * as React from 'react';
import { styled, BaseProvider } from 'baseui';
import SideNav from './SideNav';
//import HeaderBar from './HeaderBar';
import { lightTheme, darkTheme } from '../utils/theme';

const RootContainer = styled('div', ({ $theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  background: $theme.colors.primary500,
}));

/*
const RightContainer = styled('div', {
  height: '100vh',
  overflowY: 'hidden',
  transition: 'width 0.2s ease-in-out',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '100% !important',
    marginLeft: '0 !important',
  },
});

<RightContainer
  style={{
    // width: navbarOpen ? 'calc(100% - 200px)' : '97%',
    // marginLeft: navbarOpen ? '200px' : '3%',
  }}
>
  <HeaderBar
    themeController={themeController}
    mobileNavBarOpen={mobileNavBarOpen}
    setThemeController={setThemeController}
    setMobileNavBarOpen={setMobileNavBarOpen}
  />
  {children}
</RightContainer>
*/

const Layout: React.FunctionComponent = ({ children }) => {
  // const [navbarOpen, setNavBarOpen] = React.useState(true);
  const [themeController] = React.useState(0);
  //const [mobileNavBarOpen, setMobileNavBarOpen] = React.useState(false);

  return (
    <BaseProvider theme={themeController === 0 ? lightTheme : darkTheme}>
      <RootContainer>
        <SideNav />
        <div className="main-content">
          {children}
        </div>
      </RootContainer>
    </BaseProvider>
  );
};

export default Layout;
