import * as React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

const Course: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <Layout>
      <p>Course: {courseid}</p>
    </Layout>
  );
}

export default Course;
