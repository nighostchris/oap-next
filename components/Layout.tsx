import * as React from 'react'
import { styled } from 'baseui'
import HeaderBar from '../components/HeaderBar'
import SideNav from '../components/SideNav'

const RootContainer = styled('div', {
  height: "100%",
  display: "flex",
  flexDirection: "row",
})

const LeftContainer = styled('div', {
  transition: 'width 0.2s ease-in-out',
})

const RightContainer = styled('div', {
  transition: 'width 0.2s ease-in-out',
})

const Layout: React.FunctionComponent = ({children}) => {
  const [navbarOpenCounter, setNavBarOpenCounter] = React.useState(0);
  const [navbarOpen, setNavBarOpen] = React.useState(true);

  return (
    <RootContainer>
      <LeftContainer
        style={{
          width: navbarOpen ? '15%' : '3%',
          position: 'fixed',
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
        }}>
        <HeaderBar />
        {children}
      </RightContainer>
    </RootContainer>
  )
}

export default Layout
