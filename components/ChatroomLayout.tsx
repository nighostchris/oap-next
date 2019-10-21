import * as React from 'react';
import { styled } from 'baseui';
import { Label2, Label3 } from 'baseui/typography';
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
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '15px',
  width: '80%',
  height: '36px',
  borderRadius: '50px',
  background: 'rgba(0, 0, 0, .04)',
});

const StyledSearch = styled(Search, {
  width: '20%',
  color: '#606770',
});

const StyledInput = styled('input', {
  outline: '0',
  width: '80%',
  height: '100%',
  border: 'unset',
  fontSize: '16px',
  padding: '0 20px 0 0',
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

const StyledMessageDate = styled(Label3, {
  right: '10px',
  position: 'absolute',
});

const Chat = styled(Channel, {
  flexGrow: 3,
  height: 'calc(100% - 128px)',
});

const BottomBar = styled('div', {
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
});

const data = {
  username: 'Desmond Tsoi',
  messages: [
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 9, 0, 0),
    },
    {
      to: false,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 59, 10),
    },
    {
      to: false,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 58, 3),
    },
    {
      to: true,
      content: 'Thanks for your reply.',
      sendDate: new Date(2019, 8, 25, 8, 57, 55),
    },
  ],
};

const mapData = Array(20).fill(data);

const ChatroomLayout: React.FunctionComponent = () => {
  const [isViewing, setIsViewing] = React.useState(-1);

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
                    <Label2>{d.messages[0].content}</Label2>
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

        </HeaderBar>
        <Chat>

        </Chat>
        <BottomBar>

        </BottomBar>
      </RightPanel>
    </Root>
  );
};

export default ChatroomLayout;
