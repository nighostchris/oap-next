import * as React from 'react';
import Link from 'next/link';
import { styled } from 'baseui';
import { Card } from 'baseui/card';
import { Display4, Label1, Label2 } from 'baseui/typography';

const Title = styled('h1', ({ $theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '26px',
  marginBottom: '8px',
  ':hover': {
    cursor: 'pointer',
  },
  color: $theme.colors.accent50,
}));

const CardRow = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '40px',
});

const StyledCard = styled(Card, {
  width: '250px',
  border: 'unset',
  margin: '25px 0px',
  backgroundColor: '#e0e0e0',
  boxShadow: 'rgb(0, 0, 0, 0.5) 0px 1px 4px',
});

const StyledLabel1 = styled(Label1, {
  color: '#757575 !important',
  fontWeight: 600,
});

const StyledLabel2 = styled(Label2, {
  color: '#757575 !important',
  fontWeight: 600,
});

const StyledDisplay4 = styled(Display4, {
  fontSize: '30px',
});

const CardContainer = styled('div', {
  paddingTop: '40px',
  paddingLeft: '80px',
  overflowY: 'auto',
  height: 'calc(100% - 104px)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    borderRadius: '.8rem',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const courses = [{
  code: '1021',
  title: 'Introduction to Computer Science',
  section: 'L1',
  instructor: 'LAM, Gibson',
},
{
  code: '2011',
  title: 'Programming with C++',
  section: 'L2',
  instructor: 'Li, Xin',
},
{
  code: '2012',
  title: 'Object-Oriented Programming and Data Structures',
  section: 'L2',
  instructor: 'Tsoi, Yau Chat',
},
{
  code: '3021',
  title: 'Java Programming',
  section: 'L1',
  instructor: 'Cheung, Shing Chi',
}];

const assignments = [{
  code: '2012',
  number: '1',
  title: 'Tic Tac Toe',
  dueDate: new Date(2019, 9, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  dueDate: new Date(2019, 10, 15),
}];

const Dashboard: React.FunctionComponent = () => (
  <CardContainer>
    <StyledDisplay4
      overrides={{
        Block: {
          style: ({ $theme }) => ({
            color: $theme.colors.accent,
          }),
        },
      }}
    >
      Courses
    </StyledDisplay4>
    <CardRow>
      {
        courses.map((d, index) => (
          <StyledCard
            key={`${d.code}-${index}`}
            overrides={{
              Root: {
                style: {
                  marginRight: index + 1 !== courses.length ? '40px' : '0',
                },
              },
            }}
          >
            <Link href={`/course/comp${d.code}`}>
              <Title>{`COMP ${d.code} ${d.title}`}</Title>
            </Link>
            <StyledLabel1>
              {d.section}
            </StyledLabel1>
            <StyledLabel2>
              {d.instructor}
            </StyledLabel2>
          </StyledCard>
        ))
      }
    </CardRow>
    <StyledDisplay4
      overrides={{
        Block: {
          style: ({ $theme }) => ({
            color: $theme.colors.accent,
          }),
        },
      }}
    >
      Assignments
    </StyledDisplay4>
    <CardRow>
      {
        assignments.map((d, index) => (
          <StyledCard
            key={`${d.code}-${index}`}
            overrides={{
              Root: {
                style: {
                  marginRight: index + 1 !== assignments.length ? '40px' : '0',
                },
              },
            }}
          >
            <Link href={`/assignment/${d.number}`}>
              <Title>{`Assignment ${d.number} ${d.title}`}</Title>
            </Link>
            <StyledLabel1>
              {`COMP ${d.code}`}
            </StyledLabel1>
            <StyledLabel2>
              {`
                Due Date:
                  ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}
              `}
            </StyledLabel2>
          </StyledCard>
        ))
      }
    </CardRow>
  </CardContainer>
);

export default Dashboard;
