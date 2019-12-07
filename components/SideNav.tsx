import React, { Fragment } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
// import Link from 'next/link';
// import { styled } from 'baseui';
// import { useRouter } from 'next/router';
// import { Paragraph3 } from 'baseui/typography';
// import { Book } from 'styled-icons/fa-solid/Book';
// import { Cubes } from 'styled-icons/fa-solid/Cubes';
// import { Settings } from 'styled-icons/material/Settings';
// import { LeftArrow } from 'styled-icons/boxicons-solid/LeftArrow';
// import { RightArrow } from 'styled-icons/boxicons-solid/RightArrow';
// import { Notifications } from 'styled-icons/material/Notifications';
// import { Conversation } from 'styled-icons/boxicons-solid/Conversation';
// import { SideNavProps } from '../utils/interface';

interface Link {
  icon?: string
  href?: string
  title: string
  children?: Array<Link>
}

interface Navigation {
  title?: string
  links: Array<Link>
}

interface SidebarProps {
  navigations: Array<Navigation>
}

interface NavItemProps {
  link: Link
}

const NavItem: React.SFC<NavItemProps> = ({ link }) => {
  return (
    <Nav.Item>
      <Nav.Link href={link.href}>
        <i className={link.icon} style={{ marginRight: '8px' }} />
        { link.title }
      </Nav.Link>
      {link.children
        && (
        <Navbar.Collapse>
          <ul className="nav nav-sm flex-column">
            { link.children.map((item) => (
              <Nav.Item key={item.href}>
                <Nav.Link href={item.href}>{item.title}</Nav.Link>
              </Nav.Item>
            ))}
          </ul>
        </Navbar.Collapse>
        )}
    </Nav.Item>
  );
};

const Sidebar: React.SFC<SidebarProps> = ({ navigations }) => (
  <>
    <Navbar.Toggle />
    <a className="navbar-brand" href="index.html">
      <img
        src="logo.svg"
        className="navbar-brand-img mx-auto"
        alt="..."
      />
    </a>
    <Navbar.Collapse>
      {
        navigations.map((navigation, index) => (
          <Fragment key={navigation.title}>
            {navigation.title && <h6 className="navbar-heading">{ navigation.title }</h6>}
            <ul className={`navbar-nav ${navigation.title ? 'mb-md-4' : ''}`}>
              {
                navigation.links.map((link, i) => <NavItem key={`navitem-${i}`} link={link} />)
              }
            </ul>
            { index !== navigations.length - 1 && <hr className="navbar-divider my-3" />}
          </Fragment>
        ))
      }
      <div className="mt-auto" />
      <div className="navbar-user d-none d-md-flex">
        <div className="navbar-user-link">
          <span className="icon">
            <i className="fas fa-bell" />
          </span>
        </div>
        <div className="dropup">
          <div className="dropdown-toggle">
            <div className="avatar avatar-sm avatar-online">
              <img src="./assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
            </div>
          </div>
          <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
            <a href="profile-posts.html" className="dropdown-item">Profile</a>
            <a href="settings.html" className="dropdown-item">Settings</a>
            <hr className="dropdown-divider"/>
            <a href="sign-in.html" className="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
    </Navbar.Collapse>
  </>
);

// const courses = [{
//   code: 'comp1021',
//   title: 'Introduction to Computer Science',
//   section: 'L1',
//   instructor: 'LAM, Gibson',
// },
// {
//   code: 'comp2011',
//   title: 'Programming with C++',
//   section: 'L2',
//   instructor: 'Li, Xin',
// },
// {
//   code: 'comp2012',
//   title: 'Object-Oriented Programming and Data Structures',
//   section: 'L2',
//   instructor: 'Tsoi, Yau Chat',
// },
// {
//   code: 'comp3021',
//   title: 'Java Programming',
//   section: 'L1',
//   instructor: 'Cheung, Shing Chi',
// }];

// const accountUtils = [
//   { 'Notifications': '/notification' },
//   { 'Conversations': '/conversation' },
//   { 'Settings': '/settings' },
// ];

const navigations: Array<Navigation> = [
  {
    title: 'Courses',
    links: [
      {
        title: 'COMP1021',
        href: '/comp1021',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP1021',
        href: '/comp1021',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP1021',
        href: '/comp1021',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP1021',
        href: '/comp1021',
        icon: 'fas fa-book',
      },
    ],
  },
  {
    title: 'Account',
    links: [
      {
        title: 'Notifications',
        href: '/notification',
        icon: 'fas fa-bell',
      },
      {
        title: 'Conversations',
        href: '/conversation',
        icon: 'fas fa-comment-dots',
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: 'fas fa-cog',
      },
    ],
  },
];


const SideNav: React.FunctionComponent = () => (
  <Navbar className="navbar-vertical fixed-left adaptive-navbar" expand="md">
    <Container fluid>
      <Sidebar navigations={navigations} />
    </Container>
  </Navbar>
);

export default SideNav;
