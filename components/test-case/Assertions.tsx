import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { DataInput } from './DataInput';
import { AssertionFunction } from './Functions';
import { TestCaseContext } from './contexts/TestCaseContext';

interface StatelessAssertionProps {
  name: string
}

interface AssertionsProps {
  id: Array<number>
  name: string
  child: Array<any>
}

export const StatelessAssertion: React.FC<StatelessAssertionProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'assertion',
      name: name
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

export const Assertions: React.FC<AssertionsProps> = ({ id, name, child }) => {
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);
  const dropArray = [];

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: 'assertions',
  //     name: funcName,
  //     paras: parameters,
  //     child: assertParameters,
  //     setChild: setAssertParameters,
  //   },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  if (name === "assertTrue" || name === "assertFalse") {
    dropArray.push(useDrop({
      accept: ['dataInput', 'assertion-function'],
      drop: (item: any) => {
        if (item.type === 'dataInput') {
          testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
        } else {
          testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name, params: item.params });
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  } else {
    for (let i = 0; i < 2; i++) {
      dropArray.push(useDrop({
        accept: ['dataInput', 'assertion-function'],
        drop: (item: any) => {
          if (item.type === 'dataInput') {
            testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
          } else {
            testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name, params: item.params });
          }
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));
    }
  }

  // const [{ isOver: fpIsOver }, fpDrop] = useDrop({
  //   accept: ['dataInput', 'assertion-function'],
  //   drop: (item: any) => {
  //     if (item.type === 'dataInput') {
  //       testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
  //       let temp = [...dropped];
  //       temp[0] = true;
  //       setDropped([...temp]);
  //     }
  //     if (item.type === 'assertion-function') {
  //       testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name, params: item.params });
  //       let temp = [...dropped];
  //       temp[0] = true;
  //       setDropped([...temp]);
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // });

  // const [{ isOver: spIsOver }, spDrop] = useDrop({
  //   accept: ['dataInput', 'assertion-function'],
  //   drop: (item: any) => {
  //     if (item.type === 'dataInput') {
  //       testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
  //       let temp = [...dropped];
  //       temp[1] = true;
  //       setDropped([...temp]);
  //     }
  //     if (item.type === 'assertion-function') {
  //       testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name });
  //       let temp = [...dropped];
  //       temp[1] = true;
  //       setDropped([...temp]);
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // });

  return (
    <div
      // ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', /*opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}(`}</h3>
        {
          dropArray.map((d: any, index: number) => (
            <div
              ref={d[1]}
              className="mx-3"
              style={{
                width: index < child.length ? undefined : '50px',
                height: index < child.length ? undefined : '40px',
                border: index < child.length ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined
              }}
            >
            {
              child.filter((c) => c.id === index).map((c: any) => (
                c.type === 'dataInput'
                  ? <DataInput id={[...id, c.id]} name={c.name} />
                  : <AssertionFunction id={[...id, c.id]} name={c.name} child={c.child} />
              ))
            }
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};
