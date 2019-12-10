import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import CourseDashboard from '../../../components/course/CourseDashboard';

const Course: NextPage = () => (
  <Root>
    <CourseDashboard />
  </Root>
);

export default Course;
