import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../../components/root-layout/Root';
import NotiContainer from '../../components/notification/NotiContainer';

const Notification: NextPage = () => (
  <Layout>
    <NotiContainer />
  </Layout>
);

export default Notification;
