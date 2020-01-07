import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';

interface AssertionsProps {
  funcName: string,
  parameters: number,
}

const Assertions: React.FC<AssertionsProps> = ({ funcName, parameters }) => {
  const [logicStatements, setLogicStatements] = React.useState([...new Array(parameters)]);

  const changeLogicStatements = (item: any) => {
    console.log(item);
    setLogicStatements([...logicStatements]);
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'assertions', name: funcName, paras: parameters },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'logicStatement',
    drop: (item) => changeLogicStatements(item),
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
      <div className="card-body p-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${funcName}(`}</h3>
        {
          logicStatements.map(() => (
            <div
              ref={drop}
              className="mx-3"
              style={{ width: '50px', height: '40px', border: '1px solid black', background: isOver ? 'grey' : undefined }}
            />
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export default Assertions;
