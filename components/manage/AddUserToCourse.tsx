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
  const processedUserList: any[] = [];
  const processedCourseData: any[] = [];

  processedUserList.push({ name: 'Select...', email: '', id: '', role: 1, reg: [] });
  processedCourseData.push({ name: 'Select...' });

  userlist.forEach((u: any) => {
    processedUserList.push(u);
  });
  courseData.forEach((c: any) => {
    processedCourseData.push({
      name: `COMP${c.code} ${c.title}`,
      code: c.code,
      section: c.section,
    });
  });

  const [user, setUser] = React.useState({
    name: 'Select...', email: '', id: '', role: 1, reg: [{ code: '', section: 0 }],
  });
  const [course, setCourse] = React.useState({ name: 'Select...', code: '', section: 0 });
  const [section, setSection] = React.useState({ id: '' });

  const selectCourseFromCorrespondingUser = (course) => {
    let check = true;
    console.log(userlist.find((u) => u.name === user.name));
    userlist.find((u) => u.name === user.name).reg.forEach((c2: any) => {
      if (c2.code === c.code) {
        check = false;
      }
    });
    return check;
  };

  const filteredCourse = () => processedCourseData.filter(selectCourseFromCorrespondingUser);

  const listSection = () => {
    const sectionArray: any[] = [];
    for (let i = 1; i <= course.section; i++) {
      sectionArray.push({ id: `L${i}` });
    }
    return sectionArray;
  };

  const updateUserList = () => {
    const temp = userlist;
    const changedUser = user;
    changedUser.reg.push({ code: course.code, section: Number(section.id.slice(-1)) });
    temp[temp.findIndex((el) => el.id === user.id)] = changedUser;
    setUserlist([...temp]);
    setUser({ name: 'Select...', email: '', id: '', role: 1, reg: [] });
    setCourse({ name: 'Select...', code: '', section: 0 });
    setSection({ id: '' });
  };

  return (
    <>
      <h2>Add User To Course</h2>
      <Select
        title="User"
        optionList={processedUserList}
        value={user}
        setValue={setUser}
        displayColumn="name"
      />
      {
        user.name !== 'Select...'
          && (
            <Select
              title="Course"
              optionList={filterCourse()}
              value={course}
              setValue={setCourse}
              displayColumn="id"
            />
          )
      }
      {
        course.name !== 'Select...'
          && (
          <Select
            title="Section"
            optionList={listSection()}
            value={section}
            setValue={setSection}
            displayColumn="id"
          />
          )
      }
      {
        section.id !== ''
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
