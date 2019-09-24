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
  width: '15%',
})

const RightContainer = styled('div', {
  width: '80%',
})

const Layout: React.FunctionComponent = ({children}) => {
  const [navbarOpen, setNavBarOpen] = React.useState(true);

  return (
    <RootContainer>
      <LeftContainer>
        <SideNav
          navbarOpen={navbarOpen}
          setNavBarOpen={setNavBarOpen}
        />
      </LeftContainer>
      <RightContainer>
        <HeaderBar />
        {children}
      </RightContainer>
    </RootContainer>
  )
}

export default Layout
