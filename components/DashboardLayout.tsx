import * as React from 'react'
import Link from 'next/link';
import { styled } from 'baseui'
import { Card } from 'baseui/card'
import { Display4, Label1, Label2 } from 'baseui/typography'

const Title = styled('h1', {
  color: '#1565c0',
  fontSize: '20px',
  fontWeight: 'bold',
  lineHeight: '26px',
  marginBottom: '8px',
  ':hover': {
    cursor: 'pointer',
  },
});

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
  fontWeight: 900,
})

const StyledDisplay4 = styled(Display4, {
  fontSize: '30px',
})

const CardContainer = styled('div', {
  marginTop: '20px',
  marginLeft: '80px',
})

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
}]

const DashboardLayout: React.FunctionComponent = () => {
  return (
    <CardContainer>
      <StyledDisplay4>Courses</StyledDisplay4>
      <CardRow>
        {
          courses.map((d, index) => (
            <StyledCard key={`${d.code}-${index}`}
              overrides={{ Root: { style: {
                marginRight: index + 1 !== courses.length ? '40px' : '0'
              }}}}
            >
              <Link href={`/courses/comp${d.code}`}>
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
      <StyledDisplay4>Assignments</StyledDisplay4>
      <CardRow>
        {
          assignments.map((d, index) => (
            <StyledCard key={`${d.code}-${index}`}
              overrides={{ Root: { style: {
                marginRight: index + 1 !== assignments.length ? '40px' : '0'
              }}}}
            >
              <Link href="/comp2012">
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
  )
}

export default DashboardLayout
