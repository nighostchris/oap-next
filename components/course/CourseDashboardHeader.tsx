import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import PageHeader from '../global/PageHeader';

interface CourseDashboardHeaderProps {
  activeTab: number
}

const GET_COURSE_HEADER_DATA = gql`
  query getCourseHeaderData($code: String!) {
    courses(where: {code: {_eq: $code}}) {
      code
      name
      created_at
      sections(where: {students: {user: {itsc: {_eq: "kristopher"}}}}) {
        name
      }
    }
  }
`;

const CourseDashboardHeader: React.FunctionComponent<CourseDashboardHeaderProps> = ({ activeTab }) => {
  const router = useRouter();
  const { courseid } = router.query;
  const rootUrl = `/course/${courseid}`;
  const { loading, error, data } = useQuery(GET_COURSE_HEADER_DATA, {
    variables: { code: String(courseid).toUpperCase() }
  });

  const pageHeaderProps = {
    pretitle: '',
    title: '',
    avatar: <img alt="" src="" className="avatar-img rounded-circle border border-4 border-card" />,
    tabTitle: ['Announcements', 'Courseworks', 'Grades']
  };

  if (error) {
    console.log(error);
  }

  if (!loading) {
    pageHeaderProps['pretitle'] = 'Desmond Tsoi';
    pageHeaderProps['title'] = `${data.courses[0].code} - ${data.courses[0].name}`;
    pageHeaderProps['avatar'] = <img alt="" src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg" className="avatar-img rounded-circle border border-4 border-card" />;
    pageHeaderProps['tabTitle'] = ['Announcements', 'Courseworks', 'Grades'];
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

export default CourseDashboardHeader;
