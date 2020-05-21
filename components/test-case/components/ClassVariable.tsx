import React from 'react';
import { TestCaseContext } from '../contexts/TestCaseContext';
import { Form } from 'react-bootstrap';

interface ClassVariableProps {
  variable: any
  index: number
  testReflectionResult: any
}

const ClassVariable: React.FC<ClassVariableProps> = ({ variable, index, testReflectionResult }) => {
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);

  return (
    <>
      <Form.Group>
        <Form.Label>Class</Form.Label>
        <Form.Control
          as="select"
          value={variable.class}
          onChange={(e) => {
            let classValue = (e.target as HTMLInputElement).value;
            if (classValue !== "") {
              testsDispatch({
                type: 'MODIFY_VARIABLE_CLASS',
                vid: index,
                class: classValue,
                params: testReflectionResult.filter((result: any) => result.name === (e.target as HTMLInputElement).value)[0].constructor[0]
              });
            }
          }}
        >
          {
            testReflectionResult.map((result: any) => result.name).map((option: any, index: number) => (
              <option key={`type-option-${index}`}>
                {option}
              </option>
            ))
          }
        </Form.Control>
      </Form.Group>
      {
        variable.class !== "" && (
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
        variable.class !== "" && (
          <Form.Group>
            <Form.Label>Constructor</Form.Label>
            <Form.Control
              as="select"
              value={variable.constructor}
              onChange={(e) => {
                let constructorValue = (e.target as HTMLInputElement).value;
                if (constructorValue !== "") {
                  testsDispatch({
                    type: 'MODIFY_VARIABLE_CONSTRUCTOR',
                    vid: index,
                    constructor: Number(constructorValue),
                    params: testReflectionResult.filter((result: any) => result.name === variable.class)[0].constructor[Number(constructorValue) - 1]
                  });
                }
              }}
            >
              {
                [...Array(testReflectionResult.filter((result: any) => result.name === variable.class)[0].constructor.length).keys()]
                  .map(i => i + 1).map((option, index) => (
                    <option key={`type-option-${index}`}>
                      {option}
                    </option>
                  )
                )
              }
            </Form.Control>
          </Form.Group>
        )
      }
      <Form.Group className="mb-0">
        { variable.params.length ? <Form.Label style={{ width: '100%' }}>Constructor Parameters</Form.Label> : undefined }
        {
          variable.params.map((param: any, pIndex: number) => (
            <>
              <Form.Label>{`${param.type.charAt(0).toUpperCase() + param.type.slice(1)}`}</Form.Label>
              {
                param.type === "string"
                  ? (
                    <input
                      value={param.value}
                      onChange={(e) => testsDispatch({
                        type: 'MODIFY_VARIABLE_PARAMS',
                        vid: index,
                        pid: pIndex,
                        param: { type: param.type, value: e.target.value }
                      })}
                      className={`form-control form-control-prepended ${ pIndex !== variable.params.length - 1 ? "mb-4" : undefined }`}
                    />
                  )
                  : (param.type === "boolean"
                    ? (
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="True / False"
                        checked={param.value}
                        onChange={() => testsDispatch({
                          type: 'MODIFY_VARIABLE_PARAMS',
                          vid: index,
                          pid: pIndex,
                          param: { type: param.type, value: !param.value }
                        })}
                        className={`${ pIndex !== variable.params.length - 1 && "mb-4" }`}
                      />
                    )
                    : (param.type === "char"
                      ? (
                        <input
                          value={param.value}
                          maxLength={1}
                          onChange={(e) => testsDispatch({
                            type: 'MODIFY_VARIABLE_PARAMS',
                            vid: index,
                            pid: pIndex,
                            param: { type: param.type, value: e.target.value }
                          })}
                          className={`form-control form-control-prepended ${ pIndex !== variable.params.length - 1 ? "mb-4" : undefined }`}
                        />
                      )
                      : (
                        <input
                          type="number"
                          value={param.value}
                          onChange={(e) => testsDispatch({
                            type: 'MODIFY_VARIABLE_PARAMS',
                            vid: index,
                            pid: pIndex,
                            param: { type: param.type, value: Number(e.target.value) }
                          })}
                          className={`form-control form-control-prepended ${ pIndex !== variable.params.length - 1 ? "mb-4" : undefined }`}
                        />
                      )
                    )
                  )
                }
              </>
          ))
        }
      </Form.Group>
    </>
  );
};

export default ClassVariable;
