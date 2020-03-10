import * as React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

interface AddAssignmentDetailsProps {
  chances: string
  setChances: (value: string | ((prevVar: string) => string)) => void
  gradeImmediately: boolean
  setGradeImmediately: (value: boolean | ((prevVar: boolean) => boolean)) => void
  configYAML: string
  setConfigYAML: (value: string | ((prevVar: string) => string)) => void
  handleBack: any
  handleCreate: any
  creatingNewAssignment: boolean
  errorMessage: string
}

const AddAssignmentDetails: React.FunctionComponent<AddAssignmentDetailsProps> = ({
  chances, setChances, gradeImmediately, setGradeImmediately, configYAML,
  setConfigYAML, handleBack, handleCreate, creatingNewAssignment, errorMessage,
}) => {
  const [customChances, setCustomChances] = React.useState(false);
  const [chancesInvalid, setChancesInvalid] = React.useState(false);
  const [configYAMLEmpty, setConfigYAMLEmpty] = React.useState(false);

  const checkFieldValid = (e: any) => {
    e.preventDefault();
    let checkHandleCreate = true;

    if (customChances) {
      if (chances === "0") {
        checkHandleCreate = false;
        setChancesInvalid(true);
      } else {
        setChancesInvalid(false);
      }
    } else {
      setChancesInvalid(false);
    }

    if (!configYAML.length) {
      checkHandleCreate = false;
      setConfigYAMLEmpty(true);
    } else {
      setConfigYAMLEmpty(false);
    }

    if (checkHandleCreate) {
      handleCreate();
    }
  }

  return(
    <>
      <div className="row mb-6">
        <div className="col-12 col-md-6">
          <label className="mb-1">
            Number of Submission Chances
          </label>
          <small className="form-text text-muted">
            Ignore it if there are infinite submission chances.
          </small>
          <Form.Check
            type="switch"
            label=""
            id="custom-switch"
            checked={customChances}
            className="custom-checkbox-toggle"
            onChange={() => {
              setCustomChances(!customChances);
              if (customChances) {
                setChances("0");
              }
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="number"
            value={chances}
            onChange={(e) => setChances(e.target.value)}
            className="form-control"
          />
          { chancesInvalid && <span className="badge badge-soft-danger mt-2">Invalid value!</span> }
        </div>
      </div>
      <div className="row mb-6">
        <div className="col-12 col-md-6">
          <label className="mb-1">
            Grading Immediately
          </label>
          <small className="form-text text-muted">
            Ignore it if you wish to manually start the grading process.
          </small>
          <Form.Check
            type="switch"
            label=""
            id="custom-switch-1"
            checked={gradeImmediately}
            className="custom-checkbox-toggle"
            onChange={() => setGradeImmediately(!gradeImmediately)}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Config YAML</label>
        <textarea
          value={configYAML}
          style={{ resize: 'none' }}
          className="form-control"
          placeholder="Please type..."
          onChange={(e) => setConfigYAML(e.target.value)}
        />
        { configYAMLEmpty && <span className="badge badge-soft-danger mt-2">Field can't be empty!</span> }
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
          {
            !creatingNewAssignment && (
              <Button
                block
                className="mb-6"
                variant="primary"
                onClick={(e: any) => checkFieldValid(e)}
              >    
                Create
              </Button>
            )
          }
          {
            creatingNewAssignment && (
              <Button variant="primary" block disabled>
                <Spinner as="span" animation="border" size="sm" role="status" />
                <span className="sr-only">Loading...</span>
              </Button>
            )
          }
        </div>
        { errorMessage && <span className="badge badge-soft-danger mt-3 ml-3">{errorMessage}</span> }
      </div>
    </>
  );
};

export default AddAssignmentDetails;
