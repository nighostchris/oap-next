import * as React from 'react'
// import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import CourseDashboard from '../../components/CourseDashboard';

const Course: React.FunctionComponent = () => {
  // const router = useRouter();
  // const { courseid } = router.query;

  return (
    <Layout>
      <CourseDashboard />
    </Layout>
  );
}

export default Course;
