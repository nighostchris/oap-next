import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/root-layout/Root';
import ChatroomLayout from '../components/ChatroomLayout';

const ConversationPage: NextPage = () => (
  <Layout>
    <ChatroomLayout />
  </Layout>
);

export default ConversationPage;
