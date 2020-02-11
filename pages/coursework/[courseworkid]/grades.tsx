import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../../components/root-layout/Root';
import GradesTab from '../../../components/coursework/GradesTab';

const CourseworkGradesPage: NextPage = () => (
  <Root>
    <GradesTab />
  </Root>
);

export default CourseworkGradesPage;
