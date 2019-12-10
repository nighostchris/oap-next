import * as React from 'react';
import { NextPage } from 'next';
import Root from '../components/root-layout/Root';
import ChatroomLayout from '../components/ChatroomLayout';

const ConversationPage: NextPage = () => (
  <Root>
    <ChatroomLayout />
  </Root>
);

export default ConversationPage;
