import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { Assertions } from './Assertions';
import { Function } from './Functions';
import { TestCaseContext } from './contexts/TestCaseContext';

interface TestCaseProps {
  id: number
  name: string
  child: Array<any>
}

export const StatelessTestCase: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'test'
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
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>New Test Case</h3>
      </div>
    </div>
  );
};

export const TestCase: React.FC<TestCaseProps> = ({ id, name, child }) => {
  const { dispatch: testsDispatch } = React.useContext(TestCaseContext);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'test',
      id: id
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ['assertion', 'function'],
    drop: (item: any) => {
      if (item.type === 'assertion') {
        testsDispatch({ type: 'ADD_ASSERTION', id: id, name: item.name })
      }
      if (item.type === 'function') {
        testsDispatch({ type: 'ADD_FUNCTION', id: id, name: item.name, params: item.params })
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drag} style={{ display: 'flex', flexDirection: 'row', opacity: isDragging ? 0.7 : 1 }}>
      <div className="px-0 mx-4 mt-3">
        <div className="card" style={{ width: 'fit-content' }}>
          <div className="card-body">
            <h3 className="card-title">
              <input
                value={name}
                placeholder="Type the name of test case"
                onChange={(e) => testsDispatch({ type: 'RENAME_TEST', id: id, name: e.target.value })}
                className="form-control form-control-prepended"
              />
            </h3>
            <div
              ref={drop}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: isOver ? 'yellow' : undefined,
                height: 'fit-content',
                minHeight: '42px',
                minWidth: '250px',
              }}
            >
              {
                child.map((c) => (
                  c.type === 'assertion'
                    ? <Assertions id={[id, c.id]} name={c.name} child={c.child} />
                    : <Function id={[id, c.id]} name={c.name} child={c.child} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
