import * as React from 'react';
import { NextPage } from 'next';
import Root from '../components/root-layout/Root';
import Dashboard from '../components/Dashboard';

const DashboardPage: NextPage = () => (
  <Root>
    <Dashboard />
  </Root>
);

export default DashboardPage;
