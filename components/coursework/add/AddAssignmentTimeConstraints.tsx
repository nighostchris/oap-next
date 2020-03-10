import * as React from 'react';
import Flatpickr from 'react-flatpickr';
import { Form, Button } from 'react-bootstrap';

interface AddAssignmentTimeConstraintProps {
  showAt: any
  setShowAt: any
  showAtTime: any
  setShowAtTime: any
  startCollectionAt: any
  setStartCollectionAt: any
  startCollectionTime: any
  setStartCollectionTime: any
  dueAt: any
  setDueAt: any
  stopCollectionAt: any
  setStopCollectionAt: any
  releaseGradeAt: any
  setReleaseGradeAt: any
  releaseGradeTime: any
  setReleaseGradeTime: any
  handleNext: any
  handleBack: any
}

const AddAssignmentTimeConstraint: React.FunctionComponent<AddAssignmentTimeConstraintProps> = ({
  showAt, setShowAt, showAtTime, setShowAtTime, startCollectionAt, setStartCollectionAt,
  startCollectionTime, setStartCollectionTime, dueAt, setDueAt, stopCollectionAt,
  setStopCollectionAt, releaseGradeAt, setReleaseGradeAt, releaseGradeTime, setReleaseGradeTime,
  handleBack, handleNext,
}) => {
  const [showAtEmpty, setShowAtEmpty] = React.useState(false);
  const [startCollectionAtEmpty, setStartCollectionAtEmpty] = React.useState(false);
  const [dueAtEmpty, setDueAtEmpty] = React.useState(false);
  const [stopCollectionAtEmpty, setStopCollectionAtEmpty] = React.useState(false);
  const [releaseGradeAtEmpty, setReleaseGradeAtEmpty] = React.useState(false);

  const checkFieldValid = (e: any) => {
    e.preventDefault();
    let checkHandleNext = true;

    if (showAt) {
      if (!showAtTime.length) {
        setShowAtEmpty(true);
        checkHandleNext = false;
      } else {
        setShowAtEmpty(false);
      }
    } else {
      setShowAtEmpty(false);
    }

    if (startCollectionAt) {
      if (!startCollectionTime.length) {
        setStartCollectionAtEmpty(true);
        checkHandleNext = false;
      } else {
        setStartCollectionAtEmpty(false);
      }
    } else {
      setStartCollectionAtEmpty(false);
    }

    if (!dueAt.length) {
      setDueAtEmpty(true);
      checkHandleNext = false;
    } else {
      setDueAtEmpty(false);
    }

    if (!stopCollectionAt.length) {
      setStopCollectionAtEmpty(true);
      checkHandleNext = false;
    } else {
      setStopCollectionAtEmpty(false);
    }

    if (releaseGradeAt) {
      if (!releaseGradeTime.length) {
        setReleaseGradeAtEmpty(true);
        checkHandleNext = false;
      } else {
        setReleaseGradeAtEmpty(false);
      }
    } else {
      setReleaseGradeAtEmpty(false);
    }

    if (checkHandleNext) {
      handleNext();
    }
  }

  return(
    <>
      <div className="row mb-6">
        <div className="col-12 col-md-6">
          <label className="mb-1">
            Publish Assignment
          </label>
          <small className="form-text text-muted">
            Click if you want to specify the date for publishing the assignment.
            Otherwise, assignment will be published immediately.
          </small>
          <Form.Check
            type="switch"
            label=""
            id="custom-switch"
            checked={showAt}
            className="custom-checkbox-toggle"
            onChange={() => {
              setShowAt(!showAt);
              if (showAt) {
                setShowAtTime([]);
              }
            }}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static', minDate: 'today' }}
            data-enable-time
            disabled={!showAt}
            value={showAtTime}
            onChange={(d) => setShowAtTime(d)}
          />
        </div>
        { showAtEmpty && <span className="badge badge-soft-danger mt-3 ml-3">Field can't be empty!</span> }
      </div>
      <div className="row mb-6">
        <div className="col-12 col-md-6">
          <label className="mb-1">
            Date of starting collection of Assignment
          </label>
          <small className="form-text text-muted">
            Ignore it if you wish to start collecting assignments once it is released.
          </small>
          <Form.Check
            type="switch"
            label=""
            id="custom-switch-1"
            checked={startCollectionAt}
            className="custom-checkbox-toggle"
            onChange={() => {
              setStartCollectionAt(!startCollectionAt);
              if (startCollectionAt) {
                setStartCollectionTime([]);
              }
            }}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static', minDate: 'today' }}
            data-enable-time
            disabled={!startCollectionAt}
            value={startCollectionTime}
            onChange={(d) => setStartCollectionTime(d)}
          />
        </div>
        { startCollectionAtEmpty && <span className="badge badge-soft-danger mt-3 ml-3">Field can't be empty!</span> }
      </div>
      <div className="form-group">
        <label>Due Date of Assignment</label>
        <Flatpickr
          className="form-control"
          options={{ monthSelectorType: 'static', minDate: 'today' }}
          data-enable-time
          value={dueAt}
          onChange={(d) => setDueAt(d)}
        />
        { dueAtEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
      </div>
      <div className="form-group">
        <label>Date of stopping collection of Assignment</label>
        <Flatpickr
          className="form-control"
          options={{ monthSelectorType: 'static', minDate: 'today' }}
          data-enable-time
          value={stopCollectionAt}
          onChange={(d) => setStopCollectionAt(d)}
        />
        { stopCollectionAtEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
      </div>
      <div className="row mb-6">
        <div className="col-12 col-md-6">
          <label className="mb-1">
            Grade Release Date
          </label>
          <small className="form-text text-muted">
            Choose if you want to specify the date of releasing grades.
            Otherwise, assignment will be automatically graded and release
            the grade immediately.
          </small>
          <Form.Check
            type="switch"
            label=""
            id="custom-switch-2"
            checked={releaseGradeAt}
            className="custom-checkbox-toggle"
            onChange={() => {
              setReleaseGradeAt(!releaseGradeAt);
              if (releaseGradeAt) {
                setReleaseGradeTime([]);
              }
            }}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static', minDate: 'today' }}
            data-enable-time
            disabled={!releaseGradeAt}
            value={releaseGradeTime}
            onChange={(d) => setReleaseGradeTime(d)}
          />
        </div>
        { releaseGradeAtEmpty && <span className="badge badge-soft-danger mt-3 ml-3">Field can't be empty!</span> }
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="col-12 col-md-5">
          <Button
            block
            href="#"
            className="mb-6"
            variant="primary"
            onClick={(e: any) => handleBack(e)}
          >    
            Back
          </Button>
        </div>
        <div className="col-12 col-md-5">
          <Button
            block
            href="#"
            className="mb-6"
            variant="primary"
            onClick={(e: any) => checkFieldValid(e)}
          >    
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddAssignmentTimeConstraint;
