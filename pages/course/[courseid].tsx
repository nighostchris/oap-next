import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/root-layout/Root';
import TabController from '../../components/course/TabController';

const Course: NextPage = () => (
  <Layout>
    <TabController />
  </Layout>
);

export default Course;
