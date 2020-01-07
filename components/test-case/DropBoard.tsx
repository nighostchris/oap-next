import React from 'react';
import { useDrop } from 'react-dnd-cjs';
import DragCard from './DragCard';
import Assertions from './Assertions';

interface DropBoardProps {
  dropBoardType: string,
  testCaseName: string,
}

const data: any[] = [];

const DropBoard: React.FC<DropBoardProps> = ({ dropBoardType, testCaseName }) => {
  const addFunction = (item: any) => {
    if (item.type === 'functions') {
      data.push(<DragCard dragCardType={dropBoardType} dragCardName={item.name} />);
    } else {
      data.push(<Assertions funcName={item.name} parameters={item.paras} />);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: [dropBoardType, 'assertions'],
    drop: (item) => addFunction(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="col-12 col-xl-3 px-0 mx-4 mt-4">
        <div className="card" style={{ width: 'fit-content' }}>
          <div className="card-body">
            <h3 className="card-title">{testCaseName}</h3>
            <div
              ref={drop}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: isOver ? 'yellow' : undefined,
                height: 'fit-content',
                minHeight: '42px',
                minWidth: '200px',
              }}
            >
              { data.map((d) => (d)) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropBoard;
