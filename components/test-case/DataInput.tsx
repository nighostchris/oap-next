import React from 'react';
import { useDrag } from 'react-dnd-cjs';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Form } from 'react-bootstrap';

interface DataInputProps {
  id: Array<number>
  value: any
  inputType: any
}

export const StatelessDataInput: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'dataInput'
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', opacity: isDragging ? 0.7 : 1 }}
    >
      <div className="card-body p-3">
        <input
          disabled
          placeholder="Data Input"
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};

export const DataInput: React.FC<DataInputProps> = ({ id, value, inputType }) => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'existing-dataInput',
      id: id
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', opacity: isDragging ? 0.7 : 1 }}
    >
      <div className="card-body p-3">
        <Form.Group>
          <Form.Label>Input Type</Form.Label>
          <Form.Control
            as="select"
            value={inputType}
            onChange={(e) => {
              let inputTypeValue = (e.target as HTMLInputElement).value;
              if (inputTypeValue !== "") {
                testsDispatch({
                  type: 'MODIFY_DATA_INPUT_TYPE',
                  id: id,
                  inputType: inputTypeValue
                });
              }
            }}
          >
            {
              ["", "boolean", "char", "double", "float", "int", "string", "object"].map((option, index) => (
                <option key={`type-option-${index}`}>
                  {option}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
        {
          inputType !== "" && !["boolean", "object"].includes(inputType) && (
            <input
              value={value}
              type={["int", "double", "float"].includes(inputType) ? "number" : undefined}
              maxLength={inputType === "char" ? 1 : undefined}
              onChange={(e) => testsDispatch({
                type: 'MODIFY_DATA_INPUT_VALUE',
                id: id,
                value: ["int", "double", "float"].includes(inputType) ? Number(e.target.value) : e.target.value
              })}
              className="form-control form-control-prepended"
            />
          )
        }
        {
          inputType !== "" && inputType === "boolean" && (
            <Form.Check
              type="switch"
              id={`data-input-switch${id.join("")}`}
              label="True / False"
              checked={value}
              onChange={() => testsDispatch({
                type: 'MODIFY_DATA_INPUT_VALUE',
                id: id,
                value: !value
              })}
              className="form-control form-control-prepended"
            />
          )
        }
        {
          inputType !== "" && inputType === "object" && (
            <Form.Group>
              <Form.Label>Custom Variable</Form.Label>
              <Form.Control
                as="select"
                value={value}
                onChange={(e) => {
                  let customValue = (e.target as HTMLInputElement).value;
                  console.log(customValue);
                  if (customValue !== "") {
                    testsDispatch({
                      type: 'MODIFY_DATA_INPUT_VALUE',
                      id: id,
                      value: customValue
                    });
                  }
                }}
              >
                {
                  [{ class: "", name: "", constructor: 1, params: [] }, ...testsState.variables.filter((variable: any) => variable.name !== "")]
                    .map((option, index) => (
                      <option key={`custom-value-${index}`}>
                        {option.name}
                      </option>
                    )
                  )
                }
              </Form.Control>
            </Form.Group>
          )
        }
      </div>
    </div>
  );
};
