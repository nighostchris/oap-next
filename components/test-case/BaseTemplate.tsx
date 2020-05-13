import * as React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { ButtonGroup, Button, Nav, Form } from 'react-bootstrap';
import { StatelessDataInput } from './DataInput';
import { StatelessAssertion } from './Assertions';
import { TestCase, StatelessTestCase } from './TestCase';
import { TestCaseContext, testsReducer } from './contexts/TestCaseContext';
import { StatelessAssertionFunction, StatelessFunction } from './Functions';
import CodeEditor from './CodeEditor';

interface testReflectionInterface {
  name: string
  field: any
  constructor: Array<any>
  method: any
}

const testReflectionResult: Array<testReflectionInterface> = [{
  name: "",
  field: {},
  constructor: [],
  method: {}
}, {
  name: "Player",
  field: {
    "name": "string",
    "units": "array"
  },
  constructor: [["string"], ["int", "boolean", "char", "string"]],
  method: {
    "getName": [],
    "equals": ["object"],
    "readyAllUnits": [],
    "getUnitList": [],
    "getUnitById": ["char"],
    "hasUnitsRemaining": [],
    "addUnit": ["Unit"],
    "hasReadyUnits": []
  }
}, {
  name: "Archer",
  field: {
    "DEFENSE_ARCHER": "int",
    "ATTACK_ARCHER": "int",
    "MOVEMENT_RANGE_ARCHER": "int",
    "ATTACK_RANGE_ARCHER": "int"
  },
  constructor: [["char", "int", "int"]],
  method: {
    "attackUnit": ["Unit"],
    "toString": [],
    "receiveDamage": ["double", "Unit"]
  }
}];

