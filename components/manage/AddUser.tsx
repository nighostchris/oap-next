import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { SIZE, Input } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { Label1, Label2 } from 'baseui/typography';
import { UserlistProps } from '../../utils/interface';

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  overflowY: 'auto',
  marginTop: '20px',
  flexDirection: 'column',
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

const Subtitle = styled(Label1, {
  marginBottom: '10px',
});

const SubLabel = styled(Label2, {
  margin: '5px 0',
});

const StyledButton = styled(Button, {
  marginTop: '30px',
  marginBottom: '20px',
  padding: '3px !important',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
});

const AddUser: React.FunctionComponent<UserlistProps> = ({ setUserlist }) => {
  const [nname, setNName] = React.useState('');
  const [nemail, setNEmail] = React.useState('');
  const [nid, setNID] = React.useState('');
  const [nrole, setNRole] = React.useState<Value>([]);

  const updateUserList = () => {
    const newUser = {
      name: nname,
      email: nemail,
      id: nid,
      role: nrole[0].e === 's' ? 1 : nrole[0].e === 'ts' ? 2 : 3,
    };
    setUserlist((oldArray: Array<any>) => [...oldArray, newUser]);
  };

  return (
    <Root>
      <Subtitle
        overrides={{
          Block: {
            style: {
              fontWeight: 'bold',
            },
          },
        }}
      >
        Register New User
      </Subtitle>
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        Name
      </SubLabel>
      <Input
        value={nname}
        size={SIZE.compact}
        onChange={(e: any) => setNName(e.target.value)}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
          InputContainer: {
            style: (props) => {
              const { $isFocused } = props;
              return {
                borderColor: $isFocused ? 'transparent' : 'transparent',
              };
            },
          },
        }}
      />
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        Email
      </SubLabel>
      <Input
        value={nemail}
        size={SIZE.compact}
        onChange={(e: any) => setNEmail(e.target.value)}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
          InputContainer: {
            style: (props) => {
              const { $isFocused } = props;
              return {
                borderColor: $isFocused ? 'transparent' : 'transparent',
              };
            },
          },
        }}
      />
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        Student ID
      </SubLabel>
      <Input
        value={nid}
        size={SIZE.compact}
        onChange={(e: any) => setNID(e.target.value)}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
          InputContainer: {
            style: (props) => {
              const { $isFocused } = props;
              return {
                borderColor: $isFocused ? 'transparent' : 'transparent',
              };
            },
          },
        }}
      />
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        Role
      </SubLabel>
      <Select
        size={SIZE.compact}
        options={[
          { id: 'Student', e: 's' },
          { id: 'Teaching Staff', e: 'ts' },
          { id: 'Admin', e: 'a' },
        ]}
        labelKey="id"
        valueKey="e"
        onChange={({ value }) => setNRole(value)}
        value={nrole}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
        }}
      />
      <StyledButton onClick={() => updateUserList()}>
        Submit
      </StyledButton>
    </Root>
  );
};

export default AddUser;
