import React, { useState, Fragment } from 'react';

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
  const [collapsed, toggleCollapse] = useState(true);
  const [isCollapsing, setCollapsing] = useState(false);
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${link.children && collapsed ? 'collapsed' : ''}`}
        href={link.href || '#'}
        onClick={() => {
          setTimeout(() => {
            setCollapsing(false);
          }, 500);
          toggleCollapse(!collapsed);
          setCollapsing(true);
        }}
      >
        <i className={link.icon} style={{ marginRight: '8px' }} />
        { link.title }
      </a>
      {link.children
        && (
        <div className={`collapse ${isCollapsing ? 'collapsing' : ''} ${!collapsed && !isCollapsing ? 'show' : ''}`}>
          <ul className="nav nav-sm flex-column">
            { link.children.map((item) => (
              <li className="nav-item" key={item.href}>
                <a className="nav-link" href={item.href}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        )}
    </li>
  );
};

const Sidebar: React.SFC<SidebarProps> = ({ navigations }) => (
  <div className="navbar-collapse">
    {
      navigations.map((navigation, index) => (
        <Fragment key={navigation.title}>
          {navigation.title && <h6 className="navbar-heading">{ navigation.title }</h6>}
          <ul className={`navbar-nav ${navigation.title ? 'mb-md-4' : ''}`}>
            {
              navigation.links.map((link, i) => <NavItem key={`navitem-${i}`} link={link} />)
            }
          </ul>
          { index !== navigations.length && <hr className="navbar-divider my-3" />}
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
  </div>
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


const SideNav: React.FunctionComponent = () => {
  return (
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <a className="navbar-brand" href="index.html">
          <img
            src="logo.svg"
            className="navbar-brand-img mx-auto"
            alt="..."
          />
        </a>
        <Sidebar navigations={navigations} />
      </div>
    </nav>
  );
};

export default SideNav;
