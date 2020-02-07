import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import PageHeader from '../global/PageHeader';
import CourseworkTab from './CourseworkTab';
import AnnouncementTab from './AnnouncementTab';
import GradeTab from './GradeTab';
import timestampConverter from '../../utilities/timestampConverter';

const listItem = [
  {
    content: {
      title: 'Assignment 1 - Tic Tac Toe',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
      link: '/coursework/1/announcements',
    },
    avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-flask" style={{ fontSize: '32px' }} /></span>,
  },
  {
    content: {
      title: 'Assignment 2 - Bank System',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
      link: '/coursework/2/announcements',
    },
    avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-file-code" style={{ fontSize: '32px' }} /></span>,
  },
];

const GET_COURSE_DATA = gql`
  query getCourseData($code: String!) {
    courses(where: {code: {_eq: $code}}) {
      code
      name
      assignments {
        name
      }
      created_at
      sections(where: {students: {user: {itsc: {_eq: "kristopher"}}}}) {
        name
      }
    }
  }
`;

const CourseDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid, coursetab } = router.query;
  const rootUrl = `/course/${courseid}`;
  const { loading, error, data } = useQuery(GET_COURSE_DATA, {
    variables: { code: String(courseid).toUpperCase() }
  });

  const infoList = [];
  const pageHeaderProps = {
    pretitle: '',
    title: '',
    avatar: <img alt="" src="" className="avatar-img rounded-circle border border-4 border-card" />,
    tabTitle: ['Announcements', 'Assignments', 'Labs', 'Grades']
  };

  if (!loading) {
    infoList.push({
      category: 'Assignments',
      value: String(data.courses[0].assignments.length),
    }, {
      category: 'Created',
      value: timestampConverter(new Date(data.courses[0].created_at), false),
    });

    pageHeaderProps['pretitle'] = 'Desmond Tsoi';
    pageHeaderProps['title'] = `${data.courses[0].code} - ${data.courses[0].name}`;
    pageHeaderProps['avatar'] = <img alt="" src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg" className="avatar-img rounded-circle border border-4 border-card" />;
    pageHeaderProps['tabTitle'] = ['Announcements', 'Assignments', 'Labs', 'Grades'];
  }

  if (error) {
    console.log(error);
  }

  const activeTab = (tab: string | string[]) => {
    switch (tab) {
      case 'announcements':
        return 0;
      case 'assignments':
        return 1;
      case 'labs':
        return 2;
      case 'grades':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <>
      <PageHeader
        pretitle={pageHeaderProps.pretitle}
        title={pageHeaderProps.title}
        avatar={pageHeaderProps.avatar}
        tabTitle={pageHeaderProps.tabTitle}
        rootUrl={rootUrl}
        active={Number(activeTab(coursetab))}
      />
      { coursetab === 'announcements' && <AnnouncementTab infoList={infoList} /> }
      { coursetab === 'assignments' && <CourseworkTab title="Assignments" coursework={listItem} /> }
      { coursetab === 'labs' && <CourseworkTab title="Labs" coursework={listItem} /> }
      { coursetab === 'grades' && <GradeTab />}
    </>
  );
};

export default CourseDashboard;
