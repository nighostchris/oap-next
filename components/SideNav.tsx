import * as React from 'react'
import Link from 'next/link'
import { styled } from 'baseui'
import { Paragraph3 } from 'baseui/typography'
import { Cubes } from 'styled-icons/fa-solid/Cubes'
import { Book } from 'styled-icons/fa-solid/Book'
import { Notifications } from 'styled-icons/material/Notifications'
import { Settings } from 'styled-icons/material/Settings'
import { Conversation } from 'styled-icons/boxicons-solid/Conversation'
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow'
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow'

interface SideNavProps {
  navbarOpen: boolean,
  setNavBarOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
  navbarOpenCounter: number,
  setNavBarOpenCounter: (value: number | ((prevVar: number) => number)) => void,
}

const SideNavBar = styled('div', {
  height: '100vh',
  backgroundColor: '#607d8b',
})

const LogoContainer = styled('div', {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#303f9f',
  justifyContent: 'space-between',
})

const StyledLogo = styled(Cubes, {
  color: '#e0e0e0',
  marginLeft: '20px',
})

const StyledParagraph3 = styled(Paragraph3, {
  fontSize: '16px !important',
  color:"#eceff1 !important",
  padding: '0 0 10px 0',
  width: '80%',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const CourseTitle = styled(Paragraph3, {
  color: "#cfd8dc",
  padding: '10px 0 10px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const ListItem = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#455a64'
  },
})

const StyledBook = styled(Book, {
  paddingLeft: '10%',
})

const AccountLabel = styled(Paragraph3, {
  color: "#cfd8dc",
  padding: '10px 0 10px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const NavSection = styled('div', {
  display: 'flex',
  margin: '16px 0px',  
  alignItems: 'center',  
  flexDirection: 'column',
})

const Breakline = styled('div', {
  height: '1px',
  width: '90%',
  backgroundColor: '#b0bec5',
  margin: '8px 0 0 0',
})

const StyledNotifications = styled(Notifications, {
  paddingLeft: '10%',
})

const StyledSettings = styled(Settings, {
  paddingLeft: '10%',
})

const StyledConversation = styled(Conversation, {
  paddingLeft: '10%',
})

const courses = [{
  code: '1021',
  title: 'Introduction to Computer Science',
  section: 'L1',
  instructor: 'LAM, Gibson',
},
{
  code: '2011',
  title: 'Programming with C++',
  section: 'L2',
  instructor: 'Li, Xin',
},
{
  code: '2012',
  title: 'Object-Oriented Programming and Data Structures',
  section: 'L2',
  instructor: 'Tsoi, Yau Chat',
},
{
  code: '3021',
  title: 'Java Programming',
  section: 'L1',
  instructor: 'Cheung, Shing Chi',
}];

const SideNav: React.FunctionComponent<SideNavProps> = ({
  navbarOpen, setNavBarOpen, navbarOpenCounter, setNavBarOpenCounter}) => {
    return (
      <SideNavBar style={{fontWeight: 'bold'}}>
        <LogoContainer>
          <StyledLogo size="50" style={{display: !navbarOpen ? 'none' : undefined}} />
          <LeftArrow
            size="18"
            onClick={() => {
              setNavBarOpen(!navbarOpen);
              setNavBarOpenCounter(navbarOpenCounter++);
            }}
            style={{
              color: '#e0e0e0',              
              marginRight: '10px',
              display: !navbarOpen ? 'none' : undefined,
            }}
          />
          <RightArrow
            size="18"
            onClick={() => {
              setNavBarOpen(!navbarOpen);
              navbarOpenCounter++;
            }}
            style={{
              width: '100%',
              color: '#e0e0e0',
              display: navbarOpen ? 'none' : undefined,
            }}
          />
        </LogoContainer>
        <NavSection style={{display: !navbarOpen ? 'none' : undefined}}>
          <StyledParagraph3>My Courses</StyledParagraph3>
          {
            courses.map((c, index) => (
              <Link
                key={`sidenav-${index}`}
                href={`/courses/comp${c.code}`}
              >
                <ListItem >
                  <StyledBook size='20' />
                  <CourseTitle>{`COMP ${c.code}`}</CourseTitle>
                </ListItem>
              </Link>
              
            ))
          }
          <Breakline />
        </NavSection>
        <NavSection style={{display: !navbarOpen ? 'none' : undefined}}>
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
