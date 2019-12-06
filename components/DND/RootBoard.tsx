import * as React from 'react';
import { styled } from 'baseui';
import { useDrop, DropTargetMonitor } from 'react-dnd-cjs';

const Root = styled('div', {
  width: '100%',
  height: '100%',
});

const RootBoard: React.FunctionComponent = () => {
  const [collectProps, droper] = useDrop({
    accept: 'Box',
    collect: (minoter: DropTargetMonitor) => ({
      isOver: minoter.isOver(),
    }),
  });

  const bg = collectProps.isOver ? 'deeppink' : 'white';
  const content = collectProps.isOver ? 'Dragging' : 'Dragged';

  return (
    <Root
      ref={droper}
      style={{ background: bg }}
    >
      { content }
    </Root>
  );
};

export default RootBoard;
