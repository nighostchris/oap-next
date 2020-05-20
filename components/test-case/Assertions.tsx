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

  const checkChildFull = () => {
    if (name === "assertTrue" || name === "assertFalse") {
      if (child.length < 1) {
        return false;
      }
    } else {
      if (child.length < 2) {
        return false;
      }
    }

    return true;
  }

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'existing-assertion',
      id: id
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ['dataInput', 'assertion-function'],
    canDrop: () => {
      if (!checkChildFull()) {
        return true;
      } else {
        return false;
      }
    },
    drop: (item: any) => {
      if (item.type === 'dataInput') {
        testsDispatch({ type: 'ADD_DATA_INPUT', id: id, value: "", inputType: "" });
      } else {
        testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name, params: item.params });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver2 }, drop2] = useDrop({
    accept: ['dataInput', 'assertion-function'],
    canDrop: () => {
      if (!checkChildFull()) {
        return true;
      } else {
        return false;
      }
    },
    drop: (item: any) => {
      if (item.type === 'dataInput') {
        testsDispatch({ type: 'ADD_DATA_INPUT', id: id, value: "", inputType: "" });
      } else {
        testsDispatch({ type: 'ADD_ASSERTION_FUNCTION', id: id, name: item.name, params: item.params });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }); 

  return (
    <div
      ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', opacity: isDragging ? 0.7 : 1 }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${name}(`}</h3>
        {
          <div
            ref={drop}
            className="mx-3"
            style={{
              width: child.length >= 1 ? undefined : '50px',
              height: child.length >= 1 ? undefined : '40px',
              border: child.length >= 1 ? undefined : '1px solid black',
              background: (isOver && !checkChildFull()) ? 'grey' : undefined
            }}
          >
          {
            child.filter((c) => c.id === 0).map((c: any) => (
              c.type === 'dataInput'
                ? <DataInput id={[...id, c.id]} value={c.value} inputType={c.input_type} />
                : <AssertionFunction id={[...id, c.id]} name={c.name} child={c.child} />
            ))
          }
          </div>
        }
        {
          name === "assertEquals" && (
            <div
              ref={drop2}
              className="mx-3"
              style={{
                width: child.length >= 2 ? undefined : '50px',
                height: child.length >= 2 ? undefined : '40px',
                border: child.length >= 2 ? undefined : '1px solid black',
                background: (isOver2 && !checkChildFull()) ? 'grey' : undefined
              }}
            >
            {
              child.filter((c) => c.id === 1).map((c: any) => (
                c.type === 'dataInput'
                  ? <DataInput id={[...id, c.id]} value={c.value} inputType={c.input_type} />
                  : <AssertionFunction id={[...id, c.id]} name={c.name} child={c.child} />
              ))
            }
            </div>
          )
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};
