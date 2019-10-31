import * as React from 'react';
import { styled, BaseProvider } from 'baseui';
import SideNav from './SideNav';
import MobileSideNav from './MobileSideNav';
import HeaderBar from './HeaderBar';
import { lightTheme, darkTheme } from '../utils/theme';

const RootContainer = styled('div', ({ $theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  background: $theme.colors.primary500,
}));

const LeftContainer = styled('div', {
  position: 'fixed',
  transition: 'width 0.2s ease-in-out',
});

const RightContainer = styled('div', {
  height: '100vh',
  overflowY: 'hidden',
  transition: 'width 0.2s ease-in-out',
  '@media (min-width: 320px) and (max-width: 480px)': {
    width: '100% !important',
    marginLeft: '0 !important',
  },
});

const Layout: React.FunctionComponent = ({ children }) => {
  const [themeController, setThemeController] = React.useState(0);
  const [navbarOpenCounter, setNavBarOpenCounter] = React.useState(0);
  const [navbarOpen, setNavBarOpen] = React.useState(true);
  const [mobileNavBarOpen, setMobileNavBarOpen] = React.useState(false);

  return (
    <BaseProvider theme={themeController === 0 ? lightTheme : darkTheme}>
      <RootContainer>
        <LeftContainer
          style={{
            maxWidth: navbarOpen ? '200px' : '40px',
          }}
        >
          <SideNav
            navbarOpen={navbarOpen}
            setNavBarOpen={setNavBarOpen}
            navbarOpenCounter={navbarOpenCounter}
            setNavBarOpenCounter={setNavBarOpenCounter}
          />
          <MobileSideNav
            mobileNavBarOpen={mobileNavBarOpen}
            setMobileNavBarOpen={setMobileNavBarOpen}
          />
        </LeftContainer>
        <RightContainer
          style={{
            width: navbarOpen ? 'calc(100% - 200px)' : '97%',
            marginLeft: navbarOpen ? '200px' : '3%',
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
      </RootContainer>
    </BaseProvider>
  );
};

export default Layout;
