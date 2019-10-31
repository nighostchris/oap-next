import * as React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import ChatroomLayout from '../components/ChatroomLayout';

const ConversationPage: NextPage = () => (
  <Layout>
    <ChatroomLayout />
  </Layout>
);

export default ConversationPage;
