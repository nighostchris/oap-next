import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import { DataInput } from './DataInput';

interface DragCardProps {
  funcName: string,
  parameters: number,
  pos?: any,
  child?: any,
  parent?: any,
  setParent?: any,
}

/*
{
  type: 'functions',
  name: funcName,
  paras: parameters,
  child: [
    { type: 'dataInput', value: item.value },
    { type: 'dataInput', value: item.value },
  ],
}
*/

const Functions: React.FC<DragCardProps> = ({
  funcName, parameters, pos, child, parent, setParent,
}) => {
  const dropArray = [];
  const [functionParameters, setFunctionParameters] = React.useState([...new Array(parameters)]);

  useEffect(() => {
    if (child) { setFunctionParameters([...child]); }
  }, [child]);

  const updateFunctionParameters = (position: number, item: any) => {
    const temp = functionParameters;
    temp[position] = { type: 'dataInput', value: item.value };
    setFunctionParameters([...temp]);
  };

  for (let i = 0; i < parameters; i++) {
    dropArray.push(useDrop({
      accept: 'dataInput',
      drop: (item) => updateFunctionParameters(i, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  }

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'functions',
      name: funcName,
      paras: parameters,
      pos: pos,
      child: functionParameters,
      parent: parent,
      setParent: setParent,
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
      <div className="card-body justify-content-center align-items-center p-3" style={{ display: 'flex', flexDirection: 'row' }}>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{`${funcName}(`}</h3>
        {
          dropArray.map((d, index) => (
            <div
              ref={d[1]}
              className="mx-3"
              style={{
                width: functionParameters[index] ? undefined : '50px',
                height: functionParameters[index] ? undefined : '40px',
                border: functionParameters[index] ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined,
              }}
            >
              { functionParameters[index]
                && (
                  <DataInput
                    pos={index}
                    parent={functionParameters}
                    setParent={setFunctionParameters}
                  />
                )}
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export default Functions;
