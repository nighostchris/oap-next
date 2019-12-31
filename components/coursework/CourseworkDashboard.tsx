import * as React from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../global/PageHeader';
import SubmissionTab from './SubmissionTab';
import AnnouncementTab from './AnnouncementTab';
import GradeTab from './GradeTab';
import SettingsTab from './SettingsTab';

const CourseworkDashboard: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseworkid, courseworktab } = router.query;
  const rootUrl = `/coursework/${courseworkid}`;

  const pageHeaderProps: any = {
    pretitle: 'COMP 1021',
    title: 'Assignment 1 - Tic Tac Toe',
    tabTitle: ['Announcements', 'Submissions', 'Grade', 'Settings'],
  };
  pageHeaderProps.avatar = <span className="avatar-title rounded-circle bg-dark text-primary"><span className={`fas fa-${pageHeaderProps.title.includes('Lab') ? 'flask' : 'laptop-code'}`} style={{ fontSize: '60px' }} /></span>;

  const activeTab = (tab: string | string[]) => {
    switch (tab) {
      case 'announcements':
        return 0;
      case 'submissions':
        return 1;
      case 'grade':
        return 2;
      case 'settings':
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
        active={Number(activeTab(courseworktab))}
      />
      { courseworktab === 'announcements' && <AnnouncementTab /> }
      { courseworktab === 'submissions' && <SubmissionTab /> }
      { courseworktab === 'grade' && <GradeTab /> }
      { courseworktab === 'settings' && <SettingsTab /> }
    </>
  );
};

export default CourseworkDashboard;
