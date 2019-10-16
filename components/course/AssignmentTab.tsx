import * as React from 'react'
import { styled } from 'baseui'
import { useRouter } from 'next/router'
import printDate from '../../utils/helper'
import { Label1, Label3, Label4 } from 'baseui/typography'
import { Assignment } from 'styled-icons/material/Assignment'
import { AssignmentLate } from 'styled-icons/material/AssignmentLate'
import { AssignmentTurnedIn } from 'styled-icons/material/AssignmentTurnedIn'
import Link from 'next/link'

const Container = styled('div', {
  width: '90%',
  display: 'flex',
  padding: '20px 0',
  overflowY: 'auto',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#90a4ae',
  border: '1px solid #607d8b',
  height: 'calc(100% - 118px)',
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
  borderRadius: '10px',
  marginBottom: '20px',
});

const AssignmentTag = styled(Label1, {
  width: '90%',
  marginBottom: '10px',
});

const CourseTitle = styled(AssignmentTag, {
  fontSize: '22px',
  marginBottom: '20px !important',
});

const AssignmentContainer = styled('div', {
  display: 'flex',
  borderRadius: '10px',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#e0e0e0',
  ':hover': {
    backgroundColor: '#bdbdbd',
  },
  ':not(:last-child)': {
    marginBottom: '10px',
  },
});

const StyledATI = styled(AssignmentTurnedIn, {
  width: '15%',
  textAlign: 'center',
})

const StyledAL = styled(AssignmentLate, {
  width: '15%',
  textAlign: 'center',
})

const StyledA = styled(Assignment, {
  width: '15%',
  textAlign: 'center',
})

const AssignmentDetails = styled('div', {
  width: '25%',
  display: 'flex',
  margin: '10px 0',
  paddingLeft: '30px',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const SubChance = styled(Label3, {
  width: '50%',
  textAlign: 'center',
});

const SButton = styled('button', {
  width: '10%',
  padding: '8px',
  border: 'unset',
  fontSize: '14px',
  minWidth: '150px',
  marginLeft: 'auto',
  marginRight: '40px',
  borderRadius: '5px',
  fontWeight: "bolder",
});

const Title = styled(Label3, {
  marginBottom: '5px',
  ':hover': {
    cursor: 'pointer',
  },
});

const Breakline = styled('div', {
  width: '100%',
  marginBottom: '20px',
  borderBottom: '1px dashed white',
});

const assignments = [{
  id: '1',
  title: 'Tic Tac Toe',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
  chance: 2,
},
{
  id: '4',
  title: 'Tic Tac Toe 2',
  submitted: true,
  dueDate: new Date(2019, 8, 15, 11, 59, 59),
  chance: 1,
},
{
  id: '2',
  title: 'Bank System',
  submitted: false,
  dueDate: new Date(2019, 9, 20, 23, 59, 59),
  chance: 3,
},
{
  id: '3',
  title: 'Tic Tac Toe 3',
  submitted: false,
  dueDate: new Date(2019, 8, 16, 11, 59, 59),
  chance: 3,
}]

const AssignmentTab: React.FunctionComponent = () => {
  const router = useRouter();
  const { courseid } = router.query;

  return (
    <Container>
      <CourseTitle>{String(courseid).toUpperCase()}</CourseTitle>
      {
        ['Upcoming', 'Submitted', 'Late'].map((t, i) => (
          <React.Fragment>
            <AssignmentTag>{t}</AssignmentTag>
            <SubContainer>
              {
                assignments.filter(i == 0 ? a => a.dueDate > new Date() && !a.submitted
                  : (i == 1 ? a => a.dueDate < new Date() && a.submitted
                  : a => a.dueDate < new Date() && !a.submitted)).map((d, index) => 
                  <AssignmentContainer key={`${t}-${index}`}>
                    {i == 0 && <StyledATI size={26} />}
                    {i == 1 && <StyledAL size={26} />}
                    {i == 2 && <StyledA size={26} />}
                    <AssignmentDetails>
                      <Title
                        overrides={{
                          Block: {
                            style: {
                              fontWeight: 'bold',
                            }
                          }
                        }}
                      >
                        {d.title}
                      </Title>
                      <Label4>
                        {`Due Date: ${printDate(d.dueDate)}`}
                      </Label4>
                    </AssignmentDetails>
                    <SubChance>{`Remaining submission chance: ${d.chance}`}</SubChance>
                    <Link href={`/assignment/${d.id}`}>
                      <SButton style={{ backgroundColor: i == 0 ? '#4caf50' 
                        : (i == 1 ? '#2196f3' : '#d32f2f')
                      }}>
                        {i == 0 && 'Submit'}
                        {i == 1 && 'View Submission'}
                        {i == 2 && 'Submit'}
                      </SButton>
                    </Link>
                  </AssignmentContainer>
                )
              }
            </SubContainer>
            { i !== 2 && <Breakline /> }
          </React.Fragment>
        ))
      }
    </Container>
  )
}

export default AssignmentTab
