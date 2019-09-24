import * as React from 'react'
import { styled } from 'baseui'
import { Cubes } from 'styled-icons/fa-solid/Cubes'

const SideNavBar = styled('div', {
  height: '100vh',
  backgroundColor: '#bdbdbd',
})

const LogoContainer = styled('div', {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#eeeeee',
})

const StyledLogo = styled(Cubes, {
  marginLeft: '20px',
})

const NavList = styled('div', {
  margin: '10% auto',
  width: '100%',
})

const StyledUL = styled('ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const StyledLabel = styled('label', {
  display: 'block',
  cursor: 'pointer',
  padding: '10px',
  border: '1px solid #fff',
  borderBottom: 'none',
  ':hover': {
    background: '#26C281',
  },
  ':last-child': {
    borderBottom: '1px solid #fff',
  },
})

const ListItem = styled('li', {
  padding: '10px',
  background: '#59ABE3',
})


const StyledInput = styled('input', {
  position: 'absolute',
  left: '-9999px',
  ":checked ~ ul": {
    height: '100%',
    transformOrigin: 'top',
    transition: 'transform .2s ease-out',
    transform: 'scaleY(1)',
  },
  ":checked + label": {
    background: '#26C281',
    borderBottom: '1px solid #fff',
  },
})

const CheckboxUL = styled('ul', {
  height: '100px',
  transform: 'scaleY(0)',
})

const SideNav: React.FunctionComponent = () => {
  return (
    <SideNavBar>
      <LogoContainer>
        <StyledLogo size="50" />
      </LogoContainer>
      <NavList>
        <StyledUL>
          <li>
            <StyledInput type="checkbox" id="list-item-1" />
            <StyledLabel htmlFor="list-item-1">Serif</StyledLabel>
            <CheckboxUL>
              <ListItem>Slabo</ListItem>
              <ListItem>Droid Serif</ListItem>
              <ListItem>Roboto Serif</ListItem>
              <ListItem>Lora</ListItem>
              <ListItem>Meriweather</ListItem>
            </CheckboxUL>
          </li>
        </StyledUL>
      </NavList>
    </SideNavBar>
  )
}

export default SideNav
