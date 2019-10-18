import * as React from 'react';
import Link from 'next/link';
import { styled } from 'baseui';
import { useRouter } from 'next/router';
import { Paragraph3 } from 'baseui/typography';
import { Book } from 'styled-icons/fa-solid/Book';
import { Cubes } from 'styled-icons/fa-solid/Cubes';
import { Settings } from 'styled-icons/material/Settings';
import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';
import { Notifications } from 'styled-icons/material/Notifications';
import { Conversation } from 'styled-icons/boxicons-solid/Conversation';
import { SideNavProps } from '../utils/interface';

const SideNavBar = styled('div', ({ $theme }) => ({
  height: '100vh',
  backgroundColor: $theme.colors.primary50,
}));

const LogoContainer = styled('div', ({ $theme }) => ({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: $theme.colors.primary,
  justifyContent: 'space-between',
}));

const StyledLogo = styled(Cubes, {
  color: '#e0e0e0',
  marginLeft: '20px',
  ':hover': {
    cursor: 'pointer',
  },
});

const StyledParagraph3 = styled(Paragraph3, {
  padding: '0 0 10px 0',
  width: '80%',
  marginBlockStart: '0',
  marginBlockEnd: '0',
});

const ListItemText = styled(Paragraph3, {
  padding: '10px 0 10px 8px',
  marginBlockStart: '0',
  marginBlockEnd: '0',
});

const ListItem = styled('div', ({ $theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: $theme.colors.primary100,
  },
}));

const StyledBook = styled(Book, {
  paddingLeft: '10%',
});

const NavSection = styled('div', {
  display: 'flex',
  margin: '20px 0px',
  alignItems: 'center',
  flexDirection: 'column',
});

const Breakline = styled('div', {
  height: '1px',
  width: '90%',
  backgroundColor: '#b0bec5',
  margin: '8px 0 0 0',
});

const StyledNotifications = styled(Notifications, {
  paddingLeft: '10%',
});

const StyledSettings = styled(Settings, {
  paddingLeft: '10%',
});

const StyledConversation = styled(Conversation, {
  paddingLeft: '10%',
});

const courses = [{
  code: 'comp1021',
  title: 'Introduction to Computer Science',
  section: 'L1',
  instructor: 'LAM, Gibson',
},
{
  code: 'comp2011',
  title: 'Programming with C++',
  section: 'L2',
  instructor: 'Li, Xin',
},
{
  code: 'comp2012',
  title: 'Object-Oriented Programming and Data Structures',
  section: 'L2',
  instructor: 'Tsoi, Yau Chat',
},
{
  code: 'comp3021',
  title: 'Java Programming',
  section: 'L1',
  instructor: 'Cheung, Shing Chi',
}];

const accountUtils = [
  { 'Notifications': '/notification' },
  { 'Conversations': '/conversation' },
  { 'Settings': '/settings' },
];

const SideNav: React.FunctionComponent<SideNavProps> = ({
  navbarOpen, setNavBarOpen, navbarOpenCounter, setNavBarOpenCounter,
}) => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <SideNavBar style={{ fontWeight: 'bold' }}>
      <LogoContainer>
        <Link href="/">
          <StyledLogo size="50" style={{ display: !navbarOpen ? 'none' : undefined }} />
        </Link>
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
      <NavSection style={{ display: !navbarOpen ? 'none' : undefined }}>
        <StyledParagraph3
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#eceff1',
              },
            },
          }}
        >
          My Courses
        </StyledParagraph3>
        {
          courses.map((c, index) => (
            <Link
              key={`sidenav-${index}`}
              href={`/course/${c.code}`}
            >
              <ListItem style={{
                backgroundColor: c.code === courseid ? '#455a64' : undefined,
              }}
              >
                <StyledBook size={20} />
                <ListItemText
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#eceff1',
                      },
                    },
                  }}
                >
                  {c.code.toUpperCase().replace(/([^0-9])([0-9])/g, '$1 $2')}
                </ListItemText>
              </ListItem>
            </Link>
          ))
        }
        <Breakline />
      </NavSection>
      <NavSection style={{ display: !navbarOpen ? 'none' : undefined }}>
        <StyledParagraph3
          overrides={{
            Block: {
              style: {
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#eceff1',
              },
            },
          }}
        >
          Account
        </StyledParagraph3>
        {
          accountUtils.map((d, i) => (
            <Link
              key={`utils-${i}`}
              href={Object.values(d).toString()}
            >
              <ListItem>
                {i === 0 && <StyledNotifications size={26} />}
                {i === 1 && <StyledConversation size={26} />}
                {i === 2 && <StyledSettings size={26} />}
                <ListItemText
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#eceff1',
                      },
                    },
                  }}
                >
                  {Object.keys(d)}
                </ListItemText>
              </ListItem>
            </Link>
          ))
        }
      </NavSection>
    </SideNavBar>
  );
};

export default SideNav;
