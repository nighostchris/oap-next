import * as React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../global/PageHeader';
import CourseworkTab from './CourseworkTab';
import GradeTab from './GradeTab';
import AnnouncementTab from './AnnouncementTab';

const listItem = [
  {
    content: {
      title: 'Assignment 1 - Tic Tac Toe',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
      id: 1,
    },
    avatar: {
      type: 'icon',
      src: 'fe fe-pie-chart',
    },
  },
  {
    content: {
      title: 'Assignment 2 - Bank System',
      subtitle: 'Released by Desmond Tsoi on Dec 9, 2019',
      button: {
        title: 'Download',
        link: '',
      },
      link: 2,
    },
    avatar: {
      type: 'img',
      src: 'https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg',
    },
  },
];

const pageHeaderProps = {
  pretitle: 'Desmond Tsoi - L2',
  title: 'COMP1021 - Introduction to Computer Science',
  avatar: '<img alt="" src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg" class="avatar-img rounded-circle border border-4 border-card">',
  tabTitle: ['Announcements', 'Assignments', 'Labs', 'Grades'],
};

const CourseDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid, coursetab } = router.query;
  const rootUrl = `/course/${courseid}`;

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
      { coursetab === 'announcements' && <AnnouncementTab /> }
      { coursetab === 'assignments' && <CourseworkTab title="Assignments" coursework={listItem} /> }
      { coursetab === 'labs' && <CourseworkTab title="Labs" coursework={listItem} /> }
      { coursetab === 'grades' && <GradeTab /> }
    </>
  );
};

export default CourseDashboard;
