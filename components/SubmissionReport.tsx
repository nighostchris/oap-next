import * as React from 'react';
import { styled } from 'baseui';
import {
  H6, Label2, Label3,
} from 'baseui/typography';
import Router, { useRouter } from 'next/router';
import { Select } from 'baseui/select';

const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 64px)',
});

const InnerWrapper = styled('div', {
  width: '80%',
  display: 'flex',
  marginTop: '20px',
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
});

const Tag = styled(H6, {
  marginBlockStart: '0px',
  marginBlockEnd: '15px',
});

const Details = styled('div', {
  display: 'flex',
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
  flexDirection: 'column',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
  justifyContent: 'center',
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
});

const Score = styled(Label2, {
  width: '70px',
  height: '24px',
  borderRadius: '50px',
});

const Title = styled(Label2, {
  marginLeft: '20px',
});

const DetailsButtonWrapper = styled('div', {
  color: 'blue',
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  ':hover': {
    cursor: 'pointer',
  },
});

const Body = styled('div', {
  width: '90%',
  display: 'flex',
  marginTop: '20px',
  flexDirection: 'column',
});

const ErrorMessage = styled('div', {
  marginTop: '5px',
  lineHeight: '24px',
  paddingLeft: '10px',
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

const option = [
  { label: 'Version #1  2019-10-29 12:21:23PM', id: 1 },
  { label: 'Version #2  2019-10-29 12:25:26PM', id: 2 },
];

const SubmissionReport: React.FunctionComponent = () => {
  const router = useRouter();
  const { submissionid } = router.query;
  console.log(submissionid);

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

  const customSelectVersion = (v: any) => {
    Router.push(`/submission/${v[0].id}`);
  };

  return (
    <Root>
      <InnerWrapper>
        <Select
          options={option}
          value={[]}
          onChange={(params) => customSelectVersion(params.value)}
        />
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
            <TestWrapper
              key={`test-${i}`}
              style={{
                minHeight: details[i] ? '120px' : '40px',
              }}
            >
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
