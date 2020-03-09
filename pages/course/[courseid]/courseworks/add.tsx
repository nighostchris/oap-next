import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../../components/root-layout/Root';
import AddAssignmentController from '../../../../components/coursework/add/AddAssignmentController';

const Course: NextPage = () => {
  return (
    <Root>
      <AddAssignmentController />
    </Root>
  );
};

export default Course;
