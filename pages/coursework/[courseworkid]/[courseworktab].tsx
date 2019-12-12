import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import CourseworkDashboard from '../../../components/coursework/CourseworkDashboard';

const Course: NextPage = () => (
  <Root>
    <CourseworkDashboard />
  </Root>
);

export default Course;
