import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { SIZE } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { Label1, Label2 } from 'baseui/typography';
import { RFCProps } from '../../utils/interface';

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

const RemoveFromCourse: React.FunctionComponent<RFCProps> = (
  { userlist, setUserlist },
) => {
  const processedUserList: any[] = [];

  userlist.forEach((u: any, i: number) => {
    processedUserList.push({ ...u, e: i.toString() });
  });

  const [user, setUser] = React.useState<Value>([]);
  const [course, setCourse] = React.useState<Value>([]);

  const filterCourse = () => {
    const courseList: Array<any> = [];

    if (user.length === 0) {
      return courseList;
    }

    user[0].reg.forEach((c: any, i: any) => {
      courseList.push({
        id: `COMP${c.code}`,
        e: i.toString(),
      });
    });

    return courseList;
  };

  const updateUserList = () => {
    const temp = userlist;
    const resultUser = user[0];
    const targetUser = Number(user[0].e);
    if (course.length !== 0) {
      const targetCourse = Number(course[0].e);
      delete resultUser.e;
      resultUser.reg.splice(targetCourse, 1);
      temp[targetUser] = resultUser;
    }
    setUserlist([...temp]);
    setUser([]);
    setCourse([]);
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
        Remove User From Course
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
          processedUserList
        }
        labelKey="name"
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
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        Course
      </SubLabel>
      <Select
        size={SIZE.compact}
        options={
          filterCourse()
        }
        labelKey="id"
        valueKey="e"
        disabled={user.length === 0}
        onChange={({ value }) => setCourse(value)}
        value={course}
        overrides={{
          Root: {
            style: {
              outline: 'teal .5px solid',
            },
          },
        }}
      />
      <StyledButton
        onClick={() => updateUserList()}
      >
        Submit
      </StyledButton>
    </Root>
  );
};

export default RemoveFromCourse;
