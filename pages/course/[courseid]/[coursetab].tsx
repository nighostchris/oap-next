import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../../components/root-layout/Root';
import CourseDashboard from '../../../components/course/CourseDashboard';

const Course: NextPage = () => (
  <Layout>
    <CourseDashboard />
  </Layout>
);

export default Course;
