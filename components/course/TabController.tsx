import * as React from 'react';
import {styled} from 'baseui'
import AnnounceTab from './AnnounceTab';
import AssignmentTab from './AssignmentTab';

const Root = styled('div', {
  display: 'flex',
  paddingTop: '20px',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 84px)',
})

const TabBar = styled('div', {
  width: '90%',
  display: 'flex',
  borderTopLeftRadius: '5px',
  borderLeft: '1px solid #607d8b',
  borderRight: '1px solid transparent',
})

const Tab = styled('button', {
  width: '200px',
  height: '40px',
  outline: 'none',
  fontSize: '18px',
  background: '#b0bec5',
  border: 'solid 1px #607d8b',
  borderLeft: 'unset !important',
  borderBottom: 'unset !important',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  ':hover': {
    cursor: 'pointer',
    background: '#78909c',
  },
  ':focus': {
    background: '#90a4ae',
  },
})

const ActiveTab = styled(Tab, {
  background: '#90a4ae !important',
})

const TabController: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Root>
      <TabBar>
        {
          ['Assignment', 'Announcement', 'Grade'].map((t, i) => 
            activeTab == i ? 
              <ActiveTab onClick={() => setActiveTab(i)}>
               {t}
              </ActiveTab>
             : 
              <Tab onClick={() => setActiveTab(i)}>
               {t}
              </Tab>
          )
        }
      </TabBar>
      {
        activeTab == 0 ? <AssignmentTab />
          : (activeTab == 1 ? <AnnounceTab /> : <AssignmentTab />)
      }
    </Root>
  );
}

export default TabController
