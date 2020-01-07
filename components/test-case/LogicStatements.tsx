import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import DragCard from './DragCard';

interface AssertionsProps {
  operators: string,
}

const LogicStatements: React.FC<AssertionsProps> = ({ operators }) => {
  const [statementLeft, setStatementLeft] = React.useState();
  const [statementRight, setStatementRight] = React.useState();

  const changeStatement = (position: number, item: any) => {
    if (position === 0) {
      setStatementLeft(item.name);
    } else {
      setStatementRight(item.name);
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'logicStatements', ops: operators },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOverLeft }, dropLeft] = useDrop({
    accept: 'functions',
    drop: (item) => changeStatement(0, item),
    collect: (monitor) => ({
      isOverLeft: !!monitor.isOver(),
    }),
  });

  const [{ isOverRight }, dropRight] = useDrop({
    accept: 'functions',
    drop: (item) => changeStatement(1, item),
    collect: (monitor) => ({
      isOverRight: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', opacity: isDragging ? 0.7 : 1 }}
    >
      <div className="card-body p-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div
          ref={dropLeft}
          className="mx-3"
          style={{
            width: statementLeft ? 'fit-content' : '50px',
            height: statementLeft ? 'fit-content' : '40px',
            border: statementLeft ? undefined : '1px solid black',
            background: isOverLeft ? 'grey' : undefined,
          }}
        >
          { statementLeft && <DragCard dragCardType="functions" dragCardName={statementLeft} /> }
        </div>
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{operators}</h3>
        <div
          ref={dropRight}
          className="mx-3"
          style={{ width: '50px', height: '40px', border: '1px solid black', background: isOverRight ? 'grey' : undefined }}
        >
          { statementRight && <DragCard dragCardType="functions" dragCardName={statementRight} /> }
        </div>
      </div>
    </div>
  );
};

export default LogicStatements;
