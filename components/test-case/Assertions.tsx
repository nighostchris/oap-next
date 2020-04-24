import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { DataInput } from './DataInput';
import { TestCaseContext } from './contexts/TestCaseContext';

interface StatelessAssertion {
  name: string
}

interface AssertionsProps {
  id: Array<number>
  name: string
  child: Array<any>
}

export const StatelessAssertion: React.FC<StatelessAssertion> = ({ name }) => {
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
  const [dropped, setDropped] = React.useState([false, false]);

  console.log(dropped);
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

  const [{ isOver: fpIsOver }, fpDrop] = useDrop({
    accept: ['dataInput'],
    drop: (item: any) => {
      if (item.type === 'dataInput') {
        testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
        let temp = [...dropped];
        temp[0] = true;
        setDropped([...temp]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: spIsOver }, spDrop] = useDrop({
    accept: ['dataInput'],
    drop: (item: any) => {
      testsDispatch({ type: 'ADD_DATA_INPUT', id: id, name: item.name });
      let temp = [...dropped];
      temp[1] = true;
      setDropped([...temp]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      // ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', /*opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}(`}</h3>
        {
          [0, 1].map((i: number) => (
            <div
              ref={!i ? fpDrop : spDrop}
              className="mx-3"
              style={{
                width: !i ? (!dropped[0] ? '50px' : undefined) : (!dropped[1] ? '50px' : undefined),
                height: !i ? (!dropped[0] ? '40px' : undefined) : (!dropped[1] ? '40px' : undefined),
                border: !i ? (!dropped[0] ? '1px solid black' : undefined) : (!dropped[1] ? '1px solid black' : undefined),
                background: !i ? (fpIsOver ? 'grey' : undefined) : (spIsOver ? 'grey' : undefined),
              }}
            >
            {
              child.filter((c) => c.id === i).map((c: any) => (
                c.type === 'dataInput' ? <DataInput id={[...id, c.id]} name={c.name} /> : undefined
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
