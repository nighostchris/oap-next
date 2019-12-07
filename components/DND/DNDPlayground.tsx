import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { Label1, Label3, Label4 } from 'baseui/typography';
import RootBoard from './RootBoard';
import Box from './Box';

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
  width: '300px',
  background: 'white',
  position: 'absolute',
  height: 'calc(100% - 64px)',
  borderRight: '1px solid rgba(0, 0, 0, .2)',
});

const Board = styled('div', {
  marginLeft: '300px',
  width: 'calc(100% - 300px)',
  height: 'calc(100% - 64px)',
});

const SubNav = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '1px solid rgba(0, 0, 0, .2)',
});

const TabWrapper = styled('div', {
  display: 'flex',
  textAlign: 'center',
  flexDirection: 'column',
  width: 'calc((100% - 40px) / 3)',
});

const Tab = styled('div', {
  width: '100%',
  height: '60px',
  lineHeight: '60px',
  ':hover': {
    cursor: 'pointer',
  },
});

const TabUnderline = styled('div', {
  content: '',
  width: '100%',
  height: '4px',
  backgroundColor: '#217CE8',
  marginTop: '-4px',
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

const StyledTabTitle1 = styled(Label4, {
  height: '100%',
  lineHeight: '28px',
});

const StyledTabTitle2 = styled(Label4, {
  height: '100%',
  lineHeight: '56px',
});

const DNDPlayground: React.FunctionComponent = () => {
  const [menuCtrl, setMenuCtrl] = React.useState(0);

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
        <SubNav>
          <TabWrapper>
            <Tab
              onClick={() => setMenuCtrl(0)}
            >
              <StyledTabTitle1
                overrides={{
                  Block: {
                    style: {
                      fontWeight: 'bold',
                      color: menuCtrl === 0 ? 'black' : '#808292',
                    },
                  },
                }}
              >
                Original Variables
              </StyledTabTitle1>
            </Tab>
            {
              menuCtrl === 0 && <TabUnderline />
            }
          </TabWrapper>
          <TabWrapper>
            <Tab
              onClick={() => setMenuCtrl(1)}
            >
              <StyledTabTitle1
                overrides={{
                  Block: {
                    style: {
                      fontWeight: 'bold',
                      color: menuCtrl === 1 ? 'black' : '#808292',
                    },
                  },
                }}
              >
                New Variables
              </StyledTabTitle1>
            </Tab>
            {
              menuCtrl === 1 && <TabUnderline />
            }
          </TabWrapper>
          <TabWrapper>
            <Tab
              onClick={() => setMenuCtrl(2)}
            >
              <StyledTabTitle2
                overrides={{
                  Block: {
                    style: {
                      fontWeight: 'bold',
                      color: menuCtrl === 2 ? 'black' : '#808292',
                    },
                  },
                }}
              >
                Functions
              </StyledTabTitle2>
            </Tab>
            {
              menuCtrl === 2 && <TabUnderline />
            }
          </TabWrapper>
          <TabWrapper>
            <Tab
              onClick={() => setMenuCtrl(3)}
            >
              <StyledTabTitle2
                overrides={{
                  Block: {
                    style: {
                      fontWeight: 'bold',
                      color: menuCtrl === 3 ? 'black' : '#808292',
                    },
                  },
                }}
              >
                Operators
              </StyledTabTitle2>
            </Tab>
            {
              menuCtrl === 3 && <TabUnderline />
            }
          </TabWrapper>
        </SubNav>
        <Box />
      </Menu>
      <Board>
        <RootBoard />
      </Board>
    </Root>
  );
};

export default DNDPlayground;
