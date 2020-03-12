import * as React from 'react';
import axios from 'axios';
import { useQuery, gql } from '@apollo/client';
import { Button, Badge, ListGroup } from 'react-bootstrap';
import SyncCourseModal from './SyncCourseModal';

const GET_ALL_COURSES = gql`
  query getAllCourses {
    sections {
      name
      course {
        code
        name
        semester {
          semester
          year
        }
        is_shown
      }
    }
  }
`;

const CourseManage: React.FunctionComponent = () => {
  const [show, setShow] = React.useState(false);
  const [newCourseList, setNewCourseList] = React.useState<any[]>([]);
  const [addCourseList, setAddCourseList] = React.useState<boolean[]>([]);
  const [addSectionList, setAddSectionList] = React.useState<any[]>([]);
  const [loadingCourseList, setLoadingCourseList] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const { loading, error, data } = useQuery(GET_ALL_COURSES);
  const courses: any[] = [];

  const semesterNameConverter = (code: string) => {
    if (code.indexOf("10") > 0) {
      return "Fall";
    }
    if (code.indexOf("20") > 0) {
      return "Winter";
    }
    if (code.indexOf("30") > 0) {
      return "Spring";
    }
    if (code.indexOf("40") > 0) {
      return "Summer";
    }
  }

  const getCoursesList = async () => {
    setLoadingCourseList(true);
    const axiosResponse = await axios.get('https://ust-courses.now.sh/api/courses');
    setAddCourseList([...new Array(axiosResponse.data.length).fill(false)]);
    const tempAddSectionList: any[] = [];
    axiosResponse.data.map((c: any) => {
      tempAddSectionList.push(new Array(c.sections.length).fill(false));
    });
    setAddSectionList([...tempAddSectionList]);
    setLoadingCourseList(false);
    setNewCourseList([...axiosResponse.data]);
  };

  if (error) {
    console.log(error);
  }

  if (!loading) {
    data.sections.forEach((section: any) => {
      courses.push({
        code: section.course.code,
        name: section.course.name,
        semester: section.course.semester.semester,
        year: section.course.semester.year,
        section: section.name,
        isShown: section.course.is_shown,
      });
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-5" style={{ flex: 1 }} data-toggle="lists">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h2 className="card-header-title">
                    Manage Courses
                  </h2>
                </div>
                <div className="col-auto">
                  <div className="dropleft">
                    <Button variant="primary" className="px-5" onClick={() => { setShow(true); getCoursesList(); }}>Sync</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-header">
              <div className="row">
                <div className="col-12">
                  <form>
                    <div className="input-group input-group-flush input-group-merge">
                      <input
                        type="search"
                        value={keyword}
                        placeholder="Search"
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-control form-control-prepended search"
                      />
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <span className="fe fe-search" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card-body">
              <ListGroup as="ul" variant="flush" className="list-group-lg list my-n4">
                {
                  courses.map((course: any, index: number) => (
                    <ListGroup.Item className="px-0" key={`course-${index}`}>
                      <div className="row align-items-center">
                        <div className="col ml-n2">
                          <h3 className="card-title mb-0">
                            {`${course.code} - ${course.name}`}
                          </h3>
                          <div className="row ml-0 mt-2">
                            <h2 className="mb-0 mr-4">
                              <Badge variant="info">{course.section}</Badge>
                            </h2>
                            <h2 className="mb-0 mr-4">
                              <Badge variant="primary">
                                {`${course.year} ${semesterNameConverter(course.semester.toString())}`}
                              </Badge>
                            </h2>
                            <h2 className="mb-0">
                              <Badge variant={course.isShown ? "success" : "warning"}>{course.isShown ? 'Public' : 'Private'}</Badge>
                            </h2>
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="" className="btn btn-sm btn-white d-none d-md-inline-block">Delete</a>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </div>
          </div>
        </div>
        <SyncCourseModal
          show={show}
          setShow={setShow}
          newCourseList={newCourseList}
          addCourseList={addCourseList}
          addSectionList={addSectionList}
          loadingCourseList={loadingCourseList}
          setAddCourseList={setAddCourseList}
          setAddSectionList={setAddSectionList}
        />
      </div>
    </div>
  );
};

export default CourseManage;
