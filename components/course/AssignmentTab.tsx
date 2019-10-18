import * as React from 'react';
import Link from 'next/link';
import { styled } from 'baseui';
import { Label1, Label3, Label4 } from 'baseui/typography';
import { Assignment } from 'styled-icons/material/Assignment';
import { AssignmentLate } from 'styled-icons/material/AssignmentLate';
import { AssignmentTurnedIn } from 'styled-icons/material/AssignmentTurnedIn';
import { printDate } from '../../utils/helper';

const SubContainer = styled('div', {
  width: '90%',
  borderRadius: '10px',
  marginBottom: '20px',
});

const AssignmentTag = styled(Label1, {
  width: '90%',
  marginBottom: '10px',
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
});

const StyledAL = styled(AssignmentLate, {
  width: '15%',
  textAlign: 'center',
});

const StyledA = styled(Assignment, {
  width: '15%',
  textAlign: 'center',
});

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
  fontWeight: 'bolder',
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
}];

const filterHelper = (i: number) => {
  let result = null;

  if (i === 0) {
    result = assignments.filter((a) => a.dueDate > new Date() && !a.submitted);
  } else if (i === 1) {
    result = assignments.filter((a) => a.dueDate < new Date() && a.submitted);
  } else {
    result = assignments.filter((a) => a.dueDate < new Date() && !a.submitted);
  }

  return result;
};

const backgroundColorHelper = (i: number) => {
  let result = null;

  if (i === 0) {
    result = '#4caf50';
  } else if (i === 1) {
    result = '#2196f3';
  } else {
    result = '#d32f2f';
  }

  return result;
};

const AssignmentTab: React.FunctionComponent = () => (
  <>
    {
      ['Upcoming', 'Submitted', 'Late'].map((t, i) => (
        <>
          <AssignmentTag>{t}</AssignmentTag>
          <SubContainer>
            {
              filterHelper(i).map((d, index) => (
                <AssignmentContainer key={`${t}-${index}`}>
                  { i === 0 && <StyledATI size={26} /> }
                  { i === 1 && <StyledAL size={26} /> }
                  { i === 2 && <StyledA size={26} /> }
                  <AssignmentDetails>
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
                    <Label4>
                      {`Due Date: ${printDate(d.dueDate)}`}
                    </Label4>
                  </AssignmentDetails>
                  <SubChance>{`Remaining submission chance: ${d.chance}`}</SubChance>
                  <Link href={`/assignment/${d.id}`}>
                    <SButton style={{
                      backgroundColor: backgroundColorHelper(i),
                    }}
                    >
                      { i === 0 && 'Submit' }
                      { i === 1 && 'View Submission' }
                      { i === 2 && 'Submit' }
                    </SButton>
                  </Link>
                </AssignmentContainer>
              ))
            }
          </SubContainer>
          { i !== 2 && <Breakline /> }
        </>
      ))
    }
  </>
);

export default AssignmentTab;
