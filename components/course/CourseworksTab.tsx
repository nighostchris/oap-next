import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '../global/Card';
import CourseDashboardHeader from './CourseDashboardHeader';
import timestampConverter from '../../utilities/timestampConverter';

const GET_COURSEWORKTAB_DATA = gql`
  query getCourseData($code: String!) {
    courses(where: {code: {_eq: $code}}) {
      assignments {
        id
        name
        created_at
      }
    }
  }
`;

const CourseworksTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;
  const { loading, error, data } = useQuery(GET_COURSEWORKTAB_DATA, {
    variables: { code: String(courseid).toUpperCase() }
  });
  const listItem: any[] = [];

  if(!error) {
    console.log(error);
  }

  if (!loading) {
    data.courses[0].assignments.forEach((assignment: any) => {
      listItem.push({
        content: {
          title: assignment.name,
          subtitle: `Released by Desmond Tsoi on ${timestampConverter(new Date(assignment.created_at), false)}`,
          button: {
            title: 'Download',
            link: '',
          },
          link: `/coursework/${assignment.id}/announcements`,
        },
        avatar: <span className="avatar-title rounded bg-white text-secondary"><span className="fas fa-flask" style={{ fontSize: '32px' }} /></span>,
      });
    });
  }

  return (
    <>
      <CourseDashboardHeader activeTab={1} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Button href="courseworks/add" variant="primary" block className="mb-5">New Coursework</Button>
            <Card
              type="list"
              title="Courseworks"
              listItem={listItem}
              sortable
              searchable
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseworksTab;
