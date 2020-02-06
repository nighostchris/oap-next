import React, { Fragment, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Accordion,
} from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

interface Link {
  icon?: string
  href?: string
  title: string
  updated?: boolean
  children?: Array<Link>
}

interface Navigation {
  title?: string
  links: Array<Link>
}

interface NavItemProps {
  link: Link
}

const NavItem: React.SFC<NavItemProps> = ({ link }) => {
  const [isExpanded, toggleExpansion] = useState(false);
  return (
    <Accordion as={Nav.Item}>
      <Accordion.Toggle
        eventKey="0"
        as={Nav.Link}
        {...(link.href && { href: link.href })}
        aria-expanded={isExpanded}
        onClick={() => toggleExpansion(!isExpanded)}
        {...(link.children && { 'data-toggle': 'collapse' })}
      >
        <i className={link.icon} style={{ marginRight: '8px' }} />
        { link.title }
      </Accordion.Toggle>
      {
        link.children
          && (
            <Accordion.Collapse eventKey="0">
              <ul className="nav nav-sm flex-column">
                { link.children.map((item) => (
                  <Nav.Item key={item.href}>
                    <Nav.Link href={item.href}>
                      {item.title}
                      {item.updated && <span className="badge badge-soft-success ml-auto">New</span>}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </ul>
            </Accordion.Collapse>
          )
      }
    </Accordion>
  );
};

const GET_ENROLLED_COURSES = gql`
  query currentEnrolledCourses {
    users(where: {
      enrolled_courses: {
        section: {
          course: {
            semester_id: {
              _eq: "1"
            }
          }
        }
      },
      itsc: {
        _eq: "kristopher"
      }
    }) {
      enrolled_courses {
        section {
          course {
            code
          }
        }
      }
    }
  }
`;

const SideNav: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_ENROLLED_COURSES);
  const navigations: Array<Navigation> = [];

  if (!loading) {
    const linksList: Array<Link> = [];

    data.users[0].enrolled_courses.forEach((e: any) => {
      const code = e.section.course.code;

      const subSection: Array<Link> = [];
      ['Announcements', 'Assignments', 'Labs', 'Grades'].forEach((s: string) => {
        subSection.push({
          title: s,
          href: `/course/${code.toLowerCase()}/${s.toLowerCase()}`,
          updated: true,
        });
      });

      linksList.push({
        title: code,
        icon: 'fas fa-book',
        children: subSection,
      });
    });
    linksList.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    navigations.push({
      title: 'Courses',
      links: linksList,
    },
    {
      title: 'Admin',
      links: [
        {
          title: 'User Management',
          href: '/manage/user',
          icon: 'fas fa-user-edit',
        },
        {
          title: 'Course Management',
          href: '/manage/course',
          icon: 'fas fa-school',
        },
      ],
    },
    {
      title: 'Account',
      links: [
        {
          title: 'Notifications',
          href: '/notifications',
          icon: 'fas fa-bell',
        },
        {
          title: 'Conversations',
          href: '/conversations',
          icon: 'fas fa-comment-dots',
        },
        {
          title: 'Settings',
          href: '/settings',
          icon: 'fas fa-cog',
        },
      ],
    });
  }

  if (error) {
    console.log(error);
  }

  return (
    <Navbar className="navbar-vertical fixed-left adaptive-navbar" expand="md">
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Brand>
          <a href="/">
            <img
              alt="..."
              src="/logo.svg"
              className="navbar-brand-img mx-auto"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Collapse>
          {
            navigations.map((navigation: any, index: number) => (
              <Fragment key={navigation.title}>
                {
                  console.log(navigation)
                }
                {
                  navigation.title && <h6 className="navbar-heading">{ navigation.title }</h6>
                }
                <ul className={`navbar-nav ${navigation.title ? 'mb-md-4' : ''}`}>
                  {
                    navigation.links.map((link: any, i: number) => <NavItem key={`navitem-${i}`} link={link} />)
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
                <a href="#" className="dropdown-item">Logout</a>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SideNav;
