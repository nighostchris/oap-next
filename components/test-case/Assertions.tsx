import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import LogicStatements from './LogicStatements';
import Functions from './Functions';

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
  const [leftLogicStatement, setLeftLogicStatement] = React.useState();
  const [rightLogicStatement, setRightLogicStatement] = React.useState();

  const changeLogicStatement = (position: number, item: any) => {
    let result = null;
    if (item.type === 'logicStatements') {
      result = <LogicStatements operators={item.ops} statL={item.statL} statR={item.statR} />;
    }
    if (item.type === 'functions') {
      result = <Functions funcName={item.name} parameters={item.paras} />;
    }

    if (position === 0) {
      setLeftLogicStatement(result);
    } else {
      setRightLogicStatement(result);
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'assertions', name: funcName, paras: parameters },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropLeft] = useDrop({
    accept: ['logicStatements', 'functions'],
    drop: (item) => changeLogicStatement(0, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver2 }, dropRight] = useDrop({
    accept: 'logicStatements',
    drop: (item) => changeLogicStatement(1, item),
    collect: (monitor) => ({
      isOver2: !!monitor.isOver(),
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
        <div
          ref={dropLeft}
          className="mx-3"
          style={{
            width: leftLogicStatement ? 'fit-content' : '50px',
            height: leftLogicStatement ? 'fit-content' : '40px',
            border: leftLogicStatement ? undefined : '1px solid black',
            background: isOver ? 'grey' : undefined,
          }}
        >
          {leftLogicStatement}
        </div>
        {
          parameters > 1
            && (
              <div
                ref={dropRight}
                className="mx-3"
                style={{
                  width: rightLogicStatement ? 'fit-content' : '50px',
                  height: rightLogicStatement ? 'fit-content' : '40px',
                  border: rightLogicStatement ? undefined : '1px solid black',
                  background: isOver2 ? 'grey' : undefined,
                }}
              >
                {rightLogicStatement}
              </div>
            )
        }
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>)</h3>
      </div>
    </div>
  );
};

export default Assertions;
