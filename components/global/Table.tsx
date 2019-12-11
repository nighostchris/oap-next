import React from 'react';

interface TableProps {
  thead: Array<string>
  tbody: Array<JSX.Element>
}

const Table : React.SFC<TableProps> = ({ thead, tbody }) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        {
          thead.map((th, index) => (
            <th key={`th-${index}`} scope="col">{th}</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        tbody.map((tr, index) => (
          <tr>
            <th scope="row">{index}</th>
            { tr }
          </tr>
        ))
      }
    </tbody>
  </table>
);

export default Table;
