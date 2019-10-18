import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';

const IndexPage: NextPage = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

export default IndexPage;
