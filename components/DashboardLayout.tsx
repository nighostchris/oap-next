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
  color: '#757575',
  fontWeight: 600,
});

const StyledLabel2 = styled(Label2, {
  color: '#757575',
  fontWeight: 900,
})

const StyledDisplay4 = styled(Display4, {
  fontSize: '30px',
})

const CardContainer = styled('div', {
  marginTop: '20px',
  marginLeft: '80px',
})

const data = [1, 2, 3, 4];

const DashboardLayout: React.FunctionComponent = () => {
  return (
    <CardContainer>
      <StyledDisplay4>Courses</StyledDisplay4>
      <CardRow>
        {
          data.map((temp, index) => (
            <StyledCard
              overrides={{ Root: { style: {
                marginRight: index + 1 !== data.length ? '40px' : '0'
              }}}}
            >
              <Link href="/comp2012">
                <Title>COMP 2012 Introduction to Object-Oriented Programming</Title>            
              </Link>
              <StyledLabel1>
                L{temp}
              </StyledLabel1>
              <StyledLabel2>
                Dr. Desmond Tsoi
              </StyledLabel2>
            </StyledCard>
          ))
        }
      </CardRow>
      <StyledDisplay4>Assignments</StyledDisplay4>
      <CardRow>
        {
          data.map((temp, index) => (
            <StyledCard
              overrides={{ Root: { style: {
                marginRight: index + 1 !== data.length ? '40px' : '0'
              }}}}
            >
              <Link href="/comp2012">
                <Title>{`Assignment ${temp}
                  Tic Tac Toe`}</Title>            
              </Link>
              <StyledLabel1>
                COMP 2012
              </StyledLabel1>
              <StyledLabel2>
                Due Date: 12/10/2019
              </StyledLabel2>
            </StyledCard>
          ))
        }
      </CardRow>
    </CardContainer>
  )
}

export default DashboardLayout
