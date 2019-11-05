import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import NotificationLayout from '../../components/notification/NotificationLayout';

const NotificationPage: NextPage = () => (
  <Layout>
    <NotificationLayout />
  </Layout>
);

export default NotificationPage;
