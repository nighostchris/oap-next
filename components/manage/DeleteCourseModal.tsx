import React from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';

interface DeleteCourseModalProps {
  show: boolean
  setShow: (value: boolean | ((prevVar: boolean) => boolean)) => void
  deleteCourseLoading: boolean
  setDeleteCourseLoading: (value: boolean | ((prevVar: boolean) => boolean)) => void
  deleteSection: any
  section_id: any
}

const DeleteCourseModal : React.SFC<DeleteCourseModalProps> = ({
  show, setShow, deleteCourseLoading, setDeleteCourseLoading, deleteSection, section_id,
}) => {
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0" style={{ fontSize: '1.5rem' }}>Sure to delete the course ?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>

        {
          !deleteCourseLoading && (
            <Button variant="primary" block onClick={() => {
              setDeleteCourseLoading(true);
              deleteSection({ variables: { section_id: section_id } });
            }}>
              Yes
            </Button>
          )
        }
        {
          deleteCourseLoading && (
            <Button variant="primary" block disabled>
              <Spinner as="span" animation="border" size="sm" role="status" />
              <span className="sr-only">Deleting...</span>
            </Button>
          )
        }
        <Button
          block
          className="mt-0"
          variant="secondary"
          onClick={() => setShow(false)}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCourseModal;
