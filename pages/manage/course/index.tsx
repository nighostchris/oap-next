import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import CourseManage from '../../../components/manage/CourseManage';

const CourseManagePage: NextPage = () => (
  <Root>
    <CourseManage />
  </Root>
);

export default CourseManagePage;
