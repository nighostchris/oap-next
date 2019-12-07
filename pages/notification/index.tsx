import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/root-layout/Root';
import NotificationLayout from '../../components/notification/NotificationLayout';

const NotificationPage: NextPage = () => (
  <Layout>
    <NotificationLayout />
  </Layout>
);

export default NotificationPage;
