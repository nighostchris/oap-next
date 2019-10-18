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

const NotiWrapper = styled('div', {
  position: 'relative',
  marginRight: '30px',
})

const StyledNotifications = styled(Notifications, {
  color: '#e0e0e0',
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

const StyledNotiDropDown = styled('div', ({ $theme }) => ({
  top: '50px',
  right: '180px',
  width: '300px',
  position: 'fixed',
  borderRadius: '5px',
  backgroundColor: $theme.colors.accent100,
}))

const NotificationHeader = styled('div', ({ $theme }) => ({
  display: 'flex',
  height: '40px',
  alignItems: 'center',
  flexDirection: 'row',
  border: '1px solid #212121',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: 'unset !important',
  backgroundColor: $theme.colors.accent200,
}))

const NotificationLabel = styled('div', () => ({
  color: 'white',
  fontWeight: 'bold',
  paddingLeft: '15px',
  paddingRight: '5px',
}))

const NotiNumber = styled('div', {
  borderRadius: '100%',
  fontSize: '16px',
  lineHeight: '20px',
  textAlign: 'center',
  fontWeight: 'bold',
  width: '20px',
  height: '20px',
  color: 'white',
  backgroundColor: '#00aa37',
})

const HeaderNotiNumber = styled(NotiNumber, {
  top: '-6px',
  right: '-6px',
  position: 'absolute',
})

const NotificationWrap = styled('div', {
  overflowY: 'auto',
  maxHeight: '200px',
  borderTop: 'unset',
  border: '1px solid #212121',
  borderRadius: '0px 0px 5px 5px',
  "::-webkit-scrollbar": {
    width: ".8rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundClip: "padding-box",
    border: "2px solid transparent",
    borderRadius: ".8rem",
    backgroundColor: "rgba(128, 128, 128, .7)",
    boxShadow: "inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)",
  },
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

const noti = [
  {content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.'},
  {content: 'You can find the solutions below: Ass3_Fall_2017_solutions.pdf.'},
  {content: 'You can find the solutions below: Ass2_Fall_2017_solutions.pdf.'},
  {content: 'You can find the solutions below: Ass1_Fall_2017_solutions.pdf.'},
  {content: 'Welcome to COMP2012.'},
  {content: 'Welcome to COMP2011.'},
  {content: 'Welcome to COMP1021.'},
  {content: 'Welcome to COMP3021.'},
];

const HeaderBar: React.FunctionComponent<themeProps> = ({
  themeController, setThemeController}) => {
  const [userOpen, setUserOpen] = React.useState(true);
  const [notiOpen, setNotiOpen] = React.useState(true);

  return (
    <HBar>
      <StyledMoon
        size="26"
        onClick={() => setThemeController(Math.abs(themeController - 1))}
      />
      <NotiWrapper>
        <StyledNotifications
          size="26"
          onClick={() => setNotiOpen(!notiOpen)}
        />
        <HeaderNotiNumber>{noti.length}</HeaderNotiNumber>
      </NotiWrapper>
      <StyledNotiDropDown style={{ display: notiOpen ? undefined : 'none' }}>
        <NotificationHeader>
          <NotificationLabel>Notifications</NotificationLabel>
          <NotiNumber>{noti.length}</NotiNumber>
        </NotificationHeader>
        <NotificationWrap>
          {
            noti.map((n, i) => (
              <StyledParagraph3 key={i}>{n.content}</StyledParagraph3>  
            ))
          }
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
