import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import AssignmentDashboard from '../../components/AssignmentDashboard';

const Course: NextPage = () => (
  <Layout>
    <AssignmentDashboard />
  </Layout>
);

export default Course;
