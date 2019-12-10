import * as React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../global/PageHeader';
import OverviewTab from './OverviewTab';
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
  tabTitle: ['Overview', 'Assignments', 'Labs', 'Announcements', 'Grades'],
};

const CourseDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid, coursetab } = router.query;
  const rootUrl = `/course/${courseid}`;

  const activeTab = (tab: string | string[]) => {
    switch (tab) {
      case 'overview':
        return 0;
      case 'assignments':
        return 1;
      case 'labs':
        return 2;
      case 'announcements':
        return 3;
      default:
        return 4;
    }
  };

  return (
    <>
      <PageHeader
        pretitle={pageHeaderProps.pretitle}
        title={pageHeaderProps.title}
        tabTitle={pageHeaderProps.tabTitle}
        rootUrl={rootUrl}
        active={Number(activeTab(coursetab))}
      />
      { coursetab === 'overview' && <OverviewTab /> }
      { coursetab === 'assignments' && <CourseworkTab title="Assignments" coursework={listItem} /> }
      { coursetab === 'labs' && <CourseworkTab title="Labs" coursework={listItem} /> }
      { coursetab === 'announcements' && <AnnouncementTab /> }
      { coursetab === 'grades' && <GradeTab /> }
    </>
  );
};

export default CourseDashboard;
