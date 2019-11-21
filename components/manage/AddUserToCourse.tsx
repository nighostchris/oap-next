import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { SIZE } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { Label1, Label2 } from 'baseui/typography';
import { AUTCProps } from '../../utils/interface';

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

const AddUserToCourse: React.FunctionComponent<AUTCProps> = ({ userlist }) => {
  const processed: any[] = [];
  userlist.forEach((u: any, i: number) => {
    processed.push({ id: u.name, e: i.toString() });
  });

  const [user, setUser] = React.useState<Value>([]);

  /*
  const updateUserList = () => {
    const newUser = {
      name: nname,
      email: nemail,
      id: nid,
      role: nrole[0].e === 's' ? 1 : nrole[0].e === 'ts' ? 2 : 3,
    };
    setUserlist((oldArray: Array<any>) => [...oldArray, newUser]);
  };*/

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
        Add User To Course
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
        User
      </SubLabel>
      <Select
        size={SIZE.compact}
        options={
          processed
        }
        labelKey="id"
        valueKey="e"
        onChange={({ value }) => setUser(value)}
        value={user}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
        }}
      />
      <StyledButton>
        Submit
      </StyledButton>
    </Root>
  );
};

export default AddUserToCourse;
