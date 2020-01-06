import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import TestCaseBoard from '../../../components/test-case/TestCaseBoard';

const Course: NextPage = () => (
  <Root>
    <TestCaseBoard />
  </Root>
);

export default Course;
