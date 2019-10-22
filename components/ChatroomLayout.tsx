import * as React from 'react';
import { styled } from 'baseui';
import { Label1, Label2, Label3 } from 'baseui/typography';
import { Search } from 'baseui/icon';
import { Edit } from 'styled-icons/boxicons-regular/Edit';
import { printPartialDate } from '../utils/helper';

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'row',
  backgroundColor: 'white',
  height: 'calc(100% - 64px)',
});

const LeftPanel = styled('div', {
  flexGrow: 1,
  flexBasis: '30%',
});

const RightPanel = styled('div', {
  flexGrow: 3,
  flexBasis: '70%',
  borderLeft: '1px solid rgba(0, 0, 0, .10)',
});

const HeaderBar = styled('div', {
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .10)',
});

const SearchContainer = styled('div', {
  width: '80%',
  height: '36px',
  display: 'flex',
  marginLeft: '15px',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '50px',
  background: 'rgba(0, 0, 0, .04)',
});

const StyledSearch = styled(Search, {
  minWidth: '15%',
  color: '#606770',
});

const StyledInput = styled('input', {
  outline: '0',
  width: '80%',
  height: '100%',
  border: 'unset',
  fontSize: '16px',
  padding: '0 10px 0 0',
  background: 'transparent',
});

const StyledEdit = styled(Edit, {
  width: '20%',
  color: '#606770',
});

const ChannelList = styled('div', {
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'column',
  height: 'calc(100% - 64px)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const Channel = styled('div', {
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    cursor: 'pointer',
  },
});

const SummaryContainer = styled('div', {
  width: '85%',
  display: 'flex',
  flexDirection: 'column',
});

const LowRow = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledMessagePreview = styled(Label2, {
  maxWidth: '70%',
  height: '24px',
  overflow: 'hidden',
});

const StyledMessageDate = styled(Label3, {
  right: '10px',
  position: 'absolute',
});

const HeaderUsername = styled(Label1, {
  marginLeft: '20px',
});

const Chat = styled('div', {
  flexGrow: 3,
  display: 'flex',
  padding: '0 10px',
  overflowY: 'auto',
  flexDirection: 'column',
  height: 'calc(100% - 128px)',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const BubbleWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  margin: '10px 0',
});

const Bubble = styled(Label2, {
  width: 'fit-content',
  maxWidth: '55%',
  padding: '5px 15px',
  borderRadius: '50px',
});

const BubbleTo = styled(Bubble, {
  right: '10px',
  background: 'rgba(0, 0, 0, 0.2)',
});

const BubbleFrom = styled(Bubble, {
  background: 'rgba(0, 0, 0, 0.08)',
});

const BottomBar = styled('div', {
  height: '63px',
  display: 'flex',
  flexDirection: 'row',
  borderTop: '1px solid rgba(0, 0, 0, .10)',
});

const data = {
  username: 'Desmond Tsoi',
  messages: [
    {
      to: true,
      content: 'Desmond I want to appeal the score of assignment 5 about the part of blah blah blah',
      sendDate: new Date(2019, 8, 25, 8, 57, 55),
    },
    {
      to: false,
      content: 'Ok no problem.',
      sendDate: new Date(2019, 8, 25, 9, 0, 0),
    },
    {
      to: false,
      content: 'I will check it later on.',
      sendDate: new Date(2019, 8, 25, 8, 59, 10),
    },
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 58, 3),
    },
    {
      to: true,
      content: 'Desmond I want to appeal the score of assignment 5 about the part of blah blah blah',
      sendDate: new Date(2019, 8, 25, 8, 57, 55),
    },
    {
      to: false,
      content: 'Ok no problem.',
      sendDate: new Date(2019, 8, 25, 9, 0, 0),
    },
    {
      to: false,
      content: 'I will check it later on.',
      sendDate: new Date(2019, 8, 25, 8, 59, 10),
    },
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 58, 3),
    },
    {
      to: true,
      content: 'Desmond I want to appeal the score of assignment 5 about the part of blah blah blah',
      sendDate: new Date(2019, 8, 25, 8, 57, 55),
    },
    {
      to: false,
      content: 'Ok no problem.',
      sendDate: new Date(2019, 8, 25, 9, 0, 0),
    },
    {
      to: false,
      content: 'I will check it later on.',
      sendDate: new Date(2019, 8, 25, 8, 59, 10),
    },
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 58, 3),
    },
    {
      to: true,
      content: 'Desmond I want to appeal the score of assignment 5 about the part of blah blah blah',
      sendDate: new Date(2019, 8, 25, 8, 57, 55),
    },
    {
      to: false,
      content: 'Ok no problem.',
      sendDate: new Date(2019, 8, 25, 9, 0, 0),
    },
    {
      to: false,
      content: 'I will check it later on.',
      sendDate: new Date(2019, 8, 25, 8, 59, 10),
    },
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 58, 3),
    },
  ],
};

const mapData = Array(20).fill(data);

const ChatroomLayout: React.FunctionComponent = () => {
  const [isViewing, setIsViewing] = React.useState(1);

  return (
    <Root>
      <LeftPanel>
        <HeaderBar>
          <SearchContainer>
            <StyledSearch size={26} />
            <StyledInput />
          </SearchContainer>
          <StyledEdit size={26} />
        </HeaderBar>
        <ChannelList>
          {
            mapData.map((d, i) => (
              <Channel
                key={i}
                onClick={() => setIsViewing(i)}
                style={{
                  backgroundColor: (isViewing === i) ? 'rgba(0, 0, 0, .1)' : undefined,
                }}
              >
                <SummaryContainer>
                  <Label2
                    overrides={{
                      Block: {
                        style: {
                          fontWeight: 'bold',
                        },
                      },
                    }}
                  >
                    {d.username}
                  </Label2>
                  <LowRow>
                    <StyledMessagePreview>{d.messages[0].content}</StyledMessagePreview>
                    <StyledMessageDate>
                      {printPartialDate(d.messages[0].sendDate)}
                    </StyledMessageDate>
                  </LowRow>
                </SummaryContainer>
              </Channel>
            ))
          }
        </ChannelList>
      </LeftPanel>
      <RightPanel>
        <HeaderBar>
          <HeaderUsername>
            {isViewing !== -1 && mapData[isViewing].username}
          </HeaderUsername>
        </HeaderBar>
        <Chat>
          {
            isViewing !== -1
            && mapData[isViewing].messages.map((m: any, i: any) => (
              <BubbleWrapper
                style={{ justifyContent: m.to ? 'flex-end' : undefined }}
              >
                {
                  m.to ? (
                    <BubbleTo key={`bubble-${i}`}>
                      {m.content}
                    </BubbleTo>
                  ) : (
                    <BubbleFrom key={`bubble-${i}`}>
                      {m.content}
                    </BubbleFrom>
                  )
                }
              </BubbleWrapper>
            ))
          }
        </Chat>
        <BottomBar>

        </BottomBar>
      </RightPanel>
    </Root>
  );
};

export default ChatroomLayout;
