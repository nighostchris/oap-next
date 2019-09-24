import * as React from 'react'
import { styled } from 'baseui'
import { Paragraph3 } from 'baseui/typography'
import { Cubes } from 'styled-icons/fa-solid/Cubes'
import { Book } from 'styled-icons/fa-solid/Book'
import { Notifications } from 'styled-icons/material/Notifications'
import { Settings } from 'styled-icons/material/Settings'
import { Conversation } from 'styled-icons/boxicons-solid/Conversation'

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

const StyledParagraph3 = styled(Paragraph3, {
  color:"#757575",
  fontWeight: 600,
  padding: '16px 0 8px 16px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const CourseTitle = styled(Paragraph3, {
  color:"#1565c0",
  fontWeight: 600,
  padding: '8px 0 8px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const ListItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '1em',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#e0e0e0'
  },
})

const AccountLabel = styled(Paragraph3, {
  fontWeight: 600,
  padding: '8px 0 8px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const NavSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const StyledNotifications = styled(Notifications, {
})

const StyledSettings = styled(Settings, {
})

const StyledConversation = styled(Conversation, {
})

const SideNav: React.FunctionComponent = () => {
  return (
    <SideNavBar>
      <LogoContainer>
        <StyledLogo size="50" />
      </LogoContainer>
      <NavSection>
        <StyledParagraph3>My Courses</StyledParagraph3>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 1021</CourseTitle>
        </ListItem>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 2011</CourseTitle>
        </ListItem>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 2012</CourseTitle>
        </ListItem>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 3021</CourseTitle>
        </ListItem>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 1022Q</CourseTitle>
        </ListItem>
        <ListItem>
          <Book size='20' />
          <CourseTitle>COMP 1022P</CourseTitle>
        </ListItem>
      </NavSection>
      <NavSection>
        <StyledParagraph3>Account</StyledParagraph3>
        <ListItem>
          <StyledNotifications size='26' />
          <AccountLabel>Notifications</AccountLabel>
        </ListItem>
        <ListItem>
          <StyledSettings size='26' />
          <AccountLabel>Settings</AccountLabel>
        </ListItem>
        <ListItem>
          <StyledConversation size='26' />
          <AccountLabel>Conversations</AccountLabel>
        </ListItem>
      </NavSection>
    </SideNavBar>
  )
}

export default SideNav
