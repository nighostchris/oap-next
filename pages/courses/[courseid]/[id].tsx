import * as React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'

const Course: React.FunctionComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);

  return (
    <Layout>
      <p>Course: {id}</p>
    </Layout>
  );
}

export default Course;
