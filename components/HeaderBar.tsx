import * as React from 'react'
import { styled } from 'baseui'
import { Notifications } from 'styled-icons/material/Notifications'
import { User } from 'styled-icons/boxicons-solid/User'
import { Paragraph2, Paragraph3 } from 'baseui/typography'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'
import { Moon } from 'styled-icons/fa-solid/Moon'
import { themeProps } from '../utils/interface'

const HBar = styled('div', ({ $theme }) => ({
  height: '64px',  
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  background: $theme.colors.primary,
}))

const StyledMoon = styled(Moon, {
  stroke: 'white',
  color: 'black',
  strokeWidth: '30px',
  marginRight: '30px',
  ':hover': {
    cursor: 'pointer',
  },
})

const StyledNotifications = styled(Notifications, {
  color: '#e0e0e0',
  marginRight: '30px',
  ':hover': {
    cursor: 'pointer',
  },
})

const StyledUser = styled(User, {
  color: '#e0e0e0', 
  marginRight: '10px',
})

const StyledUsername = styled(Paragraph2, {
  color: '#e0e0e0 !important',
})

const StyledArrowDropDown = styled(ArrowDropDown, {
  color: '#e0e0e0',  
  marginLeft: '5px',
  marginRight: '10px',
  ':hover': {
    cursor: 'pointer',
  },
})

const StyledUserDropDown = styled('div', {
  top: '50px',
  right: '16px',
  width: '150px',
  position: 'fixed',  
  border: '1px solid',
  borderRadius: '5px',
  textAlign: 'center',
})

const StyledNotiDropDown = styled('div', {
  top: '50px',
  right: '180px',
  width: '300px',
  position: 'fixed',
  backgroundColor: 'white',
})

const NotificationLabel = styled('div', {
  display: 'flex',
  height: '40px',
  color: 'white',
  fontWeight: 'bold',
  paddingLeft: '15px',
  alignItems: 'center',
  backgroundColor: '#42a5f5',
  borderRadius: '5px 5px 0px 0px',
})

const NotificationWrap = styled('div', {
  borderColor: '#eeeeee',
  borderStyle: 'hidden solid solid',
  borderWidth: '2px',
  borderRadius: '0px 0px 5px 5px',
})

const StyledParagraph3 = styled(Paragraph3, {
  color: '#757575',
  fontWeight: 'bold',
  paddingTop: '1em',
  paddingLeft: '15px',
  paddingBottom: '1em',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const HeaderBar: React.FunctionComponent<themeProps> = ({
  themeController, setThemeController}) => {
  const [userOpen, setUserOpen] = React.useState(false);
  const [notiOpen, setNotiOpen] = React.useState(false);

  return (
    <HBar>
      <StyledMoon
        size="26"
        onClick={() => setThemeController(Math.abs(themeController - 1))}
      />
      <StyledNotifications
        size="26"
        onClick={() => setNotiOpen(!notiOpen)}
      />
      <StyledNotiDropDown style={{ display: notiOpen ? undefined : 'none' }}>
        <NotificationLabel>Notifications</NotificationLabel>
        <NotificationWrap>
          <StyledParagraph3>Assignment 1 released. The due day is 1/10/2019</StyledParagraph3>
          <StyledParagraph3>Welcome to COMP2012!</StyledParagraph3>
        </NotificationWrap>
      </StyledNotiDropDown>
      <StyledUser size="26" />
      <StyledUsername>desmond</StyledUsername>
      <StyledArrowDropDown
        size="26"
        onClick={() => setUserOpen(!userOpen)}
      />
      <StyledUserDropDown style={{ display: userOpen ? undefined : 'none' }}>
        <Paragraph3>Edit Profile</Paragraph3>
        <Paragraph3>Logout</Paragraph3>
      </StyledUserDropDown>
    </HBar>
  )
}

export default HeaderBar
