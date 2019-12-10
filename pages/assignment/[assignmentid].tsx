import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import AssignmentDashboard from '../../components/AssignmentDashboard';

const Course: NextPage = () => (
  <Root>
    <AssignmentDashboard />
  </Root>
);

export default Course;
