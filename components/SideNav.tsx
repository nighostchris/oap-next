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
  backgroundColor: '#bdbdbd',
})

const LogoContainer = styled('div', {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#eeeeee',
  justifyContent: 'space-between',
})

const StyledLogo = styled(Cubes, {
  marginLeft: '20px',
})

const StyledParagraph3 = styled(Paragraph3, {
  color:"#757575",
  fontWeight: 700,
  padding: '16px 0 8px 16px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const CourseTitle = styled(Paragraph3, {
  color:"#1565c0",
  fontWeight: 700,
  padding: '10px 0 10px 8px',
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
  fontWeight: 700,
  padding: '10px 0 10px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
})

const NavSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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
                  <Book size='20' />
                  <CourseTitle>{`COMP ${c.code}`}</CourseTitle>
                </ListItem>
              </Link>
              
            ))
          }
        </NavSection>
        <NavSection style={{display: !navbarOpen ? 'none' : undefined}}>
          <StyledParagraph3>Account</StyledParagraph3>
          <ListItem>
            <Notifications size='26' />
            <AccountLabel>Notifications</AccountLabel>
          </ListItem>
          <ListItem>
            <Settings size='26' />
            <AccountLabel>Settings</AccountLabel>
          </ListItem>
          <ListItem>
            <Conversation size='26' />
            <AccountLabel>Conversations</AccountLabel>
          </ListItem>
        </NavSection>
      </SideNavBar>
    )
}

export default SideNav
