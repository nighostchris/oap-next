import * as React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../global/PageHeader';
import AssignmentTab from './AssignmentsTab';
import GradeTab from './GradeTab';
import AnnounceTab from './AnnounceTab';

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
      { coursetab === 'assignments' && <AssignmentTab /> }
      { coursetab === 'announcements' && <AnnounceTab /> }
      { coursetab === 'grades' && <GradeTab /> }
    </>
  );
};

export default CourseDashboard;
