import * as React from 'react';
import { NextPage } from 'next';
import Root from '../components/root-layout/Root';
import ConversationLayout from '../components/ConversationLayout';

const ConversationPage: NextPage = () => (
  <Root>
    <ConversationLayout />
  </Root>
);

export default ConversationPage;
