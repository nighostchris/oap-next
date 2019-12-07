import * as React from 'react';
import { styled } from 'baseui';
import { Notifications } from 'styled-icons/material/Notifications';
import { User } from 'styled-icons/boxicons-solid/User';
import { Paragraph2, Paragraph3 } from 'baseui/typography';
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown';
import { Moon } from 'styled-icons/fa-solid/Moon';
import { Menu } from 'styled-icons/boxicons-regular/Menu';
import { Clear } from 'styled-icons/material/Clear';
import { ClearAll } from 'styled-icons/material/ClearAll';
import { headerBarProps } from '../utils/interface';

const HBar = styled('div', ({ $theme }) => ({
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  background: $theme.colors.primary,
}));

const StyledMoon = styled(Moon, {
  stroke: 'white',
  color: 'black',
  strokeWidth: '30px',
  marginRight: '30px',
  ':hover': {
    cursor: 'pointer',
  },
  '@media (min-width: 320px) and (max-width: 480px)': {
    display: 'none',
  },
});

const NotiWrapper = styled('div', {
  position: 'relative',
  marginRight: '30px',
  '@media (min-width: 320px) and (max-width: 480px)': {
    display: 'none',
  },
});

const StyledNotifications = styled(Notifications, {
  color: '#e0e0e0',
  ':hover': {
    cursor: 'pointer',
  },
});

const StyledMenu = styled(Menu, {
  left: '15px',
  color: '#e0e0e0',
  position: 'absolute',
  ':hover': {
    cursor: 'pointer',
  },
  '@media (min-width: 320px) and (max-width: 480px)': {
    display: 'inline-block',
  },
  '@media screen and (min-width: 480px)': {
    display: 'none !important',
  },
});

const StyledUser = styled(User, {
  color: '#e0e0e0',
  marginRight: '10px',
});

const StyledUsername = styled(Paragraph2, {
  color: '#e0e0e0 !important',
});

const StyledArrowDropDown = styled(ArrowDropDown, {
  color: '#e0e0e0',
  marginLeft: '5px',
  marginRight: '10px',
  ':hover': {
    cursor: 'pointer',
  },
});

const StyledUserDropDown = styled('div', {
  top: '50px',
  right: '16px',
  width: '150px',
  position: 'fixed',
  border: '1px solid',
  borderRadius: '5px',
  textAlign: 'center',
});

const StyledNotiDropDown = styled('div', ({ $theme }) => ({
  top: '50px',
  right: '180px',
  width: '300px',
  position: 'fixed',
  borderRadius: '5px',
  backgroundColor: $theme.colors.accent100,
}));

const NotificationHeader = styled('div', ({ $theme }) => ({
  display: 'flex',
  height: '50px',
  alignItems: 'center',
  flexDirection: 'row',
  border: '1px solid #212121',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: 'unset !important',
  backgroundColor: $theme.colors.accent200,
}));

const NotificationLabel = styled('div', () => ({
  color: 'white',
  fontWeight: 'bold',
  paddingLeft: '15px',
  paddingRight: '5px',
}));

const NotiNumber = styled('div', {
  borderRadius: '100%',
  fontSize: '16px',
  lineHeight: '20px',
  textAlign: 'center',
  fontWeight: 'bold',
  width: '20px',
  height: '20px',
  color: 'white',
  backgroundColor: '#00aa37',
});

const StyledClearAll = styled(ClearAll, {
  position: 'absolute',
  right: '15px',
  ':hover': {
    cursor: 'pointer',
  },
});

const HeaderNotiNumber = styled(NotiNumber, {
  top: '-6px',
  right: '-6px',
  position: 'absolute',
});

const NotificationWrap = styled('div', {
  display: 'flex',
  overflowY: 'auto',
  maxHeight: '200px',
  borderTop: 'unset',
  alignItems: 'center',
  flexDirection: 'column',
  border: '1px solid #212121',
  borderRadius: '0px 0px 5px 5px',
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    borderRadius: '.8rem',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
});

const NotificationContainer = styled('div', {
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
});

const StyledClear = styled(Clear, {
  right: '0px',
  position: 'absolute',
  ':hover': {
    cursor: 'pointer',
  },
});

const StyledParagraph3 = styled(Paragraph3, {
  color: '#757575',
  fontWeight: 'bold',
  marginBlockEnd: '0',
  marginBlockStart: '0',
  padding: '20px 0 20px 15px',
});

const Breakline = styled('div', {
  width: '100%',
  borderBottom: '1px solid white',
});

const noti = [
  { content: 'You can find the solutions below: Ass4_Fall_2017_solutions.pdf.' },
  { content: 'You can find the solutions below: Ass3_Fall_2017_solutions.pdf.' },
  { content: 'You can find the solutions below: Ass2_Fall_2017_solutions.pdf.' },
  { content: 'You can find the solutions below: Ass1_Fall_2017_solutions.pdf.' },
  { content: 'Welcome to COMP2012.' },
  { content: 'Welcome to COMP2011.' },
  { content: 'Welcome to COMP1021.' },
  { content: 'Welcome to COMP3021.' },
];

const HeaderBar: React.FunctionComponent<headerBarProps> = ({
  mobileNavBarOpen, setMobileNavBarOpen, themeController, setThemeController,
}) => {
  const [userOpen, setUserOpen] = React.useState(false);
  const [notiOpen, setNotiOpen] = React.useState(false);

  return (
    <HBar>
      <StyledMenu
        size={26}
        style={{ display: mobileNavBarOpen ? 'none' : undefined }}
        onClick={() => setMobileNavBarOpen(!mobileNavBarOpen)}
      />
      <StyledMoon
        size={26}
        onClick={() => setThemeController(Math.abs(themeController - 1))}
      />
      <NotiWrapper>
        <StyledNotifications
          size={26}
          onClick={() => setNotiOpen(!notiOpen)}
        />
        <HeaderNotiNumber>{noti.length}</HeaderNotiNumber>
      </NotiWrapper>
      <StyledNotiDropDown style={{ display: notiOpen ? undefined : 'none' }}>
        <NotificationHeader>
          <NotificationLabel>Notifications</NotificationLabel>
          <NotiNumber>{noti.length}</NotiNumber>
          <StyledClearAll size={26} />
        </NotificationHeader>
        <NotificationWrap>
          {
            noti.map((n, i) => (
              <NotificationContainer key={`noti-${i}`}>
                <Row>
                  <StyledParagraph3 key={i}>{n.content}</StyledParagraph3>
                  <StyledClear size={20} />
                </Row>
                {i !== noti.length - 1 && <Breakline />}
              </NotificationContainer>
            ))
          }
        </NotificationWrap>
      </StyledNotiDropDown>
      <StyledUser size="26" />
      <StyledUsername>desmond</StyledUsername>
      <StyledArrowDropDown
        size="26"
        onClick={() => setUserOpen(!userOpen)}
      />
      <StyledUserDropDown style={{ display: userOpen ? undefined : 'none' }}>
        <Paragraph3>Edit Profile</Paragraph3>
        <Paragraph3>Logout</Paragraph3>
      </StyledUserDropDown>
    </HBar>
  );
};

export default HeaderBar;
