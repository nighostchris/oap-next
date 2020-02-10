import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import CourseworksTab from '../../../../components/course/CourseworksTab';

const CourseCourseworksPage: NextPage = () => (
  <Root>
    <CourseworksTab />
  </Root>
);

export default CourseCourseworksPage;
