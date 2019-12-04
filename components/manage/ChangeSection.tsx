import * as React from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { SIZE } from 'baseui/input';
import { Select, Value } from 'baseui/select';
import { Label1, Label2 } from 'baseui/typography';
import { CSProps } from '../../utils/interface';

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

const ChangeSection: React.FunctionComponent<CSProps> = (
  {
    userlist, courseData, setUserlist, setIsPop,
  },
) => {
  const processedUserList: any[] = [];
  const processedCourseData: any[] = [];

  userlist.forEach((u: any, i: number) => {
    processedUserList.push({ ...u, e: i.toString() });
  });
  courseData.forEach((c: any, i: number) => {
    processedCourseData.push({
      id: `COMP${c.code} ${c.title}`,
      e: i.toString(),
      code: c.code,
      section: c.section,
    });
  });

  const [user, setUser] = React.useState<Value>([]);
  const [course, setCourse] = React.useState<Value>([]);
  const [section, setSection] = React.useState<Value>([]);

  const filterCourse = () => {
    if (user.length === 0) {
      return processedCourseData;
    }
    return processedCourseData.filter((c) => {
      let check = false;
      user[0].reg.forEach((c2: any) => {
        if (c2.code === c.code) {
          check = true;
        }
      });
      return check;
    });
  };

  const listSection = () => {
    const sectionArray: any[] = [];
    if (course.length === 0) {
      return sectionArray;
    }

    const userCourse = user[0].reg.filter((c3: any) => c3.code === course[0].code);

    for (let i = 1; i <= course[0].section; i++) {
      if (i !== userCourse[0].section) {
        sectionArray.push({ id: `L${i}`, e: i.toString() });
      }
    }
    return sectionArray;
  };

  const updateUserList = () => {
    const temp = userlist;
    const noE = user[0];
    delete noE.e;
    noE.reg.forEach((c: any) => {
      if (c.code === course[0].code) {
        c.section = Number(section[0].e);
      }
    });
    temp[temp.findIndex((el) => el.id === user[0].id)] = noE;
    setUserlist([...temp]);
    setUser([]);
    setIsPop(true);
    setCourse([]);
    setSection([]);
    setTimeout(() => setIsPop(false), 2000);
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
        Change Section For User In Course
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
      <SubLabel
        overrides={{
          Block: {
            style: {
              fontSize: '15px',
            },
          },
        }}
      >
        New Section
      </SubLabel>
      <Select
        size={SIZE.compact}
        options={
          listSection()
        }
        disabled={course.length === 0}
        labelKey="id"
        valueKey="e"
        onChange={({ value }) => setSection(value)}
        value={section}
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

export default ChangeSection;
