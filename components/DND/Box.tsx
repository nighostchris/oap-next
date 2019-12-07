import * as React from 'react';
import { styled } from 'baseui';
import { useDrag, DragSourceMonitor } from 'react-dnd-cjs';

const Root = styled('div', {
  width: '200px',
  height: '50px',
  lineHeight: '50px',
  background: 'pink',
  margin: '30px auto',
});

const Box: React.FunctionComponent = () => {
  const [, drager] = useDrag({
    item: { type: 'Box' },
    begin(monitor: DragSourceMonitor) {
      console.log(monitor);
      return { type: 'Box' };
    },
  });

  return (
    <Root ref={drager}>
      Box
    </Root>
  );
};

export default Box;
