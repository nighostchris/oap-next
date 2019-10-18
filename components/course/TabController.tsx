import * as React from 'react';
import { styled } from 'baseui';
import TabLayout from './TabLayout';
import AssignmentTab from './AssignmentTab';
import AnnounceTab from './AnnounceTab';
import GradeTab from './GradeTab';

const Root = styled('div', {
  display: 'flex',
  paddingTop: '20px',
  alignItems: 'center',
  flexDirection: 'column',
  height: 'calc(100% - 84px)',
});

const TabBar = styled('div', ({ $theme }) => ({
  width: '90%',
  display: 'flex',
  borderTopLeftRadius: '5px',
  borderLeft: `solid 1px ${$theme.colors.primary50}`,
  borderRight: '1px solid transparent',
}));

const Tab = styled('button', ({ $theme }) => ({
  width: '200px',
  height: '40px',
  outline: 'none',
  fontSize: '18px',
  background: $theme.colors.primary400,
  border: `solid 1px ${$theme.colors.primary50}`,
  borderLeft: 'unset !important',
  borderBottom: 'unset !important',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  ':hover': {
    cursor: 'pointer',
    background: $theme.colors.primary200,
  },
  ':focus': {
    background: $theme.colors.primary300,
  },
}));

const ActiveTab = styled(Tab, ({ $theme }) => ({
  background: `${$theme.colors.primary300} !important`,
}));

const TabController: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Root>
      <TabBar>
        {
          ['Assignment', 'Announcement', 'Grade'].map((t, i) => (
            activeTab === i ? (
              <ActiveTab onClick={() => setActiveTab(i)}>
                {t}
              </ActiveTab>
            ) : (
              <Tab onClick={() => setActiveTab(i)}>
                {t}
              </Tab>
            )
          ))
        }
      </TabBar>
      <TabLayout>
        { activeTab === 0 && <AssignmentTab /> }
        { activeTab === 1 && <AnnounceTab /> }
        { activeTab === 2 && <GradeTab /> }
      </TabLayout>
    </Root>
  );
};

export default TabController;
