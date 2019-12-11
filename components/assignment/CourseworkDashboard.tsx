import * as React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../global/PageHeader';
import AnnouncementTab from './AnnouncementTab';

const CourseworkDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseworkid, courseworktab } = router.query;
  const rootUrl = `/coursework/${courseworkid}`;

  const pageHeaderProps = {
    pretitle: 'COMP 1021',
    title: 'Assignment 1 - Tic Tac Toe',
    avatar: '<span class="avatar-title rounded-circle bg-dark text-primary"><span class="fas fa-flask" style="font-size: 60px" /></span>',
    tabTitle: ['Announcements', 'Submissions', 'Grade'],
  };

  const activeTab = (tab: string | string[]) => {
    switch (tab) {
      case 'announcements':
        return 0;
      case 'submissions':
        return 1;
      case 'grade':
        return 2;
      default:
        return 0;
    }
  };

  /*
    { coursetab === 'submissions' && <CourseworkTab title="Assignments" coursework={listItem} /> }
    { coursetab === 'grade' && <CourseworkTab title="Labs" coursework={listItem} /> }
  */
  return (
    <>
      <PageHeader
        pretitle={pageHeaderProps.pretitle}
        title={pageHeaderProps.title}
        avatar={pageHeaderProps.avatar}
        tabTitle={pageHeaderProps.tabTitle}
        rootUrl={rootUrl}
        active={Number(activeTab(courseworktab))}
      />
      { courseworktab === 'announcements' && <AnnouncementTab /> }
    </>
  );
};

export default CourseworkDashboard;
