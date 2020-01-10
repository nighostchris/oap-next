import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import Functions from './Functions';
import { DataInput } from './DataInput';

interface LogicStatementsProps {
  operators: string
  statL?: string
  statR?: string
}

/*
{
  type: 'logicStatements',
  operators: '>',
  child: [
    { type: 'dataInput', value: item.value },
    { type: 'functions', ... },
  ],
}
*/

const LogicStatements: React.FC<LogicStatementsProps> = ({ operators }) => {
  const dropArray = [];
  const [LSParameters, setLSParameters] = React.useState([...new Array(2)]);
  console.log(LSParameters);

  const updateLSParameters = (position: number, item: any) => {
    const temp = LSParameters;
    if (item.type === 'dataInput') {
      if (item.value !== undefined) {
        temp[position] = item.value[item.position];
      } else {
        temp[position] = { type: item.type, value: item.value };
      }
    }
    if (item.type === 'functions') {
      temp[position] = {
        type: item.type,
        name: item.name,
        paras: item.paras,
        child: item.child,
        setChild: item.setChild,
      };
    }
    setLSParameters([...temp]);
  };

  for (let i = 0; i < 2; i++) {
    dropArray.push(useDrop({
      accept: ['functions', 'dataInput'],
      drop: (item) => updateLSParameters(i, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  }

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'logicStatements',
      ops: operators,
      child: LSParameters,
      setChild: setLSParameters,
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
        <div
          ref={dropArray[0][1]}
          className="mx-3"
          style={{
            width: LSParameters[0] ? 'fit-content' : '50px',
            height: LSParameters[0] ? 'fit-content' : '40px',
            border: LSParameters[0] ? undefined : '1px solid black',
            background: dropArray[0][0].isOver ? 'grey' : undefined,
          }}
        >
          {
            LSParameters[0] && (LSParameters[0].type === 'dataInput'
              ? <DataInput position={0} value={LSParameters} setValue={setLSParameters} />
              : <Functions funcName={LSParameters[0].name} parameters={LSParameters[0].paras} child={LSParameters[0].child} />)
          }
        </div>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{operators}</h3>
        <div
          ref={dropArray[1][1]}
          className="mx-3"
          style={{
            width: LSParameters[1] ? 'fit-content' : '50px',
            height: LSParameters[1] ? 'fit-content' : '40px',
            border: LSParameters[1] ? undefined : '1px solid black',
            background: dropArray[1][0].isOver ? 'grey' : undefined,
          }}
        >
          {
            LSParameters[1] && (LSParameters[1].type === 'dataInput'
              ? <DataInput position={1} value={LSParameters} setValue={setLSParameters} />
              : <Functions funcName={LSParameters[1].name} parameters={LSParameters[1].paras} child={LSParameters[1].child} />)
          }
        </div>
      </div>
    </div>
  );
};

export default LogicStatements;
