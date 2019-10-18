import * as React from 'react';
import { styled, BaseProvider } from 'baseui';
import SideNav from './SideNav';
import HeaderBar from './HeaderBar';
import { lightTheme, darkTheme } from '../utils/theme';

const RootContainer = styled('div', ({ $theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  background: $theme.colors.primary500,
}));

const LeftContainer = styled('div', {
  transition: 'width 0.2s ease-in-out',
});

const RightContainer = styled('div', {
  overflowY: 'hidden',
  transition: 'width 0.2s ease-in-out',
});

const Layout: React.FunctionComponent = ({ children }) => {
  const [themeController, setThemeController] = React.useState(0);
  const [navbarOpenCounter, setNavBarOpenCounter] = React.useState(0);
  const [navbarOpen, setNavBarOpen] = React.useState(true);

  return (
    <BaseProvider theme={themeController === 0 ? lightTheme : darkTheme}>
      <RootContainer>
        <LeftContainer
          style={{
            position: 'fixed',
            width: navbarOpen ? '15%' : '3%',
          }}
        >
          <SideNav
            navbarOpen={navbarOpen}
            setNavBarOpen={setNavBarOpen}
            navbarOpenCounter={navbarOpenCounter}
            setNavBarOpenCounter={setNavBarOpenCounter}
          />
        </LeftContainer>
        <RightContainer
          style={{
            width: navbarOpen ? '85%' : '97%',
            marginLeft: navbarOpen ? '15%' : '3%',
            height: '100vh',
          }}
        >
          <HeaderBar
            themeController={themeController}
            setThemeController={setThemeController}
          />
          {children}
        </RightContainer>
      </RootContainer>
    </BaseProvider>
  );
};

export default Layout;
