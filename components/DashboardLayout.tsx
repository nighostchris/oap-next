import * as React from 'react'
// import { useStyletron } from 'baseui'
import { styled } from 'baseui'
import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Button } from 'baseui/button'

const CardContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
});

const StyledCard = styled(Card, {
  width: '280px',
  border: 'unset',
  margin: '25px 0px',
  backgroundColor: '#e0e0e0',
  boxShadow: 'rgb(0, 0, 0, 0.5) 0px 1px 4px',
});

const DashboardLayout: React.FunctionComponent = () => {
  // const [useCss] = useStyletron();

  return (
    <div>
      <CardContainer>
        {
          [1, 2, 3, 4, 5, 6].map(() => (
            <StyledCard
              overrides={{Title: {style: {fontWeight: 'bold'}}}}
              title="COMP 2012 - Introduction to OOP"
            >
              <StyledBody>
                Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                ornare faucibus ex, non facilisis nisl.
              </StyledBody>
              <StyledAction>
                <Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
                  Button Label
                </Button>
              </StyledAction>
            </StyledCard>
          ))
        }
      </CardContainer>
    </div>
  )
}

export default DashboardLayout
