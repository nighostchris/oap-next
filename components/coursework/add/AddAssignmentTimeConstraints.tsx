import * as React from 'react';
import Flatpickr from 'react-flatpickr';
import { Form } from 'react-bootstrap';

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

}

const AddAssignmentTimeConstraint: React.FunctionComponent<AddAssignmentTimeConstraintProps> = ({
  showAt, setShowAt, showAtTime, setShowAtTime, startCollectionAt, setStartCollectionAt,
  startCollectionTime, setStartCollectionTime, dueAt, setDueAt, stopCollectionAt,
  setStopCollectionAt, releaseGradeAt, setReleaseGradeAt, releaseGradeTime, setReleaseGradeTime,
}) => {

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
            onChange={() => setShowAt(!showAt)}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static' }}
            data-enable-time
            disabled={!showAt}
            value={showAtTime}
            onChange={(d) => setShowAtTime(d)}
          />
        </div>
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
            onChange={() => setStartCollectionAt(!startCollectionAt)}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static' }}
            data-enable-time
            disabled={!startCollectionAt}
            value={startCollectionTime}
            onChange={(d) => setStartCollectionTime(d)}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Due Date of Assignment</label>
        <Flatpickr
          className="form-control"
          options={{ monthSelectorType: 'static' }}
          data-enable-time
          value={dueAt}
          onChange={(d) => setDueAt(d)}
        />
      </div>
      <div className="form-group">
        <label>Date of stopping collection of Assignment</label>
        <Flatpickr
          className="form-control"
          options={{ monthSelectorType: 'static' }}
          data-enable-time
          value={stopCollectionAt}
          onChange={(d) => setStopCollectionAt(d)}
        />
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
            id="custom-switch-1"
            checked={releaseGradeAt}
            className="custom-checkbox-toggle"
            onChange={() => setReleaseGradeAt(!releaseGradeAt)}
          />
        </div>
        <div className="col-12 col-md-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Flatpickr
            className="form-control"
            options={{ monthSelectorType: 'static' }}
            data-enable-time
            disabled={!releaseGradeAt}
            value={releaseGradeTime}
            onChange={(d) => setReleaseGradeTime(d)}
          />
        </div>
      </div>
    </>
  );
};

export default AddAssignmentTimeConstraint;
