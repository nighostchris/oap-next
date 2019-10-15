import * as React from 'react'
// import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import AssignmentDashboard from '../../components/AssignmentDashboard'

const Course: React.FunctionComponent = () => {
  // const router = useRouter();
  // const { courseid, assignmentid } = router.query;
  // console.log(router.query);

  return (
    <Layout>
      <AssignmentDashboard />
    </Layout>
  );
}

export default Course;
