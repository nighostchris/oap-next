import React from 'react';
import { useDrag } from 'react-dnd-cjs';

interface DragCardProps {
  dragCardType: string,
  dragCardName: string,
}

const DragCard: React.FC<DragCardProps> = ({ dragCardType, dragCardName }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: dragCardType, name: dragCardName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      name: dragCardName,
    }),
  });

  return (
    <div ref={drag} className="card my-3 mx-auto" style={{ width: '80%', opacity: isDragging ? 0.7 : 1 }}>
      <div className="card-body p-3">
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{dragCardName}</h3>
      </div>
    </div>
  );
};

export default DragCard;
