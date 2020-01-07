import React from 'react';
import { useDrop } from 'react-dnd-cjs';
import DragCard from './DragCard';

interface DropBoardProps {
  dropBoardType: string,
  testCaseName: string,
}

const data: string[] = [];

const DropBoard: React.FC<DropBoardProps> = ({ dropBoardType, testCaseName }) => {
  const addFunction = (item: any) => {
    console.log('dropped');
    data.push(item.name);
  };

  const [{ isOver }, drop] = useDrop({
    accept: dropBoardType,
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
            <div ref={drop} style={{ display: 'flex', flexDirection: 'column', background: isOver ? 'yellow' : undefined, height: 'fit-content', minHeight: '42px', minWidth: '200px' }}>
              {
                data.map((d) => (
                  <DragCard dragCardType={dropBoardType} dragCardName={d} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropBoard;
