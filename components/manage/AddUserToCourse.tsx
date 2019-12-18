import * as React from 'react';
import { Button } from 'react-bootstrap';
import Select from '../global/Select';

interface AUTCProps {
  userlist: Array<any>
  courseData: Array<any>
  setUserlist: (value: Array<any> | ((prevVar: Array<any>) => Array<any>)) => void
}

const AddUserToCourse: React.FunctionComponent<AUTCProps> = (
  { userlist, courseData, setUserlist },
) => {
  const processedUserList = ['Select...', ...userlist.map((u: any) => u.name)];
  const processedCourseData = ['Select...', ...courseData.map((c: any) => `COMP${c.code} ${c.title}`)];

  const [user, setUser] = React.useState(processedUserList[0]);
  const [course, setCourse] = React.useState(processedCourseData[0]);
  const [section, setSection] = React.useState('Select...');

  const selectCourseFromCorrespondingUser = (c: any) => {
    let check = true;
    userlist.find((u) => u.name === user).reg.forEach((c2: any) => {
      if (c.includes(c2.code)) {
        check = false;
      }
    });
    return check;
  };

  const filteredCourse = () => processedCourseData.filter(
    (c) => selectCourseFromCorrespondingUser(c),
  );

  const listSection = () => {
    const courseCode = course.substring(4, course.indexOf(' '));
    const courseDetail = courseData.find((c: any) => c.code === courseCode);
    const sectionArray: any[] = ['Select...'];
    for (let i = 1; i <= courseDetail.section; i++) {
      sectionArray.push(`L${i}`);
    }
    return sectionArray;
  };

  const updateUserList = () => {
    const temp = userlist;
    const changedUser = userlist.find((u) => u.name === user);
    changedUser.reg.push({ code: course.substring(4, course.indexOf(' ')), section: Number(section.slice(-1)) });
    temp[temp.findIndex((el) => el.id === user.id)] = changedUser;
    setUserlist([...temp]);
    setUser(processedUserList[0]);
    setCourse(processedCourseData[0]);
    setSection('Select...');
  };

  return (
    <>
      <h2>Add User To Course</h2>
      <Select
        title="User"
        optionList={processedUserList}
        value={user}
        setValue={setUser}
      />
      {
        user !== 'Select...'
          && (
            <Select
              title="Course"
              optionList={filteredCourse()}
              value={course}
              setValue={setCourse}
            />
          )
      }
      {
        course !== 'Select...'
          && (
          <Select
            title="Section"
            optionList={listSection()}
            value={section}
            setValue={setSection}
          />
          )
      }
      {
        section !== 'Select...'
          && (
            <Button block variant="primary" onClick={() => updateUserList()}>
              Submit
            </Button>
          )
      }
    </>
  );
};

export default AddUserToCourse;
