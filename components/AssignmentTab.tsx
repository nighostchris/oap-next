import * as React from 'react'
import { styled } from 'baseui'
import { Button } from 'baseui/button'
import { useRouter } from 'next/router'
import { Label1, Label3, Label4 } from 'baseui/typography'
import { Assignment } from 'styled-icons/material/Assignment'
import { AssignmentLate } from 'styled-icons/material/AssignmentLate'
import { AssignmentTurnedIn } from 'styled-icons/material/AssignmentTurnedIn'
import Link from 'next/link'

const Dashboard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 64px)',
});

const TabContainer = styled('div', {
  width: '100%',
  display: 'flex',
  marginBottom: '20px',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
});

const StyledButton = styled(Button, {
  padding: '8px',
  width: '200px',
  borderRadius: '5px !important',
  backgroundColor: '#9e9e9e !important',
});

const SubmitButton = styled(Button, {
  width: '150px',
  marginLeft: 'auto',
  marginRight: '40px',
  fontWeight: "bolder",
  fontSize: '14px !important',
  padding: '5px !important',
  borderRadius: '5px !important',
  backgroundColor: '#4caf50 !important',
});

const VSButton = styled(SubmitButton, {
  backgroundColor: '#2196f3 !important',
});

const LSButton = styled(SubmitButton, {
  backgroundColor: '#d32f2f !important',
});

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#eeeeee',
  border: '1px solid #bdbdbd',
  height: 'calc(100% - 208px)',
  padding: '20px 0',
  borderRadius: '5px !important',
});

const SubContainer = styled('div', {
  width: '90%',
  marginBottom: '20px',
  backgroundColor: '#e0e0e0',
  border: '1px solid #9e9e9e',
});

const AssignmentTag = styled(Label1, {
  width: '90%',
  marginBottom: '5px',
  fontWeight: "bolder",
});

const CourseTitle = styled(AssignmentTag, {
  fontSize: '22px',
  marginBottom: '20px !important',
});

const AssignmentContainer = styled('div', {
  display: 'flex',
  paddingLeft: '20px',
  flexDirection: 'row',
  alignItems: 'center',
  ':hover': {
    backgroundColor: '#bdbdbd',
  },
});

const AssignmentDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0 10px 20px',
});

const Title = styled(Label3, {
  fontWeight: "bolder",
  marginBottom: '5px',
  ':hover': {
    cursor: 'pointer',
  },
});

const assignments = [{
  code: '2012',
  number: '1',
  title: 'Tic Tac Toe',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
},
{
  code: '2012',
  number: '4',
  title: 'Tic Tac Toe 2',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
},
{
  code: '2012',
  number: '2',
  title: 'Bank System',
  submitted: false,
  dueDate: new Date(2019, 9, 15, 11, 59, 59),
},
{
  code: '2012',
  number: '3',
  title: 'Tic Tac Toe 3',
  submitted: false,
  dueDate: new Date(2019, 8, 16, 11, 59, 59),
}]

const AssignmentTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <Dashboard>
      <TabContainer>
        <StyledButton>Assignments</StyledButton>
        <Link href={`/courses/${courseid}/announcement`}>
          <StyledButton>Announcements</StyledButton>
        </Link>
        <StyledButton>Grades</StyledButton>
      </TabContainer>
      <CourseTitle>{String(courseid).toUpperCase()}</CourseTitle>
      <Container>
        <AssignmentTag>Upcoming</AssignmentTag>
        <SubContainer>
          {
            assignments.filter(a => a.dueDate > new Date() && !a.submitted).map((d, index) => (
              <AssignmentContainer key={`upcoming-${index}`}>
                <AssignmentTurnedIn size={26} />
                <AssignmentDetails>
                  <Title>{d.title}</Title>
                  <Label4>
                    {`
                      Due Date:
                      ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}
                    `}
                  </Label4>
                </AssignmentDetails>
                <Link href={`/assignment/${d.number}`}>
                  <SubmitButton>Submit</SubmitButton>
                </Link>
              </AssignmentContainer>
            ))
          }
        </SubContainer>
        <AssignmentTag>Submitted</AssignmentTag>
        <SubContainer>
          {
            assignments.filter(a => a.dueDate < new Date() && a.submitted).map((d, index) => (
              <AssignmentContainer key={`submitted-${index}`}>
                <AssignmentLate size={26} />
                <AssignmentDetails>
                  <Title>{d.title}</Title>
                  <Label4>
                    {`
                      Due Date:
                      ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}
                    `}
                  </Label4>
                </AssignmentDetails>
                <Link href={`/assignment/${d.number}`}>
                 <VSButton>View Submission</VSButton>
                </Link>
              </AssignmentContainer>
            ))
          }
        </SubContainer>
        <AssignmentTag>Late</AssignmentTag>
        <SubContainer>
          {
            assignments.filter(a => a.dueDate < new Date() && !a.submitted).map((d, index) => (
              <AssignmentContainer key={`late-${index}`}>
                <Assignment size={26} />
                <AssignmentDetails>
                  <Title color="red">{d.title}</Title>
                  <Label4>
                    {`
                      Due Date:
                      ${d.dueDate.getFullYear()}-${d.dueDate.getMonth() + 1}-${d.dueDate.getDate()}
                    `}
                  </Label4>
                </AssignmentDetails>
                <Link href={`/assignment/${d.number}`}>                
                  <LSButton>View Submission</LSButton>
                </Link>
              </AssignmentContainer>
            ))
          }
        </SubContainer>
      </Container>     
    </Dashboard>
  )
}

export default AssignmentTab
