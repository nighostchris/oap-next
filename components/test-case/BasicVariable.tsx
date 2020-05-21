import React from 'react';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Form } from 'react-bootstrap';

interface BasicVariableProps {
  variable: any
  index: number
}

const BasicVariable: React.FC<BasicVariableProps> = ({ variable, index }) => {
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);

  return (
    <>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={variable.type}
          onChange={(e) => {
            let typeValue = (e.target as HTMLInputElement).value;
            if (typeValue !== "") {
              testsDispatch({
                type: 'MODIFY_VARIABLE_TYPE',
                vid: index,
                typeValue: typeValue
              });
            }
          }}
        >
          {
            ["", "boolean", "char", "double", "float", "int", "string", "ArrayList"].map((option, index) => (
              <option key={`type-option-${index}`}>
                {option}
              </option>
            ))
          }
        </Form.Control>
      </Form.Group>
      {
        variable.type !== "" && (
          <Form.Group>
            <Form.Label>
              Variable Name
            </Form.Label>
            <input
              value={variable.name}
              onChange={(e) => testsDispatch({
                type: 'MODIFY_VARIABLE_NAME',
                vid: index,
                name: e.target.value
              })}
              className="form-control form-control-prepended"
            />
          </Form.Group>
        )
      }
      {
        variable.type !== "" && variable.type === "ArrayList" && (
          <Form.Group>
            <Form.Label>Custom Variable</Form.Label>
            <Form.Control
              as="select"
              value={variable.subtype}
              onChange={(e) => {
                let subtype = (e.target as HTMLInputElement).value;
                if (subtype !== "") {
                  testsDispatch({
                    type: 'MODIFY_VARIABLE_SUBTYPE',
                    vid: index,
                    subtype: subtype
                  });
                }
              }}
            >
              {
                ["", "boolean", "char", "double", "float", "int", "string", "Player", "Archer"]
                  .map((option, index) => (
                    <option key={`${variable.type}-value-${index}`}>
                      {option}
                    </option>
                  )
                )
              }
            </Form.Control>
          </Form.Group>
        )
      }
      {
        variable.type !== "" && !["boolean"].includes(variable.type) && (
          <Form.Group>
            <Form.Label>Value</Form.Label>
            <input
              value={variable.value}
              type={["int", "double", "float"].includes(variable.type) ? "number" : undefined}
              maxLength={variable.type === "char" ? 1 : undefined}
              onChange={(e) => testsDispatch({
                type: 'MODIFY_VARIABLE_VALUE',
                vid: index,
                value: ["int", "double", "float"].includes(variable.type) ? Number(e.target.value) : e.target.value
              })}
              className="form-control form-control-prepended"
            />
          </Form.Group>
        )
      }
      {
        variable.type !== "" && variable.type === "boolean" && (
          <Form.Check
            type="switch"
            id={`variable-switch${index}`}
            label="True / False"
            checked={variable.value}
            onChange={() => testsDispatch({
              type: 'MODIFY_VARIABLE_VALUE',
              vid: index,
              value: !variable.value
            })}
          />
        )
      }
    </>
  );
};

export default BasicVariable;
