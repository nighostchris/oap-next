import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { Form } from 'react-bootstrap';
import { TestCaseContext } from './contexts/TestCaseContext';

interface InstanceProps {
  id: Array<number>
  name: string
}

export const StatelessInstance: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'instance'
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
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>Instance</h3>
      </div>
    </div>
  );
};

export const StatelessParameter: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'parameter'
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
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>Parameter</h3>
      </div>
    </div>
  );
};

export const Instance: React.FC<InstanceProps> = ({ id, name }) => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);
  console.log(id, name);
  //const dropArray = [];
  //const [functionParameters, setFunctionParameters] = React.useState([...new Array(child.length)]);

  // for (let i = 0; i < child.length; i++) {
  //   dropArray.push(useDrop({
  //     accept: ['dataInput', 'instance'],
  //     drop: () => {},
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
      className="card card-body my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '250px'/*, opacity: isDragging ? 0.7 : 1*/ }}
    >
      <Form.Group>
        <Form.Label>Class</Form.Label>
        <Form.Control
          as="select"
          value={name}
          onChange={(e) => {
            let nameValue = (e.target as HTMLInputElement).value;
            if (nameValue !== "") {
              testsDispatch({
                type: 'MODIFY_INSTANCE',
                id: id,
                name: nameValue
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
      </Form.Group>
    </div>
  );
};
