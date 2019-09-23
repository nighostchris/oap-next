import * as React from 'react'
import Link from 'next/link';
import { styled } from 'baseui'
import { Card } from 'baseui/card'
import { Label1, Label2 } from 'baseui/typography'

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

const CardContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
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

const DashboardLayout: React.FunctionComponent = () => {
  return (
    <div>
      <CardContainer>
        {
          [1, 2, 3, 4, 5, 6].map(() => (
            <StyledCard>
              <Link href="/comp2012">
                <Title>COMP 2012 Introduction to Object-Oriented Programming</Title>            
              </Link>
              <StyledLabel1>
                L1
              </StyledLabel1>
              <StyledLabel2>
                Dr. Desmond Tsoi
              </StyledLabel2>
            </StyledCard>
          ))
        }
      </CardContainer>
    </div>
  )
}

export default DashboardLayout
