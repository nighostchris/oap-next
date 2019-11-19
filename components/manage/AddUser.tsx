import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { SIZE, Input } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { Label1, Label2 } from 'baseui/typography';

const Root = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Subtitle = styled(Label1, {
  margin: '20px 0 10px 0',
});

const SubLabel = styled(Label2, {
  margin: '5px 0',
});

const StyledButton = styled(Button, {
  marginTop: '30px',
  padding: '3px !important',
  fontSize: '14px !important',
  borderRadius: '5px !important',
  backgroundColor: '#1e88e5 !important',
});

const AddUser: React.FunctionComponent = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [id, setID] = React.useState('');
  const [role, setRole] = React.useState<Value>([]);

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
        value={name}
        size={SIZE.compact}
        onChange={(e: any) => setName(e.target.value)}
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
        value={email}
        size={SIZE.compact}
        onChange={(e: any) => setEmail(e.target.value)}
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
        value={id}
        size={SIZE.compact}
        onChange={(e: any) => setID(e.target.value)}
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
        onChange={({ value }) => setRole(value)}
        value={role}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
        }}
      />
      <StyledButton>Submit</StyledButton>
    </Root>
  );
};

export default AddUser;
