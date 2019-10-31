import * as React from 'react';
import { styled } from 'baseui';
import {
  H6, Label2, Label3,
} from 'baseui/typography';

const Root = styled('div', {
  display: 'flex',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 64px)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const InnerWrapper = styled('div', {
  width: '80%',
  display: 'flex',
  margin: '20px 0',
  background: 'white',
  borderRadius: '5px',
  padding: '20px 50px',
  flexDirection: 'column',
  boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
  '@media (min-width: 320px) and (max-width: 480px)': {
    padding: '20px',
  },
});

const Tag = styled(H6, {
  marginBlockStart: '0px',
  marginBlockEnd: '15px',
});

const Details = styled('div', {
  display: 'flex',
  padding: '10px',
  background: 'white',
  borderRadius: '5px',
  marginBottom: '20px',
  flexDirection: 'column',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
});

const TestWrapper = styled('div', {
  display: 'flex',
  borderRadius: '5px',
  background: 'white',
  alignItems: 'center',
  height: 'fit-content',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
  ':not(:last-child)': {
    marginBottom: '15px',
  },
});

const Header = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LeftHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const Score = styled(Label2, {
  minWidth: '70px',
  height: '24px',
  margin: '6px 0',
  borderRadius: '50px',
  '@media (min-width: 320px) and (max-width: 480px)': {
    height: '100%',
  },
});

const Title = styled(Label2, {
  marginLeft: '20px',
});

const DetailsButtonWrapper = styled('div', {
  color: 'blue',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'center',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  ':hover': {
    cursor: 'pointer',
  },
});

const Body = styled('div', {
  width: '90%',
  display: 'flex',
  margin: '20px 0',
  flexDirection: 'column',
});

const ErrorMessage = styled('div', {
  marginTop: '5px',
  padding: '0 10px',
  lineHeight: '24px',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
});

const data = [{
  marks: 15,
  full: 22,
  title: 'Total',
  message: '',
},
{
  marks: 7,
  full: 7,
  title: 'Test 1 Checking for palidrome',
  message: '',
},
{
  marks: 7,
  full: 7,
  title: 'Test 2 Checking style',
  message: 'Line is longer than 100 characters.',
},
{
  marks: 3,
  full: 8,
  title: 'Test 3 Checking number',
  message: 'expected: 123 but was: 124.',
}];

const SubmissionReport: React.FunctionComponent = () => {
  const [details, setDetails] = React.useState(Array(10).fill(false));

  const customSetDetails = (i: number) => {
    const temp = details;
    temp[i] = !temp[i];
    setDetails([...temp]);
  };

  const decideColor = (i: number, marks: number, full: number) => {
    if (marks === full) {
      return 'green';
    }
    if (i !== 0 && marks !== full) {
      return 'red';
    }

    return '#d89b22';
  };

  const decideShowHide = (i: number, gate: number) => {
    if (data[i].message === '') {
      return 'none';
    }
    if ((!details[i] && !gate) || (details[i] && gate)) {
      return 'unset';
    }

    return 'none';
  };

  return (
    <Root>
      <InnerWrapper>
        <Tag>Assignment Details</Tag>
        <Details>
          <Label2>Course Code: COMP2012</Label2>
          <Label2>Assignment #: 1</Label2>
          <Label2>Name: Tic Tac Toe</Label2>
        </Details>
        <Tag>Submission Details</Tag>
        <Details>
          <Label2>Submission Time: 2019-10-29 12:21:23PM</Label2>
          <Label2>Late: 0 Days</Label2>
          <Label2>Grading Time: 3.7s</Label2>
        </Details>
        <Tag>Result</Tag>
        {
          data.map((d, i) => (
            <TestWrapper key={`test-${i}`}>
              <Header>
                <LeftHeader>
                  <Score
                    overrides={{
                      Block: {
                        style: {
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          background: decideColor(i, d.marks, d.full),
                        },
                      },
                    }}
                  >
                    {`${d.marks} / ${d.full}`}
                  </Score>
                  <Title
                    overrides={{
                      Block: {
                        style: {
                          fontWeight: 'bold',
                        },
                      },
                    }}
                  >
                    {d.title}
                  </Title>
                </LeftHeader>
                <DetailsButtonWrapper
                  style={{ display: decideShowHide(i, 0) }}
                  onClick={() => customSetDetails(i)}
                >
                  Show Details
                </DetailsButtonWrapper>
                <DetailsButtonWrapper
                  style={{ display: decideShowHide(i, 1) }}
                  onClick={() => customSetDetails(i)}
                >
                  Hide Details
                </DetailsButtonWrapper>
              </Header>
              <Body style={{ display: details[i] ? 'unset' : 'none' }}>
                <Label3
                  overrides={{
                    Block: {
                      style: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                >
                  Error Message:
                </Label3>
                <ErrorMessage>
                  {d.message}
                </ErrorMessage>
              </Body>
            </TestWrapper>
          ))
        }
      </InnerWrapper>
    </Root>
  );
};

export default SubmissionReport;
