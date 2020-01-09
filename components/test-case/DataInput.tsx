import React from 'react';
import { useDrag } from 'react-dnd-cjs';

interface DataInputProps {
  initValue?: any,
  parent?: any,
  setParent?: any,
}

const DataInput: React.FC<DataInputProps> = ({ initValue, parent, setParent }) => {
  const [value, setValue] = React.useState(initValue);
  console.log(value);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'dataInput',
      value: value,
      setValue: setValue,
      parent: parent,
      setParent: setParent,
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
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};

export default DataInput;
