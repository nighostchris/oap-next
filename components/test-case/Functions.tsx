import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';

interface DragCardProps {
  funcName: string,
  parameters: number,
}

const Functions: React.FC<DragCardProps> = ({ funcName, parameters }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'functions', name: funcName, paras: parameters },
    end: (monitor) => console.log(monitor),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dropArray = [];
  const [functionParameters, setFunctionParameters] = React.useState([...new Array(parameters)]);

  const changeFunctionParameters = (position: number, item: any) => {
    const temp = functionParameters;
    temp[position] = { type: item.type, value: item.value };
    setFunctionParameters([...temp]);
  };

  for (let i = 0; i < parameters; i++) {
    dropArray.push(useDrop({
      accept: 'dataInput',
      drop: (item) => changeFunctionParameters(i, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  }

  return (
    <div
      ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', opacity: isDragging ? 0.7 : 1 }}
    >
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${funcName}(`}</h3>
        {
          dropArray.map((d, index) => (
            <div
              ref={d[1]}
              className="mx-3"
              style={{
                width: functionParameters[index] ? 'fit-content' : '50px',
                height: functionParameters[index] ? 'fit-content' : '40px',
                border: functionParameters[index] ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined,
              }}
            >
              {functionParameters[index] && functionParameters[index].value}
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export default Functions;
