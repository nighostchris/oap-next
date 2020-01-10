import React from 'react';
import { useDrag } from 'react-dnd-cjs';

interface DataInputProps {
  position: number,
  value: any,
  setValue: any,
}

export const StatelessDataInput: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'dataInput',
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
        <input
          disabled
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};

export const DataInput: React.FC<DataInputProps> = ({ position, value, setValue }) => {
  const changeValue = (v: any) => {
    const temp = value;
    temp[position].value = v;
    setValue([...temp]);
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'dataInput',
      position: position,
      value: value,
      setValue: setValue,
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
          value={value[position].value || ''}
          onChange={(e) => changeValue(e.target.value)}
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};
