import * as React from 'react';
import { Row, Badge } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '../global/Card';
import CourseworkDashboardHeader from './CourseworkDashboardHeader';

const submissionDetails = [
  { category: 'Submission Time', value: '2019-10-29 12:21:23PM' },
  { category: 'Late', value: '0 Days' },
  { category: 'Grading Time', value: '3.7s' },
];

const testDetails = [
  {
    title: 'Checking for xxx', mark: 7, full: 7, description: 'Just a function checking for xxx.',
  },
  {
    title: 'Checking for yyy', mark: 8, full: 10, error: 'expected 1, but got 5.',
  },
  {
    title: 'Checking for zzz', mark: 23, full: 25, description: 'Just a function checking for zzz.', error: 'memory leakage detected.',
  },
];

const GET_GRADES_TAB_DATA = gql`
  query getGradesTabData($id: bigint!) {
    assignments(where: {id: {_eq: $id}}) {
      name
      course {
        code
      }
    }
  }
`;

const GradesTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseworkid } = router.query;
  const { loading, error, data } = useQuery(GET_GRADES_TAB_DATA, {
    variables: { id: courseworkid }
  });
  const assignmentDetails = [];

  if (error) {
    console.log(error);
  }

  if (!loading) {
    assignmentDetails.push({
      category: 'Course Code',
      value: data.assignments[0].course.code
    }, {
      category: '# and Name',
      value: data.assignments[0].name
    });
  }
  
  return(
    <>
      <CourseworkDashboardHeader activeTab={2} />
      <div className="container-fluid">
        <Row>
          <div className="col-12 col-xl-6">
            <Card
              type="info"
              title="Assignment Details"
              infoList={assignmentDetails}
            />
          </div>
          <div className="col-12 col-xl-6">
            <Card
              type="info"
              title="Submission Details"
              infoList={submissionDetails}
            />
          </div>
        </Row>
        <Row>
          <div className="col-12 col-xl-12">
            <h2 className="card-title mx-3 mb-4">Result</h2>
            {
              testDetails.map((test, index) => (
                <div className="card mx-2" key={`test-details-${index}`}>
                  <div className="card-body p-3 ml-3">
                    <h3 className="mb-0">
                      {`Test ${index + 1} - ${test.title}`}
                      <Badge
                        variant={test.mark < test.full ? 'danger' : 'success'}
                        className="ml-4"
                        style={{ verticalAlign: 'none', fontSize: '85%' }}
                      >
                        {`${test.mark} / ${test.full}`}
                      </Badge>
                    </h3>
                    <p className="card-text">{test.description && test.description}</p>
                  </div>
                  {
                    test.error
                      && (
                        <div className="card-footer bg-dark">
                          <p style={{ marginBottom: 0, color: 'white' }}>
                            {`Error: ${test.error}`}
                          </p>
                        </div>
                      )
                  }
                </div>
              ))
            }
          </div>
        </Row>
      </div>
    </>
  );
};

export default GradesTab;
