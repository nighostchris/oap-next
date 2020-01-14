import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import LogicStatements from './LogicStatements';
import Functions from './Functions';
import { DataInput } from './DataInput';

interface AssertionsProps {
  funcName: string,
  parameters: number,
}

/*
{
  type: 'assertions',
  name: 'funcName',
  paras: parameters,
  child: [
    { type: 'logicStatements', ... },
    { type: 'functions', ... },
  ],
}
*/

const Assertions: React.FC<AssertionsProps> = ({ funcName, parameters }) => {
  const dropArray = [];
  const [assertParameters, setAssertParameters] = React.useState([...new Array(2)]);
  console.log(assertParameters);

  const updateAssertParameters = (position: number, item: any) => {
    const temp = assertParameters;
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
    if (item.type === 'logicStatements') {
      temp[position] = {
        type: item.type,
        ops: item.ops,
        child: item.child,
        setChild: item.setChild,
      };
    }
    setAssertParameters([...temp]);
  };

  for (let i = 0; i < parameters; i++) {
    dropArray.push(useDrop({
      accept: ['logicStatements', 'functions', 'dataInput'],
      drop: (item) => updateAssertParameters(i, item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  }

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'assertions',
      name: funcName,
      paras: parameters,
      child: assertParameters,
      setChild: setAssertParameters,
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
                width: assertParameters[index] ? undefined : '50px',
                height: assertParameters[index] ? undefined : '40px',
                border: assertParameters[index] ? undefined : '1px solid black',
                background: d[0].isOver ? 'grey' : undefined,
              }}
            >
              {
                assertParameters[index] && (assertParameters[index].type === 'dataInput'
                  ? <DataInput pos={0} parent={assertParameters} setParent={setAssertParameters} />
                  : (assertParameters[index].type === 'functions'
                    ? <Functions funcName={assertParameters[index].name} parameters={assertParameters[index].paras} pos={index} child={assertParameters[index].child} parent={assertParameters} setParent={setAssertParameters} />
                    : <LogicStatements operators={assertParameters[index].ops} pos={index} child={assertParameters[index].child} parent={assertParameters} setParent={setAssertParameters} />))
              }
            </div>
          ))
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export default Assertions;
