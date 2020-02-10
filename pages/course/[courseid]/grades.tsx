import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import GradesTab from '../../../components/course/GradesTab';

const CourseGradesPage: NextPage = () => (
  <Root>
    <GradesTab />
  </Root>
);

export default CourseGradesPage;