const BaseTemplate: React.FunctionComponent = () => {
  const [leftBarTab, setLeftBarTab] = React.useState('fields');
  const [viewController, setViewController] = React.useState(true);
  const [fieldsDrawerOpen, setFieldsDrawerOpen] = React.useState(true);
  const [testsState, testsDispatch] = React.useReducer(testsReducer, { tests: [], variables: [] });

  console.log(testsState);

  const handleDeleteDropItem = (item: any) => {
    if (item.hasOwnProperty('id')) {
      if (item.type === 'test') {
        testsDispatch({ type: 'REMOVE_TEST', id: item.id });
      }
    }
  };

  const [{ isOver }, dropBin] = useDrop({
    accept: ['test'],
    drop: (item) => handleDeleteDropItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOverDropTest }, dropTest] = useDrop({
    accept: ['test'],
    drop: () => testsDispatch({ type: 'ADD_TEST' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="col-12 px-0" style={{ height: '100vh' }}>
      <div className="row mx-0 align-items-center justify-content-center" style={{ height: '60px', borderBottom: '1px solid #E3EBF6' }}>
        <ButtonGroup style={{ justifySelf: 'center' }}>
          <Button
            variant={viewController ? "secondary" : "outline-secondary"}
            onClick={() => {
              if (!viewController) {
                setViewController(true);
              }
            }}
          >
            Diagram
          </Button>
          <Button
            variant={viewController ? "outline-secondary" : "secondary"}
            onClick={() => {
              if (viewController) {
                setViewController(false);
              }
            }}
          >
            Code
          </Button>
        </ButtonGroup>
        <Button className="mr-3" variant="outline-primary" style={{ position: 'absolute', right: '4.4rem' }}>Discard</Button>
        <Button variant="outline-primary" style={{ position: 'absolute', right: '.75rem' }}>Save</Button>
      </div>
      {
        viewController && (
          <div className="row mx-0" style={{ height: 'calc(100% - 60px)' }}>
            <div
              className={`px-0 ${fieldsDrawerOpen && "col-12 col-xl-3"}`}
              style={{ borderRight: '1px solid #E3EBF6', height: '100%', display: 'flex', flexDirection: 'row' }}
            >
              <div style={{ width: `${fieldsDrawerOpen ? "calc(100% - 20px)" : "0px"}` }}>
                <Nav
                  fill
                  variant="tabs"
                  activeKey={leftBarTab}
                  className="nav-overflow nav-tabs-sm justify-content-center px-2"
                  style={{ display: `${!fieldsDrawerOpen ? 'none' : 'flex'}` }}
                >
                  {/* <Nav.Item>
                    <Nav.Link eventKey="functions" onSelect={() => setLeftBarTab('functions')}>Functions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="operators" onSelect={() => setLeftBarTab('operators')}>Operators</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link eventKey="fields" onSelect={() => setLeftBarTab('fields')}>Fields</Nav.Link>
                  </Nav.Item>
                </Nav>
                {/* {
                  leftBarTab === 'functions'
                    && (
                      <div>
                        <DragCard funcName="getName" parameters={0} />
                        <DragCard funcName="hasReadyUnits" parameters={1} />
                      </div>
                    )
                }
                {
                  leftBarTab === 'operators'
                    && (
                      <div>
                        <Assertions funcName="AssertSame" parameters={2} />
                        <Assertions funcName="AssertEquals" parameters={2} />
                        <Assertions funcName="AssertTrue" parameters={1} />
                        <Assertions funcName="AssertFalse" parameters={1} />
                        <LogicStatements operators=">" />
                        <LogicStatements operators="<" />
                        <LogicStatements operators="==" />
                        <LogicStatements operators="!=" />
                      </div>
                    )
                } */}
                {
                  leftBarTab === 'fields'
                    && (
                      <div className="test-case-field">
                        <StatelessTestCase />
                        <StatelessAssertion name="assertEquals" />
                        <StatelessAssertion name="assertTrue" />
                        <StatelessAssertion name="assertFalse" />
                        <StatelessDataInput />
                        {
                          testReflectionResult.map((result: any) => (
                            Object.entries(result.method).map(([key, value]: [string, any]) => (
                              <StatelessAssertionFunction name={key} params={["object", ...value]} />
                            ))
                          ))
                        }
                        {
                          testReflectionResult.map((result: any) => (
                            Object.entries(result.method).map(([key, value]: [string, any]) => (
                              <StatelessFunction name={key} params={["object", ...value]} />
                            ))
                          ))
                        }
                      </div>
                    )
                }
              </div>
              <div style={{ width: '20px', backgroundColor: '#6E84A3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i
                  className={`fas fa-caret-${fieldsDrawerOpen ? "left" : "right"}`}
                  style={{ fontSize: '30px', color: 'white', cursor: 'pointer' }}
                  onClick={() => setFieldsDrawerOpen(!fieldsDrawerOpen)}
                />
              </div>
            </div>
            <TestCaseContext.Provider value={{ state: testsState, dispatch: testsDispatch }}>
              <div
                style={{ width: `${!fieldsDrawerOpen && 'calc(100% - 21px)'}`}}
                className={`px-0 drop-test-case-board ${fieldsDrawerOpen && "col-12 col-xl-9"}`}
              >
                <div className="px-0 mx-4 mt-4">
                  <div className="card mb-0" style={{ width: 'fit-content', minWidth: '400px' }}>
                    <div className="card-body">
                      <h3 className="card-title mb-4">Pre-Setup Stage</h3>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {
                          testsState.variables.map((varSelect: any, index: number) => (
                            <div className="card card-body mr-4 mb-0" style={{ minWidth: '250px' }}>
                              <Form.Group>
                                <Form.Label>Class</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={varSelect.class}
                                  onChange={(e) => {
                                    let classValue = (e.target as HTMLInputElement).value;
                                    if (classValue !== "") {
                                      testsDispatch({
                                        type: 'MODIFY_VARIABLE_CLASS',
                                        vid: index,
                                        class: classValue,
                                        params: testReflectionResult.filter((result) => result.name === (e.target as HTMLInputElement).value)[0].constructor[0]
                                      });
                                    }
                                  }}
                                >
                                  {
                                    testReflectionResult.map((result) => result.name).map((option, index) => (
                                      <option key={`type-option-${index}`}>
                                        {option}
                                      </option>
                                    ))
                                  }
                                </Form.Control>
                              </Form.Group>
                              {
                                varSelect.class !== "" && (
                                  <Form.Group>
                                    <Form.Label>
                                      Variable Name
                                    </Form.Label>
                                    <input
                                      value={varSelect.name}
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
                                varSelect.class !== "" && (
                                  <Form.Group>
                                    <Form.Label>Constructor</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={varSelect.constructor}
                                      onChange={(e) => {
                                        let constructorValue = (e.target as HTMLInputElement).value;
                                        if (constructorValue !== "") {
                                          testsDispatch({
                                            type: 'MODIFY_VARIABLE_CONSTRUCTOR',
                                            vid: index,
                                            constructor: Number(constructorValue),
                                            params: testReflectionResult.filter((result) => result.name === varSelect.class)[0].constructor[Number(constructorValue) - 1]
                                          });
                                        }
                                      }}
                                    >
                                      {
                                        [...Array(testReflectionResult.filter((result) => result.name === varSelect.class)[0].constructor.length).keys()]
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
                                { varSelect.params.length ? <Form.Label style={{ width: '100%' }}>Constructor Parameters</Form.Label> : undefined }
                                {
                                  varSelect.params.map((param: any, pIndex: number) => (
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
                                              className={`form-control form-control-prepended ${ pIndex !== varSelect.params.length - 1 ? "mb-4" : undefined }`}
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
                                                className={`${ pIndex !== varSelect.params.length - 1 && "mb-4" }`}
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
                                                  className={`form-control form-control-prepended ${ pIndex !== varSelect.params.length - 1 ? "mb-4" : undefined }`}
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
                                                  className={`form-control form-control-prepended ${ pIndex !== varSelect.params.length - 1 ? "mb-4" : undefined }`}
                                                />
                                              )
                                            )
                                          )
                                        }
                                      </>
                                  ))
                                }
                              </Form.Group>
                            </div>
                          ))
                        }
                        <Button
                          variant="outline-primary"
                          onClick={() => testsDispatch({ type: 'ADD_VARIABLE' })}
                          style={{ fontSize: '36px', fontWeight: 'bold', width: '100px' }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="drop-bin">
                  <div ref={dropBin} className="px-0 mx-4 mt-4">
                    <div className="card mb-0" style={{ border: '1px dashed #D2DDEC', textAlign: 'center' }}>
                      <div className="card-body" style={{ height: '100px', lineHeight: '52px', fontWeight: 'bold' }}>
                        Drop here to DELETE
                      </div>
                    </div>
                  </div>
                  <div
                    ref={dropTest}
                    className="mt-3"
                    style={{ display: 'flex', flexDirection: 'row', height: '100%', background: isOverDropTest ? '#95AAC9' : undefined }}
                  >
                    {
                      testsState.tests.map((test: any) => (
                        <TestCase id={test.id} name={test.name} child={test.child} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </TestCaseContext.Provider>
          </div>
        )
      }
      {
        !viewController && (
          <TestCaseContext.Provider value={{ state: testsState, dispatch: testsDispatch }}>
            <div className="row mx-0" style={{ height: 'calc(100% - 60px)' }}>
              <CodeEditor />
            </div>
          </TestCaseContext.Provider>
        )
      }
    </div>
  );
};

export default BaseTemplate;
