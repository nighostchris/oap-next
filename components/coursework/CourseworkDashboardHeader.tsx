import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import PageHeader from '../global/PageHeader';

interface CourseworkDashboardHeaderProps {
  activeTab: number
}

const GET_COURSEWORK_HEADER_DATA = gql`
  query getCourseworkHeaderData($id: bigint!) {
    assignments(where: {id: {_eq: $id}}) {
      name
      course {
        code
      }
    }
  }
`;

const CourseworkDashboardHeader: React.FunctionComponent<CourseworkDashboardHeaderProps> = ({ activeTab }) => {
  const router = useRouter();
  const { courseworkid } = router.query;
  const rootUrl = `/coursework/${courseworkid}`;
  const { loading, error, data } = useQuery(GET_COURSEWORK_HEADER_DATA, {
    variables: { id: courseworkid }
  });

  const pageHeaderProps = {
    pretitle: '',
    title: '',
    avatar: <img alt="" src="" className="avatar-img rounded-circle border border-4 border-card" />,
    tabTitle: ['Announcements', 'Submissions', 'Grades', 'Settings']
  };

  if (error) {
    console.log(error);
  }

  if (!loading) {
    pageHeaderProps['pretitle'] = data.assignments[0].course.code;
    pageHeaderProps['title'] = data.assignments[0].name;
    pageHeaderProps['avatar'] = <span className="avatar-title rounded-circle bg-dark text-primary"><span className={`fas fa-${pageHeaderProps.title.includes('Lab') ? 'flask' : 'laptop-code'}`} style={{ fontSize: '60px' }} /></span>;
    pageHeaderProps['tabTitle'] = ['Announcements', 'Submissions', 'Grades', 'Settings'];
  }

  return (
    <PageHeader
      pretitle={pageHeaderProps.pretitle}
      title={pageHeaderProps.title}
      avatar={pageHeaderProps.avatar}
      tabTitle={pageHeaderProps.tabTitle}
      rootUrl={rootUrl}
      active={activeTab}
    />
  );
};

export default CourseworkDashboardHeader;
