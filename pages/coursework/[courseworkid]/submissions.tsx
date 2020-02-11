import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import SubmissionsTab from '../../../components/coursework/SubmissionsTab';

const CourseworkSubmissionsPage: NextPage = () => (
  <Root>
    <SubmissionsTab />
  </Root>
);

export default CourseworkSubmissionsPage;
