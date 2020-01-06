import React from 'react';
import { useDrop } from 'react-dnd-cjs';

interface DropBoardProps {
  dropBoardType: string,
  testCaseName: string,
}

const data = [''];

const DropBoard: React.FC<DropBoardProps> = ({ dropBoardType, testCaseName }) => {
  const addFunction = (item: any) => {
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
      <div className="col-12 col-xl-3 px-0">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{testCaseName}</h3>
            <div ref={drop} style={{ display: 'flex', flexDirection: 'column', background: isOver ? 'yellow' : undefined }}>
              {
                data.map((d) => (
                  <div className="card my-3 mx-auto" style={{ width: '80%' }}>
                    <div className="card-body p-3">
                      <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{d}</h3>
                    </div>
                  </div>
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
