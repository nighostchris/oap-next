import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import SubmissionReport from '../../components/SubmissionReport';

const Submission: NextPage = () => (
  <Layout>
    <SubmissionReport />
  </Layout>
);

export default Submission;
