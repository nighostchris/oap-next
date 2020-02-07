import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from './global/Card';

const GET_DASHBOARD_DATA = gql`
  query getDashboardData {
    users(where: {
      enrolled_courses: {
        section: { course: { semester_id: { _eq: "1" } } }
      },
      itsc: {
        _eq: "kristopher"
      }
    }) {
      enrolled_courses {
        section {
          name
          course {
            name
            code
            assignments {
              name
              course {
                code
              }
            }
          }
        }
      }
    }
  }
`;

const Dashboard: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
  const assignmentLists: any[] = [];
  const courseLists: any[] = [];

  if (!loading) {
    data.users[0].enrolled_courses.forEach((e: any) => {
      courseLists.push(e.section);
      e.section.course.assignments.forEach((e1: any) => {
        assignmentLists.push(e1);
      });
    });

    courseLists.sort((a, b) => {
      return a.course.code.localeCompare(b.course.code);
    });
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div style={{ padding: '30px' }}>
            <h1>Courses</h1>
            <div className="card-row">
              {
                courseLists.map((d, index) => (
                  <Card
                    key={`dashboard-course-card-${index}`}
                    type="team"
                    title={`${d.course.code}`}
                    link="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                    content={`${d.course.name}`}
                    teamfooter={d.name}
                  />
                ))
              }
            </div>
            <h1>Assignments</h1>
            <div className="card-row">
              {
                assignmentLists.map((d, index) => (
                  <Card
                    key={`dashboard-assignment-card-${index}`}
                    type="footer"
                    title={d.name}
                    content={d.course.code}
                    footer={`Due Date: 2020-07-15`}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
