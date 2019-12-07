import * as React from 'react';
import { styled } from 'baseui';
import { Display4 } from 'baseui/typography';
import Card from './global/Card';

const CardContainer = styled('div', {
  paddingTop: '40px',
  paddingLeft: '60px',
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
  '@media (min-width: 320px) and (max-width: 480px)': {
    padding: '0',
    height: 'calc(100% - 64px)',
  },
});

const CardRow = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '40px',
  flexDirection: 'row',
  '@media (min-width: 320px) and (max-width: 480px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const StyledDisplay4 = styled(Display4, {
  fontSize: '30px',
  '@media (min-width: 320px) and (max-width: 480px)': {
    marginTop: '20px',
    textAlign: 'center',
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
  title: 'Bank System Design',
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
          <Card
            key={`${d.code}-${index}`}
            type="team"
            title={`COMP ${d.code} ${d.title}`}
            link="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
            content={`${d.section} - ${d.instructor}`}
            teamfooter=" Updated 2hr ago"
          />
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
          <Card
            key={`${d.code}-${index}`}
            type="footer"
            title={`Assignment ${d.number} ${d.title}`}
            content={`COMP ${d.code}`}
            footer={`Due Date: ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}`}
          />
        ))
      }
    </CardRow>
  </CardContainer>
);

export default Dashboard;
