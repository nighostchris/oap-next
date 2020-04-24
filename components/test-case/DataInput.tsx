import React from 'react';
import { useDrag } from 'react-dnd-cjs';

interface DataInputProps {
  id: Array<number>
  name: string
}

export const StatelessDataInput: React.FC = () => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'dataInput'
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

export const DataInput: React.FC<DataInputProps> = ({ id, name }) => {
  console.log(id);
  // const changeValue = (v: any) => {
  //   const temp = parent;
  //   temp[pos].value = v;
  //   setParent([...temp]);
  // };

  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     type: 'dataInput',
  //     pos: pos,
  //     parent: parent,
  //     setParent: setParent,
  //   },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  return (
    <div
      //ref={drag}
      className="card my-3 mx-auto"
      style={{ width: 'fit-content', minWidth: '200px', /*opacity: isDragging ? 0.7 : 1*/ }}
    >
      <div className="card-body p-3">
        <input
          value={name}
          //onChange={(e) => changeValue(e.target.value)}
          className="form-control form-control-prepended"
        />
      </div>
    </div>
  );
};
