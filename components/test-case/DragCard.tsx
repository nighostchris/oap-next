import React from 'react';
import { useDrag, useDrop } from 'react-dnd-cjs';

interface DragCardProps {
  dragCardType: string,
  dragCardName: string,
}

const DragCard: React.FC<DragCardProps> = ({ dragCardType, dragCardName }) => {
  const [cardName, setCardName] = React.useState(dragCardName);

  const changeCard = (item: any) => setCardName(item.name);

  const [{ isDragging }, drag] = useDrag({
    item: { type: dragCardType, name: cardName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: dragCardType,
    drop: (item) => changeCard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const ref = React.useRef<HTMLDivElement>(null);
  drop(drag(ref));

  return (
    <div ref={ref} className="card my-3 mx-auto" style={{ zIndex: 10, width: '200px', opacity: isDragging ? 0.7 : 1, background: isOver ? 'grey' : undefined }}>
      <div className="card-body p-3">
        <h3 className="card-title mb-0" style={{ textAlign: 'center' }}>{cardName}</h3>
      </div>
    </div>
  );
};

export default DragCard;
