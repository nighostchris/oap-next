import * as React from 'react';
import { styled } from 'baseui';
import {
  Label2,
} from 'baseui/typography';

const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 64px)',
  /*
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  }, */
});

const InnerWrapper = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
});

const TestWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
});

const SubmissionReport: React.FunctionComponent = () => {
  return (
    <Root>
      <InnerWrapper>
        <TestWrapper>
          <Header>
            <Label2>Test 4 non leap year</Label2>
          </Header>
        </TestWrapper>
      </InnerWrapper>
    </Root>
  );
};

export default SubmissionReport;
