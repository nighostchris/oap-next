import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { DataInput } from './DataInput';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Instance } from './Instance';
import { Form } from 'react-bootstrap';

interface AssertionFunctionProps {
  id: Array<number>
  name: string
  child: Array<any>
}

interface FunctionProps {
  id: Array<number>
  name: string
  child: Array<any>
}

interface StatelessAssertionFunctionProps {
  name: string
  params: number
}

interface StatelessFunctionProps {
  name: string
  params: Array<string>
}

export const StatelessAssertionFunction: React.FC<StatelessAssertionFunctionProps> = ({ name, params }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'assertion-function',
      name: name,
      params: params
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
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}()`}</h3>
      </div>
    </div>
  );
};

export const StatelessFunction: React.FC<StatelessFunctionProps> = ({ name, params }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'function',
      name: name,
      params: params
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
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}()`}</h3>
      </div>
    </div>
  );
};

export const AssertionFunction: React.FC<AssertionFunctionProps> = ({ id, name, child }) => {
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);
  const dropArray = [];

  for (let i = 0; i < child.length; i++) {
    dropArray.push(useDrop({
      accept: ['instance'],
      drop: () => testsDispatch({ type: 'ADD_INSTANCE', id: [...id, i] }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  }

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: 'functions',
  //     name: funcName,
  //     paras: parameters,
  //     pos: pos,
  //     child: functionParameters,
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
      style={{ width: 'fit-content', minWidth: '200px'/*, opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}(`}</h3>
        {
          dropArray.map((d, index) => (
            <div
              ref={d[1]}
              className="mx-3"
              style={{
                width: child[index].hasOwnProperty('name') ? undefined : '50px',
                height: child[index].hasOwnProperty('name') ? undefined : '40px',
                border: child[index].hasOwnProperty('name') ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined,
              }}
            >
              {
                child[index].hasOwnProperty('name') && <Instance id={[...id, index]} name={child[index].name} />
              }
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export const Function: React.FC<FunctionProps> = ({ id, name, child }) => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);
  //const dropArray = [];

  // for (let i = 0; i < child.length; i++) {
  //   console.log(id);
  //   dropArray.push(useDrop({
  //     accept: ['parameter'],
  //     drop: () => testsDispatch({ type: 'ADD_PARAMETER', id: [...id, i] }),
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //     }),
  //   }));
  // }

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: 'functions',
  //     name: funcName,
  //     paras: parameters,
  //     pos: pos,
  //     child: functionParameters,
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
      style={{ width: 'fit-content', minWidth: '200px'/*, opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}(`}</h3>
        {/* {
          dropArray.map((d, index) => (
            <div
              ref={d[1]}
              className="mx-3"
              style={{
                width: child[index].hasOwnProperty('name') ? undefined : '50px',
                height: child[index].hasOwnProperty('name') ? undefined : '40px',
                border: child[index].hasOwnProperty('name') ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined,
              }}
            >
              {
                child[index].hasOwnProperty('name') && <Instance id={[...id, index]} name={child[index].name} />
              }
            </div>
          ))
        } */}
        {
          child.map((c, index) => (
            <div key={`function-param-${index}`} className="card card-body mx-3" style={{ width: 'fit-content', minWidth: '250px' }}>
              <Form.Group>
                <Form.Label>{c.type.charAt(0).toUpperCase() + c.type.slice(1)}</Form.Label>
                {
                  c.type === "object" && (
                    <Form.Control
                      as="select"
                      value={c.value}
                      onChange={(e) => {
                        let v = (e.target as HTMLInputElement).value;
                        if (v !== "") {
                          testsDispatch({
                            type: 'MODIFY_PARAMETER',
                            id: [...id, index],
                            value: v
                          });
                        }
                      }}
                    >
                      {
                        testsState.variables.filter((variable: any) => variable.name !== "").map((state: any, index: number) => (
                          <option key={`instance-option-${index}`}>
                            {state.name}
                          </option>
                        ))
                      }
                    </Form.Control>
                  )
                }
                {
                  c.type === "string" && (
                    <input
                      value={c.value}
                      onChange={(e) => testsDispatch({
                        type: 'MODIFY_PARAMETER',
                        id: [...id, index],
                        value: e.target.value
                      })}
                      className="form-control form-control-prepended"
                    />
                  )
                }
                {
                  c.type === "char" && (
                    <input
                      value={c.value}
                      maxLength={1}
                      onChange={(e) => testsDispatch({
                        type: 'MODIFY_PARAMETER',
                        id: [...id, index],
                        value: e.target.value
                      })}
                      className="form-control form-control-prepended"
                    />
                  )
                }
                {
                  c.type === "number" && (
                    <input
                      type="number"
                      value={c.value}
                      onChange={(e) => testsDispatch({
                        type: 'MODIFY_PARAMETER',
                        id: [...id, index],
                        value: e.target.value
                      })}
                      className="form-control form-control-prepended"
                    />
                  )
                }
                {
                  c.type === "boolean" && (
                    <Form.Check
                      type="switch"
                      label={c.value ? "True" : "False"}
                      id={`function-param-switch${[...id, index].join("")}`}
                      checked={c.value}
                      onChange={() => testsDispatch({
                        type: 'MODIFY_PARAMETER',
                        id: [...id, index],
                        value: !c.value
                      })}
                    />
                  )
                }
              </Form.Group>
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};
