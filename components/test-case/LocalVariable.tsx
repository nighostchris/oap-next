import React from 'react';
import { useDrag } from 'react-dnd-cjs';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Form } from 'react-bootstrap';

interface LocalVariableProps {
  id: Array<number>
  name: any
  value: any
  varType: any
  varSubtype?: any
}

export const StatelessLocalVariable: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'local-variable'
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
          placeholder="Variable"
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};

export const LocalVariable: React.FC<LocalVariableProps> = ({ id, value, name, varType, varSubtype }) => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);

  // const changeValue = (v: any) => {
  //   const temp = parent;
  //   temp[pos].value = v;
  //   setParent([...temp]);
  // };

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: 'dataInput',
  //     pos: pos,
  //     parent: parent,
  //     setParent: setParent,
  //   },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  return (
    <div
      //ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', /*opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body p-3">
        <Form.Group>
          <Form.Label>Variable Type</Form.Label>
          <Form.Control
            as="select"
            value={varType}
            onChange={(e) => {
              let varTypeValue = (e.target as HTMLInputElement).value;
              if (varTypeValue !== "") {
                testsDispatch({
                  type: 'MODIFY_LOCAL_VARIABLE_TYPE',
                  id: id,
                  varType: varTypeValue
                });
              }
            }}
          >
            {
              ["", "boolean", "char", "double", "float", "int", "string", "object", "ArrayList"].map((option, index) => (
                <option key={`type-option-${index}`}>
                  {option}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
        {
          varType !== "" && (
            <Form.Group>
              <Form.Label>
                Variable Name
              </Form.Label>
              <input
                value={name}
                onChange={(e) => testsDispatch({
                  type: 'MODIFY_LOCAL_VARIABLE_NAME',
                  id: id,
                  name: e.target.value
                })}
                className="form-control form-control-prepended"
              />
            </Form.Group>
          )
        }
        {
          varType !== "" && varType === "ArrayList" && (
            <Form.Group>
              <Form.Label>Custom Variable</Form.Label>
              <Form.Control
                as="select"
                value={varSubtype}
                onChange={(e) => {
                  let subtype = (e.target as HTMLInputElement).value;
                  if (subtype !== "") {
                    testsDispatch({
                      type: 'MODIFY_LOCAL_VARIABLE_SUBTYPE',
                      id: id,
                      varSubtype: subtype
                    });
                  }
                }}
              >
                {
                  ["", "boolean", "char", "double", "float", "int", "string", "Player", "Archer"]
                    .map((option, index) => (
                      <option key={`${varType}-value-${index}`}>
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
          varType !== "" && !["boolean", "object"].includes(varType) && (
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <input
                value={value}
                type={["int", "double", "float"].includes(varType) ? "number" : undefined}
                maxLength={varType === "char" ? 1 : undefined}
                onChange={(e) => testsDispatch({
                  type: 'MODIFY_LOCAL_VARIABLE_VALUE',
                  id: id,
                  value: ["int", "double", "float"].includes(varType) ? Number(e.target.value) : e.target.value
                })}
                className="form-control form-control-prepended"
              />
            </Form.Group>
          )
        }
        {
          varType !== "" && varType === "boolean" && (
            <Form.Check
              type="switch"
              id={`data-input-switch${id.join("")}`}
              label="True / False"
              checked={value}
              onChange={() => testsDispatch({
                type: 'MODIFY_LOCAL_VARIABLE_VALUE',
                id: id,
                value: !value
              })}
            />
          )
        }
        {
          varType !== "" && varType === "object" && (
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
                      type: 'MODIFY_LOCAL_VARIABLE_VALUE',
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
