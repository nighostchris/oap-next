import * as React from 'react'
import Layout from '../../components/Layout'
import AssignmentDashboard from '../../components/AssignmentDashboard'

const Course: React.FunctionComponent = () => {
  return (
    <Layout>
      <AssignmentDashboard />
    </Layout>
  );
}

export default Course;
