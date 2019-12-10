import * as React from 'react';
import { NextPage } from 'next';
import Root from '../../components/root-layout/Root';
import SubmissionReport from '../../components/SubmissionReport';

const Submission: NextPage = () => (
  <Root>
    <SubmissionReport />
  </Root>
);

export default Submission;
