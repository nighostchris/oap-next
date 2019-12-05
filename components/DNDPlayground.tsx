import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { Label1, Label3 } from 'baseui/typography';

const Root = styled('div', {
  width: '100%',
  position: 'relative',
  backgroundColor: '#e5e5e5',
  backgroundRepeat: 'repeat',
  height: 'calc(100% - 64px)',
  backgroundSize: '30px 30px',
  backgroundImage: 'url("/static/images/tile.png")',
});

const Header = styled('div', {
  width: '100%',
  height: '64px',
  display: 'flex',
  background: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0, 0, 0, .2)',
});

const Menu = styled('div', {
  left: '0',
  width: '250px',
  background: 'white',
  position: 'absolute',
  height: 'calc(100% - 64px)',
  borderRight: '1px solid rgba(0, 0, 0, .2)',
});

const TitleGroup = styled('div', {
  display: 'flex',
  marginLeft: '40px',
  flexDirection: 'column',
});

const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

const GeneralButton = styled(Button, {
  width: '120px',
  padding: '5px !important',
  color: '#808292 !important',
  fontSize: '14px !important',
  border: '1px solid #E8E8EF !important',
});

const StyledButton = styled(GeneralButton, {
  borderRadius: '5px !important',
});

const DNDPlayground: React.FunctionComponent = () => {
  return (
    <Root>
      <Header>
        <TitleGroup>
          <Label1>New Test Suite</Label1>
          <Label3>COMP1021 Assignment 3</Label3>
        </TitleGroup>
        <ButtonGroup>
          <GeneralButton
            overrides={{
              BaseButton: {
                style: {
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                  backgroundColor: 'white !important',
                },
              },
            }}
          >
            DND View
          </GeneralButton>
          <GeneralButton
            overrides={{
              BaseButton: {
                style: {
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                  backgroundColor: 'white !important',
                },
              },
            }}
          >
            Code Editor
          </GeneralButton>
        </ButtonGroup>
        <ButtonGroup style={{ marginRight: '20px' }}>
          <StyledButton
            overrides={{
              BaseButton: {
                style: {
                  fontWeight: 'bold',
                  marginRight: '10px',
                  backgroundColor: 'white !important',
                },
              },
            }}
          >
            Clear All
          </StyledButton>
          <StyledButton
            overrides={{
              BaseButton: {
                style: {
                  fontWeight: 'bold',
                  color: 'white !important',
                  backgroundColor: '#1e88e5 !important',
                },
              },
            }}
          >
            Finish
          </StyledButton>
        </ButtonGroup>
      </Header>
      <Menu>

      </Menu>
    </Root>
  );
};

export default DNDPlayground;
