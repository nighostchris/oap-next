import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';
import DragCard from './Functions';
import Assertions from './Assertions';

interface DropBoardProps {
  testCaseName: string,
}

const data: any[] = [];

export const StatelessNewTest: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'test',
      value: undefined,
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
      <div className="card-body p-3">
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>New Test Case</h3>
      </div>
    </div>
  );
};

export const DropBoard: React.FC<DropBoardProps> = ({ testCaseName }) => {
  const addFunction = (item: any) => {
    if (item.type === 'functions') {
      data.push(<DragCard funcName={item.name} parameters={item.paras} />);
    } else {
      data.push(<Assertions funcName={item.name} parameters={item.paras} />);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ['functions', 'assertions'],
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
