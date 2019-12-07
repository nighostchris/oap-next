import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/root-layout/Root';
import Dashboard from '../components/Dashboard';

const DashboardPage: NextPage = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

export default DashboardPage;
