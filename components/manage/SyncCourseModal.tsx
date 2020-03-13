import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Modal, Spinner, Accordion, Card, Row, Form, Button } from 'react-bootstrap';

interface SyncCourseModalProps {
  show: boolean
  setShow: (value: boolean | ((prevVar: boolean) => boolean)) => void
  newCourseList: any[]
  addCourseList: boolean[]
  setAddCourseList: (value: boolean[] | ((prevVar: boolean[]) => boolean[])) => void
  addSectionList: any[]
  setAddSectionList: (value: any[] | ((prevVar: any[]) => any[])) => void
  loadingCourseList: boolean
}

const SyncCourseModal : React.SFC<SyncCourseModalProps> = ({
  show, setShow, newCourseList, addCourseList, addSectionList, loadingCourseList,
  setAddCourseList, setAddSectionList,
}) => {

  const insertCourses = () => {
    addCourseList.forEach((addCourse) => {
      if (addCourse) {
        // add course mutation
      }
    })
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
    temp[index][sIndex] = !temp[index][sIndex];
    setAddSectionList([...temp]);
  }

  console.log(newCourseList, addSectionList);

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
        <Button variant="primary" onClick={() => setShow(false)}>
          Insert into Database
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SyncCourseModal;
