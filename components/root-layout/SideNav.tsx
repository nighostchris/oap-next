import React, { Fragment } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

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

const NavItem: React.SFC<NavItemProps> = ({ link }) => (
  <Nav.Item>
    <Nav.Link href={link.href}>
      <i className={link.icon} style={{ marginRight: '8px' }} />
      { link.title }
    </Nav.Link>
    {
      link.children
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
        )
    }
  </Nav.Item>
);

const Sidebar: React.SFC<SidebarProps> = ({ navigations }) => (
  <>
    <Navbar.Toggle />
    <Navbar.Brand>
      <img
        src="logo.svg"
        className="navbar-brand-img mx-auto"
        alt="..."
      />
    </Navbar.Brand>
    <Navbar.Collapse>
      {
        navigations.map((navigation, index) => (
          <Fragment key={navigation.title}>
            {
              navigation.title && <h6 className="navbar-heading">{ navigation.title }</h6>
            }
            <ul className={`navbar-nav ${navigation.title ? 'mb-md-4' : ''}`}>
              {
                navigation.links.map((link, i) => <NavItem key={`navitem-${i}`} link={link} />)
              }
            </ul>
            {
              index !== navigations.length - 1 && <hr className="navbar-divider my-3" />
            }
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
              <img
                alt="..."
                className="avatar-img rounded-circle"
                src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
              />
            </div>
          </div>
          <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
            <a href="profile-posts.html" className="dropdown-item">Profile</a>
            <a href="settings.html" className="dropdown-item">Settings</a>
            <hr className="dropdown-divider" />
            <a href="sign-in.html" className="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
    </Navbar.Collapse>
  </>
);

const navigations: Array<Navigation> = [
  {
    title: 'Courses',
    links: [
      {
        title: 'COMP1021',
        href: '/1021',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP2011',
        href: '/2011',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP2012',
        href: '/2012',
        icon: 'fas fa-book',
      },
      {
        title: 'COMP3021',
        href: '/3021',
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
