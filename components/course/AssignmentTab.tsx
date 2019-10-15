import * as React from 'react'
import { styled } from 'baseui'
import { Button } from 'baseui/button'
import { useRouter } from 'next/router'
import { Label1, Label3, Label4 } from 'baseui/typography'
import { Assignment } from 'styled-icons/material/Assignment'
import { AssignmentLate } from 'styled-icons/material/AssignmentLate'
import { AssignmentTurnedIn } from 'styled-icons/material/AssignmentTurnedIn'
import Link from 'next/link'

const SubmitButton = styled(Button, {
  width: '150px',
  marginLeft: 'auto !important',
  marginRight: '40px !important',
  fontWeight: "bolder",
  fontSize: '14px !important',
  padding: '5px !important',
  borderRadius: '5px !important',
});

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  padding: '20px 0',
  overflowY: 'scroll',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#90a4ae',
  border: '1px solid #607d8b',
  height: 'calc(100% - 118px)',
  //borderTop: 'unset',
  borderTopRightRadius: '5px !important',  
  borderBottomLeftRadius: '5px !important',
  borderBottomRightRadius: '5px !important',
  "::-webkit-scrollbar": {
    width: ".8rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundClip: "padding-box",
    border: "2px solid transparent",
    borderRadius: ".8rem",
    backgroundColor: "rgba(128, 128, 128, .7)",
    boxShadow: "inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)",
  },
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
  dueDate: new Date(2019, 9, 20, 23, 59, 59),
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
    <Container>
      <CourseTitle>{String(courseid).toUpperCase()}</CourseTitle>
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
                <SubmitButton
                  overrides={{
                    BaseButton: {
                      style: {
                        backgroundColor: '#4caf50',
                      }
                    }
                  }}
                >
                  Submit
                </SubmitButton>
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
                <SubmitButton
                  overrides={{
                    BaseButton: {
                      style: {
                        backgroundColor: '#2196f3',
                      }
                    }
                  }}
                >
                  View Submission
                </SubmitButton>
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
                <SubmitButton
                  overrides={{
                    BaseButton: {
                      style: {
                        backgroundColor: '#d32f2f',
                      }
                    }
                  }}
                >
                  View Submission
                </SubmitButton>
              </Link>
            </AssignmentContainer>
          ))
        }
      </SubContainer>
    </Container>
  )
}

export default AssignmentTab
