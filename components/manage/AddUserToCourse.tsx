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

const AddUserToCourse: React.FunctionComponent<AUTCProps> = ({ userlist, courseData }) => {
  const processedUserList: any[] = [];
  const processedCourseData: any[] = [];
  userlist.forEach((u: any, i: number) => {
    processedUserList.push({ id: u.name, e: i.toString(), reg: u.reg });
  });
  courseData.forEach((c: any, i: number) => {
    processedCourseData.push({ id: `COMP${c.code} ${c.title}`, e: i.toString(), code: c.code });
  });

  const [user, setUser] = React.useState<Value>([]);
  const [course, setCourse] = React.useState<Value>([]);

  const filterCourse = () => {
    if (user.length === 0) {
      return processedCourseData;
    }
    return processedCourseData.filter((c) => {
      let check = true;
      user[0].reg.forEach((c2: any) => {
        if (c2.code === c.code) {
          check = false;
        }
      });
      return check;
    });
  };

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
          processedUserList
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
      <StyledButton>
        Submit
      </StyledButton>
    </Root>
  );
};

export default AddUserToCourse;
