import * as React from 'react';
import { useDrop } from 'react-dnd-cjs';
import { Button } from 'react-bootstrap';
import TopBar from './components/TopBar';
import { TestCase } from './TestCase';
import FieldsPanel from './components/FieldsPanel';
import ClassVariable from './components/ClassVariable';
import BasicVariable from './components/BasicVariable';
import CodeEditor from './editor/CodeEditor';
import { TestCaseContext, testsReducer } from './contexts/TestCaseContext';

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
  const [language, setLanguage] = React.useState('Java');
  const [leftBarTab, setLeftBarTab] = React.useState('function');
  const [viewController, setViewController] = React.useState(true);
  const [fieldsDrawerOpen, setFieldsDrawerOpen] = React.useState(true);
  const [testsState, testsDispatch] = React.useReducer(testsReducer, { tests: [], variables: [] });

  console.log(testsState);

  const handleDeleteDropItem = (item: any) => {
    if (item.hasOwnProperty('id')) {
      if (item.type === 'existing-test') {
        testsDispatch({ type: 'REMOVE_TEST', id: item.id });
      }
      if (item.type === 'existing-function') {
        testsDispatch({ type: 'REMOVE_FUNCTION', id: item.id });
      }
      if (item.type === 'existing-assertion') {
        testsDispatch({ type: 'REMOVE_ASSERTION', id: item.id });
      }
      if (item.type === 'existing-assertion-function') {
        console.log('remove assertion function');
        testsDispatch({ type: 'REMOVE_ASSERTION_FUNCTION', id: item.id });
      }
      if (item.type === 'existing-dataInput') {
        console.log('remove data input');
        testsDispatch({ type: 'REMOVE_DATA_INPUT', id: item.id });
      }
    }
  };

  const [{ isOver }, dropBin] = useDrop({
    accept: ['existing-test', 'existing-function', 'existing-assertion', 'existing-assertion-function', 'existing-dataInput'],
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
      <TopBar language={language} setLanguage={setLanguage} viewController={viewController} setViewController={setViewController} />
      {
        viewController && (
          <div className="row mx-0" style={{ height: 'calc(100% - 60px)' }}>
            <FieldsPanel
              fieldsDrawerOpen={fieldsDrawerOpen}
              setFieldsDrawerOpen={setFieldsDrawerOpen}
              leftBarTab={leftBarTab}
              setLeftBarTab={setLeftBarTab}
              testReflectionResult={testReflectionResult}
            />
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
                              <i
                                className="fas fa-times"
                                style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '18px', color: 'gray', cursor: 'pointer' }}
                                onClick={() => testsDispatch({
                                  type: 'REMOVE_VARIABLE',
                                  id: index
                                })}
                              />
                              {
                                varSelect.category === 'class' && <ClassVariable variable={varSelect} index={index} testReflectionResult={testReflectionResult} />
                              }
                              {
                                varSelect.category === 'basic' && <BasicVariable variable={varSelect} index={index} />
                              }
                            </div>
                          ))
                        }
                        <Button
                          variant="outline-primary"
                          onClick={() => testsDispatch({ type: 'ADD_VARIABLE_CLASS' })}
                          style={{ fontSize: '36px', fontWeight: 'bold', width: '100px' }}
                        >
                          +
                        </Button>
                        <Button
                          className="ml-4"
                          variant="outline-success"
                          onClick={() => testsDispatch({ type: 'ADD_VARIABLE_BASIC' })}
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
                      <div
                        className="card-body"
                        style={{
                          height: '100px',
                          lineHeight: '52px',
                          fontWeight: 'bold',
                          opacity: isOver ? 0.2 : 1
                        }}
                      >
                        Drop here to DELETE
                      </div>
                    </div>
                  </div>
                  <div
                    ref={dropTest}
                    className="mt-3"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '100%',
                      minHeight: '200px',
                      background: isOverDropTest ? '#95AAC9' : undefined }}
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
