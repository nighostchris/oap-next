import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { DataInput } from './DataInput';
import { TestCaseContext } from './contexts/TestCaseContext';
import { Instance } from './Instance';

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
  params: number
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
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);
  const dropArray = [];

  for (let i = 0; i < child.length; i++) {
    console.log(id);
    dropArray.push(useDrop({
      accept: ['parameter'],
      drop: () => testsDispatch({ type: 'ADD_PARAMETER', id: [...id, i] }),
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
