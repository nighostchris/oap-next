import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Modal, Spinner, Accordion, Card, Row, Form, Button } from 'react-bootstrap';

const INSERT_SECTION = gql`
  mutation insertSection($course_id: bigint!, $name: String!) {
    insert_sections(objects: {course_id: $course_id, name: $name}) {
      returning {
        id
      }
    }
  }
`;

const INSERT_COURSE = gql`
  mutation insertCourse($code: String!, $name: String!, $semester_id: bigint!) {
    insert_courses(objects: {code: $code, name: $name, semester_id: $semester_id, is_shown: false}) {
      returning {
        id
        code
      }
    }
  }
`;

const INSERT_SEMESTER = gql`
  mutation insertSemester($semester: Int, $year: Int) {
    insert_semesters(objects: {semester: $semester, year: $year}) {
      returning {
        id
      }
    }
  }
`;

interface SyncCourseModalProps {
  show: boolean
  setShow: (value: boolean | ((prevVar: boolean) => boolean)) => void
  semester: string
  newCourseList: any[]
  addCourseList: boolean[]
  setAddCourseList: (value: boolean[] | ((prevVar: boolean[]) => boolean[])) => void
  addSectionList: any[]
  setAddSectionList: (value: any[] | ((prevVar: any[]) => any[])) => void
  loadingCourseList: boolean
  refetch: any
}

const SyncCourseModal : React.SFC<SyncCourseModalProps> = ({
  show, setShow, newCourseList, addCourseList, addSectionList, loadingCourseList,
  semester, setAddCourseList, setAddSectionList, refetch,
}) => {
  const [insertIntoDatabaseLoading, setInsertIntoDatabaseLoading] = React.useState(false);
  const [insertSection] = useMutation(INSERT_SECTION, {
    onCompleted: () => {
      console.log(insertSection);
      refetch();
    },
    onError: (error) => {
      console.log(error);
      setInsertIntoDatabaseLoading(false);
    }
  });

  const [insertCourse] = useMutation(INSERT_COURSE, {
    onCompleted: (data) => {
      const course_id = data.insert_courses.returning[0].id;
      const course_code = data.insert_courses.returning[0].code;
      const listLocation = newCourseList.findIndex((course) => course.code === course_code);
      addSectionList[listLocation].map((section: boolean, sectionIndex: number) => {
        if (section) {
          insertSection({
            variables: {
              course_id: parseInt(course_id),
              name: newCourseList[listLocation].sections[sectionIndex]
            }
          })
        }
      });
      console.log("insertCourse");
    },
    onError: (error) => {
      console.log(error);
      setInsertIntoDatabaseLoading(false);
    }
  });

  const [insertSemester] = useMutation(INSERT_SEMESTER, {
    onCompleted: (data) => {
      const semester_id = data.insert_semesters.returning[0].id;
      addCourseList.forEach((addCourse, index) => {
        if (addCourse) {
          insertCourse({
            variables: {
              code: newCourseList[index].code,
              name: newCourseList[index].name,
              semester_id: parseInt(semester_id)
            }
          });
        }
      });
      console.log("insertSemester");
      setInsertIntoDatabaseLoading(false);
      setShow(false);
    },
    onError: (error) => {
      console.log(error);
      setInsertIntoDatabaseLoading(false);
    }
  });

  const yearGenerator = () => {
    if (semester.includes("10") || semester.includes("20")) {
      return `20${semester.substr(0, 2)}`;
    } else {
      return `20${parseInt(semester.substr(0, 2)) + 1}`;
    }
  }

  const handleInsertIntoDatabase = () => {
    insertSemester({
      variables: { semester: parseInt(semester) + 1, year: yearGenerator() }
    });
  }

  const changeAddCourseList = (index: number) => {
    const temp = addCourseList;
    let temp2 = addSectionList;
    temp[index] = !temp[index];
    if (addCourseList[index]) {
      temp2[index] = temp2[index].map(() => true);
    } else {
      temp2[index] = temp2[index].map(() => false);
    }
    setAddCourseList([...temp]);
    setAddSectionList([...temp2]);
  }

  const changeAddSectionList = (index: number, sIndex: number) => {
    const temp = addSectionList;
    let temp2 = addCourseList;
    if (temp[index][sIndex]) {
      if (temp[index].filter((t: boolean) => t).length === 1) {
        temp2[index] = false;
      }
    } else {
      temp2[index] = true;
    }
    temp[index][sIndex] = !temp[index][sIndex];
    setAddSectionList([...temp]);
    setAddCourseList([...temp2]);
  }

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0" style={{ fontSize: '1.5rem' }}>Sync Courses List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          loadingCourseList && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )
        }
        {
          !loadingCourseList && !newCourseList.length && (
            "No New Semester Detected"
          )
        }
        {
          !loadingCourseList && (
            <Accordion>
              {
                newCourseList.map((course, index) => (
                  <Card className="mb-0" key={`courses-card-${index}`}>
                    <Row className="mx-0" style={{ alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        className="ml-4"
                        checked={addCourseList[index]}
                        onChange={() => changeAddCourseList(index)}
                      />
                      <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                        {`${course.code} ${course.name}`}
                      </Accordion.Toggle>
                    </Row>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body className="ml-4">
                        {
                          course.sections.map((section: string, sIndex: number) => (
                            <React.Fragment key={`section-${sIndex}`}>
                              <Form.Check
                                inline
                                type="checkbox"
                                label={section}
                                checked={addSectionList[index][sIndex]}
                                onChange={() => changeAddSectionList(index, sIndex)}
                              />
                            </React.Fragment>
                          ))
                        }
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))
              }
            </Accordion>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        {
          !insertIntoDatabaseLoading && (
            <Button variant="primary" onClick={() => handleInsertIntoDatabase()}>
              Insert into Database
            </Button>
          )
        }
        {
          insertIntoDatabaseLoading && (
            <Button variant="primary" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" />
              <span className="sr-only">Loading...</span>
            </Button>
          )
        }
      </Modal.Footer>
    </Modal>
  );
};

export default SyncCourseModal;
