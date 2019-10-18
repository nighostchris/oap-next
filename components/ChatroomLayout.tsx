import * as React from 'react'
import { styled } from 'baseui'
import { Label2 } from 'baseui/typography'

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'row',
  height: 'calc(100% - 64px)',
})

const LeftPanel = styled('div', {
  flexGrow: 1,
  backgroundColor: 'red',
})

const RightPanel = styled('div', {
  flexGrow: 3,
  backgroundColor: 'orange',
})

const HeaderBar = styled('div', {
  backgroundColor: 'grey',
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const ChannelList = styled('div', {
  backgroundColor: 'red',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  height: 'calc(100% - 64px)',
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
})

const Channel = styled('div', {
  minHeight: '64px',
  display: 'flex',
  flexDirection: 'column',
})

const Chat = styled(Channel, {
  flexGrow: 3,
  backgroundColor: 'green',
  height: 'calc(100% - 128px)',
})

const BottomBar = styled('div', {
  backgroundColor: 'purple',
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
})

const data = {
  username: 'Desmond Tsoi',
  lastMessage: 'Thanks for your reply.',
  lastDate: new Date(2019, 8, 25, 9, 0, 0),
};

const mapData = Array(20).fill(data);

const ChatroomLayout: React.FunctionComponent = () => {
  return (
    <Root>
      <LeftPanel>
        <HeaderBar>
        </HeaderBar>
        <ChannelList>
            {
              mapData.map((d, i) => (
                <Channel key={i}>
                  <Label2>{d.username}</Label2>
                </Channel>
              ))
            }
          </ChannelList>
      </LeftPanel>
      <RightPanel>
        <HeaderBar style={{ background: 'blue' }}>

        </HeaderBar>
        <Chat>

        </Chat>
        <BottomBar>

        </BottomBar>
      </RightPanel>
    </Root>
  )
}

export default ChatroomLayout
